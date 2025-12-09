---
sidebar_position: 1
---

# Terraform

Master Terraform for multi-cloud infrastructure provisioning using declarative configuration. Learn to automate infrastructure across AWS, Azure, and GCP.

## What is Terraform?

**Terraform** is an open-source Infrastructure as Code (IaC) tool created by HashiCorp that allows you to define and provision infrastructure using a declarative configuration language called HCL (HashiCorp Configuration Language).

### Key Features

- **Multi-Cloud** - AWS, Azure, GCP, and 1000+ providers
- **Declarative** - Define what you want, Terraform handles how
- **State Management** - Tracks infrastructure state
- **Plan Before Apply** - Preview changes before execution
- **Resource Graph** - Automatic dependency resolution
- **Modules** - Reusable infrastructure components

---

## Installation

**Linux/macOS:**
```bash
# Download Terraform
wget https://releases.hashicorp.com/terraform/1.6.0/terraform_1.6.0_linux_amd64.zip
unzip terraform_1.6.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/

# Verify installation
terraform version
```

**Using Package Managers:**
```bash
# macOS (Homebrew)
brew install terraform

# Ubuntu/Debian
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform
```

---

## Terraform Workflow

```
┌──────────────────────────────────┐
│  1. terraform init                │
│  Initialize working directory     │
│  Download providers              │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  2. terraform plan                │
│  Preview changes                  │
│  Show what will be created       │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  3. terraform apply               │
│  Create/update infrastructure     │
│  Ask for confirmation            │
└──────────────┬───────────────────┘
               ↓
┌──────────────────────────────────┐
│  4. terraform destroy             │
│  Remove all infrastructure        │
│  (when needed)                   │
└──────────────────────────────────┘
```

---

## HCL Syntax Basics

### Resource Block

```hcl
resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "WebServer"
  }
}

# Syntax:
# resource "<TYPE>" "<NAME>" {
#   <ARGUMENT> = <VALUE>
# }
```

### Variable Block

```hcl
variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "instance_count" {
  description = "Number of instances"
  type        = number
  default     = 1
}

variable "tags" {
  description = "Resource tags"
  type        = map(string)
  default     = {
    Environment = "dev"
    Project     = "myapp"
  }
}
```

### Output Block

```hcl
output "instance_ip" {
  description = "Public IP of instance"
  value       = aws_instance.web.public_ip
}

output "instance_id" {
  value = aws_instance.web.id
}
```

### Data Source

```hcl
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
}
```

---

## Complete Example: AWS Infrastructure

### Project Structure

```
terraform-project/
├── main.tf           # Main configuration
├── variables.tf      # Variable definitions
├── outputs.tf        # Output definitions
├── terraform.tfvars  # Variable values
└── provider.tf       # Provider configuration
```

### provider.tf

```hcl
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      ManagedBy = "Terraform"
      Project   = var.project_name
    }
  }
}
```

### variables.tf

```hcl
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}
```

### main.tf

```hcl
# VPC
resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "${var.project_name}-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-${count.index + 1}"
  }
}

# Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-public-rt"
  }
}

# Route Table Association
resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Security Group
resource "aws_security_group" "web" {
  name        = "${var.project_name}-web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Restrict in production!
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-web-sg"
  }
}

# Data source for AMI
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

# EC2 Instance
resource "aws_instance" "web" {
  count         = var.environment == "prod" ? 2 : 1
  ami           = data.aws_ami.ubuntu.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public[count.index % 2].id

  vpc_security_group_ids = [aws_security_group.web.id]

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nginx
              systemctl start nginx
              systemctl enable nginx
              echo "<h1>Hello from ${var.project_name} - Instance ${count.index + 1}</h1>" > /var/www/html/index.html
              EOF

  tags = {
    Name = "${var.project_name}-web-${count.index + 1}"
  }
}
```

### outputs.tf

```hcl
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "instance_ips" {
  description = "Public IPs of web servers"
  value       = aws_instance.web[*].public_ip
}

output "instance_ids" {
  description = "Instance IDs"
  value       = aws_instance.web[*].id
}
```

### terraform.tfvars

```hcl
project_name  = "myapp"
environment   = "dev"
aws_region    = "us-east-1"
instance_type = "t3.micro"
vpc_cidr      = "10.0.0.0/16"
```

---

## Terraform Modules

### Creating a Module

```
modules/
└── vpc/
    ├── main.tf
    ├── variables.tf
    └── outputs.tf
```

**modules/vpc/main.tf:**
```hcl
resource "aws_vpc" "this" {
  cidr_block           = var.cidr_block
  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support

  tags = merge(
    var.tags,
    {
      Name = var.name
    }
  )
}

resource "aws_subnet" "public" {
  count                   = length(var.public_subnet_cidrs)
  vpc_id                  = aws_vpc.this.id
  cidr_block              = var.public_subnet_cidrs[count.index]
  availability_zone       = var.azs[count.index]
  map_public_ip_on_launch = true

  tags = merge(
    var.tags,
    {
      Name = "${var.name}-public-${count.index + 1}"
    }
  )
}
```

**modules/vpc/variables.tf:**
```hcl
variable "name" {
  description = "Name of VPC"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for VPC"
  type        = string
}

variable "public_subnet_cidrs" {
  description = "List of public subnet CIDR blocks"
  type        = list(string)
}

variable "azs" {
  description = "Availability zones"
  type        = list(string)
}

variable "enable_dns_hostnames" {
  description = "Enable DNS hostnames"
  type        = bool
  default     = true
}

variable "enable_dns_support" {
  description = "Enable DNS support"
  type        = bool
  default     = true
}

variable "tags" {
  description = "Tags to apply to resources"
  type        = map(string)
  default     = {}
}
```

**modules/vpc/outputs.tf:**
```hcl
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.this.id
}

output "public_subnet_ids" {
  description = "Public subnet IDs"
  value       = aws_subnet.public[*].id
}
```

### Using a Module

```hcl
module "vpc" {
  source = "./modules/vpc"

  name                 = "my-vpc"
  cidr_block           = "10.0.0.0/16"
  public_subnet_cidrs  = ["10.0.1.0/24", "10.0.2.0/24"]
  azs                  = ["us-east-1a", "us-east-1b"]

  tags = {
    Environment = "production"
    ManagedBy   = "Terraform"
  }
}

# Use module outputs
resource "aws_instance" "web" {
  subnet_id = module.vpc.public_subnet_ids[0]
  # ... other configuration
}
```

---

## State Management

### Local State (Not Recommended for Teams)

```hcl
# terraform.tfstate stored locally
# Simple but problematic for teams
```

### Remote State (Recommended)

**S3 Backend:**
```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}
```

**Create S3 Backend:**
```bash
# Create S3 bucket
aws s3 mb s3://my-terraform-state --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket my-terraform-state \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for locking
aws dynamodb create-table \
  --table-name terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST
```

### State Commands

```bash
# List resources in state
terraform state list

# Show resource details
terraform state show aws_instance.web

# Move resource in state
terraform state mv aws_instance.web aws_instance.web_server

# Remove resource from state (doesn't destroy)
terraform state rm aws_instance.web

# Pull remote state
terraform state pull

# Import existing resource
terraform import aws_instance.web i-0123456789abcdef
```

---

## Workspaces

Manage multiple environments with the same configuration:

```bash
# List workspaces
terraform workspace list

# Create new workspace
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

# Switch workspace
terraform workspace select dev

# Show current workspace
terraform workspace show

# Delete workspace
terraform workspace delete dev
```

**Use workspace in configuration:**
```hcl
resource "aws_instance" "web" {
  instance_type = terraform.workspace == "prod" ? "t3.large" : "t3.micro"

  tags = {
    Environment = terraform.workspace
  }
}
```

---

## Advanced Features

### For Each

```hcl
variable "users" {
  type = map(object({
    role = string
  }))
  default = {
    "alice" = { role = "admin" }
    "bob"   = { role = "user" }
    "carol" = { role = "user" }
  }
}

resource "aws_iam_user" "users" {
  for_each = var.users
  name     = each.key

  tags = {
    Role = each.value.role
  }
}
```

### Dynamic Blocks

```hcl
variable "ingress_rules" {
  type = list(object({
    from_port   = number
    to_port     = number
    protocol    = string
    cidr_blocks = list(string)
  }))
  default = [
    {
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    },
    {
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  ]
}

resource "aws_security_group" "web" {
  name = "web-sg"

  dynamic "ingress" {
    for_each = var.ingress_rules
    content {
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }
}
```

### Conditional Expressions

```hcl
resource "aws_instance" "web" {
  ami           = var.ami_id
  instance_type = var.environment == "prod" ? "t3.large" : "t3.micro"

  # Create instance only in production
  count = var.environment == "prod" ? 1 : 0
}
```

---

## Best Practices

**1. Use Version Control**
```bash
git init
git add .
git commit -m "Initial Terraform configuration"
```

**2. Use Remote State**
```hcl
terraform {
  backend "s3" {
    # ... configuration
  }
}
```

**3. Use Variables**
```hcl
# Don't hardcode values
# Use variables for flexibility
variable "instance_type" {}
```

**4. Use Modules for Reusability**
```hcl
module "vpc" {
  source = "./modules/vpc"
  # ...
}
```

**5. Always Run Plan Before Apply**
```bash
terraform plan -out=tfplan
terraform apply tfplan
```

**6. Use .gitignore**
```
# .gitignore
.terraform/
*.tfstate
*.tfstate.backup
.terraform.lock.hcl
*.tfvars  # If contains secrets
```

**7. Format and Validate**
```bash
terraform fmt -recursive
terraform validate
```

**8. Use Linting and Security Scanning**
```bash
tfsec .
checkov -d .
```

---

## Common Commands

```bash
# Initialize
terraform init

# Format code
terraform fmt

# Validate configuration
terraform validate

# Plan changes
terraform plan
terraform plan -out=tfplan

# Apply changes
terraform apply
terraform apply tfplan
terraform apply -auto-approve

# Destroy infrastructure
terraform destroy
terraform destroy -target=aws_instance.web

# Show current state
terraform show

# Output values
terraform output
terraform output instance_ip

# Refresh state
terraform refresh

# Graph dependencies
terraform graph | dot -Tpng > graph.png
```

---

## Resources

- [Terraform Documentation](https://www.terraform.io/docs)
- [Terraform Registry](https://registry.terraform.io/)
- [Learn Terraform](https://learn.hashicorp.com/terraform)
- [Terraform Best Practices](https://www.terraform-best-practices.com/)

---

**Master Terraform to automate multi-cloud infrastructure provisioning!**
