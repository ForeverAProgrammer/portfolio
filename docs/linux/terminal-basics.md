---
sidebar_position: 2
---

# Linux Terminal Basics

The terminal (command line) is a powerful interface for interacting with Linux. This guide covers essential commands to get you productive quickly.

## Opening the Terminal

- **Ubuntu/Debian:** `Ctrl + Alt + T`
- **Menu:** Search for "Terminal" or "Console"
- **Right-click:** Desktop → "Open Terminal"

## Command Structure

```bash
command [options] [arguments]
```

**Example:**
```bash
ls -la /home
```
- `ls` = command
- `-la` = options (flags)
- `/home` = argument

## Essential Navigation Commands

### pwd (Print Working Directory)
Shows your current location:
```bash
pwd
# Output: /home/username
```

### ls (List)
Lists files and directories:

```bash
ls                  # List files
ls -l               # Long format (detailed)
ls -a               # Show hidden files (starting with .)
ls -la              # Long format + hidden files
ls -lh              # Human-readable file sizes
ls -lt              # Sort by modification time
ls -lS              # Sort by size
ls /path/to/dir     # List specific directory
```

**Common output:**
```
-rw-r--r-- 1 user group 4096 Jan 15 10:30 file.txt
drwxr-xr-x 2 user group 4096 Jan 15 10:30 directory
```

### cd (Change Directory)
Navigate between directories:

```bash
cd /path/to/directory    # Go to specific path
cd ..                    # Go up one level
cd ~                     # Go to home directory
cd -                     # Go to previous directory
cd                       # Go to home directory (no arguments)
cd ../..                 # Go up two levels
```

## File and Directory Operations

### mkdir (Make Directory)
Create directories:

```bash
mkdir dirname              # Create single directory
mkdir -p path/to/dir       # Create nested directories
mkdir dir1 dir2 dir3       # Create multiple directories
```

### touch
Create empty files or update timestamps:

```bash
touch file.txt            # Create new file
touch file1 file2 file3   # Create multiple files
```

### cp (Copy)
Copy files and directories:

```bash
cp source.txt dest.txt              # Copy file
cp -r sourcedir destdir             # Copy directory recursively
cp -i file.txt dest.txt             # Interactive (prompt before overwrite)
cp -v file.txt dest.txt             # Verbose (show what's being copied)
cp *.txt /destination/              # Copy all .txt files
```

### mv (Move/Rename)
Move or rename files:

```bash
mv oldname.txt newname.txt          # Rename file
mv file.txt /new/location/          # Move file
mv -i file.txt destination/         # Interactive mode
mv *.txt /destination/              # Move all .txt files
```

### rm (Remove)
Delete files and directories:

```bash
rm file.txt                # Delete file
rm -i file.txt             # Interactive (confirm deletion)
rm -f file.txt             # Force deletion (no confirmation)
rm -r directory/           # Delete directory recursively
rm -rf directory/          # Force delete directory (DANGEROUS!)
rm *.log                   # Delete all .log files
```

⚠️ **Warning:** `rm -rf` is dangerous and permanent. No trash/recycle bin!

## File Viewing Commands

### cat (Concatenate)
Display entire file content:

```bash
cat file.txt                    # Display file
cat file1.txt file2.txt         # Display multiple files
cat -n file.txt                 # Show line numbers
```

### less
View files page by page:

```bash
less file.txt
```

**Navigation in less:**
- `Space` or `Page Down` - Next page
- `b` or `Page Up` - Previous page
- `/search_term` - Search forward
- `?search_term` - Search backward
- `q` - Quit

### head
View first lines of a file:

```bash
head file.txt               # First 10 lines
head -n 20 file.txt         # First 20 lines
```

### tail
View last lines of a file:

```bash
tail file.txt               # Last 10 lines
tail -n 20 file.txt         # Last 20 lines
tail -f log.txt             # Follow file (watch for changes)
```

## File Permissions

### Understanding Permissions
```
-rw-r--r--
```

- Position 1: File type (`-` = file, `d` = directory)
- Positions 2-4: Owner permissions (rwx)
- Positions 5-7: Group permissions (rwx)
- Positions 8-10: Others permissions (rwx)

**Permission letters:**
- `r` = read (4)
- `w` = write (2)
- `x` = execute (1)

### chmod (Change Mode)
Change file permissions:

```bash
chmod 755 script.sh              # rwxr-xr-x
chmod 644 file.txt               # rw-r--r--
chmod +x script.sh               # Add execute permission
chmod -w file.txt                # Remove write permission
chmod u+x script.sh              # User: add execute
chmod g-w file.txt               # Group: remove write
chmod o-r file.txt               # Others: remove read
```

**Common permissions:**
- `755` - Directories and executables
- `644` - Regular files
- `600` - Private files (only owner)
- `777` - All permissions (avoid this!)

### chown (Change Owner)
Change file ownership:

```bash
sudo chown user:group file.txt       # Change owner and group
sudo chown user file.txt             # Change owner only
sudo chown -R user:group directory/  # Recursive
```

## Searching

### find
Search for files and directories:

```bash
find /path -name "filename"              # Find by name
find . -name "*.txt"                     # Find all .txt files
find /home -type f -name "*.log"         # Find files only
find /home -type d -name "docs"          # Find directories only
find . -size +100M                       # Files larger than 100MB
find . -mtime -7                         # Modified in last 7 days
find . -name "*.tmp" -delete             # Find and delete
```

### grep
Search text within files:

```bash
grep "search_term" file.txt              # Search in file
grep -r "search_term" /path              # Recursive search
grep -i "search_term" file.txt           # Case-insensitive
grep -n "search_term" file.txt           # Show line numbers
grep -v "search_term" file.txt           # Invert match (exclude)
grep -c "search_term" file.txt           # Count matches
grep -l "search_term" *.txt              # List filenames only
```

## System Information

### df (Disk Free)
Show disk space usage:

```bash
df                      # Disk usage
df -h                   # Human-readable (GB, MB)
df -T                   # Show filesystem type
```

### du (Disk Usage)
Show directory/file sizes:

```bash
du -h file.txt          # File size
du -sh directory/       # Directory size summary
du -h --max-depth=1     # Show one level deep
```

### free
Show memory usage:

```bash
free                    # Memory usage
free -h                 # Human-readable
```

### top / htop
Monitor system processes:

```bash
top                     # Process monitor
htop                    # Better process monitor (if installed)
```

**top commands:**
- `q` - Quit
- `M` - Sort by memory
- `P` - Sort by CPU
- `k` - Kill process

### uname
System information:

```bash
uname -a                # All system info
uname -r                # Kernel version
uname -m                # Architecture
```

## Process Management

### ps
List processes:

```bash
ps                      # Your processes
ps aux                  # All processes (detailed)
ps aux | grep process   # Find specific process
```

### kill
Terminate processes:

```bash
kill PID                # Graceful termination
kill -9 PID             # Force kill
killall process_name    # Kill by name
```

### jobs / bg / fg
Manage background jobs:

```bash
command &               # Run in background
jobs                    # List background jobs
fg %1                   # Bring job 1 to foreground
bg %1                   # Resume job 1 in background
Ctrl+Z                  # Suspend current process
```

## Text Processing

### wc (Word Count)
Count lines, words, characters:

```bash
wc file.txt             # Lines, words, characters
wc -l file.txt          # Count lines only
wc -w file.txt          # Count words only
wc -c file.txt          # Count bytes
```

### sort
Sort file content:

```bash
sort file.txt           # Sort alphabetically
sort -n file.txt        # Sort numerically
sort -r file.txt        # Reverse sort
sort -u file.txt        # Remove duplicates
```

### uniq
Remove duplicate lines:

```bash
uniq file.txt           # Remove adjacent duplicates
uniq -c file.txt        # Count occurrences
uniq -d file.txt        # Show only duplicates
```

## Pipes and Redirection

### Pipes (|)
Chain commands:

```bash
ls -l | grep ".txt"              # List files, filter .txt
ps aux | grep firefox            # Find firefox process
cat file.txt | sort | uniq       # Sort and remove duplicates
```

### Output Redirection
```bash
command > file.txt               # Overwrite file
command >> file.txt              # Append to file
command 2> error.log             # Redirect errors
command &> output.log            # Redirect all output
```

### Input Redirection
```bash
command < input.txt              # Read from file
```

## Compression and Archives

### tar
Create and extract archives:

```bash
tar -czf archive.tar.gz directory/       # Create compressed archive
tar -xzf archive.tar.gz                  # Extract compressed archive
tar -czf backup.tar.gz file1 file2       # Archive multiple files
tar -xzf archive.tar.gz -C /destination/ # Extract to specific location
```

**tar flags:**
- `-c` - Create archive
- `-x` - Extract archive
- `-z` - Compress with gzip
- `-f` - Filename
- `-v` - Verbose

### zip / unzip
```bash
zip archive.zip file1 file2      # Create zip
zip -r archive.zip directory/    # Zip directory
unzip archive.zip                # Extract zip
unzip archive.zip -d /path/      # Extract to specific path
```

## Network Commands

### wget
Download files:

```bash
wget https://example.com/file.zip        # Download file
wget -O filename.zip https://url         # Save with custom name
wget -c https://example.com/file.zip     # Resume download
```

### curl
Transfer data:

```bash
curl https://example.com                 # Display content
curl -O https://example.com/file.zip     # Download file
curl -I https://example.com              # Headers only
```

### ping
Test network connectivity:

```bash
ping google.com                          # Test connection
ping -c 4 google.com                     # Send 4 packets only
```

### ssh
Secure shell connection:

```bash
ssh user@hostname                        # Connect to remote
ssh -p 2222 user@hostname                # Custom port
ssh -i key.pem user@hostname             # Use private key
```

### scp
Secure copy:

```bash
scp file.txt user@host:/path/            # Copy to remote
scp user@host:/path/file.txt ./          # Copy from remote
scp -r directory/ user@host:/path/       # Copy directory
```

## Shortcuts and Tips

### Keyboard Shortcuts
- `Ctrl + C` - Cancel current command
- `Ctrl + D` - Exit terminal / EOF
- `Ctrl + Z` - Suspend process
- `Ctrl + L` - Clear screen (same as `clear`)
- `Ctrl + A` - Move to line beginning
- `Ctrl + E` - Move to line end
- `Ctrl + U` - Delete from cursor to beginning
- `Ctrl + K` - Delete from cursor to end
- `Ctrl + R` - Search command history
- `Tab` - Auto-complete

### Command History
```bash
history                 # Show command history
!123                    # Run command #123 from history
!!                      # Run last command
!$                      # Last argument of previous command
```

### Wildcards
```bash
*                       # Match any characters
?                       # Match single character
[abc]                   # Match a, b, or c
[a-z]                   # Match range a through z
```

### Useful Combinations
```bash
command1 && command2    # Run command2 if command1 succeeds
command1 || command2    # Run command2 if command1 fails
command1 ; command2     # Run both regardless
```

## Help and Documentation

```bash
man command             # Manual page
command --help          # Help information
whatis command          # Brief description
which command           # Location of command
type command            # Command type
```

## Resources

- [Linux Command Line Cheat Sheet](https://cheatography.com/davechild/cheat-sheets/linux-command-line/)
- [Bash Guide](https://mywiki.wooledge.org/BashGuide)
- [ExplainShell](https://explainshell.com/) - Explains shell commands
- `man` pages - Built-in documentation
