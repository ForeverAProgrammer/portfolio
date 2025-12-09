---
sidebar_position: 3
---

# ECR - Elastic Container Registry

## What is ECR?

**Amazon ECR** is a fully managed Docker container registry that makes it easy to store, manage, and deploy Docker container images.

## Key Features

- **Secure** - Images encrypted at rest, IAM integration
- **Scalable** - Highly available, no capacity limits
- **Integrated** - Works seamlessly with ECS, EKS, Lambda
- **Cost-Effective** - Pay only for storage and data transfer

## Creating an ECR Repository

**Using AWS Console:**
1. Navigate to ECR service
2. Click "Create repository"
3. Enter repository name
4. Configure settings (encryption, scan on push)
5. Create repository

**Using AWS CLI:**
```bash
# Create repository
aws ecr create-repository \
  --repository-name my-app \
  --image-scanning-configuration scanOnPush=true \
  --encryption-configuration encryptionType=AES256

# List repositories
aws ecr describe-repositories

# Delete repository
aws ecr delete-repository \
  --repository-name my-app \
  --force
```

**Using CloudFormation:**
```yaml
Resources:
  MyECRRepository:
    Type: AWS::ECR::Repository
    Properties:
      RepositoryName: my-app
      ImageScanningConfiguration:
        ScanOnPush: true
      EncryptionConfiguration:
        EncryptionType: AES256
      LifecyclePolicy:
        LifecyclePolicyText: |
          {
            "rules": [{
              "rulePriority": 1,
              "description": "Keep last 10 images",
              "selection": {
                "tagStatus": "any",
                "countType": "imageCountMoreThan",
                "countNumber": 10
              },
              "action": { "type": "expire" }
            }]
          }

Outputs:
  RepositoryUri:
    Description: ECR Repository URI
    Value: !GetAtt MyECRRepository.RepositoryUri
```

## Pushing Images to ECR

```bash
# 1. Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789012.dkr.ecr.us-east-1.amazonaws.com

# 2. Build your Docker image
docker build -t my-app .

# 3. Tag the image
docker tag my-app:latest \
  123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# 4. Push to ECR
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# 5. Pull from ECR
docker pull 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
```

## ECR Lifecycle Policies

Automatically clean up old images:

```json
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Expire untagged images older than 14 days",
      "selection": {
        "tagStatus": "untagged",
        "countType": "sinceImagePushed",
        "countUnit": "days",
        "countNumber": 14
      },
      "action": {
        "type": "expire"
      }
    },
    {
      "rulePriority": 2,
      "description": "Keep last 5 production images",
      "selection": {
        "tagStatus": "tagged",
        "tagPrefixList": ["prod"],
        "countType": "imageCountMoreThan",
        "countNumber": 5
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
```

## ECR Image Scanning

Scan images for vulnerabilities:

```bash
# Start image scan
aws ecr start-image-scan \
  --repository-name my-app \
  --image-id imageTag=latest

# Get scan results
aws ecr describe-image-scan-findings \
  --repository-name my-app \
  --image-id imageTag=latest
```

---

**Securely store and manage container images with ECR for seamless deployment!**
