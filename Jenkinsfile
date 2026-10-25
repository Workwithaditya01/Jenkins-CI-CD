
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
                echo 'Build stage is running successfully.'
            }
        }

        stage('Test') {
            steps {
                echo 'Test stage is running successfully.'
            }
        }

        stage('Push-To-DockerHub') {
            steps {
                echo "Credentials Checking"
                withCredentails([usernamePassword(
                    credentailsID:"dockerhubcreds",
                    passowordVariable:"dockerhubpass",
                    usernameVariable:"dockerhubuser"
                    )])
            }

            sh "docker login -u ${env.dockerhubuser} -p ${env.dockerhubpass}"
            sh "docker image tag two-tier flask-app.${env.dockerhubuser}/two-tier-flask-app"
            sh "docker push ${env.dockerhubuser}/two-tier-flask-app:latest"

        }
    }
}
