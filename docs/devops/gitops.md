---
sidebar_position: 6
---

# GitOps

Master GitOps for declarative, Git-based continuous deployment. Learn to use ArgoCD for automated Kubernetes deployments with Git as the single source of truth.

## What is GitOps?

**GitOps** is a modern approach to continuous deployment where the desired state of your infrastructure and applications is defined in Git, and automated processes ensure the actual state matches the desired state.

### Core Principles

**Git as Single Source of Truth**
- All infrastructure and application configuration in Git
- Version controlled
- Auditable history
- Declarative definitions

**Automated Synchronization**
- Continuous reconciliation
- Automated deployment
- Self-healing systems
- Drift detection and correction

**Pull-Based Deployment**
- Agents pull changes from Git
- No external access to cluster required
- Enhanced security
- Better audit trail

**Declarative Configuration**
- Describe desired state
- System converges to that state
- Idempotent operations
- Predictable behavior

---

## GitOps Workflow

```
┌─────────────────────────────────────────┐
│   Developer                              │
│   1. Write code                          │
│   2. Create Pull Request                 │
│   3. Review and merge                    │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│   Git Repository (Source of Truth)       │
│   - Kubernetes manifests                 │
│   - Helm charts                          │
│   - Kustomize overlays                   │
└──────────────┬──────────────────────────┘
               │ Pull changes
┌──────────────▼──────────────────────────┐
│   GitOps Operator (ArgoCD)               │
│   1. Monitor Git repository              │
│   2. Detect changes                      │
│   3. Sync to cluster                     │
│   4. Report status                       │
└──────────────┬──────────────────────────┘
               │ Apply
┌──────────────▼──────────────────────────┐
│   Kubernetes Cluster                     │
│   - Deployments                          │
│   - Services                             │
│   - ConfigMaps                           │
│   - Secrets                              │
└─────────────────────────────────────────┘
```

---

## ArgoCD

### What is ArgoCD?

**ArgoCD** is a declarative, GitOps continuous delivery tool for Kubernetes. It automatically synchronizes applications deployed in Kubernetes with their desired state defined in Git repositories.

### Key Features

- **Automated Deployment** - Sync apps from Git to Kubernetes
- **Multiple Sources** - Helm, Kustomize, plain YAML
- **Health Assessment** - Monitor application health
- **Rollback** - Easy rollback to previous versions
- **Multi-Cluster** - Manage multiple clusters
- **SSO Integration** - OIDC, OAuth2, SAML
- **RBAC** - Fine-grained access control
- **Web UI** - Visual application management

---

## Installing ArgoCD

### Install in Kubernetes

```bash
# Create namespace
kubectl create namespace argocd

# Install ArgoCD
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for pods to be ready
kubectl wait --for=condition=ready pod -l app.kubernetes.io/name=argocd-server -n argocd --timeout=300s

# Get initial admin password
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d && echo

# Port forward to access UI
kubectl port-forward svc/argocd-server -n argocd 8080:443

# Access at https://localhost:8080
# Username: admin
# Password: (from above command)
```

### Install ArgoCD CLI

```bash
# Linux
curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
rm argocd-linux-amd64

# macOS
brew install argocd

# Login via CLI
argocd login localhost:8080 --username admin --password <password>

# Change password
argocd account update-password
```

---

## Creating Your First Application

### Repository Structure

```
my-app-repo/
├── base/
│   ├── deployment.yaml
│   ├── service.yaml
│   └── kustomization.yaml
├── overlays/
│   ├── dev/
│   │   ├── kustomization.yaml
│   │   └── replica-patch.yaml
│   ├── staging/
│   │   └── kustomization.yaml
│   └── production/
│       └── kustomization.yaml
└── README.md
```

### base/deployment.yaml

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 2
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:latest
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

### base/service.yaml

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

### base/kustomization.yaml

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - deployment.yaml
  - service.yaml
```

### overlays/production/kustomization.yaml

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

bases:
  - ../../base

replicas:
  - name: myapp
    count: 5

images:
  - name: myapp
    newTag: v1.0.0
```

---

## Deploying with ArgoCD

### Via UI

1. Log in to ArgoCD UI
2. Click "+ NEW APP"
3. Fill in details:
   - Application Name: `myapp`
   - Project: `default`
   - Sync Policy: `Automatic`
   - Repository URL: `https://github.com/username/my-app-repo`
   - Path: `overlays/production`
   - Cluster: `https://kubernetes.default.svc`
   - Namespace: `default`
4. Click "CREATE"

### Via CLI

```bash
# Create application
argocd app create myapp \
  --repo https://github.com/username/my-app-repo \
  --path overlays/production \
  --dest-server https://kubernetes.default.svc \
  --dest-namespace default \
  --sync-policy automated \
  --auto-prune \
  --self-heal

# List applications
argocd app list

# Get application details
argocd app get myapp

# Sync application
argocd app sync myapp

# View application logs
argocd app logs myapp

# Delete application
argocd app delete myapp
```

### Via YAML

```yaml
# application.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default

  # Source repository
  source:
    repoURL: https://github.com/username/my-app-repo
    targetRevision: main
    path: overlays/production

  # Destination cluster
  destination:
    server: https://kubernetes.default.svc
    namespace: default

  # Sync policy
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
      allowEmpty: false
    syncOptions:
      - CreateNamespace=true

    retry:
      limit: 5
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m
```

```bash
kubectl apply -f application.yaml
```

---

## Auto Sync and Self-Healing

### Automated Sync

```yaml
syncPolicy:
  automated:
    prune: true  # Delete resources not in Git
    selfHeal: true  # Revert manual changes
```

**Behavior:**
- ArgoCD automatically syncs when Git changes
- Detects drift and corrects it
- Removes resources not in Git (if `prune: true`)

### Manual Sync

```yaml
syncPolicy: {}  # No automated sync
```

**Behavior:**
- Manual approval required
- Better for production environments
- Use CLI or UI to sync

---

## Multi-Environment Setup

### Repository Structure

```
gitops-repo/
├── apps/
│   └── myapp/
│       ├── base/
│       └── overlays/
│           ├── dev/
│           ├── staging/
│           └── production/
└── argocd-apps/
    ├── dev-myapp.yaml
    ├── staging-myapp.yaml
    └── prod-myapp.yaml
```

### argocd-apps/dev-myapp.yaml

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-dev
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/username/gitops-repo
    targetRevision: main
    path: apps/myapp/overlays/dev
  destination:
    server: https://kubernetes.default.svc
    namespace: dev
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

### argocd-apps/prod-myapp.yaml

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp-prod
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/username/gitops-repo
    targetRevision: production  # Different branch
    path: apps/myapp/overlays/production
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: false  # Manual approval for prod
    syncOptions:
      - CreateNamespace=true
```

---

## App of Apps Pattern

Manage multiple applications with a single parent app.

### apps/app-of-apps.yaml

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: app-of-apps
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/username/gitops-repo
    targetRevision: main
    path: argocd-apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

```bash
kubectl apply -f apps/app-of-apps.yaml
```

This creates all child applications defined in `argocd-apps/`.

---

## Working with Helm

### Helm Repository

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-ingress
  namespace: argocd
spec:
  project: default
  source:
    chart: nginx-ingress
    repoURL: https://helm.nginx.com/stable
    targetRevision: 0.17.0
    helm:
      values: |
        controller:
          replicaCount: 3
          service:
            type: LoadBalancer
  destination:
    server: https://kubernetes.default.svc
    namespace: ingress-nginx
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
```

### Helm Chart in Git

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/username/my-helm-chart
    targetRevision: main
    path: charts/myapp
    helm:
      valueFiles:
        - values-production.yaml
      parameters:
        - name: image.tag
          value: v1.0.0
        - name: replicaCount
          value: "5"
  destination:
    server: https://kubernetes.default.svc
    namespace: production
```

---

## Secrets Management

### Sealed Secrets

```bash
# Install Sealed Secrets controller
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/controller.yaml

# Install kubeseal CLI
wget https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.18.0/kubeseal-0.18.0-linux-amd64.tar.gz
tar xfz kubeseal-0.18.0-linux-amd64.tar.gz
sudo install -m 755 kubeseal /usr/local/bin/kubeseal
```

**Create sealed secret:**
```bash
# Create regular secret
kubectl create secret generic db-credentials \
  --from-literal=password=SuperSecret123! \
  --dry-run=client -o yaml > secret.yaml

# Seal it
kubeseal -f secret.yaml -w sealed-secret.yaml

# Commit sealed-secret.yaml to Git (safe!)
git add sealed-secret.yaml
git commit -m "Add database credentials"
git push
```

**sealed-secret.yaml (safe to commit):**
```yaml
apiVersion: bitnami.com/v1alpha1
kind: SealedSecret
metadata:
  name: db-credentials
spec:
  encryptedData:
    password: AgBy3i4OJSWK+PiTySYZZA9rO43cGDEq...
```

---

## Monitoring and Notifications

### Prometheus Metrics

ArgoCD exposes metrics for Prometheus:

```yaml
apiVersion: v1
kind: ServiceMonitor
metadata:
  name: argocd-metrics
  namespace: argocd
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: argocd-server-metrics
  endpoints:
  - port: metrics
```

### Slack Notifications

```yaml
# argocd-notifications-cm ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  service.slack: |
    token: $slack-token

  template.app-deployed: |
    message: |
      Application {{.app.metadata.name}} is now running version {{.app.status.sync.revision}}.
    slack:
      attachments: |
        [{
          "title": "{{ .app.metadata.name}}",
          "title_link":"{{.context.argocdUrl}}/applications/{{.app.metadata.name}}",
          "color": "#18be52",
          "fields": [
          {
            "title": "Sync Status",
            "value": "{{.app.status.sync.status}}",
            "short": true
          },
          {
            "title": "Repository",
            "value": "{{.app.spec.source.repoURL}}",
            "short": true
          }
          ]
        }]

  trigger.on-deployed: |
    - when: app.status.operationState.phase in ['Succeeded']
      send: [app-deployed]
```

**Subscribe application:**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  annotations:
    notifications.argoproj.io/subscribe.on-deployed.slack: my-channel
```

---

## Best Practices

**1. Separate App and Config Repos**
```
app-repo/          # Application code
config-repo/       # Kubernetes manifests
```

**2. Use Branches for Environments**
```
main           → development
staging        → staging
production     → production
```

**3. Implement Progressive Delivery**
```
1. Deploy to dev (auto-sync)
2. Run tests
3. Deploy to staging (auto-sync)
4. Manual approval
5. Deploy to production (manual sync)
```

**4. Structure with Kustomize**
```
base/              # Common resources
overlays/
  dev/             # Dev-specific
  staging/         # Staging-specific
  production/      # Prod-specific
```

**5. Use Projects for Multi-Tenancy**
```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-a
  namespace: argocd
spec:
  destinations:
  - namespace: 'team-a-*'
    server: https://kubernetes.default.svc
  sourceRepos:
  - https://github.com/company/team-a-apps
```

**6. Enable RBAC**
```yaml
# argocd-rbac-cm ConfigMap
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-rbac-cm
  namespace: argocd
data:
  policy.default: role:readonly
  policy.csv: |
    p, role:org-admin, applications, *, */*, allow
    p, role:org-admin, clusters, get, *, allow
    g, team-a, role:org-admin
```

---

## Troubleshooting

**Application OutOfSync:**
```bash
# Check diff
argocd app diff myapp

# View current vs desired state
kubectl get deployment myapp -o yaml
argocd app manifests myapp
```

**Sync Fails:**
```bash
# Check sync status
argocd app get myapp

# View logs
argocd app logs myapp --follow

# Manual sync with prune
argocd app sync myapp --prune
```

**Health Check Failures:**
```yaml
# Custom health check
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations: |
    argoproj.io/Application:
      health.lua: |
        hs = {}
        hs.status = "Progressing"
        hs.message = ""
        if obj.status ~= nil then
          if obj.status.health ~= nil then
            hs.status = obj.status.health.status
            if obj.status.health.message ~= nil then
              hs.message = obj.status.health.message
            end
          end
        end
        return hs
```

---

## Resources

### Official Documentation
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [GitOps Principles](https://opengitops.dev/)
- [CNCF GitOps Working Group](https://github.com/cncf/tag-app-delivery)

### Tools
- [ArgoCD](https://argoproj.github.io/argo-cd/) - GitOps CD for Kubernetes
- [Flux](https://fluxcd.io/) - Alternative GitOps tool
- [Sealed Secrets](https://github.com/bitnami-labs/sealed-secrets) - Encrypt Kubernetes secrets

### Learning
- [ArgoCD Getting Started](https://argo-cd.readthedocs.io/en/stable/getting_started/)
- [Kustomize](https://kustomize.io/) - Kubernetes config management
- [Helm](https://helm.sh/) - Kubernetes package manager

---

**Master GitOps with ArgoCD for reliable, automated Kubernetes deployments!**
