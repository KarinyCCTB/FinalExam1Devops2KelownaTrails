pipeline {
    agent any

    // Define parameters
    parameters {
        string(name: 'TESTING_IP', defaultValue: '54.90.116.180', description: 'IP address for the Testing environment')
        string(name: 'STAGING_IP', defaultValue: '44.211.223.116', description: 'IP address for the Staging environment')
        string(name: 'PROD1_IP', defaultValue: '3.86.12.169', description: 'IP address for the Production 1 environment')
        string(name: 'PROD2_IP', defaultValue: '54.227.40.253', description: 'IP address for the Production 2 environment')
        string(name: 'GIT_REPO', defaultValue: 'https://github.com/KarinyCCTB/FinalExam1Devops2KelownaTrails.git', description: 'Git repository URL')
    }

    environment {
        AWS_CREDENTIALS = 'aws-credentials'  // Replace with your AWS credentials ID stored in Jenkins
        SSH_KEY_PATH = '/var/lib/jenkins/instance_key'  // Temporary path to store the SSH private key
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git url: "${params.GIT_REPO}", branch: 'main'
                }
            }
        }
        
        stage('Copy SSH Key') {
            steps {
                script {
                    sh """
                    sudo cp /home/ec2-user/instance_key /var/lib/jenkins/instance_key
                    """
                }
            }
        }
        
        stage('Deploy to Testing') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {

                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.TESTING_IP} '
                            sudo chown -R ec2-user:ec2-user /var/www/html &&
                            sudo chmod -R 755 /var/www/html;
                            sudo yum -y install git;
                            echo "Cloning repository into /var/www/html...";
                            cd /var/www/html
                            git clone ${params.GIT_REPO}
                        '
                        """
                    }
                }
            }
        }

        stage('Setup Testing Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
          
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.TESTING_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests &&
                        npm install selenium-webdriver chai &&
                        npm install chromedriver &&
                        npm install --save-dev mocha &&
                        npm install'
                        """
                    }
                }
            }
        }

        stage('Validating Testing Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
        
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.TESTING_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests && npx mocha --timeout 120000 test_testing.js
                        '
                        """
                    }
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {

                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.STAGING_IP} '
                            sudo chown -R ec2-user:ec2-user /var/www/html &&
                            sudo chmod -R 755 /var/www/html;
                            sudo yum -y install git;
                            echo "Cloning repository into /var/www/html...";
                            cd /var/www/html
                            git clone ${params.GIT_REPO}
                        '
                        """
                    }
                }
            }
        }

        stage('Setup Staging Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
         
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.STAGING_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests &&
                        npm install selenium-webdriver chai &&
                        npm install chromedriver &&
                        npm install --save-dev mocha &&
                        npm install'
                        """
                    }
                }
            }
        }

        stage('Validating Staging Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
               
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.STAGING_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests && npx mocha --timeout 120000 test_staging.js
                        '
                        """
                    }
                }
            }
        }
        stage('Deploy to Production1') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {

                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD1_IP} '
                            sudo chown -R ec2-user:ec2-user /var/www/html &&
                            sudo chmod -R 755 /var/www/html;
                            sudo yum -y install git;
                            echo "Cloning repository into /var/www/html...";
                            cd /var/www/html
                            git clone ${params.GIT_REPO}
                        '
                        """
                    }
                }
            }
        }

        stage('Setup Production1 Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
                    
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD1_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests &&
                        npm install selenium-webdriver chai &&
                        npm install chromedriver &&
                        npm install --save-dev mocha &&
                        npm install'
                        """
                    }
                }
            }
        }

        stage('Validating Production1 Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
                        
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD1_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests && npx mocha --timeout 120000 test_prod1.js
                        '
                        """
                    }
                }
            }
        }
        stage('Deploy to Production2') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {

                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD2_IP} '
                            sudo chown -R ec2-user:ec2-user /var/www/html &&
                            sudo chmod -R 755 /var/www/html;
                            sudo yum -y install git;
                            echo "Cloning repository into /var/www/html...";
                            cd /var/www/html
                            git clone ${params.GIT_REPO}
                            sudo rm -rf FinalExam1Devops2KelownaTrails/index.html
                            sudo mv FinalExam1Devops2KelownaTrails/index2.html FinalExam1Devops2KelownaTrails/index.html
                        '
                        """
                    }
                }
            }
        }

        stage('Setup Production2 Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
                        
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD2_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests &&
                        npm install selenium-webdriver chai &&
                        npm install chromedriver &&
                        npm install --save-dev mocha &&
                        npm install'
                        """
                    }
                }
            }
        }

        stage('Validating Production2 Environment') {
            steps {
                script {
                    withAWS(credentials: AWS_CREDENTIALS) {
                        
                        sh """
                        ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ec2-user@${params.PROD2_IP} 'cd /var/www/html/FinalExam1Devops2KelownaTrails/tests && npx mocha --timeout 120000 test_prod2.js
                        '
                        """
                    }
                }
            }
        }
    }
}
