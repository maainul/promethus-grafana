# Run Server :

        node index.js


# RUN 

http://localhost:8000/slow

http://localhost:8000/



```groovy
pipeline {
    agent { label "mainul" }

    stages {
        stage('Code') {
            steps {
                echo "Cloning the code..."
                git url: "https://github.com/maainul/promethus-grafana.git", branch: "master"
                echo "Code cloned successfully!"
            }
        }
        stage('Build') {
            steps {
                echo "Building the Docker image..."
                sh 'docker build -t maainul/test-app:latest .'
                echo "Docker image built successfully!"
            }
        }
       
        stage('Deploy') {
            steps {
                echo "Stopping and removing existing containers..."
                sh '''
                    # Stop all running containers
                    docker ps -q | xargs -r docker stop
                    # Remove all stopped containers
                    docker ps -aq | xargs -r docker rm
                '''
                echo "Existing containers stopped and removed."

                echo "Deploying the application..."
                sh 'docker compose up -d'
                echo "Application deployed successfully!"
            }
        }
    }
}
```