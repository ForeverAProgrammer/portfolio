# Git Cheat Sheet

A comprehensive reference guide for Git version control commands and workflows.

## Quick Reference

### Initial Setup

```bash
# Configure user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check configuration
git config --list

# Set default branch name
git config --global init.defaultBranch main

# Set default editor
git config --global core.editor "code --wait"
```

---

## Repository Basics

### Creating & Cloning

```bash
# Initialize new repository
git init

# Clone existing repository
git clone <repository-url>

# Clone with specific branch
git clone -b <branch-name> <repository-url>

# Clone with depth (shallow clone)
git clone --depth 1 <repository-url>
```

### Repository Status

```bash
# Check status of working directory
git status

# Short status
git status -s

# Show commit logs
git log

# One-line log format
git log --oneline

# Graph view of branches
git log --graph --oneline --all

# Show specific file history
git log -- <file-path>
```

---

## Making Changes

### Staging Files

```bash
# Stage specific file
git add <file>

# Stage all changes
git add .

# Stage all files of specific type
git add *.js

# Stage parts of a file interactively
git add -p <file>

# Remove file from staging
git reset <file>

# Remove all files from staging
git reset
```

### Committing

```bash
# Commit staged changes
git commit -m "Commit message"

# Commit with detailed message
git commit -m "Title" -m "Description"

# Stage and commit in one step
git commit -am "Commit message"

# Amend last commit (change message or add files)
git commit --amend

# Amend without changing message
git commit --amend --no-edit
```

### Viewing Changes

```bash
# Show unstaged changes
git diff

# Show staged changes
git diff --staged

# Show changes in specific file
git diff <file>

# Compare two branches
git diff <branch1>..<branch2>

# Compare two commits
git diff <commit1> <commit2>

# Show changes in a commit
git show <commit-hash>
```

---

## Branching & Merging

### Branch Management

```bash
# List all local branches
git branch

# List all branches (local and remote)
git branch -a

# Create new branch
git branch <branch-name>

# Switch to branch
git checkout <branch-name>

# Create and switch to new branch
git checkout -b <branch-name>

# Create branch from specific commit
git checkout -b <branch-name> <commit-hash>

# Rename current branch
git branch -m <new-name>

# Delete branch
git branch -d <branch-name>

# Force delete branch (unmerged changes)
git branch -D <branch-name>

# Delete remote branch
git push origin --delete <branch-name>
```

### Merging

```bash
# Merge branch into current branch
git merge <branch-name>

# Merge with no fast-forward
git merge --no-ff <branch-name>

# Abort merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
```

### Rebasing

```bash
# Rebase current branch onto another
git rebase <branch-name>

# Interactive rebase (edit, squash, reorder commits)
git rebase -i HEAD~<number>

# Continue rebase after resolving conflicts
git rebase --continue

# Skip current commit during rebase
git rebase --skip

# Abort rebase
git rebase --abort
```

---

## Remote Repositories

### Managing Remotes

```bash
# List remote repositories
git remote -v

# Add remote repository
git remote add <name> <url>

# Remove remote
git remote remove <name>

# Rename remote
git remote rename <old-name> <new-name>

# Show remote info
git remote show origin

# Change remote URL
git remote set-url origin <new-url>
```

### Syncing with Remotes

```bash
# Fetch changes from remote
git fetch

# Fetch from specific remote
git fetch <remote-name>

# Pull changes (fetch + merge)
git pull

# Pull with rebase
git pull --rebase

# Push to remote
git push

# Push new branch to remote
git push -u origin <branch-name>

# Push all branches
git push --all

# Push tags
git push --tags

# Force push (use with caution!)
git push --force

# Safer force push
git push --force-with-lease
```

---

## Undoing Changes

### Working Directory

```bash
# Discard changes in file
git checkout -- <file>

# Discard all changes
git checkout -- .

# Restore file from specific commit
git checkout <commit-hash> -- <file>

# Using restore (Git 2.23+)
git restore <file>

# Restore all files
git restore .
```

### Commits

```bash
# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes unstaged)
git reset HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Undo to specific commit
git reset --hard <commit-hash>

# Create new commit that undoes changes
git revert <commit-hash>

# Revert multiple commits
git revert <commit1> <commit2>
```

### Stashing

```bash
# Stash current changes
git stash

# Stash with message
git stash save "Work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash apply

# Apply specific stash
git stash apply stash@{2}

# Apply and remove stash
git stash pop

# Remove specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear

# Stash including untracked files
git stash -u
```

---

## Tags

```bash
# List all tags
git tag

# Create lightweight tag
git tag <tag-name>

# Create annotated tag
git tag -a <tag-name> -m "Tag message"

# Tag specific commit
git tag <tag-name> <commit-hash>

# Push tag to remote
git push origin <tag-name>

# Push all tags
git push --tags

# Delete local tag
git tag -d <tag-name>

# Delete remote tag
git push origin --delete <tag-name>

# Checkout specific tag
git checkout <tag-name>
```

---

## Searching & History

### Finding Content

```bash
# Search in tracked files
git grep "search-term"

# Search in specific file type
git grep "search-term" -- "*.js"

# Show line numbers
git grep -n "search-term"

# Search in specific branch
git grep "search-term" <branch-name>
```

### Viewing History

```bash
# Show commit history
git log

# Show last N commits
git log -n 5

# Show commits with diffs
git log -p

# Show commits by author
git log --author="Name"

# Show commits since date
git log --since="2 weeks ago"

# Show commits until date
git log --until="2023-01-01"

# Search commits by message
git log --grep="fix"

# Show who changed each line
git blame <file>

# Show file history across renames
git log --follow <file>
```

---

## Advanced Commands

### Cherry Pick

```bash
# Apply specific commit to current branch
git cherry-pick <commit-hash>

# Cherry pick multiple commits
git cherry-pick <commit1> <commit2>

# Cherry pick without committing
git cherry-pick -n <commit-hash>
```

### Cleaning

```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fdx
```

### Submodules

```bash
# Add submodule
git submodule add <repository-url> <path>

# Initialize submodules
git submodule init

# Update submodules
git submodule update

# Clone with submodules
git clone --recurse-submodules <repository-url>

# Update all submodules
git submodule update --remote
```

---

## Git Workflows

### Feature Branch Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. After PR approval, merge to main
git checkout main
git merge feature/new-feature
git push

# 5. Delete feature branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

### Hotfix Workflow

```bash
# 1. Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-bug

# 2. Fix and commit
git add .
git commit -m "Fix critical bug"

# 3. Merge to main
git checkout main
git merge hotfix/critical-bug

# 4. Merge to develop (if using git-flow)
git checkout develop
git merge hotfix/critical-bug

# 5. Tag the release
git tag -a v1.0.1 -m "Hotfix release"
git push --tags

# 6. Delete hotfix branch
git branch -d hotfix/critical-bug
```

---

## Git Aliases

Speed up common operations with aliases:

```bash
# Add to ~/.gitconfig or use git config --global

# Status shortcuts
git config --global alias.st status
git config --global alias.s "status -s"

# Commit shortcuts
git config --global alias.cm "commit -m"
git config --global alias.ca "commit -am"

# Branch shortcuts
git config --global alias.br branch
git config --global alias.co checkout
git config --global alias.cob "checkout -b"

# Log shortcuts
git config --global alias.lg "log --oneline --graph --all"
git config --global alias.last "log -1 HEAD"

# Diff shortcuts
git config --global alias.df diff
git config --global alias.dfs "diff --staged"

# Undo shortcuts
git config --global alias.unstage "reset HEAD --"
git config --global alias.undo "reset --soft HEAD~1"
```

Usage after setting aliases:
```bash
git st           # Instead of git status
git cm "message" # Instead of git commit -m "message"
git lg           # Instead of git log --oneline --graph --all
```

---

## Troubleshooting

### Common Issues

**Merge conflicts:**
```bash
# 1. Check conflicted files
git status

# 2. Edit files to resolve conflicts
# (Remove conflict markers: <<<<<<<, =======, >>>>>>>)

# 3. Stage resolved files
git add <resolved-files>

# 4. Complete the merge
git commit
```

**Accidentally committed to wrong branch:**
```bash
# 1. Copy commit hash
git log -1

# 2. Undo the commit
git reset --hard HEAD~1

# 3. Switch to correct branch
git checkout correct-branch

# 4. Cherry-pick the commit
git cherry-pick <commit-hash>
```

**Need to change remote URL:**
```bash
# View current remote
git remote -v

# Change remote URL
git remote set-url origin <new-url>

# Verify change
git remote -v
```

**Detached HEAD state:**
```bash
# Create branch from current state
git checkout -b <new-branch-name>

# Or return to a branch
git checkout main
```

---

## Best Practices

### Commit Messages

✅ **Good commit messages:**
```bash
git commit -m "Add user authentication feature"
git commit -m "Fix memory leak in data processing"
git commit -m "Update dependencies to latest versions"
git commit -m "Refactor database connection logic"
```

❌ **Avoid:**
```bash
git commit -m "fix"
git commit -m "updates"
git commit -m "wip"
git commit -m "asdfasdf"
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Example:**
```bash
git commit -m "feat: Add password reset functionality

Implement email-based password reset with token validation.
Tokens expire after 1 hour for security.

Closes #123"
```

### General Guidelines

✅ **Do:**
- Commit often with meaningful messages
- Pull before pushing
- Review changes before committing
- Use branches for features
- Keep commits focused and atomic
- Write clear commit messages

❌ **Don't:**
- Commit sensitive data (passwords, API keys)
- Force push to shared branches
- Commit large binary files (use Git LFS)
- Commit commented-out code
- Mix unrelated changes in one commit

---

## .gitignore

Create a `.gitignore` file to exclude files from version control:

```gitignore
# Dependencies
node_modules/
vendor/

# Environment files
.env
.env.local
.env.*.local

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Build outputs
dist/
build/
*.log

# Temporary files
*.tmp
*.bak
~*
```

---

## Git Hooks

Automate tasks with Git hooks (stored in `.git/hooks/`):

### Pre-commit Hook
```bash
#!/bin/sh
# .git/hooks/pre-commit

# Run linter
npm run lint

# Run tests
npm test

# Check for console.log statements
if git diff --cached | grep -i "console.log"; then
  echo "Found console.log statements. Please remove them."
  exit 1
fi
```

### Commit Message Hook
```bash
#!/bin/sh
# .git/hooks/commit-msg

commit_msg=$(cat "$1")

# Check commit message format
if ! echo "$commit_msg" | grep -qE "^(feat|fix|docs|style|refactor|test|chore):"; then
  echo "Commit message must start with type: feat, fix, docs, etc."
  exit 1
fi
```

Make hooks executable:
```bash
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg
```

---

## Resources

### Official Documentation
- [Git Documentation](https://git-scm.com/doc)
- [Pro Git Book (Free)](https://git-scm.com/book/en/v2)
- [Git Reference](https://git-scm.com/docs)

### Interactive Learning
- [Learn Git Branching](https://learngitbranching.js.org/)
- [GitHub Skills](https://skills.github.com/)
- [Git Immersion](https://gitimmersion.com/)

### Helpful Tools
- [GitKraken](https://www.gitkraken.com/) - Visual Git client
- [Sourcetree](https://www.sourcetreeapp.com/) - Free Git GUI
- [GitHub Desktop](https://desktop.github.com/) - Simple Git client
- [Git Extensions](https://gitextensions.github.io/) - Windows Git GUI

---

## Quick Tips

💡 **Tip 1:** Use `git stash` when you need to switch branches but aren't ready to commit.

💡 **Tip 2:** Use `git diff --staged` to review changes before committing.

💡 **Tip 3:** Use `git log --oneline --graph --all` for a visual branch overview.

💡 **Tip 4:** Use `git commit --amend` to fix your last commit message or add forgotten files.

💡 **Tip 5:** Use `git blame -L 10,20 <file>` to see who changed specific lines.

💡 **Tip 6:** Use `git reflog` to recover "lost" commits.

💡 **Tip 7:** Use `.gitkeep` in empty directories to track them (Git doesn't track empty directories).

💡 **Tip 8:** Use `git bisect` to find which commit introduced a bug.

---

**Master Git to become a more efficient developer. Version control is an essential skill for modern software development!**
