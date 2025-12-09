---
sidebar_position: 3
---

# Linux User Management

User management is essential for system administration and security. This guide covers user accounts, groups, and permissions in Linux.

## Understanding Users and Groups

### User Types

1. **Root User (superuser)**
   - UID: 0
   - Complete system access
   - Can do anything without restrictions

2. **System Users**
   - UID: 1-999 (traditionally 1-499)
   - Run system services and daemons
   - No login shell typically

3. **Regular Users**
   - UID: 1000+
   - Normal user accounts
   - Limited permissions

### Groups
- Every user belongs to at least one group (primary group)
- Users can belong to multiple groups (secondary groups)
- Groups control access to files and resources
- GID (Group ID) similar to UID

## User Identification

### whoami
Show current user:

```bash
whoami
# Output: username
```

### id
Display user and group information:

```bash
id                          # Current user info
id username                 # Specific user info
```

**Example output:**
```
uid=1000(john) gid=1000(john) groups=1000(john),4(adm),27(sudo),999(docker)
```

### who
Show logged-in users:

```bash
who                         # Who is logged in
who -a                      # All information
w                           # Detailed who (what they're doing)
```

### users
List usernames of logged-in users:

```bash
users
```

## Creating Users

### useradd (Low-level)
Create new user:

```bash
sudo useradd username                    # Basic user creation
sudo useradd -m username                 # Create with home directory
sudo useradd -m -s /bin/bash username    # With home dir and bash shell
sudo useradd -m -G sudo,docker username  # Add to groups
sudo useradd -m -c "Full Name" username  # With comment/full name
```

**Common options:**
- `-m` - Create home directory
- `-s /bin/bash` - Set login shell
- `-G groups` - Add to groups
- `-c "comment"` - Full name or description
- `-d /path/home` - Custom home directory
- `-e YYYY-MM-DD` - Account expiration date

### adduser (High-level, Ubuntu/Debian)
Interactive user creation:

```bash
sudo adduser username
```

This prompts for:
- Password
- Full name
- Room number
- Work phone
- Home phone
- Other information

**Recommended for beginners** - more user-friendly than `useradd`.

### Setting Password

```bash
sudo passwd username
```

User can change their own password:
```bash
passwd
```

## Modifying Users

### usermod
Modify user account:

```bash
sudo usermod -aG groupname username      # Add to group
sudo usermod -l newname oldname          # Rename user
sudo usermod -d /new/home -m username    # Change home directory
sudo usermod -s /bin/zsh username        # Change shell
sudo usermod -L username                 # Lock account
sudo usermod -U username                 # Unlock account
sudo usermod -e 2025-12-31 username      # Set expiration date
```

**Important options:**
- `-aG` - **Append** to groups (don't replace)
- `-G` - Set groups (removes from others)
- `-l` - New login name
- `-d` - New home directory
- `-m` - Move home directory contents
- `-s` - New shell
- `-L` - Lock account
- `-U` - Unlock account

### chsh (Change Shell)
Change user's login shell:

```bash
chsh                        # Change your shell
chsh -s /bin/zsh username   # Change another user's shell
```

**Available shells:**
```bash
cat /etc/shells             # List available shells
```

Common shells:
- `/bin/bash` - Bourne Again Shell (default)
- `/bin/zsh` - Z Shell
- `/bin/fish` - Friendly Interactive Shell
- `/bin/dash` - Debian Almquist Shell

## Deleting Users

### userdel
Delete user account:

```bash
sudo userdel username                # Delete user (keep home directory)
sudo userdel -r username             # Delete user and home directory
sudo userdel -rf username            # Force delete with home directory
```

**Caution:** `-r` flag permanently deletes the user's home directory and mail spool.

## Group Management

### Creating Groups

```bash
sudo groupadd groupname              # Create new group
sudo groupadd -g 1500 groupname      # Create with specific GID
```

### Viewing Groups

```bash
groups                               # Current user's groups
groups username                      # Specific user's groups
getent group groupname               # Group details
cat /etc/group                       # All groups
```

### Adding Users to Groups

```bash
sudo usermod -aG groupname username  # Add user to group
sudo gpasswd -a username groupname   # Alternative method
```

**Important:** Use `-aG` to append, not just `-G` (which replaces all groups).

### Removing Users from Groups

```bash
sudo gpasswd -d username groupname   # Remove user from group
```

### Deleting Groups

```bash
sudo groupdel groupname              # Delete group
```

### Changing Primary Group

```bash
sudo usermod -g groupname username   # Change primary group
```

## Important System Groups

Common groups and their purposes:

| Group | Purpose |
|-------|---------|
| `sudo` (Ubuntu) | Can use sudo command |
| `wheel` (RHEL/Fedora) | Can use sudo command |
| `adm` | Read system logs |
| `docker` | Run Docker commands without sudo |
| `www-data` | Web server files |
| `audio` | Access audio devices |
| `video` | Access video devices |
| `cdrom` | Access CD-ROM drive |
| `plugdev` | Access removable devices |

## User Configuration Files

### /etc/passwd
User account information:

```
username:x:UID:GID:comment:home:shell
```

**Example:**
```
john:x:1000:1000:John Doe:/home/john:/bin/bash
```

View specific user:
```bash
grep username /etc/passwd
```

### /etc/shadow
Encrypted passwords (root only):

```bash
sudo cat /etc/shadow
```

**Format:**
```
username:$encrypted_password:last_change:min:max:warn:inactive:expire:reserved
```

### /etc/group
Group information:

```
groupname:x:GID:user1,user2,user3
```

**Example:**
```
docker:x:999:john,jane
```

### /etc/sudoers
Sudo configuration:

```bash
sudo visudo                          # Edit sudoers safely
```

**Never edit directly** - always use `visudo` to prevent syntax errors.

## Sudo Access

### Adding User to Sudo Group

**Ubuntu/Debian:**
```bash
sudo usermod -aG sudo username
```

**RHEL/CentOS/Fedora:**
```bash
sudo usermod -aG wheel username
```

### Using Sudo

```bash
sudo command                         # Run command as root
sudo -i                              # Login as root
sudo -u username command             # Run as different user
sudo -l                              # List sudo privileges
```

### Sudo Without Password (Use Carefully!)

```bash
sudo visudo
```

Add line:
```
username ALL=(ALL) NOPASSWD:ALL
```

Or for specific commands:
```
username ALL=(ALL) NOPASSWD:/usr/bin/apt-get,/usr/bin/systemctl
```

## Ubuntu GUI User Management

### Settings Application

1. Open **Settings**
2. Go to **Users**
3. Click **Unlock** (enter admin password)
4. Click **Add User**
5. Fill in details:
   - Account Type (Administrator or Standard)
   - Full Name
   - Username
6. Set password or allow user to set on first login

### Managing Users

- **Change Account Type:** Administrator ↔ Standard
- **Change Password**
- **Remove User** (with option to keep/delete files)
- **Automatic Login**
- **Fingerprint Login** (if supported)

## User Account Security

### Password Policies

```bash
sudo chage -l username               # View password aging info
sudo chage -M 90 username            # Max password age (90 days)
sudo chage -m 7 username             # Min password age (7 days)
sudo chage -W 14 username            # Warning before expiration (14 days)
sudo chage -E 2025-12-31 username    # Account expiration date
```

### Lock/Unlock Accounts

```bash
sudo passwd -l username              # Lock account
sudo passwd -u username              # Unlock account
sudo usermod -L username             # Lock (alternative)
sudo usermod -U username             # Unlock (alternative)
```

### Disable Account Login

```bash
sudo usermod -s /sbin/nologin username    # Prevent login
sudo usermod -s /bin/false username       # Alternative
```

Re-enable:
```bash
sudo usermod -s /bin/bash username
```

### Force Password Change on Next Login

```bash
sudo chage -d 0 username
```

## Common Tasks

### Create New User with Sudo Access

```bash
# Ubuntu/Debian
sudo adduser newuser
sudo usermod -aG sudo newuser

# RHEL/CentOS/Fedora
sudo useradd -m newuser
sudo passwd newuser
sudo usermod -aG wheel newuser
```

### Create System User (for services)

```bash
sudo useradd -r -s /bin/false servicename
```

### View All Users

```bash
cat /etc/passwd | cut -d: -f1        # List all usernames
getent passwd                        # All user accounts
getent passwd | grep -E ':[0-9]{4,}:' # Regular users only (UID >= 1000)
```

### View All Groups

```bash
cat /etc/group | cut -d: -f1         # List all group names
getent group                         # All groups
```

### Find User's UID and GID

```bash
id -u username                       # User ID
id -g username                       # Primary group ID
```

### Switch Users

```bash
su username                          # Switch to user (requires password)
su - username                        # Switch with user's environment
sudo su - username                   # Switch using sudo
exit                                 # Return to previous user
```

### View Last Logins

```bash
last                                 # Recent logins
last username                        # Specific user logins
lastlog                              # All users' last login
```

## Best Practices

1. **Use sudo instead of root login**
   - More secure and auditable
   - Log in as regular user, then use sudo

2. **Follow principle of least privilege**
   - Grant minimum necessary permissions
   - Use groups for access control

3. **Use strong passwords**
   - Enforce password policies
   - Consider key-based authentication for SSH

4. **Regular audit**
   - Review user accounts regularly
   - Remove unused accounts

5. **Descriptive usernames**
   - Use clear, identifiable usernames
   - Add full names in comment field

6. **Document**
   - Keep track of user purposes
   - Document group memberships

7. **Separate system and user accounts**
   - Don't use UID < 1000 for regular users
   - Keep system users locked

8. **Use groups effectively**
   - Create groups for projects/teams
   - Manage permissions via groups

## Troubleshooting

### User Can't Run Sudo
```bash
# Add to sudo/wheel group
sudo usermod -aG sudo username       # Ubuntu
sudo usermod -aG wheel username      # RHEL/CentOS
# User must log out and back in
```

### Permission Denied on Home Directory
```bash
sudo chown -R username:username /home/username
sudo chmod 755 /home/username
```

### User Locked Out
```bash
sudo passwd -u username              # Unlock account
sudo usermod -U username             # Alternative
```

### Can't Delete User (User is logged in)
```bash
who                                  # Check if logged in
sudo pkill -u username               # Kill user's processes
sudo userdel -r username             # Then delete
```

## Resources

- [Ubuntu User Management](https://help.ubuntu.com/community/AddUsersHowto)
- [Linux Users and Groups](https://wiki.archlinux.org/title/Users_and_groups)
- `man useradd`, `man usermod`, `man userdel` - Manual pages
