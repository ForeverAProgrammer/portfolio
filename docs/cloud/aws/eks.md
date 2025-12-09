---
sidebar_position: 4
---

# EKS - Elastic Kubernetes Service

## What is EKS?

**Amazon EKS** is a managed Kubernetes service that makes it easy to run Kubernetes on AWS without needing to install and operate your own Kubernetes control plane.

## Key Features

- **Managed Control Plane** - AWS manages Kubernetes masters
- **Highly Available** - Control plane across multiple AZs
- **Secure** - IAM integration, VPC isolation
- **Scalable** - Supports thousands of pods
- **Compatible** - Standard Kubernetes, works with existing tools

## EKS Architecture

```
┌──────────────────────────────────────────┐
│           AWS Managed                    │
│   ┌──────────────────────────┐           │
│   │  Kubernetes              │           │
│   │  Control Plane           │           │
│   │  (Masters, etcd, API)    │           │
│   └───────────┬──────────────┘           │
└───────────────┼──────────────────────────┘
                │ Kubernetes API
┌───────────────▼──────────────────────────┐
│        Your AWS Account                  │
│   ┌──────────────────────────────┐       │
│   │  EKS Node Group              │       │
│   │  (Worker Nodes)              │       │
│   │  ┌─────┐ ┌─────┐ ┌─────┐     │       │
│   │  │Pod  │ │Pod  │ │Pod  │     │       │
│   │  └─────┘ └─────┘ └─────┘     │       │
│   │  (EC2 or Fargate)            │       │
│   └──────────────────────────────┘       │
└──────────────────────────────────────────┘
```

## Creating an EKS Cluster

**Prerequisites:**
```bash
# Install kubectl
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
chmod +x kubectl
sudo mv kubectl /usr/local/bin/

# Install eksctl
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin

# Install AWS CLI
pip install awscli --upgrade
```

**Using eksctl (Easiest):**
```bash
# Create cluster (takes ~15 minutes)
eksctl create cluster \
  --name my-cluster \
  --region us-east-1 \
  --nodegroup-name standard-workers \
  --node-type t3.medium \
  --nodes 3 \
  --nodes-min 1 \
  --nodes-max 4 \
  --managed

# Update kubeconfig
aws eks update-kubeconfig \
  --region us-east-1 \
  --name my-cluster

# Verify connection
kubectl get nodes

# Delete cluster
eksctl delete cluster --name my-cluster
```

**Using CloudFormation:**
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: 'EKS Cluster'

Resources:
  EKSClusterRole:
    Type: AWS::IAM::Role
    Properties:
      AssumeRolePolicyDocument:
        Version: '2012-10-17'
        Statement:
          - Effect: Allow
            Principal:
              Service: eks.amazonaws.com
            Action: sts:AssumeRole
      ManagedPolicyArns:
        - arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

  EKSCluster:
    Type: AWS::EKS::Cluster
    Properties:
      Name: my-cluster
      Version: '1.27'
      RoleArn: !GetAtt EKSClusterRole.Arn
      ResourcesVpcConfig:
        SubnetIds:
          - !Ref PrivateSubnet1
          - !Ref PrivateSubnet2
        SecurityGroupIds:
          - !Ref ClusterSecurityGroup

  NodeInstanceRole:
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
        - arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy
        - arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly
        - arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy

  NodeGroup:
    Type: AWS::EKS::Nodegroup
    DependsOn: EKSCluster
    Properties:
      ClusterName: !Ref EKSCluster
      NodegroupName: standard-workers
      NodeRole: !GetAtt NodeInstanceRole.Arn
      Subnets:
        - !Ref PrivateSubnet1
        - !Ref PrivateSubnet2
      ScalingConfig:
        DesiredSize: 3
        MinSize: 1
        MaxSize: 4
      InstanceTypes:
        - t3.medium

Outputs:
  ClusterName:
    Value: !Ref EKSCluster
  ClusterEndpoint:
    Value: !GetAtt EKSCluster.Endpoint
```

## Deploying Applications to EKS

**1. Create Deployment:**
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app
        image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
```

**2. Create Service:**
```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app-service
spec:
  type: LoadBalancer
  selector:
    app: my-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
```

**3. Deploy:**
```bash
# Apply manifests
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Check status
kubectl get deployments
kubectl get pods
kubectl get services

# Get load balancer URL
kubectl get service my-app-service
```

## EKS with Application Load Balancer

**Install AWS Load Balancer Controller:**
```bash
# Create IAM policy
curl -o iam_policy.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/v2.4.4/docs/install/iam_policy.json

aws iam create-policy \
  --policy-name AWSLoadBalancerControllerIAMPolicy \
  --policy-document file://iam_policy.json

# Create service account
eksctl create iamserviceaccount \
  --cluster=my-cluster \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::123456789012:policy/AWSLoadBalancerControllerIAMPolicy \
  --approve

# Install controller using Helm
helm repo add eks https://aws.github.io/eks-charts
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=my-cluster \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller
```

**Create Ingress:**
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-app-ingress
  annotations:
    kubernetes.io/ingress.class: alb
    alb.ingress.kubernetes.io/scheme: internet-facing
    alb.ingress.kubernetes.io/target-type: ip
spec:
  rules:
  - http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: my-app-service
            port:
              number: 80
```

## EKS Best Practices

**1. Use IAM Roles for Service Accounts (IRSA)**
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: my-app-sa
  annotations:
    eks.amazonaws.com/role-arn: arn:aws:iam::123456789012:role/MyAppRole
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      serviceAccountName: my-app-sa
      containers:
      - name: my-app
        image: my-app:latest
```

**2. Enable Pod Security Policies**

**3. Use Cluster Autoscaler**
```bash
# Install cluster autoscaler
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml

# Edit deployment to add cluster name
kubectl -n kube-system edit deployment.apps/cluster-autoscaler
```

**4. Implement Network Policies**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

**5. Use Managed Node Groups**
- Automatic updates
- Easy scaling
- Better integration

## Monitoring EKS

**Install Metrics Server:**
```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# View metrics
kubectl top nodes
kubectl top pods
```

**Container Insights:**
```bash
# Install CloudWatch Container Insights
curl https://raw.githubusercontent.com/aws-samples/amazon-cloudwatch-container-insights/latest/k8s-deployment-manifest-templates/deployment-mode/daemonset/container-insights-monitoring/quickstart/cwagent-fluentd-quickstart.yaml | sed "s/{{cluster_name}}/my-cluster/;s/{{region_name}}/us-east-1/" | kubectl apply -f -
```

---

**Run production-grade Kubernetes clusters on AWS with EKS for container orchestration at scale!**
