---
sidebar_position: 5
---

# DevOps Security

Master DevOps security practices including container security and secrets management. Learn to secure your infrastructure, applications, and CI/CD pipelines.

## Security in DevOps (DevSecOps)

**DevSecOps** integrates security practices into the DevOps workflow, making security everyone's responsibility from development through deployment.

### Core Principles

**Shift Left**
- Security testing early in development
- Find vulnerabilities before production
- Automated security scanning in CI/CD
- Developer security training

**Continuous Security**
- Security as code
- Automated compliance checks
- Continuous monitoring
- Regular security audits

**Least Privilege**
- Minimum necessary permissions
- Time-limited access
- Regular access reviews
- Just-in-time (JIT) access

---

## Container Security

### Security Layers

```
┌─────────────────────────────────┐
│   1. Image Security             │
│   - Scan for vulnerabilities    │
│   - Use trusted base images     │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│   2. Runtime Security            │
│   - Non-root users              │
│   - Resource limits             │
│   - Read-only filesystems       │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│   3. Host Security               │
│   - Hardened OS                 │
│   - Updated kernel              │
│   - Minimal attack surface      │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│   4. Network Security            │
│   - Network policies            │
│   - Service mesh                │
│   - Encrypted communication     │
└─────────────────────────────────┘
```

---

## Container Image Security

### Use Official and Minimal Base Images

```dockerfile
# ❌ BAD - Large attack surface
FROM ubuntu:latest

# ✅ GOOD - Minimal, updated base image
FROM alpine:3.18

# ✅ BETTER - Distroless (minimal runtime)
FROM gcr.io/distroless/static-debian11

# ✅ BEST - Specific version, minimal
FROM alpine:3.18.4
```

### Multi-Stage Builds

```dockerfile
# Build stage - includes build tools
FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY . .
RUN go build -o myapp

# Runtime stage - minimal, no build tools
FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/myapp .

# Non-root user
RUN adduser -D appuser
USER appuser

CMD ["./myapp"]
```

### Don't Run as Root

```dockerfile
# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Or in Alpine
RUN addgroup -S appuser && adduser -S appuser -G appuser

# Set ownership
COPY --chown=appuser:appuser . /app

# Switch to non-root user
USER appuser

# ✅ Container runs as appuser, not root
```

### Read-Only Root Filesystem

```dockerfile
# Dockerfile
FROM alpine:3.18
RUN adduser -D appuser
USER appuser
WORKDIR /app
COPY app .
CMD ["./app"]
```

**Docker run:**
```bash
docker run --read-only \
  --tmpfs /tmp \
  --tmpfs /var/run \
  myapp:latest
```

**Kubernetes:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  containers:
  - name: myapp
    image: myapp:latest
    securityContext:
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      runAsUser: 1000
    volumeMounts:
    - name: tmp
      mountPath: /tmp
  volumes:
  - name: tmp
    emptyDir: {}
```

---

## Vulnerability Scanning

### Trivy (Comprehensive Scanner)

```bash
# Install Trivy
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt update && sudo apt install trivy

# Scan Docker image
trivy image nginx:latest

# Scan with severity filter
trivy image --severity HIGH,CRITICAL myapp:1.0.0

# Scan filesystem
trivy fs /path/to/project

# Generate report
trivy image --format json --output results.json myapp:1.0.0
```

### Clair (Google Container Analysis)

```bash
# Run Clair
docker run -d --name clair \
  -p 6060:6060 \
  quay.io/coreos/clair:latest

# Scan with clairctl
clairctl analyze myapp:latest
```

### Snyk

```bash
# Install Snyk
npm install -g snyk

# Authenticate
snyk auth

# Scan Docker image
snyk container test myapp:latest

# Monitor image
snyk container monitor myapp:latest
```

### Integrate in CI/CD

**GitHub Actions:**
```yaml
name: Security Scan

on: [push]

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build image
        run: docker build -t myapp:${{ github.sha }} .

      - name: Run Trivy scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          severity: 'CRITICAL,HIGH'
          exit-code: '1'  # Fail build on vulnerabilities
```

---

## Container Runtime Security

### Security Context (Kubernetes)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secure-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault

  containers:
  - name: myapp
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      runAsNonRoot: true
      capabilities:
        drop:
          - ALL
        add:
          - NET_BIND_SERVICE

    resources:
      limits:
        memory: "512Mi"
        cpu: "500m"
      requests:
        memory: "256Mi"
        cpu: "250m"
```

### Pod Security Standards

**Restricted Policy (Most Secure):**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted
```

### AppArmor Profile

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: secured-pod
  annotations:
    container.apparmor.security.beta.kubernetes.io/myapp: runtime/default
spec:
  containers:
  - name: myapp
    image: myapp:latest
```

---

## Secrets Management

### Never Hard-Code Secrets

```dockerfile
# ❌ NEVER DO THIS
ENV API_KEY="abc123secret"
ENV DB_PASSWORD="SuperSecret123!"

# ❌ NEVER COMMIT THIS
# config.yml
database:
  password: "hardcoded_password"

# ✅ Use environment variables or secret managers
```

### Kubernetes Secrets

**Create Secret:**
```bash
# From literal values
kubectl create secret generic db-credentials \
  --from-literal=username=admin \
  --from-literal=password=SuperSecret123!

# From file
kubectl create secret generic api-key \
  --from-file=api-key.txt

# From YAML (base64 encoded)
echo -n 'SuperSecret123!' | base64
```

**secrets.yaml:**
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: db-credentials
type: Opaque
data:
  username: YWRtaW4=  # base64 encoded 'admin'
  password: U3VwZXJTZWNyZXQxMjMh  # base64 encoded 'SuperSecret123!'
```

**Use Secrets in Pod:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
  - name: myapp
    image: myapp:latest
    env:
      # Single secret as environment variable
      - name: DB_PASSWORD
        valueFrom:
          secretKeyRef:
            name: db-credentials
            key: password

      # All secrets as environment variables
    envFrom:
      - secretRef:
          name: db-credentials

    # Mount secrets as files
    volumeMounts:
    - name: secret-volume
      mountPath: /etc/secrets
      readOnly: true

  volumes:
  - name: secret-volume
    secret:
      secretName: db-credentials
```

---

## HashiCorp Vault

### Install Vault

```bash
# Download and install
wget https://releases.hashicorp.com/vault/1.15.0/vault_1.15.0_linux_amd64.zip
unzip vault_1.15.0_linux_amd64.zip
sudo mv vault /usr/local/bin/

# Start Vault dev server (NOT for production)
vault server -dev
```

### Store and Retrieve Secrets

```bash
# Set VAULT_ADDR
export VAULT_ADDR='http://127.0.0.1:8200'

# Store secret
vault kv put secret/myapp/db password=SuperSecret123! username=admin

# Retrieve secret
vault kv get secret/myapp/db

# Get specific field
vault kv get -field=password secret/myapp/db
```

### Vault in Kubernetes

**Install Vault using Helm:**
```bash
helm repo add hashicorp https://helm.releases.hashicorp.com
helm install vault hashicorp/vault
```

**Inject Secrets into Pods:**
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  annotations:
    vault.hashicorp.com/agent-inject: "true"
    vault.hashicorp.com/role: "myapp"
    vault.hashicorp.com/agent-inject-secret-database: "secret/data/myapp/db"
    vault.hashicorp.com/agent-inject-template-database: |
      {{- with secret "secret/data/myapp/db" -}}
      export DB_PASSWORD="{{ .Data.data.password }}"
      export DB_USERNAME="{{ .Data.data.username }}"
      {{- end }}
spec:
  serviceAccountName: myapp
  containers:
  - name: myapp
    image: myapp:latest
    command: ["/bin/sh"]
    args:
      - -c
      - source /vault/secrets/database && ./app
```

---

## AWS Secrets Manager

### Store Secrets

```bash
# Create secret
aws secretsmanager create-secret \
  --name prod/db/credentials \
  --secret-string '{"username":"admin","password":"SuperSecret123!"}'

# Retrieve secret
aws secretsmanager get-secret-value \
  --secret-id prod/db/credentials

# Update secret
aws secretsmanager update-secret \
  --secret-id prod/db/credentials \
  --secret-string '{"username":"admin","password":"NewPassword456!"}'
```

### Use in Application

**Python:**
```python
import boto3
import json

def get_secret():
    client = boto3.client('secretsmanager', region_name='us-east-1')
    response = client.get_secret_value(SecretId='prod/db/credentials')
    secret = json.loads(response['SecretString'])
    return secret

# Use secret
secret = get_secret()
db_password = secret['password']
```

**In Kubernetes with External Secrets Operator:**
```yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets
spec:
  provider:
    aws:
      service: SecretsManager
      region: us-east-1
      auth:
        jwt:
          serviceAccountRef:
            name: myapp

---
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: db-credentials
spec:
  refreshInterval: 1h
  secretStoreRef:
    name: aws-secrets
    kind: SecretStore
  target:
    name: db-credentials
  data:
  - secretKey: password
    remoteRef:
      key: prod/db/credentials
      property: password
```

---

## Secret Scanning in Git

### git-secrets (Pre-commit Hook)

```bash
# Install git-secrets
git clone https://github.com/awslabs/git-secrets
cd git-secrets
sudo make install

# Initialize in repo
cd /path/to/your/repo
git secrets --install
git secrets --register-aws

# Scan all history
git secrets --scan-history
```

### Gitleaks

```bash
# Install gitleaks
brew install gitleaks

# Scan repository
gitleaks detect --source . --verbose

# Scan in CI/CD
gitleaks detect --source . --report-format json --report-path gitleaks-report.json
```

**GitHub Actions:**
```yaml
name: Secret Scanning

on: [push, pull_request]

jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
```

---

## Network Security

### Kubernetes Network Policies

**Deny All Ingress:**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
  namespace: production
spec:
  podSelector: {}
  policyTypes:
  - Ingress
```

**Allow Specific Traffic:**
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: production
spec:
  podSelector:
    matchLabels:
      app: backend
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

### Service Mesh (Istio)

```yaml
# Mutual TLS (mTLS) between services
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: default
  namespace: production
spec:
  mtls:
    mode: STRICT

# Authorization policy
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: frontend-to-backend
  namespace: production
spec:
  selector:
    matchLabels:
      app: backend
  action: ALLOW
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/production/sa/frontend"]
```

---

## CI/CD Security

### Secure CI/CD Pipeline

```
┌─────────────────────────────────────┐
│   1. Code Commit                     │
│   - Branch protection               │
│   - Signed commits                  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   2. Secret Scanning                 │
│   - Gitleaks, git-secrets           │
│   - Block if secrets found          │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   3. Code Analysis                   │
│   - SAST (static analysis)          │
│   - Dependency scanning             │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   4. Build                           │
│   - Reproducible builds             │
│   - Sign artifacts                  │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   5. Container Scan                  │
│   - Trivy, Clair, Snyk              │
│   - Block on critical vulns         │
└──────────────┬──────────────────────┘
               ↓
┌─────────────────────────────────────┐
│   6. Deploy                          │
│   - Least privilege credentials     │
│   - Audit logging                   │
└─────────────────────────────────────┘
```

### GitHub Actions Security

```yaml
name: Secure Pipeline

on:
  push:
    branches: [main]

permissions:
  contents: read  # Least privilege

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Secret scanning
        uses: gitleaks/gitleaks-action@v2

      - name: Dependency scanning
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

      - name: SAST
        uses: github/codeql-action/init@v2

      - name: Build
        run: docker build -t myapp:${{ github.sha }} .

      - name: Container scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: myapp:${{ github.sha }}
          severity: 'CRITICAL,HIGH'
          exit-code: '1'
```

---

## Best Practices Checklist

### Container Security

- ✅ Use minimal base images
- ✅ Run as non-root user
- ✅ Read-only root filesystem
- ✅ Scan for vulnerabilities
- ✅ Sign images
- ✅ Use specific image tags (not `latest`)
- ✅ Remove unnecessary packages
- ✅ Use multi-stage builds

### Secrets Management

- ✅ Never hard-code secrets
- ✅ Use secret managers (Vault, AWS Secrets Manager)
- ✅ Rotate secrets regularly
- ✅ Scan for secrets in Git
- ✅ Encrypt secrets at rest
- ✅ Use short-lived credentials
- ✅ Audit secret access
- ✅ Minimum necessary permissions

### Network Security

- ✅ Implement network policies
- ✅ Use mTLS for service-to-service communication
- ✅ Encrypt traffic (TLS)
- ✅ Segment networks
- ✅ Monitor network traffic
- ✅ Use service mesh for advanced security

### CI/CD Security

- ✅ Scan code for secrets
- ✅ Static code analysis (SAST)
- ✅ Dependency scanning
- ✅ Container vulnerability scanning
- ✅ Least privilege for CI/CD
- ✅ Sign artifacts
- ✅ Audit logging

---

## Resources

### Tools
- [Trivy](https://github.com/aquasecurity/trivy) - Vulnerability scanner
- [HashiCorp Vault](https://www.vaultproject.io/) - Secrets management
- [Gitleaks](https://github.com/gitleaks/gitleaks) - Secret scanning
- [Falco](https://falco.org/) - Runtime security
- [Open Policy Agent](https://www.openpolicyagent.org/) - Policy enforcement

### Documentation
- [OWASP Container Security](https://owasp.org/www-project-docker-top-10/)
- [Kubernetes Security](https://kubernetes.io/docs/concepts/security/)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)

---

**Secure your infrastructure and applications with DevSecOps best practices!**
