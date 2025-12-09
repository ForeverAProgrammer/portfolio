---
sidebar_position: 5
---

# Cost Optimization

## EC2 Cost Savings

**1. Use Reserved Instances**
- 1-year or 3-year commitment
- Up to 72% savings vs on-demand
- Good for steady-state workloads

**2. Use Spot Instances**
- Up to 90% discount
- Good for fault-tolerant workloads
- Can be interrupted

**3. Right-Sizing**
```bash
# Use AWS Compute Optimizer
aws compute-optimizer get-ec2-instance-recommendations
```

## EKS Cost Optimization

**1. Use Fargate for Variable Workloads**
- Pay only when pods run
- No idle node costs

**2. Use Spot Instances for Worker Nodes**
```yaml
# eksctl config for spot instances
nodeGroups:
  - name: spot-workers
    instancesDistribution:
      instanceTypes: ["t3.medium", "t3.large"]
      onDemandBaseCapacity: 0
      onDemandPercentageAboveBaseCapacity: 0
      spotInstancePools: 2
```

**3. Set Resource Limits**
```yaml
resources:
  requests:
    memory: "256Mi"
    cpu: "250m"
  limits:
    memory: "512Mi"
    cpu: "500m"
```

---

**Optimize AWS costs with reserved instances, spot instances, and proper resource sizing!**
