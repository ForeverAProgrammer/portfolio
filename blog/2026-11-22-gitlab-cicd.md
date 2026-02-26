---
slug: gitlab-cicd-pipelines
title: Building CI/CD Pipelines with GitLab
authors: [kristina-haynes]
tags: [cicd, gitlab, devops, automation]
---

# Building CI/CD Pipelines with GitLab

A comprehensive guide to designing and implementing automated deployment pipelines using GitLab CI/CD, featuring a real-world example with caching, artifacts, and GitLab Pages deployment.

<!--truncate-->

## Introduction

GitLab CI/CD is a powerful tool for automating your software development lifecycle. In this guide, I'll walk through a production-ready CI/CD pipeline I built that demonstrates key concepts like Docker build images, caching strategies, artifact management, and automated deployments.

**Example Project**: [gitlab-cicd-pipeline-example](https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example)

**Live Demo**: <https://gitlab-cicd-pipeline-example-c2a1fe.gitlab.io/>

## Pipeline Architecture

The pipeline follows a classic three-stage design:

```
Build → Test → Deploy
```

Each stage has a specific purpose and builds upon the previous stage's outputs. Let's explore how each stage works.

## Stage 1: Build

The build stage is responsible for installing dependencies and compiling the application:

```yaml
build-job:
  stage: build
  image: node:18
  script:
    - echo "=== Build Stage ==="
    - echo "Installing dependencies (Jest and other packages)..."
    - time npm install
    - du -sh node_modules/ || echo "node_modules created"
    - echo "Building the project..."
    - npm run build
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: push
  artifacts:
    paths:
      - public/
    expire_in: 1 hour
  only:
    - main
    - merge_requests
```

**Key Design Decisions**:
- **Docker Image**: Uses `node:18` for consistency across all environments
- **Cache Policy**: `push` to save `node_modules/` for downstream jobs
- **Artifacts**: Stores the built `public/` directory for 1 hour
- **Branch Rules**: Runs on `main` branch and `merge requests`

The build stage creates the foundation for subsequent stages by caching dependencies and producing build artifacts.

## Stage 2: Test

The test stage validates code quality and generates coverage reports:

```yaml
test-job:
  stage: test
  image: node:18
  script:
    - echo "=== Test Stage ==="
    - echo "Checking if node_modules cache was restored..."
    - |
      if [ -d "node_modules" ]; then
        echo "✅ SUCCESS: node_modules cache was restored!"
        du -sh node_modules/
        ls -lh node_modules/.bin/jest
      else
        echo "❌ WARNING: node_modules cache not found"
      fi
    - npm test
  cache:
    key: ${CI_COMMIT_REF_SLUG}
    paths:
      - node_modules/
    policy: pull
  coverage: '/Lines\s*:\s*(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
    paths:
      - coverage/
    expire_in: 1 week
  only:
    - main
    - merge_requests
```

**Key Design Decisions**:
- **Cache Policy**: `pull` only - reuses cached dependencies without updating them
- **Coverage Extraction**: Uses regex pattern to extract coverage percentage
- **Coverage Artifacts**: Stores coverage reports in Cobertura format for GitLab integration
- **Verification Logic**: Checks if cache was successfully restored before running tests

This demonstrates a critical optimization: the test job avoids re-downloading ~50MB of Jest dependencies by pulling from cache.

## Stage 3: Deploy

The deploy stage publishes the site to GitLab Pages:

```yaml
pages:
  stage: deploy
  image: node:18
  script:
    - echo "=== Deploy Stage ==="
    - echo "Deploying to GitLab Pages..."
    - ls -la public/
  artifacts:
    paths:
      - public
  only:
    - main
```

**Key Design Decisions**:
- **Job Name**: Must be named `pages` for GitLab Pages deployment
- **Artifacts**: Reuses `public/` directory from build stage
- **Branch Protection**: Only deploys from `main` branch
- **Minimal Logic**: Simple deployment since build artifacts are already prepared

## Pipeline Design Patterns

### Global Cache Configuration

The pipeline uses a global cache to share `node_modules/` across jobs:

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
```

**Why This Matters**: Without caching, each job would download dependencies independently, wasting bandwidth and time. The cache key uses `${CI_COMMIT_REF_SLUG}` to create separate caches per branch.

### Cache Policy Strategy

Different stages use different cache policies:
- **Build**: `policy: push` - creates/updates the cache
- **Test**: `policy: pull` - only reads from cache (faster)
- **Deploy**: No cache needed (uses artifacts instead)

This optimization ensures the test stage runs faster by skipping cache updates.

### Artifact Management

Build outputs are passed between stages using artifacts:

```yaml
artifacts:
  paths:
    - public/
  expire_in: 1 hour
```

The `expire_in` directive prevents artifact storage from growing indefinitely, saving CI minutes and storage costs.

## CI/CD Best Practices Demonstrated

1. **Docker Image Pinning**: Use specific versions (`node:18`) instead of `latest` for reproducibility
2. **Branch Rules**: Deploy only from protected branches to prevent accidental deployments
3. **Fail Fast**: Test stage runs quickly using cached dependencies
4. **Artifact Expiration**: Set appropriate expiration times to manage storage
5. **Cache Verification**: Test stage validates cache restoration before proceeding
6. **Coverage Reporting**: Integrate code coverage into GitLab's UI using Cobertura format

## Pipeline Variables

GitLab provides built-in variables that make pipelines dynamic:

- `${CI_COMMIT_REF_SLUG}`: Sanitized branch name, perfect for cache keys
- Jobs execute in isolated Docker containers with clean environments

## Monitoring Pipeline Performance

When reviewing your pipeline, check:

- **Cache Hit Rate**: Verify the test stage successfully pulls cached dependencies
- **Stage Duration**: Identify bottlenecks in build, test, or deploy stages
- **Artifact Size**: Monitor storage consumption
- **Coverage Trends**: Track code coverage over time

## Extending the Pipeline

### Adding Security Scanning

```yaml
stages:
  - build
  - test
  - security
  - deploy

security-scan:
  stage: security
  image: node:18
  script:
    - npm audit
  allow_failure: true
  only:
    - main
    - merge_requests
```

### Multi-Environment Deployments

GitLab [environments](https://docs.gitlab.com/ee/ci/environments/) allow you to track deployments across different stages (development, staging, production) with built-in monitoring and rollback capabilities.

```yaml
deploy-staging:
  stage: deploy
  script:
    - echo "Deploy to staging"
  environment:
    name: staging
    url: https://staging.example.com
  only:
    - develop

deploy-production:
  stage: deploy
  script:
    - echo "Deploy to production"
  environment:
    name: production
    url: https://production.example.com
  only:
    - main
```

## Conclusion

This pipeline demonstrates how to build a robust CI/CD workflow with GitLab. The key takeaways:

- **Caching** dramatically speeds up pipeline execution
- **Artifacts** enable passing build outputs between stages
- **Branch rules** provide deployment safety
- **Docker containers** ensure consistent environments
- **Coverage reporting** integrates testing into your workflow

Check out the [full implementation](https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example) to see these concepts in action.

## Resources

- [GitLab CI/CD Documentation](https://docs.gitlab.com/ee/ci/)
- [.gitlab-ci.yml Reference](https://docs.gitlab.com/ee/ci/yaml/)
- [Example Project Repository](https://gitlab.com/kristina-portfolio/gitlab-cicd-pipeline-example)
