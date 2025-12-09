---
sidebar_position: 1
---

# AWS Guide

Learn Amazon Web Services (AWS) fundamentals, from Infrastructure as Code with CloudFormation to deploying applications on EC2, managing containers with ECR, and orchestrating with EKS.

## What is AWS?

**Amazon Web Services (AWS)** is the world's most comprehensive and broadly adopted cloud platform, offering over 200 fully featured services from data centers globally.

### Key Benefits

- **Global Infrastructure** - 30+ regions, 90+ availability zones
- **Comprehensive Services** - Compute, storage, databases, ML, analytics, and more
- **Pay-as-you-Go** - No upfront costs, pay only for what you use
- **Scalability** - Scale from one instance to thousands instantly
- **Security** - Enterprise-grade security and compliance
- **Maturity** - 15+ years of cloud experience

---

## AWS Account Setup

### Creating an AWS Account

1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Provide email, password, and account name
4. Enter payment information (required even for free tier)
5. Verify identity via phone
6. Choose support plan (Basic is free)

### Free Tier

**12 Months Free:**
- 750 hours/month EC2 t2.micro or t3.micro
- 5 GB S3 storage
- 750 hours/month RDS (db.t2.micro)
- 1 million Lambda requests/month

**Always Free:**
- 25 GB DynamoDB storage
- 1 million AWS Lambda requests
- 10 custom CloudWatch metrics

### Security Best Practices

**1. Secure Root Account**
```bash
# Enable MFA on root account
# Never use root for day-to-day activities
# Store root credentials securely
```

**2. Create IAM Users**
```bash
# Create admin IAM user for daily use
# Enable MFA for admin user
# Use IAM roles instead of access keys when possible
```

**3. Use AWS Organizations** (for multiple accounts)
- Centralized billing
- Service control policies (SCPs)
- Account isolation

---

## AWS Core Services Overview

### Compute
- **EC2** - Virtual servers
- **Lambda** - Serverless functions
- **ECS** - Container orchestration
- **EKS** - Managed Kubernetes
- **Fargate** - Serverless containers

### Storage
- **S3** - Object storage
- **EBS** - Block storage for EC2
- **EFS** - Managed file storage
- **Glacier** - Archive storage

### Database
- **RDS** - Managed relational databases
- **DynamoDB** - NoSQL database
- **Aurora** - High-performance MySQL/PostgreSQL
- **ElastiCache** - In-memory caching

### Networking
- **VPC** - Virtual private cloud
- **Route 53** - DNS service
- **CloudFront** - CDN
- **ELB** - Load balancing

---

## Topics Covered

### [CloudFormation](./cloudformation)
Infrastructure as Code using YAML/JSON templates to provision AWS resources.

**You'll learn:**
- Template structure and syntax
- Creating and managing stacks
- VPC and networking setup
- Best practices and intrinsic functions

### [EC2](./ec2)
Elastic Compute Cloud - virtual servers in the cloud.

**You'll learn:**
- Instance types and selection
- Launching and managing instances
- Security groups and IAM roles
- User data scripts and automation

### [ECR](./ecr)
Elastic Container Registry - managed Docker container registry.

**You'll learn:**
- Creating and managing repositories
- Pushing and pulling container images
- Lifecycle policies for image cleanup
- Image scanning for vulnerabilities

### [EKS](./eks)
Elastic Kubernetes Service - managed Kubernetes clusters.

**You'll learn:**
- Creating and configuring EKS clusters
- Deploying applications to Kubernetes
- Load balancer integration
- Monitoring and best practices

### [Cost Optimization](./cost-optimization)
Strategies for reducing AWS costs.

**You'll learn:**
- Reserved and spot instances
- Right-sizing resources
- EKS cost optimization
- Resource limit strategies

---

## Resources

### Official Documentation
- [AWS Documentation](https://docs.aws.amazon.com/)
- [CloudFormation User Guide](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/)
- [EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [ECR User Guide](https://docs.aws.amazon.com/ecr/)
- [EKS User Guide](https://docs.aws.amazon.com/eks/)

### Training
- [AWS Training and Certification](https://aws.amazon.com/training/)
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Workshops](https://workshops.aws/)

### Community
- [AWS re:Post](https://repost.aws/)
- [AWS GitHub](https://github.com/aws)
- [r/aws on Reddit](https://reddit.com/r/aws)

---

## Next Steps

1. **Create AWS Account** - Start with free tier
2. **Practice [CloudFormation](./cloudformation)** - Define infrastructure as code
3. **Launch [EC2 Instances](./ec2)** - Get hands-on with compute
4. **Push to [ECR](./ecr)** - Store container images
5. **Deploy [EKS Cluster](./eks)** - Run Kubernetes workloads
6. **Automate with CI/CD** - See [CI/CD Guide](../../devops/cicd)

---

**Master AWS to build scalable, secure, and cost-effective cloud applications!**
