pipeline{
    agent any

    enviornment {
        DOCKERHUB_USER = credentials('dockerhub-creds').username
        DOCKERHUB_PASS = credentials('dockerhub-creds').password
        EC2_HOST = credentials('EC2_HOST')
        EC2_USER = credentials('EC2_USERNAME')
        SSH_KEY = credentials('ec2-ssh-key')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('CI: Build and Test'){
            parallel {
                stage('CI: Test Backend'){
                    steps{
                        dir('server'){
                            sh '''
                                npm install
                                npm run test
                            '''
                        }
                    }
                }

                stage('CI: Build Frontend'){
                    steps{
                        dir('client'){
                            sh '''
                                npm install
                                npm run build
                            '''
                        }
                    }
                }
            }
        }

        stage('CD: Docker Login') {
            steps {
                sh '''
                echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin
                '''
            }
        }   

        stage('CD: Build Docker Image'){
            parallel{
                stage('CD: Backend Image'){
                    steps {
                        sh '''
                        docker build -t $DOCKERHUB_USER/todoapp-backend:jenkins ./server
                        sh docker push $DOCKERHUB_USER/todoapp-backend:jenkins
                        '''
                    }
                }
                stage('CD: Frontend Image'){
                    steps {
                        sh '''
                        docker build -t $DOCKERHUB_USER/todoapp-frontend:jenkins ./client
                        docker push $DOCKERHUB_USER/todoapp-frontend:jenkins
                        '''
                    }
                }
            }
        }
        
        stage('Deploy to EC2'){
            steps {
                writeFile file: 'deploy.pem', text: SSH_KEY
                sh 'chmod 400 deploy.pem'

                sh '''
                    scp -o StrictHostKeyChecking=no -i deploy.pem docker-compose.yml $EC2_USER@$EC2_HOST:~/todoapp/
                '''

                sh '''
                    ssh -o StrictHostKeyChecking=no -i ec2.pem $EC2_USER@$EC2_HOST << 'EOF'
                        cd ~/todoapp/
                        docker compose pull
                        docker compose down
                        docker compose up -d
                    EOF
                '''

            }
        }
    }
}