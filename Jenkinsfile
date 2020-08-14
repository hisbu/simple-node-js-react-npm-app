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
        DOCKER_TAG = getDockerTag()
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
                script {
                    app = docker.build("hisbu/webapps-test:${DOCKER_TAG} .")
                }
                // sh 'docker build . -t hisbu/webapps-test'
            }
        }
        stage('Test docker image') {
            steps{
                sh "docker run -d --rm --name testImages -p 80:80 hisbu/webapps-test:${DOCKER_TAG}"
                input message: 'Finished test image? (Click "Proceed" to Continue)'
            }
        }
        stage('Clean docker test') {
            steps{
                sh 'docker stop testImages'
            }
        }
        stage('Push image to registry'){
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerHub') {
                        // docker.image("hisbu/webapps-test")
                        app.push()
                    }
                }
                // sh 'docker rmi hisbu/webapps-test'
            }
        }
        stage('Deploy to K8s'){
            steps{
                sh "chmod +x changeTag.sh"
                sh "./changeTag.sh ${DOCKER_TAG}"
                sshagent(['kube8']) {
                    sh "scp -o StrictHostKeyChecking=no  web-app-deployment.yml hisbu@35.247.151.81:/home/hisbu/jen/"
                    sh "ssh hisbu@35.247.151.81 kubectl apply -f jen/."
                }
            }
        }
        // stage('DeployToProduction') {
        //     steps {
        //         milestone(1)
        //         kubernetesDeploy(
        //             kubeconfigId: 'kubernetes',
        //             configs: 'k8s_svc_deploy.yaml',
        //             enableConfigSubstitution: true
        //         )
        //     }
        // }
        // stage('Delivery') {
        //     steps {
        //         sh './jenkins/scripts/deliver.sh'
        //         input message: 'Finished using the web site? (Click "Proceed" to Continue)'
        //         sh './jenkins/scripts/kill.sh'
        //     }
        // }
    }
}

def getDockerTag(){
    def tag  = sh script: "cut -d -10 | git rev-parse HEAD ", returnStdout: true
    return tag
}