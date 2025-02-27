pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'job_search'
        AWS_REGION = "us-east-2"
        ECR_REPOSITORY = "dev/devops_cloud_repo"
        Credentials = "jenkins_ecr_id"
        ANSIBLE_SSH_KEY = credentials('ansible_private')        
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
        
        stage('Connect to AWS ECR'){
            steps {
                script {
                        withCredentials([aws(credentialsId: 'jenkins_ecr_id', accessKeyVariable: 'AWS_ACCESS_KEY_ID', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                            env.AWS_ACCOUNT_ID = sh(
                    script: "aws sts get-caller-identity --query Account --output text",
                    returnStdout: true
                ).trim()
                
                        sh """
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${env.AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        """
                         sh 'docker build -t ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${DOCKER_IMAGE}-${DOCKER_TAG} .'

                        sh """
                             docker push ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${DOCKER_IMAGE}-${DOCKER_TAG}
                           """
                    }
                }
            }
        }

        stage('Run Ansible to Configure AKS') {
            steps {

                sh """
                ansible-playbook -i /etc/ansible/hosts playbook.yaml --private-key $ANSIBLE_SSH_KEY  \
                -e "image=${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPOSITORY}:${DOCKER_IMAGE}-${DOCKER_TAG} AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID}"

                """

                sh 'kubectl'
            }
        }


    }
        
    

    post {
        always {
            sh 'docker system prune -a -f'
        }
    }


}
