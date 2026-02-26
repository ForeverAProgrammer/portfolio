---
sidebar_position: 4
---

# Package Management

Learn how to install, update, and manage software packages on Linux systems.

## Package Managers by Distribution

| Distribution | Package Manager | Package Format |
|--------------|-----------------|----------------|
| Ubuntu/Debian | `apt`, `dpkg` | `.deb` |
| Fedora | `dnf` | `.rpm` |
| CentOS/RHEL | `yum`, `dnf` | `.rpm` |
| Arch Linux | `pacman` | `.pkg.tar.zst` |
| openSUSE | `zypper` | `.rpm` |

## APT (Ubuntu/Debian)

### Basic Commands

```bash
# Update package lists
sudo apt update

# Upgrade packages
sudo apt upgrade        # Upgrade installed packages
sudo apt full-upgrade   # Upgrade and handle dependencies

# Install package
sudo apt install package-name
sudo apt install package1 package2  # Multiple packages

# Remove package
sudo apt remove package-name         # Keep configuration
sudo apt purge package-name          # Remove everything
sudo apt autoremove                  # Remove unused dependencies

# Search for packages
apt search keyword
apt-cache search keyword

# Show package information
apt show package-name

# List installed packages
apt list --installed
dpkg -l
```

### Package Information

```bash
# Check if package is installed
dpkg -l | grep package-name

# List files installed by package
dpkg -L package-name

# Find which package provides a file
dpkg -S /path/to/file

# Show package dependencies
apt-cache depends package-name

# Show reverse dependencies (what depends on this package)
apt-cache rdepends package-name
```

### Managing Repositories

```bash
# Add repository
sudo add-apt-repository ppa:repository/name
sudo apt update

# Remove repository
sudo add-apt-repository --remove ppa:repository/name

# Edit sources list
sudo nano /etc/apt/sources.list
```

## DNF/YUM (Fedora/RHEL/CentOS)

### Basic Commands

```bash
# Update package database
sudo dnf check-update

# Install package
sudo dnf install package-name

# Update packages
sudo dnf update
sudo dnf upgrade

# Remove package
sudo dnf remove package-name

# Search packages
dnf search keyword

# Show package info
dnf info package-name

# List installed packages
dnf list installed
```

### Package Groups

```bash
# List available groups
dnf group list

# Install group
sudo dnf group install "Development Tools"

# Remove group
sudo dnf group remove "Development Tools"
```

## Snap Packages (Universal)

Snap works across multiple distributions:

```bash
# Install snap (if not already installed)
sudo apt install snapd  # Ubuntu/Debian

# Find packages
snap find keyword

# Install package
sudo snap install package-name

# List installed snaps
snap list

# Update snaps
sudo snap refresh
sudo snap refresh package-name  # Update specific package

# Remove snap
sudo snap remove package-name
```

## Flatpak (Universal)

Another universal package format:

```bash
# Install Flatpak
sudo apt install flatpak  # Ubuntu/Debian

# Add Flathub repository
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo

# Search packages
flatpak search keyword

# Install package
flatpak install flathub com.application.Name

# Run flatpak application
flatpak run com.application.Name

# Update flatpaks
flatpak update

# Remove flatpak
flatpak uninstall com.application.Name
```

## System Maintenance

### Cleaning Up

```bash
# Ubuntu/Debian
sudo apt clean          # Clear package cache
sudo apt autoclean      # Remove old package versions
sudo apt autoremove     # Remove unused dependencies

# Fedora/CentOS
sudo dnf clean all      # Clean cache
sudo dnf autoremove     # Remove unused dependencies
```

### Checking Disk Usage

```bash
# Check apt cache size
du -sh /var/cache/apt/archives

# Check package database
du -sh /var/lib/apt/lists

# Find large packages
dpkg-query -W -f='${Installed-Size;8}  ${Package}\n' | sort -n | tail -20
```

## Troubleshooting

### Fix Broken Packages

```bash
# Ubuntu/Debian
sudo apt --fix-broken install
sudo dpkg --configure -a

# If package manager is locked
sudo rm /var/lib/dpkg/lock-frontend
sudo rm /var/lib/dpkg/lock
sudo dpkg --configure -a
sudo apt update
```

### Hold/Unhold Packages

```bash
# Prevent package from being updated
sudo apt-mark hold package-name

# Allow updates again
sudo apt-mark unhold package-name

# List held packages
apt-mark showhold
```

## Installing from Source

When packages aren't available in repositories:

```bash
# 1. Install build tools
sudo apt install build-essential

# 2. Download source
wget https://example.com/software.tar.gz
tar -xzf software.tar.gz
cd software

# 3. Configure, compile, install
./configure
make
sudo make install

# 4. Clean up build files
make clean
```

## Best Practices

### Security Updates

```bash
# Ubuntu - install security updates only
sudo apt upgrade -s | grep -i security

# Automatic security updates (Ubuntu)
sudo apt install unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

### Before System Upgrades

```bash
# 1. Update package lists
sudo apt update

# 2. Check what will be upgraded
apt list --upgradable

# 3. Perform upgrade
sudo apt upgrade

# 4. Clean up
sudo apt autoremove
sudo apt autoclean
```

### Repository Management

- Only add trusted repositories
- Use official PPAs when possible
- Keep repository list minimal
- Remove unused repositories

## Common Packages

### Development Tools

```bash
# Ubuntu/Debian
sudo apt install build-essential git curl wget vim

# Fedora
sudo dnf groupinstall "Development Tools"
sudo dnf install git curl wget vim
```

### System Utilities

```bash
# Useful system tools
sudo apt install htop ncdu tree net-tools
```

## Next Steps

- Learn about [System Administration](/docs/linux/system-admin) for managing services
- Master [Terminal Basics](/docs/linux/terminal-basics) for package management efficiency
