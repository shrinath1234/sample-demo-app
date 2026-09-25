pipeline {
  agent any

  environment {
    CI = 'true'
    PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Install dependencies') {
      steps {
        sh '''
          echo "PATH=$PATH"
          which node || true
          which npm || true
          node -v || true
          npm -v || true

          if [ -f package-lock.json ]; then
            npm ci
          else
            npm install
          fi

          npx playwright install --with-deps
        '''
      }
    }

    stage('Run Playwright tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      script {
        def reportDir = sh(
          script: "ls -dt test-run/playwright-report/* 2>/dev/null | head -1",
          returnStdout: true
        ).trim()

        if (reportDir) {
          publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: reportDir,
            reportFiles: 'index.html',
            reportName: 'Playwright Report'
          ])
        }
      }

      archiveArtifacts artifacts: 'test-run/**', fingerprint: true
    }

    success {
      echo 'Playwright tests passed successfully.'
    }

    failure {
      echo 'Playwright tests failed. Please inspect the report and console logs.'
    }
  }
}
