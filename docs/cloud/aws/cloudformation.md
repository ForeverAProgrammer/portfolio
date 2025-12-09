---
sidebar_position: 1
---

# CloudFormation - Infrastructure as Code

## What is CloudFormation?

**CloudFormation** allows you to define AWS infrastructure as code using JSON or YAML templates. This enables version control, repeatability, and automation of infrastructure provisioning.

## Key Concepts

**Template** - JSON or YAML file defining resources
**Stack** - Collection of AWS resources created from a template
**Change Set** - Preview of changes before updating a stack

## CloudFormation Template Structure

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'CloudFormation template description'

Parameters:
  # Input parameters

Resources:
  # AWS resources to create

Outputs:
  # Values to export
```

## Basic Example: EC2 Instance

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'Simple EC2 instance'

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues:
      - t3.micro
      - t3.small
      - t3.medium
    Description: EC2 instance type

  KeyName:
    Type: AWS::EC2::KeyPair::KeyName
    Description: SSH key pair name

Resources:
  MyEC2Instance:
    Type: AWS::EC2::Instance
    Properties:
      InstanceType: !Ref InstanceType
      ImageId: ami-0c55b159cbfafe1f0  # Amazon Linux 2 (us-east-1)
      KeyName: !Ref KeyName
      SecurityGroupIds:
        - !Ref MySecurityGroup
      Tags:
        - Key: Name
          Value: MyWebServer

  MySecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Allow SSH and HTTP
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 22
          ToPort: 22
          CidrIp: 0.0.0.0/0
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0

Outputs:
  InstanceId:
    Description: Instance ID
    Value: !Ref MyEC2Instance
  PublicIP:
    Description: Public IP address
    Value: !GetAtt MyEC2Instance.PublicIp
```

## VPC with Public and Private Subnets

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'VPC with public and private subnets'

Resources:
  MyVPC:
    Type: AWS::EC2::VPC
    Properties:
      CidrBlock: 10.0.0.0/16
      EnableDnsHostnames: true
      EnableDnsSupport: true
      Tags:
        - Key: Name
          Value: MyVPC

  PublicSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: 10.0.1.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      MapPublicIpOnLaunch: true
      Tags:
        - Key: Name
          Value: Public Subnet

  PrivateSubnet:
    Type: AWS::EC2::Subnet
    Properties:
      VpcId: !Ref MyVPC
      CidrBlock: 10.0.2.0/24
      AvailabilityZone: !Select [0, !GetAZs '']
      Tags:
        - Key: Name
          Value: Private Subnet

  InternetGateway:
    Type: AWS::EC2::InternetGateway
    Properties:
      Tags:
        - Key: Name
          Value: MyIGW

  AttachGateway:
    Type: AWS::EC2::VPCGatewayAttachment
    Properties:
      VpcId: !Ref MyVPC
      InternetGatewayId: !Ref InternetGateway

  PublicRouteTable:
    Type: AWS::EC2::RouteTable
    Properties:
      VpcId: !Ref MyVPC
      Tags:
        - Key: Name
          Value: Public Route Table

  PublicRoute:
    Type: AWS::EC2::Route
    DependsOn: AttachGateway
    Properties:
      RouteTableId: !Ref PublicRouteTable
      DestinationCidrBlock: 0.0.0.0/0
      GatewayId: !Ref InternetGateway

  SubnetRouteTableAssociation:
    Type: AWS::EC2::SubnetRouteTableAssociation
    Properties:
      SubnetId: !Ref PublicSubnet
      RouteTableId: !Ref PublicRouteTable

Outputs:
  VPCId:
    Description: VPC ID
    Value: !Ref MyVPC
    Export:
      Name: !Sub '${AWS::StackName}-VPC'

  PublicSubnetId:
    Description: Public Subnet ID
    Value: !Ref PublicSubnet
    Export:
      Name: !Sub '${AWS::StackName}-PublicSubnet'
```

## Deploying CloudFormation Stacks

**Using AWS CLI:**
```bash
# Create stack
aws cloudformation create-stack \
  --stack-name my-stack \
  --template-body file://template.yaml \
  --parameters ParameterKey=KeyName,ParameterValue=my-key

# Update stack
aws cloudformation update-stack \
  --stack-name my-stack \
  --template-body file://template.yaml

# Delete stack
aws cloudformation delete-stack \
  --stack-name my-stack

# Describe stack
aws cloudformation describe-stacks \
  --stack-name my-stack

# List all stacks
aws cloudformation list-stacks
```

**Using AWS Console:**
1. Navigate to CloudFormation service
2. Click "Create stack"
3. Upload template file or paste template
4. Enter stack name and parameters
5. Review and create

## CloudFormation Best Practices

**1. Use Parameters for Flexibility**
```yaml
Parameters:
  Environment:
    Type: String
    Default: dev
    AllowedValues: [dev, staging, prod]
```

**2. Use Intrinsic Functions**
```yaml
# !Ref - Reference parameters or resources
InstanceType: !Ref InstanceTypeParameter

# !GetAtt - Get attribute of resource
PublicIp: !GetAtt MyEC2Instance.PublicIp

# !Sub - String substitution
Name: !Sub '${AWS::StackName}-instance'

# !Join - Join strings
SecurityGroupIds: !Join [',', !Ref SecurityGroups]
```

**3. Export Values for Cross-Stack References**
```yaml
Outputs:
  VPCId:
    Value: !Ref MyVPC
    Export:
      Name: SharedVPC

# In another stack:
Resources:
  MyInstance:
    Type: AWS::EC2::Instance
    Properties:
      SubnetId: !ImportValue SharedVPC
```

**4. Use Nested Stacks for Modularity**
```yaml
Resources:
  NetworkStack:
    Type: AWS::CloudFormation::Stack
    Properties:
      TemplateURL: https://s3.amazonaws.com/bucket/network.yaml
      Parameters:
        VPCCidr: 10.0.0.0/16
```

---

**Master Infrastructure as Code with CloudFormation for repeatable, version-controlled AWS deployments!**
