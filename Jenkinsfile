pipeline {
    agent any
    tools {

        nodejs 'NodeJS-18' 
    }
    stages {
        stage('SCM Checkout') {
            steps {
                // Clones the code from the repository using the job configuration
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                // Install all packages defined in package.json
                sh 'npm install'
            }
        }
        
        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
                // Assuming the project has a test script defined in package.json
                sh 'npm test'
            }
        }
        
        stage('Static Analysis (SonarQube)') {
            steps {
                // Wrapper to use the SonarQube server details (URL/Token)
                withSonarQubeEnv('SonarQube-Quality-Gate') {
                    // Execute the SonarQube analysis
                    sh "sonar-scanner \
                        -Dsonar.projectKey=devsecops-node \
                        -Dsonar.sources=."
                }
            }
        }
        
        stage('Quality Gate Check') {
            steps {
                echo 'Waiting for Quality Gate status from SonarQube...'
                waitForQualityGate abortPipeline: true
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building the application container image...'
                sh 'docker build -t node-vulnerable-app:${BUILD_NUMBER} .'
            }
        }
        
        stage('Push Image') {
            steps {
                echo 'Pushing image to Docker Hub...'
                
            }
        }
    }
}
