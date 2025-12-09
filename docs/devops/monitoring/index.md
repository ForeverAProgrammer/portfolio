---
sidebar_position: 5
---

# Monitoring & Logging

Best practices for observability using Prometheus, Grafana, and ELK stack.

## Why Observability Matters

Observability is crucial for:

- Understanding system behavior
- Detecting and diagnosing issues
- Performance optimization
- Capacity planning
- SLA/SLO tracking

## The Three Pillars of Observability

1. **Metrics** - Numerical measurements over time
2. **Logs** - Discrete events with context
3. **Traces** - Request flow through distributed systems

## Prometheus

### What is Prometheus?

Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability.

### Installation

Using Docker:

```bash
docker run -d \
  -p 9090:9090 \
  -v prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

### Configuration

Create `prometheus.yml`:

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'app'
    static_configs:
      - targets: ['localhost:3000']
```

### Instrumenting Your Application

**Node.js Example:**

```javascript
const express = require('express');
const promClient = require('prom-client');

const app = express();

// Create a Registry
const register = new promClient.Registry();

// Add default metrics
promClient.collectDefaultMetrics({ register });

// Custom metrics
const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register]
});

// Middleware to measure request duration
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    end({ method: req.method, route: req.path, status_code: res.statusCode });
  });
  next();
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(3000);
```

### PromQL Queries

Common Prometheus queries:

```promql
# CPU usage
rate(cpu_usage_seconds_total[5m])

# Memory usage
process_resident_memory_bytes / 1024 / 1024

# HTTP request rate
rate(http_requests_total[5m])

# 95th percentile response time
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Error rate
rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m])
```

## Grafana

### Installation

Using Docker:

```bash
docker run -d \
  -p 3000:3000 \
  --name=grafana \
  grafana/grafana
```

### Connecting to Prometheus

1. Navigate to Configuration → Data Sources
2. Add Prometheus data source
3. Set URL to `http://prometheus:9090`
4. Click "Save & Test"

### Creating Dashboards

Example dashboard JSON:

```json
{
  "dashboard": {
    "title": "Application Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ],
        "type": "graph"
      },
      {
        "title": "Error Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total{status=~\"5..\"}[5m])"
          }
        ],
        "type": "graph"
      }
    ]
  }
}
```

### Popular Community Dashboards

- Node Exporter Full (ID: 1860)
- Kubernetes Cluster Monitoring (ID: 7249)
- Docker Container Metrics (ID: 193)

## ELK Stack (Elasticsearch, Logstash, Kibana)

### Docker Compose Setup

```yaml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.11.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch-data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.11.0
    ports:
      - "5000:5000"
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:8.11.0
    ports:
      - "5601:5601"
    depends_on:
      - elasticsearch

volumes:
  elasticsearch-data:
```

### Logstash Configuration

Create `logstash.conf`:

```ruby
input {
  tcp {
    port => 5000
    codec => json
  }
}

filter {
  if [level] == "ERROR" {
    mutate {
      add_tag => ["error"]
    }
  }
}

output {
  elasticsearch {
    hosts => ["elasticsearch:9200"]
    index => "app-logs-%{+YYYY.MM.dd}"
  }
  stdout {
    codec => rubydebug
  }
}
```

### Application Logging

**Node.js with Winston:**

```javascript
const winston = require('winston');
const LogstashTransport = require('winston-logstash-transport').LogstashTransport;

const logger = winston.createLogger({
  transports: [
    new LogstashTransport({
      host: 'logstash',
      port: 5000
    })
  ]
});

logger.info('Application started');
logger.error('An error occurred', { error: err.message });
```

## Loki (Lightweight Alternative to ELK)

### Docker Compose with Loki

```yaml
version: '3.8'

services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yaml:/etc/loki/local-config.yaml

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log
      - ./promtail-config.yaml:/etc/promtail/config.yaml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
```

## Alerting

### Prometheus Alerting Rules

Create `alerts.yml`:

```yaml
groups:
  - name: application_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is {{ $value }} for {{ $labels.instance }}"

      - alert: HighMemoryUsage
        expr: (process_resident_memory_bytes / 1024 / 1024) > 500
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage"
          description: "Memory usage is {{ $value }}MB"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "{{ $labels.instance }} is down"
```

### Alertmanager Configuration

```yaml
global:
  resolve_timeout: 5m

route:
  group_by: ['alertname', 'cluster']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 12h
  receiver: 'default'

receivers:
  - name: 'default'
    email_configs:
      - to: 'alerts@example.com'
        from: 'prometheus@example.com'
        smarthost: smtp.gmail.com:587
        auth_username: 'prometheus@example.com'
        auth_password: 'password'

  - name: 'slack'
    slack_configs:
      - api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL'
        channel: '#alerts'
        title: 'Alert: {{ .GroupLabels.alertname }}'
        text: '{{ range .Alerts }}{{ .Annotations.description }}{{ end }}'
```

## Best Practices

### 1. Label Cardinality

Avoid high-cardinality labels:

❌ **Don't:**
```javascript
counter.inc({ user_id: userId }); // Too many unique values
```

✅ **Do:**
```javascript
counter.inc({ user_type: userType }); // Limited set of values
```

### 2. Structured Logging

Always use structured logs:

```javascript
logger.info('User login', {
  userId: user.id,
  ip: req.ip,
  timestamp: new Date().toISOString()
});
```

### 3. Log Levels

Use appropriate log levels:

- **DEBUG**: Detailed diagnostic information
- **INFO**: General informational messages
- **WARN**: Warning messages for potentially harmful situations
- **ERROR**: Error events that might still allow the application to continue
- **FATAL**: Severe errors that cause premature termination

### 4. Sampling

For high-traffic applications, sample logs:

```javascript
if (Math.random() < 0.1) { // 10% sampling
  logger.debug('Request processed', { requestId });
}
```

### 5. Retention Policies

Set appropriate data retention:

```yaml
# Prometheus
storage:
  tsdb:
    retention.time: 15d
    retention.size: 50GB
```

## Distributed Tracing

### Jaeger Setup

```yaml
version: '3.8'

services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "5775:5775/udp"
      - "6831:6831/udp"
      - "6832:6832/udp"
      - "5778:5778"
      - "16686:16686"
      - "14268:14268"
      - "14250:14250"
      - "9411:9411"
    environment:
      - COLLECTOR_ZIPKIN_HTTP_PORT=9411
```

### OpenTelemetry Integration

```javascript
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');

const provider = new NodeTracerProvider();
provider.addSpanProcessor(
  new SimpleSpanProcessor(
    new JaegerExporter({
      serviceName: 'my-service',
    })
  )
);
provider.register();
```

## Related Topics

- [DevOps Overview](../) - Introduction to DevOps practices
