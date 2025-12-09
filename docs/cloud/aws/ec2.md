---
sidebar_position: 2
---

# EC2 - Elastic Compute Cloud

## What is EC2?

**Amazon EC2** provides resizable compute capacity in the cloud. You can launch virtual servers (instances) in minutes and pay only for the capacity you use.

## Instance Types

**General Purpose (T3, M5)**
- Balanced compute, memory, networking
- Web servers, development environments
- Examples: t3.micro, t3.small, m5.large

**Compute Optimized (C5)**
- High-performance processors
- Batch processing, gaming, scientific modeling
- Examples: c5.large, c5.xlarge

**Memory Optimized (R5, X1)**
- Fast performance for memory-intensive workloads
- Databases, caching, big data analytics
- Examples: r5.large, x1.16xlarge

**Storage Optimized (I3, D2)**
- High sequential read/write to local storage
- NoSQL databases, data warehousing
- Examples: i3.large, d2.xlarge

**GPU Instances (P3, G4)**
- Machine learning, graphics rendering
- Examples: p3.2xlarge, g4dn.xlarge

## Launching an EC2 Instance

**Using AWS Console:**
1. Navigate to EC2 service
2. Click "Launch Instance"
3. Choose AMI (Amazon Machine Image)
4. Select instance type
5. Configure instance details (VPC, subnet, IAM role)
6. Add storage (EBS volumes)
7. Add tags
8. Configure security group
9. Review and launch
10. Select or create key pair

**Using AWS CLI:**
```bash
# Launch instance
aws ec2 run-instances \
  --image-id ami-0c55b159cbfafe1f0 \
  --instance-type t3.micro \
  --key-name my-key \
  --security-group-ids sg-0123456789abcdef \
  --subnet-id subnet-0123456789abcdef \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyWebServer}]'

# List instances
aws ec2 describe-instances

# Stop instance
aws ec2 stop-instances --instance-ids i-0123456789abcdef

# Start instance
aws ec2 start-instances --instance-ids i-0123456789abcdef

# Terminate instance
aws ec2 terminate-instances --instance-ids i-0123456789abcdef
```

## User Data Scripts

Execute scripts when instance launches:

```yaml
Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0c55b159cbfafe1f0
      InstanceType: t3.micro
      UserData:
        Fn::Base64: !Sub |
          #!/bin/bash
          yum update -y
          yum install -y httpd
          systemctl start httpd
          systemctl enable httpd
          echo "<h1>Hello from $(hostname -f)</h1>" > /var/www/html/index.html
```

## Security Groups

**Firewall rules for EC2 instances:**

```yaml
Resources:
  WebServerSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow HTTP and HTTPS
      VpcId: !Ref MyVPC
      SecurityGroupIngress:
        # Allow HTTP from anywhere
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0
        # Allow HTTPS from anywhere
        - IpProtocol: tcp
          FromPort: 443
          ToPort: 443
          CidrIp: 0.0.0.0/0
        # Allow SSH from specific IP
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 203.0.113.0/24
      SecurityGroupEgress:
        # Allow all outbound traffic
        - IpProtocol: -1
          CidrIp: 0.0.0.0/0
```

## Elastic IP Addresses

Static IPv4 addresses for instances:

```yaml
Resources:
  MyEIP:
    Type: AWS::EC2::EIP
    Properties:
      Domain: vpc
      InstanceId: !Ref MyInstance
```

## EC2 Best Practices

**1. Use IAM Roles Instead of Access Keys**
```yaml
Resources:
  MyInstanceRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: ec2.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess

  MyInstanceProfile:
    Type: AWS::IAM::InstanceProfile
    Properties:
      Roles:
        - !Ref MyInstanceRole

  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      IamInstanceProfile: !Ref MyInstanceProfile
      # ... other properties
```

**2. Enable Detailed Monitoring**
- Track CPU, disk, network metrics
- Faster response to scaling events

**3. Use Auto Scaling**
- Automatically adjust capacity
- Maintain application availability
- Optimize costs

**4. Regular Backups (AMIs and Snapshots)**
```bash
# Create AMI
aws ec2 create-image \
  --instance-id i-0123456789abcdef \
  --name "MyServer-Backup-$(date +%Y%m%d)"

# Create EBS snapshot
aws ec2 create-snapshot \
  --volume-id vol-0123456789abcdef \
  --description "Backup $(date +%Y%m%d)"
```

---

**Launch and manage virtual servers with EC2 for flexible, scalable cloud computing!**
