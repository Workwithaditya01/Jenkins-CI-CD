
pipeline {
    agent any

    stages {
        stage('Start') {
            steps {
                echo 'Jenkins pipeline has started!'
            }
        }

        stage('Build') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t two-tier-flask-app:latest .'
            }
        }

        stage('Test') {
            steps {
                echo 'Test stage is running successfully.'
                sh 'docker image inspect two-tier-flask-app:latest'
            }
        }

        stage('Push-To-DockerHub') {
            steps {
                echo 'Checking Docker Hub credentials...'

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhubcreds',
                        usernameVariable: 'dockerhubuser',
                        passwordVariable: 'dockerhubpass'
                    )
                ]) {
                    sh '''
                        echo "$dockerhubpass" | docker login \
                            -u "$dockerhubuser" --password-stdin

                        docker image tag two-tier-flask-app:latest \
                            "$dockerhubuser/two-tier-flask-app:latest"

                        docker push "$dockerhubuser/two-tier-flask-app:latest"

                        docker logout
                    '''
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
