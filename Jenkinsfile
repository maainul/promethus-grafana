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
                echo "Checking and restarting Grafana container on port 3000..."
                sh 'docker compose up -d'
                sh '''
                    # Check if the Grafana container is running
                    if [ $(docker ps -q -f name=grafana) ]; then
                        echo "Stopping the running Grafana container..."
                        docker stop grafana
                    fi

                    # Check if a Grafana container exists (but not running)
                    if [ $(docker ps -aq -f name=grafana) ]; then
                        echo "Removing the existing Grafana container..."
                        docker rm grafana
                    fi

                    # Run the Grafana container on port 3000
                    echo "Starting Grafana container on port 3000..."
                    docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss
                '''
                echo "Application deployed successfully on port 3000!"
            }
        }
    }
}