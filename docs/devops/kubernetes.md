---
sidebar_position: 3
---

# Kubernetes Handbook

Comprehensive resource for orchestrating containers with Kubernetes.

## Introduction to Kubernetes

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications.

## Core Concepts

### Pods

The smallest deployable unit in Kubernetes:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
```

### Deployments

Manage replica sets and rolling updates:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.21
        ports:
        - containerPort: 80
```

### Services

Expose your application:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
  - protocol: TCP
    port: 80
    targetPort: 80
  type: LoadBalancer
```

## Getting Started

### Install kubectl

**Linux:**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

**macOS:**
```bash
brew install kubectl
```

### Create a Local Cluster

Using minikube:

```bash
minikube start
```

Using kind:

```bash
kind create cluster --name dev-cluster
```

## Essential kubectl Commands

### Cluster Information

```bash
kubectl cluster-info
kubectl get nodes
kubectl get namespaces
```

### Working with Resources

```bash
# Create resources
kubectl apply -f deployment.yaml

# Get resources
kubectl get pods
kubectl get deployments
kubectl get services

# Describe resources
kubectl describe pod <pod-name>

# Delete resources
kubectl delete pod <pod-name>
kubectl delete -f deployment.yaml
```

### Debugging

```bash
# View logs
kubectl logs <pod-name>
kubectl logs -f <pod-name>  # Follow logs

# Execute commands in container
kubectl exec -it <pod-name> -- bash

# Port forwarding
kubectl port-forward <pod-name> 8080:80
```

## ConfigMaps and Secrets

### ConfigMap

Store configuration data:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgres://db:5432"
  api_key: "demo-key"
```

Use in a Pod:

```yaml
spec:
  containers:
  - name: app
    image: myapp:latest
    envFrom:
    - configMapRef:
        name: app-config
```

### Secrets

Store sensitive data:

```bash
kubectl create secret generic db-secret \
  --from-literal=password=mysecretpassword
```

```yaml
spec:
  containers:
  - name: app
    image: myapp:latest
    env:
    - name: DB_PASSWORD
      valueFrom:
        secretKeyRef:
          name: db-secret
          key: password
```

## Persistent Storage

### PersistentVolumeClaim

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: app-pvc
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

Use in a Deployment:

```yaml
spec:
  template:
    spec:
      containers:
      - name: app
        volumeMounts:
        - name: data
          mountPath: /data
      volumes:
      - name: data
        persistentVolumeClaim:
          claimName: app-pvc
```

## Namespaces

Organize resources with namespaces:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
```

```bash
# Create namespace
kubectl create namespace staging

# Use namespace
kubectl apply -f deployment.yaml -n production

# Set default namespace
kubectl config set-context --current --namespace=production
```

## Scaling

### Manual Scaling

```bash
kubectl scale deployment nginx-deployment --replicas=5
```

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: nginx-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx-deployment
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
```

## Production Best Practices

### 1. Resource Limits

Always set resource requests and limits:

```yaml
resources:
  requests:
    memory: "128Mi"
    cpu: "250m"
  limits:
    memory: "256Mi"
    cpu: "500m"
```

### 2. Liveness and Readiness Probes

```yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8080
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8080
  initialDelaySeconds: 5
  periodSeconds: 5
```

### 3. Pod Disruption Budgets

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: app-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: myapp
```

### 4. Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: api-network-policy
spec:
  podSelector:
    matchLabels:
      app: api
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080
```

## Helm Package Manager

Install applications with Helm:

```bash
# Add repository
helm repo add bitnami https://charts.bitnami.com/bitnami

# Install chart
helm install my-release bitnami/nginx

# Upgrade release
helm upgrade my-release bitnami/nginx

# List releases
helm list
```

## Next Steps

- Review [Monitoring & Logging](./monitoring/)
- Explore [CI/CD Setup](./cicd.md) for automated deployments
- Learn [Docker Guide](./docker.md) for containerization
