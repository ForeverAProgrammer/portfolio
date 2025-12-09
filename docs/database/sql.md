---
sidebar_position: 3
---

# SQL Guide

Master Structured Query Language (SQL) for querying and managing relational databases. Learn the fundamentals that apply across all SQL databases including MySQL, PostgreSQL, SQL Server, and Oracle.

## What is SQL?

**SQL (Structured Query Language)** is a standardized programming language used for managing and manipulating relational databases. SQL is the universal language for working with relational data, regardless of the specific database system.

### Key Concepts

**Declarative Language**
- Describe what you want, not how to get it
- Database engine optimizes execution
- Focus on the result, not the steps

**CRUD Operations**
- **C**reate - INSERT data
- **R**ead - SELECT data
- **U**pdate - UPDATE data
- **D**elete - DELETE data

**ACID Transactions**
- **A**tomicity - All or nothing
- **C**onsistency - Data integrity maintained
- **I**solation - Concurrent transactions don't interfere
- **D**urability - Committed data persists

---

## Basic SQL Syntax

### SELECT - Retrieving Data

**Basic SELECT:**
```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary
FROM employees;

-- Select with alias
SELECT
    first_name AS "First Name",
    last_name AS "Last Name",
    salary * 12 AS annual_salary
FROM employees;
```

**WHERE Clause - Filtering:**
```sql
-- Comparison operators
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'Sales';
SELECT * FROM employees WHERE hire_date >= '2020-01-01';

-- Logical operators
SELECT * FROM employees
WHERE salary > 50000 AND department = 'Sales';

SELECT * FROM employees
WHERE department = 'Sales' OR department = 'Marketing';

SELECT * FROM employees
WHERE NOT department = 'IT';

-- IN operator
SELECT * FROM employees
WHERE department IN ('Sales', 'Marketing', 'IT');

-- BETWEEN operator
SELECT * FROM employees
WHERE salary BETWEEN 40000 AND 60000;

-- LIKE operator (pattern matching)
SELECT * FROM employees
WHERE first_name LIKE 'J%';  -- Starts with J

SELECT * FROM employees
WHERE email LIKE '%@gmail.com';  -- Ends with @gmail.com

SELECT * FROM employees
WHERE last_name LIKE '_ohn%';  -- Second letter is 'o', third is 'h', fourth is 'n'

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;
```

**ORDER BY - Sorting:**
```sql
-- Ascending order (default)
SELECT * FROM employees ORDER BY last_name;

-- Descending order
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees
ORDER BY department ASC, salary DESC;
```

**LIMIT / TOP - Limiting Results:**
```sql
-- Standard SQL (PostgreSQL, MySQL)
SELECT * FROM employees
ORDER BY salary DESC
LIMIT 10;

-- SQL Server
SELECT TOP 10 * FROM employees
ORDER BY salary DESC;

-- Oracle
SELECT * FROM employees
WHERE ROWNUM <= 10
ORDER BY salary DESC;
```

---

## Aggregate Functions

**Common Aggregates:**
```sql
-- COUNT - Number of rows
SELECT COUNT(*) FROM employees;
SELECT COUNT(DISTINCT department) FROM employees;

-- SUM - Total
SELECT SUM(salary) FROM employees;

-- AVG - Average
SELECT AVG(salary) FROM employees;

-- MIN and MAX
SELECT MIN(salary) FROM employees;
SELECT MAX(salary) FROM employees;

-- Multiple aggregates
SELECT
    COUNT(*) AS employee_count,
    AVG(salary) AS average_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary
FROM employees;
```

**GROUP BY - Grouping Results:**
```sql
-- Group by single column
SELECT
    department,
    COUNT(*) AS employee_count,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Group by multiple columns
SELECT
    department,
    job_title,
    COUNT(*) AS employee_count
FROM employees
GROUP BY department, job_title;

-- HAVING - Filter groups
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
```

---

## JOIN Operations

**INNER JOIN - Matching Records:**
```sql
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

**LEFT JOIN - All from Left Table:**
```sql
-- All employees, even without department
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

**RIGHT JOIN - All from Right Table:**
```sql
-- All departments, even without employees
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

**FULL OUTER JOIN - All from Both:**
```sql
-- All employees and all departments
SELECT
    e.first_name,
    e.last_name,
    d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

**CROSS JOIN - Cartesian Product:**
```sql
-- Every combination of employees and departments
SELECT
    e.first_name,
    d.department_name
FROM employees e
CROSS JOIN departments d;
```

**Self JOIN - Table Joins Itself:**
```sql
-- Find employees and their managers
SELECT
    e.first_name AS employee,
    m.first_name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;
```

**Multiple JOINs:**
```sql
SELECT
    e.first_name,
    e.last_name,
    d.department_name,
    l.city,
    l.country
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
INNER JOIN locations l ON d.location_id = l.id;
```

---

## Subqueries

**Scalar Subquery - Single Value:**
```sql
-- Employees earning more than average
SELECT first_name, last_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);
```

**IN Subquery - Multiple Values:**
```sql
-- Employees in departments with more than 10 people
SELECT first_name, last_name, department_id
FROM employees
WHERE department_id IN (
    SELECT department_id
    FROM employees
    GROUP BY department_id
    HAVING COUNT(*) > 10
);
```

**EXISTS Subquery:**
```sql
-- Departments that have employees
SELECT department_name
FROM departments d
WHERE EXISTS (
    SELECT 1
    FROM employees e
    WHERE e.department_id = d.id
);
```

**Correlated Subquery:**
```sql
-- Employees earning more than average in their department
SELECT e1.first_name, e1.last_name, e1.salary, e1.department_id
FROM employees e1
WHERE salary > (
    SELECT AVG(e2.salary)
    FROM employees e2
    WHERE e2.department_id = e1.department_id
);
```

---

## INSERT, UPDATE, DELETE

**INSERT - Adding Data:**
```sql
-- Insert single row
INSERT INTO employees (first_name, last_name, email, hire_date, salary)
VALUES ('John', 'Doe', 'john.doe@example.com', '2024-01-15', 50000);

-- Insert multiple rows
INSERT INTO employees (first_name, last_name, email, salary)
VALUES
    ('Alice', 'Smith', 'alice@example.com', 55000),
    ('Bob', 'Johnson', 'bob@example.com', 60000),
    ('Carol', 'Williams', 'carol@example.com', 52000);

-- Insert from SELECT
INSERT INTO employees_archive (first_name, last_name, salary)
SELECT first_name, last_name, salary
FROM employees
WHERE hire_date < '2020-01-01';
```

**UPDATE - Modifying Data:**
```sql
-- Update single row
UPDATE employees
SET salary = 55000
WHERE id = 1;

-- Update multiple columns
UPDATE employees
SET
    salary = salary * 1.10,
    last_review_date = CURRENT_DATE
WHERE department_id = 5;

-- Update with calculation
UPDATE employees
SET salary = salary * 1.05
WHERE performance_rating = 'Excellent';

-- Update with subquery
UPDATE employees
SET manager_id = (
    SELECT id FROM employees WHERE email = 'manager@example.com'
)
WHERE department_id = 3;
```

**DELETE - Removing Data:**
```sql
-- Delete specific rows
DELETE FROM employees
WHERE id = 100;

-- Delete with condition
DELETE FROM employees
WHERE hire_date < '2015-01-01' AND status = 'inactive';

-- Delete all rows (be careful!)
DELETE FROM temp_table;

-- TRUNCATE - Faster for deleting all rows
TRUNCATE TABLE temp_table;
```

---

## Data Definition Language (DDL)

**CREATE TABLE:**
```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    salary DECIMAL(10, 2) CHECK (salary > 0),
    department_id INT,
    manager_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);
```

**ALTER TABLE:**
```sql
-- Add column
ALTER TABLE employees
ADD COLUMN middle_name VARCHAR(50);

-- Modify column
ALTER TABLE employees
MODIFY COLUMN email VARCHAR(150);

-- Drop column
ALTER TABLE employees
DROP COLUMN middle_name;

-- Add constraint
ALTER TABLE employees
ADD CONSTRAINT chk_salary CHECK (salary >= 0);

-- Add foreign key
ALTER TABLE employees
ADD CONSTRAINT fk_department
FOREIGN KEY (department_id) REFERENCES departments(id);
```

**DROP TABLE:**
```sql
-- Drop table
DROP TABLE temp_employees;

-- Drop if exists
DROP TABLE IF EXISTS temp_employees;
```

**CREATE INDEX:**
```sql
-- Single column index
CREATE INDEX idx_last_name ON employees(last_name);

-- Composite index
CREATE INDEX idx_dept_salary ON employees(department_id, salary);

-- Unique index
CREATE UNIQUE INDEX idx_email ON employees(email);

-- Drop index
DROP INDEX idx_last_name ON employees;
```

---

## Common Table Expressions (CTEs)

**Basic CTE:**
```sql
WITH high_earners AS (
    SELECT first_name, last_name, salary, department_id
    FROM employees
    WHERE salary > 80000
)
SELECT
    he.first_name,
    he.last_name,
    he.salary,
    d.department_name
FROM high_earners he
JOIN departments d ON he.department_id = d.id;
```

**Multiple CTEs:**
```sql
WITH
sales_dept AS (
    SELECT id FROM departments WHERE name = 'Sales'
),
top_performers AS (
    SELECT * FROM employees
    WHERE performance_rating = 'Excellent'
)
SELECT tp.*
FROM top_performers tp
WHERE tp.department_id IN (SELECT id FROM sales_dept);
```

**Recursive CTE:**
```sql
-- Organizational hierarchy
WITH RECURSIVE org_chart AS (
    -- Anchor: Top-level managers
    SELECT id, first_name, last_name, manager_id, 1 AS level
    FROM employees
    WHERE manager_id IS NULL

    UNION ALL

    -- Recursive: Employees reporting to previous level
    SELECT e.id, e.first_name, e.last_name, e.manager_id, oc.level + 1
    FROM employees e
    INNER JOIN org_chart oc ON e.manager_id = oc.id
)
SELECT * FROM org_chart ORDER BY level, last_name;
```

---

## Window Functions

**ROW_NUMBER:**
```sql
SELECT
    first_name,
    last_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;
```

**RANK and DENSE_RANK:**
```sql
SELECT
    first_name,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;
```

**PARTITION BY:**
```sql
-- Rank within each department
SELECT
    department_id,
    first_name,
    salary,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank
FROM employees;
```

**Running Totals:**
```sql
SELECT
    hire_date,
    salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;
```

**Moving Average:**
```sql
SELECT
    hire_date,
    salary,
    AVG(salary) OVER (
        ORDER BY hire_date
        ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
    ) AS moving_avg_3
FROM employees;
```

---

## Transactions

**Basic Transaction:**
```sql
BEGIN TRANSACTION;

UPDATE accounts SET balance = balance - 100 WHERE account_id = 1;
UPDATE accounts SET balance = balance + 100 WHERE account_id = 2;

COMMIT;
```

**Transaction with Rollback:**
```sql
BEGIN TRANSACTION;

BEGIN TRY
    INSERT INTO orders (customer_id, total) VALUES (1, 99.99);
    UPDATE inventory SET quantity = quantity - 1 WHERE product_id = 5;

    COMMIT;
END TRY
BEGIN CATCH
    ROLLBACK;
    -- Handle error
END CATCH;
```

---

## NULL Handling

**IS NULL / IS NOT NULL:**
```sql
SELECT * FROM employees WHERE manager_id IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;
```

**COALESCE - Return First Non-NULL:**
```sql
SELECT
    first_name,
    COALESCE(phone, email, 'No contact info') AS contact
FROM employees;
```

**NULLIF - Return NULL if Equal:**
```sql
SELECT
    sales_amount,
    NULLIF(sales_amount, 0) AS sales_nonzero
FROM sales;
```

**NULL in Arithmetic:**
```sql
-- NULL + anything = NULL
SELECT salary, bonus, salary + bonus AS total
FROM employees;  -- total is NULL if bonus is NULL

-- Use COALESCE to handle
SELECT salary, bonus, salary + COALESCE(bonus, 0) AS total
FROM employees;
```

---

## String Functions

```sql
-- Concatenation
SELECT first_name || ' ' || last_name AS full_name FROM employees;  -- PostgreSQL
SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM employees;  -- MySQL/SQL Server

-- Length
SELECT LENGTH(last_name) FROM employees;  -- PostgreSQL/MySQL
SELECT LEN(last_name) FROM employees;  -- SQL Server

-- Substring
SELECT SUBSTRING(email, 1, 10) FROM employees;

-- Upper/Lower case
SELECT UPPER(first_name), LOWER(last_name) FROM employees;

-- Trim
SELECT TRIM(first_name) FROM employees;
SELECT LTRIM(first_name), RTRIM(last_name) FROM employees;

-- Replace
SELECT REPLACE(email, 'old.com', 'new.com') FROM employees;
```

---

## Date Functions

```sql
-- Current date/time
SELECT CURRENT_DATE;
SELECT CURRENT_TIMESTAMP;
SELECT NOW();  -- MySQL/PostgreSQL

-- Extract parts
SELECT EXTRACT(YEAR FROM hire_date) FROM employees;
SELECT EXTRACT(MONTH FROM hire_date) FROM employees;

-- Date arithmetic
SELECT hire_date, hire_date + INTERVAL '1 year' FROM employees;  -- PostgreSQL
SELECT hire_date, DATE_ADD(hire_date, INTERVAL 1 YEAR) FROM employees;  -- MySQL

-- Date difference
SELECT DATEDIFF(CURRENT_DATE, hire_date) AS days_employed FROM employees;
```

---

## Best Practices

**1. Use Explicit Column Names**
```sql
-- ✅ GOOD
SELECT first_name, last_name, email FROM employees;

-- ❌ BAD
SELECT * FROM employees;
```

**2. Always Use WHERE with UPDATE/DELETE**
```sql
-- ✅ GOOD
UPDATE employees SET salary = 50000 WHERE id = 1;

-- ❌ DANGEROUS
UPDATE employees SET salary = 50000;  -- Updates ALL rows!
```

**3. Use Parameterized Queries**
```sql
-- ✅ GOOD - Prevents SQL injection
SELECT * FROM employees WHERE email = ?;

-- ❌ DANGEROUS
SELECT * FROM employees WHERE email = 'user_input';
```

**4. Use Indexes on Frequently Queried Columns**
```sql
CREATE INDEX idx_email ON employees(email);
CREATE INDEX idx_dept_salary ON employees(department_id, salary);
```

**5. Use Transactions for Multiple Operations**
```sql
BEGIN TRANSACTION;
-- Multiple related operations
COMMIT;
```

**6. Use EXPLAIN to Optimize Queries**
```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 5;
EXPLAIN ANALYZE SELECT * FROM employees e JOIN departments d ON e.department_id = d.id;
```

---

## Common Patterns

**Pagination:**
```sql
-- Page 3, 10 items per page
SELECT * FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;
```

**Upsert (Insert or Update):**
```sql
-- PostgreSQL
INSERT INTO employees (id, first_name, last_name, salary)
VALUES (1, 'John', 'Doe', 50000)
ON CONFLICT (id)
DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    salary = EXCLUDED.salary;

-- MySQL
INSERT INTO employees (id, first_name, last_name, salary)
VALUES (1, 'John', 'Doe', 50000)
ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name),
    last_name = VALUES(last_name),
    salary = VALUES(salary);
```

**Find Duplicates:**
```sql
SELECT email, COUNT(*)
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

**Delete Duplicates (Keep First):**
```sql
DELETE FROM employees
WHERE id NOT IN (
    SELECT MIN(id)
    FROM employees
    GROUP BY email
);
```

---

## Database-Specific Extensions

While SQL is standardized, each database has extensions:

- **[T-SQL (SQL Server)](./tsql-guide)** - Microsoft's extensions (variables, procedures, error handling)
- **PL/SQL (Oracle)** - Oracle's procedural extensions
- **PL/pgSQL (PostgreSQL)** - PostgreSQL's procedural language
- **MySQL Extensions** - Stored procedures, triggers, events

---

## Resources

### Official Documentation
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [SQL Server Documentation](https://learn.microsoft.com/en-us/sql/)
- [Oracle Database Documentation](https://docs.oracle.com/en/database/)

### Learning Resources
- [SQLBolt](https://sqlbolt.com/) - Interactive SQL tutorial
- [Mode SQL Tutorial](https://mode.com/sql-tutorial/)
- [W3Schools SQL](https://www.w3schools.com/sql/)

### Practice
- [LeetCode Database](https://leetcode.com/problemset/database/)
- [HackerRank SQL](https://www.hackerrank.com/domains/sql)

---

**Master SQL to efficiently query and manage relational databases!**
