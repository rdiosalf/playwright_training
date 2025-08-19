pipeline{
     agent any
     environment {
        GIT_REPO = 'https://github.com/rdiosalf/playwright_training.git' // URL de Github con proyecto playwright
        GIT_BRANCH = 'main'                     // Rama a clonar
     }
     stages {
        stage('Checkout from GitLab') {
            steps {
                script {
                    // Clonar el repositorio desde GitLab
                    git branch: "${GIT_BRANCH}", 
                     credentialsId: "${CREDENTIALS}", 
                        url: "${GIT_REPO}"
                     bat "dir"
                }
            }
        }
        
        
        
        stage('ejecuta playwright') {
            steps {
                bat "npm ci"
                bat "npx playwright test saucedemoPO.spec.ts"
            }
        }

        
       
    }
    post {
        always {
            // Acciones que se ejecutan siempre al final del pipeline
            echo 'Pipeline finalizado.'
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
        success {
            // Acciones que se ejecutan si el pipeline es exitoso
            echo 'Pipeline completado con éxito.'
        }
        failure {
            // Acciones que se ejecutan si el pipeline falla
            echo 'Pipeline fallido.'
        }
    }

}