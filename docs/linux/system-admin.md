---
sidebar_position: 5
---

# System Administration

Essential Linux system administration commands for managing processes, services, and system resources.

## System Information

### Hardware & System

```bash
# System information
uname -a              # Kernel and system info
hostnamectl           # Hostname and OS info
lsb_release -a        # Distribution info

# CPU information
lscpu
cat /proc/cpuinfo
nproc                 # Number of CPU cores

# Memory usage
free -h               # Human-readable
cat /proc/meminfo
vmstat                # Virtual memory statistics

# Disk usage
df -h                 # Disk space
du -sh folder/        # Directory size
du -h --max-depth=1   # Size of subdirectories
lsblk                 # List block devices

# Hardware information
lshw                  # Detailed hardware (needs sudo)
sudo lshw -short      # Summary view
lspci                 # PCI devices
lsusb                 # USB devices
```

### System Uptime & Load

```bash
# System uptime
uptime

# Load average
cat /proc/loadavg

# Who is logged in
who
w                     # More detailed
last                  # Login history
```

## Process Management

### Viewing Processes

```bash
# List all processes
ps aux                # All processes with details
ps aux | grep name    # Find specific process
ps -ef                # Alternative format

# Process tree
pstree
pstree -p             # Show PIDs

# Interactive process viewer
top                   # Classic viewer
htop                  # Better (install with: sudo apt install htop)

# Sort processes by memory
ps aux --sort=-%mem | head -10

# Sort processes by CPU
ps aux --sort=-%cpu | head -10
```

### Managing Processes

```bash
# Kill processes
kill PID              # Graceful shutdown (SIGTERM)
kill -9 PID           # Force kill (SIGKILL)
kill -15 PID          # Explicit SIGTERM
killall process-name  # Kill all instances by name
pkill pattern         # Kill by pattern matching

# Process priority (nice values: -20 to 19, lower = higher priority)
nice -n 10 command    # Start with low priority
renice -n 5 -p PID    # Change priority of running process

# Background and foreground
command &             # Run in background
jobs                  # List background jobs
fg %1                 # Bring job 1 to foreground
bg %1                 # Resume job 1 in background

# Suspend and resume
Ctrl+Z                # Suspend current process
fg                    # Resume in foreground
bg                    # Resume in background
```

### Process Information

```bash
# Detailed process info
ps -p PID -o pid,ppid,cmd,%mem,%cpu

# Process resource usage
top -p PID

# List open files by process
lsof -p PID

# Process working directory
pwdx PID

# Process environment
cat /proc/PID/environ | tr '\0' '\n'
```

## Service Management (systemd)

### Basic Service Control

```bash
# Start/stop services
sudo systemctl start service-name
sudo systemctl stop service-name
sudo systemctl restart service-name
sudo systemctl reload service-name    # Reload config without restart

# Check service status
sudo systemctl status service-name
systemctl is-active service-name
systemctl is-enabled service-name

# Enable/disable at boot
sudo systemctl enable service-name
sudo systemctl disable service-name
sudo systemctl enable --now service-name  # Enable and start
```

### Listing Services

```bash
# List all services
systemctl list-units --type=service
systemctl list-units --type=service --all
systemctl list-units --type=service --state=running
systemctl list-units --type=service --state=failed

# List enabled services
systemctl list-unit-files --type=service --state=enabled
```

### Service Logs

```bash
# View service logs
sudo journalctl -u service-name
sudo journalctl -u service-name -f          # Follow logs
sudo journalctl -u service-name --since today
sudo journalctl -u service-name --since "2 hours ago"
sudo journalctl -u service-name -n 50       # Last 50 lines
```

### Common Services

```bash
# SSH service
sudo systemctl status ssh
sudo systemctl restart ssh

# Nginx/Apache
sudo systemctl status nginx
sudo systemctl reload nginx

# Docker
sudo systemctl status docker
sudo systemctl enable docker

# Cron (scheduled tasks)
sudo systemctl status cron
```

## Networking

### Network Configuration

```bash
# Show IP addresses
ip addr show
ip a                  # Shorthand
hostname -I           # Simple IP display

# Network interfaces
ip link show
ifconfig              # Legacy (may need: sudo apt install net-tools)

# Routing table
ip route show
route -n              # Legacy

# DNS configuration
cat /etc/resolv.conf
systemd-resolve --status  # systemd DNS
```

### Network Testing

```bash
# Test connectivity
ping google.com
ping -c 4 google.com  # Send 4 packets only
ping6 google.com      # IPv6

# Trace route
traceroute google.com
mtr google.com        # Better alternative (install: sudo apt install mtr)

# DNS lookup
nslookup google.com
dig google.com
dig +short google.com
host google.com
```

### Port and Connection Management

```bash
# Listening ports
netstat -tuln         # Legacy
ss -tuln              # Modern (faster)
ss -tulpn             # Include process names (needs sudo)

# Active connections
netstat -tunp
ss -tunp

# Check specific port
lsof -i :8080         # What's using port 8080
ss -tuln | grep :8080

# Port scanning (local)
nc -zv localhost 1-1000  # Scan ports 1-1000
```

### Firewall (UFW)

```bash
# Check firewall status
sudo ufw status
sudo ufw status verbose

# Enable/disable firewall
sudo ufw enable
sudo ufw disable

# Allow ports
sudo ufw allow 22         # SSH
sudo ufw allow 80/tcp     # HTTP
sudo ufw allow 443/tcp    # HTTPS
sudo ufw allow 3000:3999/tcp  # Port range

# Allow from specific IP
sudo ufw allow from 192.168.1.100

# Deny port
sudo ufw deny 23

# Delete rule
sudo ufw delete allow 80

# Reset firewall
sudo ufw reset
```

## File Compression & Archives

### Tar Archives

```bash
# Create tar.gz archive
tar -czf archive.tar.gz folder/

# Extract tar.gz
tar -xzf archive.tar.gz

# Extract to specific directory
tar -xzf archive.tar.gz -C /path/to/directory

# List contents without extracting
tar -tzf archive.tar.gz

# Create tar.bz2 (better compression)
tar -cjf archive.tar.bz2 folder/
tar -xjf archive.tar.bz2

# Flags explained:
# -c: create
# -x: extract
# -z: gzip compression
# -j: bzip2 compression
# -f: file name
# -v: verbose
# -t: list contents
```

### Zip Files

```bash
# Create zip
zip -r archive.zip folder/

# Extract zip
unzip archive.zip

# Extract to specific directory
unzip archive.zip -d /path/to/directory

# List zip contents
unzip -l archive.zip

# Test zip integrity
unzip -t archive.zip
```

## Text Processing

### Essential Tools

```bash
# grep - Search patterns
grep "pattern" file.txt
grep -r "pattern" folder/     # Recursive
grep -i "pattern" file.txt    # Case-insensitive
grep -n "pattern" file.txt    # Show line numbers
grep -v "pattern" file.txt    # Invert match (exclude)

# awk - Pattern scanning and processing
awk '{print $1}' file.txt              # Print first column
awk -F: '{print $1}' /etc/passwd       # Custom delimiter
awk '{sum+=$1} END {print sum}' file   # Sum numbers

# sed - Stream editor
sed 's/old/new/' file.txt          # Replace first occurrence
sed 's/old/new/g' file.txt         # Replace all
sed -i 's/old/new/g' file.txt      # Edit file in-place
sed -n '10,20p' file.txt           # Print lines 10-20

# cut - Cut sections from lines
cut -d: -f1 /etc/passwd            # Get first field
echo "a,b,c" | cut -d, -f2         # Output: b

# sort - Sort lines
sort file.txt
sort -r file.txt                   # Reverse
sort -n file.txt                   # Numeric sort
sort -k2 file.txt                  # Sort by second field

# uniq - Remove duplicates (requires sorted input)
sort file.txt | uniq
uniq -c file.txt                   # Count occurrences
uniq -d file.txt                   # Only show duplicates
```

## Environment Variables

### Viewing Variables

```bash
# View all environment variables
env
printenv

# View specific variable
echo $HOME
echo $PATH
echo $USER
echo $SHELL

# Check if variable is set
echo ${VAR:-not set}
```

### Setting Variables

```bash
# Temporary variable (current session only)
export MY_VAR="value"

# Permanent variable (add to shell config)
echo 'export MY_VAR="value"' >> ~/.bashrc
source ~/.bashrc

# System-wide variable
sudo nano /etc/environment
# Add: MY_VAR="value"
```

### PATH Management

```bash
# View PATH
echo $PATH

# Add to PATH temporarily
export PATH=$PATH:/new/path

# Add to PATH permanently
echo 'export PATH=$PATH:/new/path' >> ~/.bashrc
source ~/.bashrc
```

## System Logs

### Journal (systemd)

```bash
# View all logs
sudo journalctl

# Follow logs (like tail -f)
sudo journalctl -f

# Show only today's logs
sudo journalctl --since today

# Show recent logs
sudo journalctl --since "1 hour ago"
sudo journalctl --since "2025-01-01 00:00:00"

# Filter by priority
sudo journalctl -p err        # Errors only
sudo journalctl -p warning    # Warnings and above

# Boot logs
sudo journalctl -b            # Current boot
sudo journalctl -b -1         # Previous boot
```

### Traditional Logs

```bash
# Common log locations
/var/log/syslog       # System logs
/var/log/auth.log     # Authentication logs
/var/log/kern.log     # Kernel logs
/var/log/dmesg        # Boot messages

# View logs
sudo tail -f /var/log/syslog
sudo less /var/log/auth.log

# Search logs
sudo grep "error" /var/log/syslog
sudo grep "Failed password" /var/log/auth.log
```

## Scheduled Tasks (Cron)

### Crontab Management

```bash
# Edit user crontab
crontab -e

# List current crontab
crontab -l

# Remove crontab
crontab -r

# Edit another user's crontab (requires sudo)
sudo crontab -u username -e
```

### Cron Syntax

```bash
# Format: minute hour day month weekday command
# ┌───────────── minute (0 - 59)
# │ ┌───────────── hour (0 - 23)
# │ │ ┌───────────── day of month (1 - 31)
# │ │ │ ┌───────────── month (1 - 12)
# │ │ │ │ ┌───────────── day of week (0 - 7, Sunday = 0 or 7)
# │ │ │ │ │
# * * * * * command

# Examples:
0 2 * * * /path/to/backup.sh          # Daily at 2 AM
*/15 * * * * /path/to/check.sh        # Every 15 minutes
0 0 * * 0 /path/to/weekly.sh          # Weekly on Sunday
0 0 1 * * /path/to/monthly.sh         # Monthly on 1st
```

## Performance Monitoring

### CPU and Memory

```bash
# Real-time monitoring
top
htop

# CPU usage
mpstat 1              # Update every second (install: sudo apt install sysstat)

# Memory usage
free -h
watch -n 1 free -h    # Update every second
```

### Disk I/O

```bash
# Disk I/O statistics
iostat                # Install: sudo apt install sysstat
iostat -x 1           # Extended stats, update every second

# Per-process I/O
iotop                 # Install: sudo apt install iotop
```

## Next Steps

- Master [Terminal Basics](./terminal-basics) for command-line efficiency
- Learn [User Management](./user-management) for access control
- Explore [Package Management](./package-management) for software installation
- Review [Security Best Practices](./security) for system hardening
