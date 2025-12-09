---
sidebar_position: 4
---

# CI/CD Setup

Step-by-step tutorials for setting up continuous integration and deployment pipelines.

## What is CI/CD?

**Continuous Integration (CI)** is the practice of automatically building and testing code changes.

**Continuous Deployment (CD)** automates the release of validated code to production.

## Benefits of CI/CD

- Faster delivery of features
- Early bug detection
- Improved code quality
- Automated testing and deployment
- Consistent build processes

## Popular CI/CD Tools

- **GitLab CI/CD** - Integrated with GitLab
- **GitHub Actions** - Native to GitHub
- **Jenkins** - Open-source automation server
- **CircleCI** - Cloud-based CI/CD
- **Travis CI** - Continuous integration service

## GitLab CI/CD

### Basic Pipeline

Create `.gitlab-ci.yml` in your repository root:

```yaml
stages:
  - build
  - test
  - deploy

variables:
  NODE_VERSION: "18"

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm install
    - npm run test
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'

deploy:
  stage: deploy
  image: alpine:latest
  script:
    - apk add --no-cache openssh-client
    - ssh user@server 'cd /app && ./deploy.sh'
  only:
    - main
  environment:
    name: production
    url: https://myapp.com
```

### Docker Build Pipeline

```yaml
docker-build:
  stage: build
  image: docker:latest
  services:
    - docker:dind
  before_script:
    - docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
  script:
    - docker build -t $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA .
    - docker build -t $CI_REGISTRY_IMAGE:latest .
    - docker push $CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - docker push $CI_REGISTRY_IMAGE:latest
```

### Kubernetes Deployment

```yaml
deploy-k8s:
  stage: deploy
  image: bitnami/kubectl:latest
  script:
    - kubectl config use-context production
    - kubectl set image deployment/app app=$CI_REGISTRY_IMAGE:$CI_COMMIT_SHA
    - kubectl rollout status deployment/app
  only:
    - main
```

## GitHub Actions

### Basic Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Run tests
      run: npm test

    - name: Build
      run: npm run build

    - name: Upload artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build
        path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
    - name: Download artifacts
      uses: actions/download-artifact@v3
      with:
        name: build

    - name: Deploy to production
      run: |
        echo "Deploying to production..."
        # Add your deployment commands here
```

### Docker Build and Push

```yaml
  docker:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v2

    - name: Login to DockerHub
      uses: docker/login-action@v2
      with:
        username: ${{ secrets.DOCKERHUB_USERNAME }}
        password: ${{ secrets.DOCKERHUB_TOKEN }}

    - name: Build and push
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: |
          username/app:latest
          username/app:${{ github.sha }}
```

## Jenkins

### Jenkinsfile

```groovy
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG = "${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
            post {
                always {
                    junit 'test-results/**/*.xml'
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_IMAGE}:latest"
                sh './deploy.sh'
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
```

## Best Practices

### 1. Use Caching

Speed up builds by caching dependencies:

**GitLab CI:**
```yaml
cache:
  paths:
    - node_modules/
  key: ${CI_COMMIT_REF_SLUG}
```

**GitHub Actions:**
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### 2. Environment Variables and Secrets

Never commit secrets to your repository. Use your CI/CD platform's secret management:

```yaml
# GitLab CI
deploy:
  script:
    - echo $DATABASE_URL
    - echo $API_KEY
```

### 3. Parallel Jobs

Run independent jobs in parallel:

```yaml
test:
  parallel:
    matrix:
      - NODE_VERSION: ["16", "18", "20"]
```

### 4. Conditional Execution

Only run jobs when needed:

```yaml
# Only on main branch
only:
  - main

# Only on tags
only:
  - tags

# Except for certain branches
except:
  - develop
```

### 5. Artifacts and Reports

Preserve build outputs and test reports:

```yaml
artifacts:
  paths:
    - dist/
  reports:
    junit: test-results.xml
    coverage_report:
      coverage_format: cobertura
      path: coverage/cobertura-coverage.xml
```

## Security Scanning

### Code Quality Scanning

```yaml
code-quality:
  stage: test
  script:
    - npm run lint
    - npm run security-audit
  allow_failure: true
```

### Container Scanning

```yaml
container-scan:
  stage: test
  image: aquasec/trivy:latest
  script:
    - trivy image --exit-code 1 --severity CRITICAL myapp:latest
```

## Multi-Environment Deployment

### Development

```yaml
deploy-dev:
  stage: deploy
  script:
    - ./deploy.sh dev
  environment:
    name: development
    url: https://dev.myapp.com
  only:
    - develop
```

### Staging

```yaml
deploy-staging:
  stage: deploy
  script:
    - ./deploy.sh staging
  environment:
    name: staging
    url: https://staging.myapp.com
  only:
    - main
```

### Production

```yaml
deploy-prod:
  stage: deploy
  script:
    - ./deploy.sh production
  environment:
    name: production
    url: https://myapp.com
  when: manual
  only:
    - main
```

## Monitoring Pipeline Performance

Track pipeline metrics:

- Build duration
- Success/failure rates
- Time to deployment
- Test coverage trends

## Next Steps

- Explore [Docker Guide](./docker.md) for containerization
- Learn about [Kubernetes Handbook](./kubernetes.md) for orchestration
- Review [DevOps Best Practices](./)
