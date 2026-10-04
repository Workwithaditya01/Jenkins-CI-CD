pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t demo-app:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing Docker image...'
                sh 'docker image inspect demo-app:latest'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker stop demo-app || true
                    docker rm demo-app || true

                    docker run -d \
                        --name demo-app \
                        -p 5000:5000 \
                        demo-app:latest
                '''
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
