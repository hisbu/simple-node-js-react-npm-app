pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
            args '-v $HOME/.m2:/root/.m2'
        }
    }
    // agent any
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
        stage('Initialize'){
            def dockerHome = tool 'myDocker'
            env.PATH = "${dockerHome}/bin:${env.PATH}"
        }   
        stage('Build Docker image') {
            steps{
                // script {
                //     app = docker.build("hisbu/webapps-test")
                // }
                sh 'docker build . -t hisbu/webapps-test'
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