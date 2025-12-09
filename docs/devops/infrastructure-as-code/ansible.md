---
sidebar_position: 2
---

# Ansible

Master Ansible for agentless automation, configuration management, and application deployment. Learn to automate server setup, software installation, and deployments at scale.

## What is Ansible?

**Ansible** is an open-source automation tool that automates software provisioning, configuration management, and application deployment using simple, human-readable YAML files called playbooks.

### Key Features

- **Agentless** - No software to install on managed nodes (uses SSH)
- **Simple** - YAML syntax, easy to learn
- **Powerful** - Orchestrate complex deployments
- **Idempotent** - Safe to run multiple times
- **Extensible** - Thousands of modules available
- **Multi-Platform** - Linux, Windows, network devices, cloud

---

## Installation

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install ansible
```

**macOS:**
```bash
brew install ansible
```

**Using pip:**
```bash
pip install ansible
```

**Verify installation:**
```bash
ansible --version
```

---

## Ansible Architecture

```
┌────────────────────────────┐
│   Control Node             │
│   (Your machine)           │
│   - Ansible installed      │
│   - Inventory file         │
│   - Playbooks             │
└──────────┬─────────────────┘
           │ SSH
     ┌─────┴──────┬──────────┐
     │            │          │
┌────▼────┐  ┌───▼────┐ ┌──▼─────┐
│Managed  │  │Managed │ │Managed │
│Node 1   │  │Node 2  │ │Node 3  │
│(server) │  │(server)│ │(server)│
└─────────┘  └────────┘ └────────┘
```

---

## Inventory

Define your servers in an inventory file.

### INI Format (inventory.ini)

```ini
# Single host
web1.example.com

# Group of hosts
[webservers]
web1.example.com
web2.example.com
web3.example.com

[databases]
db1.example.com
db2.example.com

# Host with variables
[webservers]
web1.example.com ansible_user=ubuntu ansible_port=2222

# Group variables
[webservers:vars]
ansible_user=ubuntu
ansible_python_interpreter=/usr/bin/python3

# Nested groups
[production:children]
webservers
databases
```

### YAML Format (inventory.yml)

```yaml
all:
  children:
    webservers:
      hosts:
        web1.example.com:
        web2.example.com:
      vars:
        ansible_user: ubuntu
        http_port: 80

    databases:
      hosts:
        db1.example.com:
          ansible_host: 10.0.1.50
        db2.example.com:
          ansible_host: 10.0.1.51
```

### Dynamic Inventory

```bash
# AWS dynamic inventory
ansible-inventory -i aws_ec2.yml --graph

# Custom script
#!/usr/bin/env python3
import json

inventory = {
    "webservers": {
        "hosts": ["web1.example.com", "web2.example.com"]
    },
    "_meta": {
        "hostvars": {}
    }
}

print(json.dumps(inventory))
```

---

## Ad-Hoc Commands

Run single tasks without a playbook:

```bash
# Ping all hosts
ansible all -m ping -i inventory.ini

# Check uptime
ansible webservers -m shell -a "uptime"

# Install package
ansible webservers -m apt -a "name=nginx state=present" --become

# Copy file
ansible webservers -m copy -a "src=./index.html dest=/var/www/html/"

# Restart service
ansible webservers -m service -a "name=nginx state=restarted" --become

# Gather facts
ansible webservers -m setup
```

---

## Playbooks

YAML files defining automation tasks.

### Basic Playbook

```yaml
# webserver.yml
---
- name: Configure web servers
  hosts: webservers
  become: yes  # Run as sudo

  tasks:
    - name: Update apt cache
      apt:
        update_cache: yes

    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Start nginx service
      service:
        name: nginx
        state: started
        enabled: yes

    - name: Copy index.html
      copy:
        src: files/index.html
        dest: /var/www/html/index.html
        owner: www-data
        group: www-data
        mode: '0644'
```

**Run playbook:**
```bash
ansible-playbook -i inventory.ini webserver.yml
```

### Playbook with Variables

```yaml
---
- name: Deploy application
  hosts: webservers
  become: yes

  vars:
    app_name: myapp
    app_version: 1.0.0
    app_port: 8080

  tasks:
    - name: Create app directory
      file:
        path: "/opt/{{ app_name }}"
        state: directory
        mode: '0755'

    - name: Deploy application
      copy:
        src: "{{ app_name }}-{{ app_version }}.jar"
        dest: "/opt/{{ app_name }}/app.jar"

    - name: Create systemd service
      template:
        src: templates/app.service.j2
        dest: "/etc/systemd/system/{{ app_name }}.service"
      notify: Restart application

  handlers:
    - name: Restart application
      systemd:
        name: "{{ app_name }}"
        state: restarted
        daemon_reload: yes
```

### Variables from File

```yaml
# vars/main.yml
app_name: myapp
app_version: 1.0.0
database_host: db.example.com
database_port: 5432
```

```yaml
# playbook.yml
---
- name: Deploy application
  hosts: webservers
  become: yes
  vars_files:
    - vars/main.yml

  tasks:
    - name: Configure application
      template:
        src: config.j2
        dest: /etc/myapp/config.yml
```

---

## Handlers

Run tasks only when notified (typically for service restarts):

```yaml
---
- name: Configure nginx
  hosts: webservers
  become: yes

  tasks:
    - name: Install nginx
      apt:
        name: nginx
        state: present

    - name: Copy nginx config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify:
        - Reload nginx
        - Send notification

  handlers:
    - name: Reload nginx
      service:
        name: nginx
        state: reloaded

    - name: Send notification
      debug:
        msg: "Nginx configuration changed"
```

---

## Templates (Jinja2)

Dynamic configuration files:

**templates/nginx.conf.j2:**
```jinja2
server {
    listen {{ http_port }};
    server_name {{ server_name }};

    root /var/www/{{ app_name }};
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    {% if enable_ssl %}
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/{{ server_name }}.crt;
    ssl_certificate_key /etc/ssl/private/{{ server_name }}.key;
    {% endif %}
}
```

**Using template:**
```yaml
- name: Deploy nginx config
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/{{ app_name }}
  vars:
    http_port: 80
    server_name: example.com
    app_name: myapp
    enable_ssl: true
```

---

## Roles

Organize playbooks into reusable components.

### Role Structure

```
roles/
└── webserver/
    ├── tasks/
    │   └── main.yml
    ├── handlers/
    │   └── main.yml
    ├── templates/
    │   └── nginx.conf.j2
    ├── files/
    │   └── index.html
    ├── vars/
    │   └── main.yml
    ├── defaults/
    │   └── main.yml
    └── meta/
        └── main.yml
```

**roles/webserver/tasks/main.yml:**
```yaml
---
- name: Install nginx
  apt:
    name: nginx
    state: present

- name: Copy nginx config
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/sites-available/default
  notify: Reload nginx

- name: Start nginx
  service:
    name: nginx
    state: started
    enabled: yes
```

**roles/webserver/handlers/main.yml:**
```yaml
---
- name: Reload nginx
  service:
    name: nginx
    state: reloaded
```

**roles/webserver/defaults/main.yml:**
```yaml
---
http_port: 80
server_name: localhost
```

**Using a role:**
```yaml
---
- name: Configure web servers
  hosts: webservers
  become: yes

  roles:
    - webserver
```

---

## Ansible Vault

Encrypt sensitive data:

```bash
# Create encrypted file
ansible-vault create secrets.yml

# Edit encrypted file
ansible-vault edit secrets.yml

# Encrypt existing file
ansible-vault encrypt vars/passwords.yml

# Decrypt file
ansible-vault decrypt vars/passwords.yml

# View encrypted file
ansible-vault view secrets.yml
```

**secrets.yml (after creating):**
```yaml
---
db_password: SuperSecretPassword123!
api_key: abc123def456
```

**Using encrypted variables:**
```yaml
---
- name: Deploy with secrets
  hosts: webservers
  become: yes
  vars_files:
    - secrets.yml

  tasks:
    - name: Configure database connection
      template:
        src: db_config.j2
        dest: /etc/myapp/db.conf
```

**Run with vault:**
```bash
# Prompt for password
ansible-playbook playbook.yml --ask-vault-pass

# Use password file
ansible-playbook playbook.yml --vault-password-file ~/.vault_pass.txt
```

---

## Common Modules

### Package Management

```yaml
# APT (Ubuntu/Debian)
- name: Install packages
  apt:
    name:
      - nginx
      - postgresql
      - python3-pip
    state: present
    update_cache: yes

# YUM (RHEL/CentOS)
- name: Install packages
  yum:
    name:
      - httpd
      - mariadb-server
    state: present
```

### File Operations

```yaml
# Create directory
- name: Create directory
  file:
    path: /opt/myapp
    state: directory
    mode: '0755'
    owner: ubuntu
    group: ubuntu

# Copy file
- name: Copy file
  copy:
    src: files/app.conf
    dest: /etc/myapp/app.conf
    mode: '0644'

# Download file
- name: Download file
  get_url:
    url: https://example.com/app.jar
    dest: /opt/myapp/app.jar

# Create symlink
- name: Create symlink
  file:
    src: /opt/myapp/app-1.0.0
    dest: /opt/myapp/current
    state: link
```

### Service Management

```yaml
# Start service
- name: Start nginx
  service:
    name: nginx
    state: started
    enabled: yes

# Restart service
- name: Restart application
  systemd:
    name: myapp
    state: restarted
    daemon_reload: yes
```

### User Management

```yaml
# Create user
- name: Create application user
  user:
    name: appuser
    state: present
    shell: /bin/bash
    groups: docker
    append: yes
```

### Docker

```yaml
# Pull Docker image
- name: Pull image
  docker_image:
    name: nginx:latest
    source: pull

# Run container
- name: Run container
  docker_container:
    name: webserver
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - /data:/usr/share/nginx/html
    state: started
    restart_policy: always
```

---

## Complete Example: Full Stack Deployment

**Project Structure:**
```
ansible-project/
├── inventory/
│   ├── production
│   └── staging
├── group_vars/
│   ├── all.yml
│   ├── webservers.yml
│   └── databases.yml
├── roles/
│   ├── common/
│   ├── webserver/
│   ├── database/
│   └── application/
├── playbooks/
│   ├── site.yml
│   ├── webservers.yml
│   └── databases.yml
└── ansible.cfg
```

**ansible.cfg:**
```ini
[defaults]
inventory = inventory/production
host_key_checking = False
retry_files_enabled = False
roles_path = roles
```

**inventory/production:**
```ini
[webservers]
web1.example.com
web2.example.com

[databases]
db1.example.com

[all:vars]
ansible_user=ubuntu
ansible_python_interpreter=/usr/bin/python3
```

**group_vars/all.yml:**
```yaml
---
environment: production
app_name: myapp
app_version: 1.0.0
```

**playbooks/site.yml:**
```yaml
---
- name: Configure all servers
  hosts: all
  become: yes
  roles:
    - common

- name: Configure web servers
  hosts: webservers
  become: yes
  roles:
    - webserver
    - application

- name: Configure databases
  hosts: databases
  become: yes
  roles:
    - database
```

**Deploy:**
```bash
ansible-playbook playbooks/site.yml
```

---

## Best Practices

**1. Use Roles for Organization**
```
roles/
├── common/
├── webserver/
└── database/
```

**2. Idempotent Tasks**
```yaml
# Good - can run multiple times safely
- name: Ensure nginx is installed
  apt:
    name: nginx
    state: present
```

**3. Use Check Mode (Dry Run)**
```bash
ansible-playbook playbook.yml --check
```

**4. Tagging**
```yaml
- name: Install packages
  apt:
    name: nginx
  tags: [install, nginx]

- name: Configure nginx
  template:
    src: nginx.conf.j2
    dest: /etc/nginx/nginx.conf
  tags: [configure, nginx]
```

```bash
# Run only install tags
ansible-playbook playbook.yml --tags install

# Skip configure tags
ansible-playbook playbook.yml --skip-tags configure
```

**5. Use Variables Wisely**
```yaml
# defaults/main.yml - default values
http_port: 80

# vars/main.yml - constants
app_name: myapp

# group_vars/ - per-group overrides
# host_vars/ - per-host overrides
```

**6. Error Handling**
```yaml
- name: Start service
  service:
    name: myapp
    state: started
  ignore_errors: yes

- name: Check if file exists
  stat:
    path: /etc/myapp/config.yml
  register: config_file

- name: Create config if missing
  template:
    src: config.yml.j2
    dest: /etc/myapp/config.yml
  when: not config_file.stat.exists
```

---

## CI/CD Integration

**GitHub Actions:**
```yaml
# .github/workflows/ansible.yml
name: Ansible Deployment

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Install Ansible
        run: |
          pip install ansible

      - name: Run playbook
        env:
          ANSIBLE_VAULT_PASSWORD: ${{ secrets.VAULT_PASSWORD }}
        run: |
          echo "$ANSIBLE_VAULT_PASSWORD" > vault_pass.txt
          ansible-playbook playbooks/site.yml --vault-password-file vault_pass.txt
```

---

## Useful Commands

```bash
# Check syntax
ansible-playbook playbook.yml --syntax-check

# List tasks
ansible-playbook playbook.yml --list-tasks

# List hosts
ansible-playbook playbook.yml --list-hosts

# Step through playbook
ansible-playbook playbook.yml --step

# Start at specific task
ansible-playbook playbook.yml --start-at-task="Install nginx"

# Limit to specific hosts
ansible-playbook playbook.yml --limit webservers

# Increase verbosity
ansible-playbook playbook.yml -v
ansible-playbook playbook.yml -vv
ansible-playbook playbook.yml -vvv
```

---

## Resources

- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Galaxy](https://galaxy.ansible.com/) - Community roles
- [Ansible Examples](https://github.com/ansible/ansible-examples)
- "Ansible for DevOps" by Jeff Geerling

---

**Master Ansible to automate configuration management and deployments at scale!**
