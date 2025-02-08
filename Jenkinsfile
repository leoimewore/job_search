pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'job_search'
        AWS_REGION = "us-east-2"
        // REPOSITORY_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.us-east-2.amazonaws.com/dev/devops_cloud_repo"
        Credentials = "jenkins_ecr"
        
    }

    stages {
        stage('Initialize') {
            steps {
                script {
                    def buildNumber = currentBuild.number
                    echo "Current Build Number: ${buildNumber}"
                    
                    env.DOCKER_TAG = "v-${buildNumber + 1}"
                }
            }
        }
        
        stage('Checkout') {
            steps {
                git branch: "main", url: 'https://github.com/leoimewore/job_search.git'
            }
        }
        
        stage('Build') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .'
            }
        }
        
        stage('Connect to AWS ECR'){
            steps {
                script {
                        withCredentials([aws(credentialsId: 'jenkins_ecr', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                            env.AWS_ACCOUNT_ID = sh(
                    script: "aws sts get-caller-identity --query Account --output text",
                    returnStdout: true
                ).trim()
                
                echo "Using AWS Account ID: ${env.AWS_ACCOUNT_ID}"
                        sh """
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        """
                    }
                }
            }
        }
        
    

    // post {
    //     always {
    //         sh 'docker system prune -a -f'
    //     }
    // }
}

}
