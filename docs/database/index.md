---
sidebar_position: 2
---

# Database

Master database fundamentals for efficient data storage and retrieval. Learn when to use relational vs non-relational databases and how to choose the right solution for your application.

## What's Covered

This section covers database fundamentals, including relational databases (SQL Server, MySQL, PostgreSQL) and non-relational databases (MongoDB, Redis, Cassandra). Learn the concepts that apply across all database systems and when to use each type.

## Topics

### [SQL Guide](./sql)
Master standard SQL for querying relational databases.

**You'll learn:**
- SELECT, INSERT, UPDATE, DELETE
- JOINs (INNER, LEFT, RIGHT, FULL)
- Aggregate functions and GROUP BY
- Subqueries and CTEs
- Window functions
- Transactions and ACID properties
- Best practices for writing efficient SQL

### [Microsoft SQL Server T-SQL Guide](./tsql-guide)
Learn T-SQL extensions specific to Microsoft SQL Server.

**You'll learn:**
- T-SQL procedural programming (variables, loops, IF/ELSE)
- Error handling with TRY...CATCH
- Stored procedures and functions
- Temporary tables and table variables
- T-SQL specific syntax (TOP, IDENTITY)
- Character encoding (NVARCHAR, N prefix)
- SQL Server best practices

### [MongoDB Guide](./mongodb)
NoSQL document database for flexible, scalable applications.

**You'll learn:**
- Document-oriented data model
- CRUD operations
- Indexing and querying
- When to use MongoDB vs SQL
- Best practices for NoSQL

---

## What is a Database?

A **database** is an organized collection of structured data that can be easily accessed, managed, and updated. Databases are fundamental to modern applications, powering everything from websites and mobile apps to enterprise systems and analytics platforms.

### Why Use a Database?

**Without a database:**
- Data stored in files becomes difficult to search and update
- Multiple users can't safely access data simultaneously
- No data integrity guarantees
- Difficult to scale as data grows
- Complex queries require custom code

**With a database:**
- Fast, efficient data retrieval
- Concurrent access with transactions
- Data integrity and validation
- Scalability (vertical and horizontal)
- Powerful query languages
- Backup and recovery built-in

### Common Database Use Cases

**Web Applications**
- User accounts and authentication
- Content management (posts, comments, products)
- Session storage
- Analytics and metrics

**Mobile Apps**
- Offline data synchronization
- User preferences
- Local caching
- Real-time updates

**Enterprise Systems**
- Customer relationship management (CRM)
- Inventory management
- Financial transactions
- Reporting and business intelligence

**Analytics**
- Log aggregation
- Time-series data
- Data warehousing
- Machine learning datasets

---

## Database Types: Relational vs Non-Relational

### Relational Databases (SQL)

**Structure:** Data organized in **tables** with **rows** and **columns**. Tables are related to each other through **foreign keys**.

```
Users Table               Orders Table
+---------+----------+    +---------+---------+------------+
| user_id | name     |    | order_id| user_id | total      |
+---------+----------+    +---------+---------+------------+
| 1       | Alice    |    | 101     | 1       | 49.99      |
| 2       | Bob      |    | 102     | 1       | 29.99      |
+---------+----------+    | 103     | 2       | 99.99      |
                          +---------+---------+------------+
```

**Key Characteristics:**
- **Schema-based** - Structure defined upfront
- **ACID transactions** - Guarantees data consistency
- **SQL query language** - Standardized across systems
- **Relationships** - Enforce data integrity with foreign keys
- **Normalization** - Reduce data redundancy

**Popular Relational Databases:**
- **Microsoft SQL Server** - Enterprise-grade, Windows-focused
- **PostgreSQL** - Open-source, feature-rich
- **MySQL** - Popular for web applications
- **Oracle Database** - Enterprise, high-performance
- **SQLite** - Embedded, serverless

**Best For:**
- Applications requiring strong data consistency
- Complex relationships between entities
- Financial transactions
- Systems with well-defined schema
- Multi-step operations requiring rollback

**Example Use Cases:**
- Banking systems (transactions must be atomic)
- E-commerce (orders, inventory, users)
- HR management systems
- Accounting software
- Enterprise resource planning (ERP)

---

### Non-Relational Databases (NoSQL)

**Structure:** Flexible data models including **documents**, **key-value pairs**, **graphs**, and **wide-column stores**.

```json
// Document in MongoDB (no fixed schema required)
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Alice",
  "email": "alice@example.com",
  "orders": [
    { "id": 101, "total": 49.99, "date": "2024-01-15" },
    { "id": 102, "total": 29.99, "date": "2024-01-20" }
  ],
  "preferences": {
    "newsletter": true,
    "theme": "dark"
  }
}
```

**Types of NoSQL Databases:**

**1. Document Databases (MongoDB, CouchDB)**
- Store data as JSON-like documents
- Flexible schema (fields can vary)
- Easy to scale horizontally

**2. Key-Value Stores (Redis, DynamoDB)**
- Simple key-value pairs
- Extremely fast lookups
- Great for caching and sessions

**3. Column-Family Stores (Cassandra, HBase)**
- Data stored in columns rather than rows
- Optimized for large-scale data
- High write throughput

**4. Graph Databases (Neo4j, Amazon Neptune)**
- Store relationships as first-class citizens
- Optimized for connected data
- Great for social networks, recommendations

**Key Characteristics:**
- **Flexible schema** - Add fields without migrations
- **Horizontal scalability** - Distribute across many servers
- **High performance** - Optimized for specific use cases
- **Eventual consistency** - May sacrifice immediate consistency for performance
- **Denormalization** - Store related data together

**Best For:**
- Applications with evolving data models
- High-volume, high-velocity data
- Distributed systems requiring horizontal scaling
- Real-time analytics
- Content management systems

**Example Use Cases:**
- Social media (graph relationships)
- Real-time analytics (time-series data)
- Content management (flexible documents)
- Caching layers (key-value)
- IoT sensor data (high-volume writes)

---

## Comparison: When to Use Each

| Factor | Relational (SQL) | Non-Relational (NoSQL) |
|--------|------------------|------------------------|
| **Data Structure** | Fixed schema, tables | Flexible schema, documents/key-value |
| **Scalability** | Vertical (bigger servers) | Horizontal (more servers) |
| **Consistency** | Strong (ACID) | Eventual (BASE) |
| **Relationships** | Complex joins supported | Denormalized, embedded data |
| **Query Language** | SQL (standardized) | Database-specific APIs |
| **Best For** | Complex transactions | High-volume, flexible data |
| **Learning Curve** | Moderate | Varies by type |

### Choose Relational (SQL) When:

- You need **ACID transactions** (banking, e-commerce orders)
- Data has **complex relationships** (users, orders, products, categories)
- Schema is **well-defined and stable**
- You need **strong consistency** guarantees
- Compliance requires **audit trails**
- You're using **reporting and analytics** with complex queries

### Choose Non-Relational (NoSQL) When:

- You need to **scale horizontally** across many servers
- Schema **changes frequently** or is unpredictable
- You're storing **unstructured data** (logs, JSON, multimedia)
- You need **high write throughput** (IoT sensors, click streams)
- Geographic distribution requires **low latency** globally
- You're building **real-time applications** (chat, gaming)

### Hybrid Approach (Polyglot Persistence)

Many modern applications use **both** types of databases:

```
E-commerce Application Architecture:

PostgreSQL (Relational)
└── User accounts, orders, inventory, transactions

MongoDB (Document)
└── Product catalog, reviews, user preferences

Redis (Key-Value)
└── Session storage, caching, real-time counters

Elasticsearch (Search)
└── Product search, autocomplete
```

**Benefits:**
- Use the right tool for each job
- Optimize performance for specific use cases
- Decouple systems for better scalability

**Trade-offs:**
- Increased complexity
- More systems to maintain
- Data synchronization challenges

---

## Database Fundamentals

### ACID vs BASE

**ACID (Relational)**
- **Atomicity** - All or nothing transactions
- **Consistency** - Data integrity maintained
- **Isolation** - Concurrent transactions don't interfere
- **Durability** - Committed data persists

**BASE (NoSQL)**
- **Basically Available** - System remains operational
- **Soft state** - State may change without input
- **Eventual consistency** - Consistency achieved over time

### CAP Theorem

You can only guarantee **two of three**:
- **Consistency** - All nodes see the same data
- **Availability** - Every request gets a response
- **Partition Tolerance** - System works despite network failures

**Relational databases** typically choose **Consistency + Availability** (assume no network partitions)

**NoSQL databases** typically choose **Availability + Partition Tolerance** (eventual consistency)

### Indexing

Indexes speed up data retrieval at the cost of write performance and storage.

**How it works:**
```
Without Index: Scan all rows       With Index: Jump directly to data
Table: 1M rows, find user "Alice"  Table: 1M rows, find user "Alice"
Time: ~1 second                    Time: ~0.001 seconds
```

**Types of Indexes:**
- **Primary Key** - Unique identifier (auto-indexed)
- **Secondary Index** - Additional indexed columns
- **Composite Index** - Index on multiple columns
- **Full-text Index** - For text search
- **Geospatial Index** - For location-based queries

### Transactions

A **transaction** is a sequence of operations that must succeed or fail as a unit.

**Example: Bank transfer**
```sql
BEGIN TRANSACTION;
  -- Deduct from Alice's account
  UPDATE accounts SET balance = balance - 100 WHERE user = 'Alice';

  -- Add to Bob's account
  UPDATE accounts SET balance = balance + 100 WHERE user = 'Bob';
COMMIT;
```

If any step fails, the entire transaction **rolls back** - no partial updates.

### Normalization vs Denormalization

**Normalization (Relational)**
- Reduce data redundancy
- Split data across multiple tables
- Join tables when querying

```sql
-- Normalized: Users and Orders in separate tables
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.user_id = o.user_id;
```

**Denormalization (NoSQL)**
- Store related data together
- Faster reads (no joins)
- More storage (data duplicated)

```json
// Denormalized: User data embedded in order
{
  "order_id": 101,
  "user": {
    "name": "Alice",
    "email": "alice@example.com"
  },
  "total": 49.99
}
```

---

## Getting Started

### Learning Path for Beginners

**1. Start with Relational Databases**
- Understand tables, rows, columns
- Learn SQL basics (SELECT, INSERT, UPDATE, DELETE)
- Practice with SQLite or PostgreSQL
- Learn about primary keys and foreign keys

**2. Master SQL Queries**
- JOINs (INNER, LEFT, RIGHT, FULL)
- Aggregations (COUNT, SUM, AVG, GROUP BY)
- Subqueries and CTEs
- Window functions

**3. Learn Database Design**
- Entity-relationship diagrams
- Normalization (1NF, 2NF, 3NF)
- Indexing strategies
- Performance optimization

**4. Explore NoSQL**
- Try MongoDB for document databases
- Understand when NoSQL is appropriate
- Learn document modeling
- Compare with relational approach

**5. Advanced Topics**
- Replication and high availability
- Sharding and partitioning
- Backup and recovery
- Security and permissions

### Recommended Path by Language

**JavaScript/TypeScript Developers**
- Start with MongoDB (document model maps to JSON)
- Learn PostgreSQL for relational needs
- Use Prisma or TypeORM as ORM

**Java Developers**
- Start with PostgreSQL or MySQL
- Learn JDBC and JPA/Hibernate
- Explore Spring Data for abstraction

**Python Developers**
- Start with PostgreSQL or SQLite
- Learn SQLAlchemy ORM
- Try MongoDB with PyMongo

**.NET/C# Developers**
- Start with Microsoft SQL Server
- Learn Entity Framework
- T-SQL for stored procedures

---

## Tools & Resources

### Database Management Tools

**SQL Databases:**
- **SQL Server Management Studio (SSMS)** - For SQL Server
- **pgAdmin** - PostgreSQL management
- **MySQL Workbench** - MySQL management
- **DBeaver** - Universal database tool
- **Azure Data Studio** - Cross-platform, modern UI

**NoSQL Databases:**
- **MongoDB Compass** - MongoDB GUI
- **Studio 3T** - Advanced MongoDB client
- **Redis Commander** - Redis web UI
- **Robo 3T** - Lightweight MongoDB client

### Learning Resources

**SQL:**
- [SQLBolt](https://sqlbolt.com/) - Interactive SQL tutorial
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [SQL Server Documentation](https://learn.microsoft.com/en-us/sql/sql-server/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

**NoSQL:**
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [Redis Documentation](https://redis.io/docs/)
- [Cassandra Academy](https://www.datastax.com/learn)

**Database Design:**
- [Database Design for Beginners](https://www.lucidchart.com/pages/database-diagram/database-design)
- Martin Fowler's "Patterns of Enterprise Application Architecture"

---

## Best Practices

### General Principles

**1. Choose the Right Database**
- Understand your data model
- Consider scalability requirements
- Evaluate consistency needs
- Factor in team expertise

**2. Design for Scale**
- Plan for growth from day one
- Use connection pooling
- Implement caching strategies
- Monitor performance metrics

**3. Security First**
- Use parameterized queries (prevent SQL injection)
- Grant minimum necessary permissions
- Encrypt sensitive data
- Regular security audits
- Keep databases updated

**4. Backup and Recovery**
- Automate regular backups
- Test restore procedures
- Implement point-in-time recovery
- Document disaster recovery plan

**5. Performance Optimization**
- Index frequently queried columns
- Analyze and optimize slow queries
- Use appropriate data types
- Implement caching where appropriate
- Monitor query execution plans

---

## Common Mistakes to Avoid

### SQL Injection

```sql
-- DANGEROUS - Never concatenate user input!
string query = "SELECT * FROM users WHERE username = '" + userInput + "'";

-- SAFE - Use parameterized queries
SELECT * FROM users WHERE username = @username;
```

### Missing Indexes

```sql
-- SLOW - Full table scan
SELECT * FROM orders WHERE customer_id = 12345;

-- FAST - Create index
CREATE INDEX idx_customer ON orders(customer_id);
```

### Over-normalization

```sql
-- Sometimes denormalization improves performance
-- Instead of joining 5 tables every time,
-- consider storing calculated values
```

### Ignoring Transactions

```javascript
// BAD - Race condition possible
await db.updateInventory(productId, -1);
await db.createOrder(userId, productId);

// GOOD - Atomic transaction
await db.transaction(async (trx) => {
  await trx.updateInventory(productId, -1);
  await trx.createOrder(userId, productId);
});
```

---

## Next Steps

Choose your learning path:

1. **New to databases?** Start with basic SQL concepts and try [T-SQL Guide](./tsql-guide)
2. **Need flexibility?** Learn [MongoDB](./mongodb) and NoSQL patterns
3. **Building web apps?** Learn both SQL and NoSQL for polyglot persistence
4. **Enterprise systems?** Deep dive into [T-SQL Guide](./tsql-guide) and advanced SQL Server features

After mastering database basics, explore:
- **ORM frameworks** - Entity Framework, Hibernate, Sequelize
- **Data modeling** - ER diagrams, normalization
- **Performance tuning** - Query optimization, execution plans
- **Cloud databases** - Azure SQL, AWS RDS, MongoDB Atlas
- **Data warehousing** - OLAP, dimensional modeling
- **Database administration** - Backup, monitoring, security

---

**Master databases to build scalable, reliable applications that handle data efficiently!**
