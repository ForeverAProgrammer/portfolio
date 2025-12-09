---
sidebar_position: 2
---

# MongoDB

MongoDB is a popular NoSQL document database that stores data in flexible, JSON-like documents. Learn how to leverage MongoDB's flexible schema and powerful query capabilities for modern applications.

## What is MongoDB?

**MongoDB** is a document-oriented NoSQL database designed for scalability, flexibility, and developer productivity. Unlike relational databases that store data in tables with fixed schemas, MongoDB stores data as documents in collections, allowing for dynamic and evolving data structures.

### Key Characteristics

- **Document-Oriented** - Data stored as JSON-like documents (BSON)
- **Flexible Schema** - No predefined schema required
- **Scalable** - Built-in horizontal scaling with sharding
- **High Performance** - Optimized for read/write operations
- **Rich Query Language** - Powerful querying and aggregation
- **Indexing** - Support for various index types

### MongoDB vs SQL Comparison

| Feature | MongoDB | SQL Database |
|---------|---------|--------------|
| **Data Model** | Documents (JSON-like) | Tables (rows and columns) |
| **Schema** | Flexible, dynamic | Fixed, predefined |
| **Relationships** | Embedded documents or references | Foreign keys and joins |
| **Scaling** | Horizontal (sharding) | Vertical (bigger servers) |
| **Transactions** | Multi-document ACID (4.0+) | Full ACID support |
| **Query Language** | MongoDB Query Language | SQL |
| **Best For** | Flexible data, rapid iteration | Complex relationships, strong consistency |

---

## Document Model

### What is a Document?

A **document** in MongoDB is a JSON-like data structure (stored as BSON - Binary JSON) that contains field-value pairs.

**Example Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "age": 28,
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102"
  },
  "interests": ["reading", "hiking", "photography"],
  "registeredAt": ISODate("2024-01-15T10:30:00Z"),
  "isPremium": true
}
```

### Key Concepts

**1. Collections**
- Similar to tables in SQL
- Group of documents
- No enforced schema
- Created automatically when first document inserted

**2. Documents**
- Similar to rows in SQL
- Stored as BSON (Binary JSON)
- Can have different structures within same collection
- Maximum size: 16MB per document

**3. Fields**
- Similar to columns in SQL
- Key-value pairs
- Can contain nested documents
- Can contain arrays

**4. `_id` Field**
- Unique identifier (like primary key)
- Automatically generated if not provided
- Type: ObjectId (12-byte identifier)
- Ensures document uniqueness

---

## CRUD Operations

### Create (Insert)

**Insert One Document:**
```javascript
db.users.insertOne({
  name: "Bob Smith",
  email: "bob@example.com",
  age: 35,
  interests: ["coding", "gaming"]
});

// Returns:
{
  "acknowledged": true,
  "insertedId": ObjectId("507f191e810c19729de860ea")
}
```

**Insert Multiple Documents:**
```javascript
db.users.insertMany([
  { name: "Carol White", email: "carol@example.com", age: 29 },
  { name: "David Lee", email: "david@example.com", age: 42 },
  { name: "Emma Davis", email: "emma@example.com", age: 31 }
]);

// Returns:
{
  "acknowledged": true,
  "insertedIds": [
    ObjectId("507f191e810c19729de860eb"),
    ObjectId("507f191e810c19729de860ec"),
    ObjectId("507f191e810c19729de860ed")
  ]
}
```

### Read (Query)

**Find All Documents:**
```javascript
db.users.find();
// Returns all documents in the collection
```

**Find with Filter:**
```javascript
// Find users older than 30
db.users.find({ age: { $gt: 30 } });

// Find user by email
db.users.find({ email: "alice@example.com" });

// Find users with specific interest
db.users.find({ interests: "coding" });
```

**Find One Document:**
```javascript
db.users.findOne({ email: "bob@example.com" });
// Returns first matching document
```

**Projection (Select Specific Fields):**
```javascript
// Include only name and email
db.users.find(
  { age: { $gt: 30 } },
  { name: 1, email: 1, _id: 0 }
);

// Exclude address field
db.users.find({}, { address: 0 });
```

**Query Operators:**
```javascript
// Comparison operators
db.users.find({ age: { $eq: 28 } });      // Equal
db.users.find({ age: { $ne: 28 } });      // Not equal
db.users.find({ age: { $gt: 25 } });      // Greater than
db.users.find({ age: { $gte: 25 } });     // Greater than or equal
db.users.find({ age: { $lt: 40 } });      // Less than
db.users.find({ age: { $lte: 40 } });     // Less than or equal
db.users.find({ age: { $in: [25, 30, 35] } }); // In array

// Logical operators
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { age: { $lte: 40 } }
  ]
});

db.users.find({
  $or: [
    { age: { $lt: 25 } },
    { age: { $gt: 40 } }
  ]
});

// Array operators
db.users.find({ interests: { $all: ["coding", "gaming"] } }); // Has all
db.users.find({ interests: { $size: 3 } });                   // Array length
```

**Sorting and Limiting:**
```javascript
// Sort by age descending
db.users.find().sort({ age: -1 });

// Limit to 5 results
db.users.find().limit(5);

// Skip first 10, then return 5
db.users.find().skip(10).limit(5);

// Count documents
db.users.countDocuments({ age: { $gt: 30 } });
```

### Update

**Update One Document:**
```javascript
db.users.updateOne(
  { email: "alice@example.com" },      // Filter
  { $set: { age: 29, isPremium: true } } // Update
);

// Returns:
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

**Update Multiple Documents:**
```javascript
// Set all users over 40 as premium
db.users.updateMany(
  { age: { $gt: 40 } },
  { $set: { isPremium: true } }
);
```

**Update Operators:**
```javascript
// $set - Set field value
db.users.updateOne(
  { email: "bob@example.com" },
  { $set: { age: 36 } }
);

// $unset - Remove field
db.users.updateOne(
  { email: "bob@example.com" },
  { $unset: { isPremium: "" } }
);

// $inc - Increment numeric value
db.users.updateOne(
  { email: "bob@example.com" },
  { $inc: { age: 1 } }  // Increment age by 1
);

// $push - Add to array
db.users.updateOne(
  { email: "bob@example.com" },
  { $push: { interests: "music" } }
);

// $pull - Remove from array
db.users.updateOne(
  { email: "bob@example.com" },
  { $pull: { interests: "gaming" } }
);

// $addToSet - Add to array if not exists
db.users.updateOne(
  { email: "bob@example.com" },
  { $addToSet: { interests: "music" } }
);
```

**Replace Document:**
```javascript
// Replace entire document (except _id)
db.users.replaceOne(
  { email: "bob@example.com" },
  {
    name: "Bob Smith Jr.",
    email: "bob@example.com",
    age: 36,
    status: "active"
  }
);
```

**Upsert (Update or Insert):**
```javascript
// Insert if not found, update if found
db.users.updateOne(
  { email: "new@example.com" },
  { $set: { name: "New User", age: 25 } },
  { upsert: true }
);
```

### Delete

**Delete One Document:**
```javascript
db.users.deleteOne({ email: "bob@example.com" });

// Returns:
{
  "acknowledged": true,
  "deletedCount": 1
}
```

**Delete Multiple Documents:**
```javascript
// Delete all users under 18
db.users.deleteMany({ age: { $lt: 18 } });

// Delete all documents in collection
db.users.deleteMany({});
```

---

## Indexing

Indexes improve query performance by allowing MongoDB to quickly locate documents without scanning the entire collection.

### Creating Indexes

**Single Field Index:**
```javascript
// Create index on email field
db.users.createIndex({ email: 1 });  // 1 = ascending, -1 = descending
```

**Compound Index:**
```javascript
// Index on multiple fields
db.users.createIndex({ age: 1, name: 1 });
```

**Unique Index:**
```javascript
// Ensure email is unique
db.users.createIndex({ email: 1 }, { unique: true });
```

**Text Index (for full-text search):**
```javascript
// Enable text search on name and bio fields
db.users.createIndex({ name: "text", bio: "text" });

// Search
db.users.find({ $text: { $search: "alice developer" } });
```

**Geospatial Index:**
```javascript
// For location-based queries
db.places.createIndex({ location: "2dsphere" });

// Find places near coordinates
db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [-122.4194, 37.7749] },
      $maxDistance: 5000  // 5km radius
    }
  }
});
```

### Index Management

```javascript
// List all indexes
db.users.getIndexes();

// Drop specific index
db.users.dropIndex("email_1");

// Drop all indexes (except _id)
db.users.dropIndexes();

// Explain query (see if index is used)
db.users.find({ email: "alice@example.com" }).explain("executionStats");
```

---

## Data Modeling Patterns

### Embedded Documents (Denormalization)

**When to use:** Related data that is always accessed together

```javascript
// User with embedded address
{
  "_id": ObjectId("..."),
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "address": {
    "street": "123 Main St",
    "city": "San Francisco",
    "state": "CA",
    "zipCode": "94102"
  },
  "orders": [
    {
      "orderId": "ORD-001",
      "date": ISODate("2024-01-10"),
      "total": 99.99,
      "items": [
        { "product": "Laptop", "price": 799.99, "qty": 1 }
      ]
    }
  ]
}
```

**Pros:**
- Single query to get all data
- Better performance for reads
- Atomic updates

**Cons:**
- Document size can grow (16MB limit)
- Data duplication
- Harder to query embedded data independently

### References (Normalization)

**When to use:** Large or frequently changing related data

```javascript
// Users collection
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "Alice Johnson",
  "email": "alice@example.com"
}

// Orders collection (references user)
{
  "_id": ObjectId("507f191e810c19729de860ea"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),  // Reference to user
  "date": ISODate("2024-01-10"),
  "total": 99.99,
  "items": [
    { "productId": ObjectId("..."), "qty": 1 }
  ]
}
```

**Querying with references:**
```javascript
// Find user
const user = db.users.findOne({ email: "alice@example.com" });

// Find user's orders
const orders = db.orders.find({ userId: user._id });
```

**Pros:**
- Smaller documents
- No data duplication
- Flexibility to query independently

**Cons:**
- Multiple queries (no joins in older versions)
- More complex application logic

### Hybrid Approach

Often the best solution combines both:

```javascript
{
  "_id": ObjectId("..."),
  "orderId": "ORD-001",
  "userId": ObjectId("507f1f77bcf86cd799439011"),  // Reference
  "user": {                                         // Embedded snapshot
    "name": "Alice Johnson",
    "email": "alice@example.com"
  },
  "items": [/* embedded */],
  "total": 99.99
}
```

**Benefits:** Fast reads (embedded data) + ability to query full user data (reference)

---

## Aggregation Framework

Aggregation pipelines process data and return computed results.

### Basic Aggregation

```javascript
// Average age of all users
db.users.aggregate([
  {
    $group: {
      _id: null,
      averageAge: { $avg: "$age" }
    }
  }
]);
```

### Aggregation Pipeline Stages

**$match - Filter documents:**
```javascript
db.users.aggregate([
  { $match: { age: { $gte: 25 } } }
]);
```

**$group - Group by field:**
```javascript
// Count users by city
db.users.aggregate([
  {
    $group: {
      _id: "$address.city",
      count: { $sum: 1 },
      avgAge: { $avg: "$age" }
    }
  }
]);
```

**$project - Select/reshape fields:**
```javascript
db.users.aggregate([
  {
    $project: {
      name: 1,
      email: 1,
      ageGroup: {
        $cond: {
          if: { $gte: ["$age", 30] },
          then: "Adult",
          else: "Young Adult"
        }
      }
    }
  }
]);
```

**$sort - Sort results:**
```javascript
db.users.aggregate([
  { $sort: { age: -1 } }
]);
```

**$limit and $skip - Pagination:**
```javascript
db.users.aggregate([
  { $skip: 10 },
  { $limit: 5 }
]);
```

**$lookup - Join collections (MongoDB 3.2+):**
```javascript
// Join users with their orders
db.users.aggregate([
  {
    $lookup: {
      from: "orders",           // Collection to join
      localField: "_id",        // Field from users
      foreignField: "userId",   // Field from orders
      as: "userOrders"          // Output array field
    }
  }
]);
```

**Complex Pipeline Example:**
```javascript
// Find top 5 cities by user count, users aged 25-40
db.users.aggregate([
  // Stage 1: Filter
  { $match: { age: { $gte: 25, $lte: 40 } } },

  // Stage 2: Group by city
  {
    $group: {
      _id: "$address.city",
      userCount: { $sum: 1 },
      avgAge: { $avg: "$age" }
    }
  },

  // Stage 3: Sort by count descending
  { $sort: { userCount: -1 } },

  // Stage 4: Limit to top 5
  { $limit: 5 },

  // Stage 5: Reshape output
  {
    $project: {
      _id: 0,
      city: "$_id",
      users: "$userCount",
      averageAge: { $round: ["$avgAge", 1] }
    }
  }
]);
```

---

## Transactions (MongoDB 4.0+)

MongoDB supports multi-document ACID transactions for operations that need atomicity.

```javascript
const session = db.getMongo().startSession();

session.startTransaction();

try {
  // Transfer money between accounts
  db.accounts.updateOne(
    { accountId: "A123" },
    { $inc: { balance: -100 } },
    { session }
  );

  db.accounts.updateOne(
    { accountId: "B456" },
    { $inc: { balance: 100 } },
    { session }
  );

  // Commit transaction
  session.commitTransaction();
} catch (error) {
  // Rollback on error
  session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
```

---

## When to Use MongoDB

### MongoDB is Great For:

- **Rapid Development** - Flexible schema allows quick iteration
- **Content Management** - Blogs, articles with varying structures
- **Catalogs** - Product catalogs with diverse attributes
- **Real-time Analytics** - High-volume data ingestion
- **Mobile Apps** - Syncing offline data
- **IoT Applications** - Sensor data with variable formats
- **Personalization** - User preferences and profiles
- **Caching** - Session storage, temporary data

### Consider SQL Instead When:

- **Complex Transactions** - Multi-step financial operations
- **Strict Data Integrity** - Enforced relationships required
- **Complex Reporting** - Heavy use of joins and aggregations
- **Regulatory Compliance** - ACID guarantees mandatory
- **Well-Defined Schema** - Data structure stable and known
- **Existing SQL Infrastructure** - Team expertise and tooling

---

## Getting Started with MongoDB

### Installation

**MongoDB Community Server:**
```bash
# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Ubuntu
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

**MongoDB Atlas (Cloud - Free Tier Available):**
1. Visit [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create cluster (M0 free tier)
4. Get connection string

### MongoDB Shell (mongosh)

```bash
# Connect to local MongoDB
mongosh

# Connect to MongoDB Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/myDatabase" --apiVersion 1 --username myUser
```

**Basic Shell Commands:**
```javascript
// Show databases
show dbs

// Switch to database (creates if not exists)
use myDatabase

// Show collections
show collections

// Create collection
db.createCollection("users")

// Drop collection
db.users.drop()

// Drop database
db.dropDatabase()
```

---

## MongoDB with Programming Languages

### Node.js (JavaScript/TypeScript)

**Install MongoDB Driver:**
```bash
npm install mongodb
```

**Basic Connection:**
```javascript
const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('myDatabase');
    const users = database.collection('users');

    // Insert
    await users.insertOne({
      name: "Alice",
      email: "alice@example.com",
      age: 28
    });

    // Find
    const user = await users.findOne({ email: "alice@example.com" });
    console.log(user);

  } finally {
    await client.close();
  }
}

run().catch(console.error);
```

**Using Mongoose (ODM):**
```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

// Connect
await mongoose.connect('mongodb://localhost:27017/myDatabase');

// Define schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

// Create model
const User = mongoose.model('User', userSchema);

// Create document
const user = new User({
  name: "Alice",
  email: "alice@example.com",
  age: 28
});
await user.save();

// Query
const users = await User.find({ age: { $gte: 25 } });
```

### Python

**Install PyMongo:**
```bash
pip install pymongo
```

**Basic Usage:**
```python
from pymongo import MongoClient

# Connect
client = MongoClient('mongodb://localhost:27017/')
db = client['myDatabase']
users = db['users']

# Insert
users.insert_one({
    "name": "Alice",
    "email": "alice@example.com",
    "age": 28
})

# Find
user = users.find_one({"email": "alice@example.com"})
print(user)

# Update
users.update_one(
    {"email": "alice@example.com"},
    {"$set": {"age": 29}}
)

# Delete
users.delete_one({"email": "alice@example.com"})
```

### Java

**Add Maven Dependency:**
```xml
<dependency>
    <groupId>org.mongodb</groupId>
    <artifactId>mongodb-driver-sync</artifactId>
    <version>4.11.0</version>
</dependency>
```

**Basic Usage:**
```java
import com.mongodb.client.*;
import org.bson.Document;

public class MongoExample {
    public static void main(String[] args) {
        // Connect
        MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = mongoClient.getDatabase("myDatabase");
        MongoCollection<Document> users = database.getCollection("users");

        // Insert
        Document user = new Document("name", "Alice")
                .append("email", "alice@example.com")
                .append("age", 28);
        users.insertOne(user);

        // Find
        Document found = users.find(new Document("email", "alice@example.com")).first();
        System.out.println(found.toJson());

        mongoClient.close();
    }
}
```

---

## Best Practices

### Schema Design

**1. Favor Embedding for Related Data**
```javascript
// Good - Order with embedded items
{
  "orderId": "ORD-001",
  "items": [
    { "product": "Laptop", "price": 999, "qty": 1 }
  ]
}
```

**2. Use References for Large or Independent Data**
```javascript
// Good - Separate collections for users and posts
// users: { _id, name, email }
// posts: { _id, authorId, title, content }
```

**3. Avoid Unbounded Arrays**
```javascript
// Bad - Array can grow indefinitely
{ "userId": 1, "likes": [/* thousands of items */] }

// Good - Use separate collection or bucket pattern
{ "userId": 1, "likeCount": 5000 }
```

### Performance

**1. Create Indexes for Frequent Queries**
```javascript
db.users.createIndex({ email: 1 });
db.orders.createIndex({ userId: 1, createdAt: -1 });
```

**2. Use Projection to Limit Returned Fields**
```javascript
// Only return needed fields
db.users.find({}, { name: 1, email: 1, _id: 0 });
```

**3. Use Covered Queries**
```javascript
// Index includes all queried and returned fields
db.users.createIndex({ email: 1, name: 1 });
db.users.find({ email: "alice@example.com" }, { name: 1, _id: 0 });
```

**4. Monitor Slow Queries**
```javascript
// Enable profiler
db.setProfilingLevel(1, { slowms: 100 });

// Check slow queries
db.system.profile.find({ millis: { $gt: 100 } });
```

### Security

**1. Enable Authentication**
```javascript
// Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword",
  roles: ["userAdminAnyDatabase"]
})
```

**2. Use Role-Based Access Control**
```javascript
// Create read-only user
use myDatabase
db.createUser({
  user: "readUser",
  pwd: "password",
  roles: ["read"]
})
```

**3. Validate Input**
```javascript
// Use schema validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      required: ["name", "email"],
      properties: {
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        }
      }
    }
  }
});
```

---

## Resources

### Official Documentation
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [MongoDB University](https://university.mongodb.com/) - Free courses
- [MongoDB Drivers](https://www.mongodb.com/docs/drivers/)

### Tools
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Official GUI
- [Studio 3T](https://studio3t.com/) - Advanced MongoDB client
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud database

### Learning Resources
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Blog](https://www.mongodb.com/blog)
- "MongoDB: The Definitive Guide" by Shannon Bradshaw

---

## Next Steps

1. **Install MongoDB** - Try locally or use MongoDB Atlas free tier
2. **Practice CRUD** - Insert, query, update, delete documents
3. **Learn Aggregation** - Master the aggregation pipeline
4. **Schema Design** - Practice embedded vs referenced patterns
5. **Build a Project** - Apply MongoDB in a real application
6. **Explore Advanced Topics** - Replication, sharding, performance tuning

---

**Leverage MongoDB's flexibility to build modern, scalable applications!**
