pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                echo 'start build'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh './jenkins/scripts/test.sh'
            }
        }
        stage('Build react project') {
            steps{
                sh 'npm run build'
            }
        }   
        stage('Build Docker image') {
            steps{
                script {
                    app  = docker.build("hisbu/webapps-test")
                }
            }
        }
        // stage('Delivery') {
        //     steps {
        //         sh './jenkins/scripts/deliver.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to Continue)'
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }
    }
}