const client = require("prom-client")
const express = require("express")
require('dotenv').config();
const responseTime = require("response-time")

const app = express()

// Default Metrics Collection
client.collectDefaultMetrics({ register: client.register });

const reqResTime = new client.Histogram({
    name:'http_express_req_res_time',
    help:'This tells how much ime is taken by req and res',
    labelNames:["method","route","status_code"],
    buckets:[1,50,100,200,400,500,800,1000,2000]
})
app.use(responseTime((req,res,time)=>{
    reqResTime.labels({
        method:req.method,
        route:req.url,
        status_code:res.statusCode
    }).observe(time)
}))

app.get("/",async(req,res)=>{
    return res.json({
        status:201,
        body:'Get Message'
    })
})

app.get("/slow",async (req,res)=>{
    try {
        const startTime = Date.now();
        const result = await doSomeHeavyTask();
        const endTime = Date.now();
        const timeTaken = endTime - startTime;

        return res.json({
            status:"Success",
            message:`Heavy task Completed in ${timeTaken} ms`,
            data:result
        })
    } catch (error) {
        return res.status(500).json({
            status: "Error",
            message: error.message || "An unexpected error occurred"
        });
    }
})

async function doSomeHeavyTask() {
    const delay = Math.random() * (4000 - 5) + 5; // Random delay between 5ms and 4000ms
    await new Promise(resolve => setTimeout(resolve, delay)); // Simulate delay

    // Introduce a random error with a 30% chance
    if (Math.random() < 0.3) {
        throw new Error("Intentional error occurred during heavy task!");
    }
}


// Metrics Endpoint for Prometheus
app.get("/metrics", async (req, res) => {
    res.setHeader("Content-Type", client.register.contentType);
    const metrics = await client.register.metrics();
    res.send(metrics);
  })

const PORT = process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`Server running on PORT = ${PORT}. `)
})