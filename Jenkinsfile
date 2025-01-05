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
                sh 'docker build -t test-app:latest .'
                echo "Docker image built successfully!"
            }
        }
       
        stage('Deploy') {
            steps {
                echo "Deploying the application..."
                sh 'docker run -d -p 8000:8000 test-app:latest || echo "Deployment failed!"'
                echo "Application deployed!"
            }
        }
    }
}