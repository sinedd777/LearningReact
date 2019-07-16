pipeline {
    agent none
    stages {
        stage('Build') {
            agent {
                label 'Slave1'
            }
            steps {
                sh 'ls'
                sh 'sh build.sh'
            }
        }
        stage('Deploy') {
                    agent {
                        label 'Slave2'
                    }
                    steps {
                        sh 'npm install serve'
                        sh 'ls'
                        sh 'sh start.sh'
                    }
                }
    }
    post {
            success {
                echo 'Build is complete'
            }
        }
}