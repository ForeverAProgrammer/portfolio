---
sidebar_position: 4
---

# Infrastructure as Code

Master Infrastructure as Code (IaC) to automate infrastructure provisioning and configuration management. Learn Terraform for multi-cloud infrastructure and Ansible for configuration management.

## What is Infrastructure as Code?

**Infrastructure as Code (IaC)** is the practice of managing and provisioning infrastructure through machine-readable definition files rather than manual processes or interactive configuration tools.

### Key Benefits

**Consistency**
- Eliminate configuration drift
- Standardized environments
- Reproducible infrastructure
- Reduced human error

**Speed**
- Rapid provisioning
- Automated deployments
- Faster disaster recovery
- Quick environment replication

**Version Control**
- Track infrastructure changes
- Code reviews for infrastructure
- Rollback capabilities
- Audit trail

**Documentation**
- Infrastructure as living documentation
- Self-documenting systems
- Clear dependencies
- Better knowledge sharing

**Cost Reduction**
- Automated processes reduce labor
- Optimize resource usage
- Prevent over-provisioning
- Faster troubleshooting

---

## IaC Tools Comparison

| Tool | Type | Best For | Multi-Cloud |
|------|------|----------|-------------|
| **Terraform** | Provisioning | Infrastructure provisioning across clouds | Yes |
| **Ansible** | Configuration | Server configuration, app deployment | Yes |
| **CloudFormation** | Provisioning | AWS-specific infrastructure | No (AWS only) |
| **Pulumi** | Provisioning | Infrastructure using real programming languages | Yes |
| **Chef** | Configuration | Complex configuration management | Yes |
| **Puppet** | Configuration | Large-scale configuration management | Yes |

---

## Topics

### [Terraform](./terraform)
Multi-cloud infrastructure provisioning using declarative configuration.

**You'll learn:**
- Terraform fundamentals and HCL syntax
- Providers and resources
- State management
- Variables and outputs
- Modules for reusability
- Workspaces for environments
- Best practices and patterns
- Multi-cloud deployments

### [Ansible](./ansible)
Agentless automation for configuration management and application deployment.

**You'll learn:**
- Ansible fundamentals and YAML syntax
- Inventory management
- Playbooks and tasks
- Roles for reusability
- Variables and templates
- Ansible Vault for secrets
- Best practices and patterns
- Integration with CI/CD

---

## IaC Principles

### Declarative vs Imperative

**Declarative (Terraform, CloudFormation)**
```hcl
# Declare desired state
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  count         = 3
}
```

**Pros:**
- Define what you want, not how to get there
- Tool handles dependencies
- Easier to understand desired state

**Cons:**
- Less control over execution order
- May be harder for complex logic

**Imperative (Ansible, Shell scripts)**
```yaml
# Define steps to achieve state
- name: Launch EC2 instances
  ec2:
    image: ami-0c55b159cbfafe1f0
    instance_type: t3.micro
    count: 3
```

**Pros:**
- Full control over execution
- Easier for complex workflows
- Familiar to programmers

**Cons:**
- Must handle all edge cases
- More code to maintain

### Immutable vs Mutable Infrastructure

**Immutable (Terraform + AMIs/Containers)**
- Replace servers instead of updating
- No configuration drift
- Easier rollback
- More predictable

**Mutable (Ansible on existing servers)**
- Update servers in place
- Less resource churn
- Faster small changes
- More complex state management

---

## IaC Workflow

### Development Lifecycle

```
┌─────────────────────────────────────────┐
│  1. WRITE                                │
│  Define infrastructure in code           │
│  (Terraform .tf files, Ansible playbooks)│
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  2. PLAN / DRY RUN                       │
│  Preview changes before applying         │
│  (terraform plan, ansible --check)       │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  3. REVIEW                               │
│  Code review, security scan              │
│  Check for compliance and best practices │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  4. APPLY                                │
│  Execute changes                         │
│  (terraform apply, ansible-playbook)     │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  5. VERIFY                               │
│  Test infrastructure, run smoke tests    │
│  Monitor for issues                      │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  6. VERSION CONTROL                      │
│  Commit changes, tag releases            │
│  Update documentation                    │
└─────────────────────────────────────────┘
```

---

## Combining Terraform and Ansible

### Why Use Both?

**Terraform:** Provision infrastructure
- Create VPCs, subnets, EC2 instances
- Set up load balancers, databases
- Configure cloud resources

**Ansible:** Configure infrastructure
- Install software packages
- Configure applications
- Deploy code
- Manage services

### Typical Workflow

```
┌─────────────────────────────────────────┐
│  TERRAFORM                               │
│  ┌────────────────────────────────────┐ │
│  │ 1. Create VPC and networking       │ │
│  │ 2. Launch EC2 instances            │ │
│  │ 3. Create RDS database             │ │
│  │ 4. Set up load balancer            │ │
│  │ 5. Output instance IPs             │ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │ Instance IPs
┌──────────────▼──────────────────────────┐
│  ANSIBLE                                 │
│  ┌────────────────────────────────────┐ │
│  │ 1. Install Docker                  │ │
│  │ 2. Configure firewall              │ │
│  │ 3. Deploy application              │ │
│  │ 4. Start services                  │ │
│  │ 5. Run health checks               │ │
│  └────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

### Example Integration

**Terraform outputs:**
```hcl
# outputs.tf
output "web_server_ips" {
  value = aws_instance.web[*].public_ip
}

output "db_endpoint" {
  value = aws_db_instance.main.endpoint
}
```

**Generate Ansible inventory:**
```bash
# Generate inventory from Terraform
terraform output -json | jq -r '.web_server_ips.value[]' > inventory.ini
```

**Ansible playbook:**
```yaml
# playbook.yml
- hosts: all
  vars:
    db_host: "{{ lookup('pipe', 'terraform output -raw db_endpoint') }}"
  tasks:
    - name: Deploy application
      docker_container:
        name: myapp
        image: myapp:latest
        env:
          DB_HOST: "{{ db_host }}"
```

---

## Best Practices

### General IaC Principles

**1. Version Everything**
```bash
# Use Git for all IaC code
git init
git add .
git commit -m "Initial infrastructure"
git tag -a v1.0.0 -m "Production release"
```

**2. Use Modules/Roles for Reusability**
```
infrastructure/
├── modules/
│   ├── networking/
│   ├── compute/
│   └── database/
└── environments/
    ├── dev/
    ├── staging/
    └── production/
```

**3. Separate Environments**
```hcl
# Don't mix dev and prod in same state
# Use workspaces or separate directories
terraform workspace new production
terraform workspace new staging
terraform workspace new development
```

**4. Implement Code Reviews**
- All infrastructure changes go through PR
- Require plan output in PR description
- Security team reviews IAM policies
- At least one approval required

**5. Automate Testing**
```bash
# Run linters
terraform fmt -check
terraform validate

# Security scanning
tfsec .
checkov -d .

# Run tests
terratest
```

**6. Use Remote State (Terraform)**
```hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "terraform-locks"
  }
}
```

**7. Secrets Management**
```yaml
# Use secret managers, not plaintext
# AWS Secrets Manager
db_password: "{{ lookup('aws_secret', 'prod/db/password') }}"

# HashiCorp Vault
api_key: "{{ lookup('hashi_vault', 'secret=secret/data/api_key') }}"

# Ansible Vault
ansible-vault encrypt_string 'mypassword' --name 'db_password'
```

**8. Document Everything**
```markdown
# README.md
## Prerequisites
- Terraform >= 1.0
- AWS CLI configured
- Appropriate IAM permissions

## Deployment
```bash
terraform init
terraform plan
terraform apply
```

## Architecture
[Include diagrams and explanations]
```

---

## Security Best Practices

### Least Privilege

**Terraform IAM Policies:**
```hcl
resource "aws_iam_policy" "terraform" {
  name = "TerraformPolicy"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:Describe*",
          "ec2:RunInstances",
          "ec2:TerminateInstances"
        ]
        Resource = "*"
      }
    ]
  })
}
```

### Scanning for Vulnerabilities

```bash
# Terraform security scanning
tfsec .
checkov --directory .
terrascan scan

# Ansible security scanning
ansible-lint playbook.yml
```

### Sensitive Data

**Never commit secrets:**
```bash
# .gitignore
*.tfvars
secrets.yml
.env
*.pem
*.key
```

**Use encryption:**
```bash
# Ansible Vault
ansible-vault create secrets.yml
ansible-vault encrypt existing_file.yml
ansible-playbook playbook.yml --ask-vault-pass
```

---

## CI/CD Integration

### GitOps Workflow

```
┌─────────────────────────────────────────┐
│  Developer                               │
│  1. Write IaC code                       │
│  2. Commit to feature branch             │
│  3. Create pull request                  │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  CI Pipeline (on PR)                     │
│  1. terraform fmt -check                 │
│  2. terraform validate                   │
│  3. terraform plan                       │
│  4. Security scan (tfsec, checkov)       │
│  5. Post plan output to PR               │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  Code Review                             │
│  1. Review code changes                  │
│  2. Review terraform plan output         │
│  3. Security team approval               │
│  4. Merge to main                        │
└──────────────┬──────────────────────────┘
               ↓
┌─────────────────────────────────────────┐
│  CD Pipeline (on merge to main)          │
│  1. terraform plan                       │
│  2. Manual approval (production)         │
│  3. terraform apply                      │
│  4. Run tests                            │
│  5. Notify team                          │
└─────────────────────────────────────────┘
```

### GitHub Actions Example

```yaml
# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths:
      - 'terraform/**'
  push:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Format
        run: terraform fmt -check

      - name: Terraform Init
        run: terraform init

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: terraform plan -no-color
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Security Scan
        uses: aquasecurity/tfsec-action@v1.0.0

      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve
```

---

## Common Patterns

### Multi-Environment Setup

```
infrastructure/
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── compute/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── environments/
│   ├── dev/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   ├── staging/
│   │   ├── main.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   └── prod/
│       ├── main.tf
│       ├── terraform.tfvars
│       └── backend.tf
└── README.md
```

### Blue-Green Deployments

```hcl
# Blue-Green with Terraform
resource "aws_lb_target_group" "blue" {
  name     = "blue-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_target_group" "green" {
  name     = "green-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
}

resource "aws_lb_listener_rule" "main" {
  listener_arn = aws_lb_listener.main.arn

  action {
    type             = "forward"
    target_group_arn = var.active_target == "blue" ? aws_lb_target_group.blue.arn : aws_lb_target_group.green.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}
```

---

## Resources

### Documentation
- [Terraform Documentation](https://www.terraform.io/docs)
- [Ansible Documentation](https://docs.ansible.com/)
- [HashiCorp Learn](https://learn.hashicorp.com/terraform)
- [Ansible Galaxy](https://galaxy.ansible.com/)

### Books
- "Terraform: Up & Running" by Yevgeniy Brikman
- "Ansible for DevOps" by Jeff Geerling
- "Infrastructure as Code" by Kief Morris

### Tools
- [Terragrunt](https://terragrunt.gruntwork.io/) - Terraform wrapper
- [Atlantis](https://www.runatlantis.io/) - Terraform PR automation
- [AWX](https://github.com/ansible/awx) - Web-based Ansible UI
- [Terraform Cloud](https://cloud.hashicorp.com/products/terraform) - Managed Terraform

---

## Next Steps

1. **Start with Terraform** - [Terraform Guide](./terraform)
2. **Learn Ansible** - [Ansible Guide](./ansible)
3. **Combine Both** - Use Terraform for provisioning, Ansible for configuration
4. **Automate** - Integrate with [CI/CD](../cicd)
5. **Secure** - Implement [Security best practices](../security)

---

**Master Infrastructure as Code to build reliable, reproducible, and automated infrastructure!**
