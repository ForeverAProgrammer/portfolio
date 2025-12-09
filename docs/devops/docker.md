---
sidebar_position: 2
---

# Docker Guide

Complete guide to containerization with Docker, from basics to advanced patterns.

## What is Docker?

Docker is a platform for developing, shipping, and running applications in containers. Containers allow you to package an application with all its dependencies into a standardized unit for software development.

## Getting Started

### Installation

Install Docker on your system:

**Ubuntu/Debian:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

**macOS/Windows:**
Download Docker Desktop from [docker.com](https://www.docker.com/products/docker-desktop)

### Your First Container

Run your first container:

```bash
docker run hello-world
```

## Docker Basics

### Images

Images are the blueprint for containers. Pull an image from Docker Hub:

```bash
docker pull nginx:latest
```

List all images:

```bash
docker images
```

### Containers

Create and run a container from an image:

```bash
docker run -d -p 80:80 --name my-nginx nginx:latest
```

List running containers:

```bash
docker ps
```

Stop a container:

```bash
docker stop my-nginx
```

## Dockerfile

Create custom images using a Dockerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Build the image:

```bash
docker build -t my-app:latest .
```

## Docker Compose

Manage multi-container applications with Docker Compose:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_PASSWORD=secretpassword
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

Run your application:

```bash
docker-compose up -d
```

## Best Practices

### 1. Use Specific Image Tags

❌ **Don't:**
```dockerfile
FROM node
```

✅ **Do:**
```dockerfile
FROM node:18-alpine
```

### 2. Minimize Layers

Combine RUN commands:

```dockerfile
RUN apt-get update && \
    apt-get install -y package1 package2 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### 3. Use .dockerignore

Create a `.dockerignore` file:

```
node_modules
npm-debug.log
.git
.gitignore
README.md
.env
```

### 4. Multi-stage Builds

Reduce image size with multi-stage builds:

```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
CMD ["node", "dist/index.js"]
```

## Common Commands Reference

| Command | Description |
|---------|-------------|
| `docker ps` | List running containers |
| `docker ps -a` | List all containers |
| `docker images` | List images |
| `docker logs <container>` | View container logs |
| `docker exec -it <container> bash` | Enter container shell |
| `docker rm <container>` | Remove container |
| `docker rmi <image>` | Remove image |
| `docker system prune` | Clean up unused resources |

## Next Steps

- Explore [Kubernetes Guide](./kubernetes.md) for orchestration
- Learn about [CI/CD Setup](./cicd.md) for automated deployments
- Review [DevOps Best Practices](./)
