const express = require("express")

const app = express()

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

app.listen(8000,()=>{
    console.log(`Server running on PORT = 8000. `)
})