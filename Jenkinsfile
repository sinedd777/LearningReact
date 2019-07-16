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
    }
    post {
            success {
                echo 'Build is complete'
                build job: 'PROD', wait: false
            }
        }
}