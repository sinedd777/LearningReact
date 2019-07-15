pipeline {
    agent {
            label 'Slave1'
        }
    stages {
        stage('Build') {
            steps {
                sh 'ls'
                sh 'sh build.sh'
            }
        }
    }
}