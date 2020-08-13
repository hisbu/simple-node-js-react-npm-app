pipeline {
    // agent {
    //     docker {
    //         image 'node:6-alpine'
    //         args '-p 3000:3000'
    //         args '-v $HOME/.m2:/root/.m2'
    //     }
    // }
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                echo 'start build'
                // nodejs('node'){
                    sh 'npm install'
                // }
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
                // script {
                //     app = docker.build("hisbu/webapps-test")
                // }
                sh 'docker build . -t hisbu/webapps-test'
            }
        }
        stage('Test docker image') {
            steps{
                sh 'docker run -d --name testImages -p 80:80 hisbu/webapps-test'
                input message: 'Finished test image? (Click "Proceed" to Continue'
            }
        }
        stage('Clean docker test') {
            steps{
                sh 'docker stop testImages'
                sh 'docker rm testImages'
            }
        }
        stage('Push image to registry'){
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {
                        app.push("hisbu/webapps-test")
                        app.push("latest")
                    }
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