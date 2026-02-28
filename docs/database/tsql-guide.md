---
sidebar_position: 1
---

# Microsoft SQL Server T-SQL Guide

T-SQL (Transact-SQL) is Microsoft's proprietary extension to standard SQL. While standard SQL covers basic querying (covered in the [SQL Guide](/docs/database/sql)), T-SQL adds procedural programming, enhanced error handling, and Microsoft-specific features.

## What is T-SQL?

**T-SQL (Transact-SQL)** is Microsoft's extension to standard SQL that adds:
- **Procedural programming** - Variables, loops, conditionals
- **Error handling** - TRY...CATCH blocks
- **Stored procedures and functions** - Reusable code blocks
- **Transaction control enhancements** - SAVE TRANSACTION, @@TRANCOUNT
- **Temporary tables** - #temp and ##global temp tables
- **Variables** - DECLARE and SET statements
- **Control flow** - IF, WHILE, CASE

### T-SQL vs Standard SQL

**Standard SQL** (see [SQL Guide](/docs/database/sql)):
- Basic SELECT, INSERT, UPDATE, DELETE
- JOINs, subqueries, CTEs
- Aggregate functions
- Window functions

**T-SQL adds**:
- Procedural programming capabilities
- Microsoft-specific functions and syntax
- Enhanced transaction control
- System-specific features (IDENTITY, SEQUENCES)
- SQL Server specific data types

## Character Encoding and Data Types

### String Data Types

SQL Server has two categories of character types:

#### Regular (Non-Unicode) Types

```sql
-- Fixed-length (padded with spaces)
CHAR(n)          -- Max 8,000 characters
-- Variable-length
VARCHAR(n)       -- Max 8,000 characters
VARCHAR(MAX)     -- Max ~2GB

-- Example
CREATE TABLE Products (
    ProductCode CHAR(10),        -- Always 10 bytes
    ProductName VARCHAR(100)     -- Up to 100 bytes
);
```

**Encoding:** Uses the database's default collation (e.g., Latin1_General_CI_AS)
**Storage:** 1 byte per character (for Latin characters)

#### Unicode Types (Recommended for International Apps)

```sql
-- Fixed-length Unicode
NCHAR(n)         -- Max 4,000 characters
-- Variable-length Unicode
NVARCHAR(n)      -- Max 4,000 characters
NVARCHAR(MAX)    -- Max ~2GB

-- Example
CREATE TABLE Users (
    Username NVARCHAR(50),           -- Supports international characters
    Bio NVARCHAR(MAX),               -- Large text field
    CountryCode NCHAR(2)             -- Fixed 2 characters (e.g., "US")
);
```

**Encoding:** UTF-16
**Storage:** 2 bytes per character
**Prefix:** Use `N` prefix for Unicode literals

```sql
-- ✅ CORRECT: N prefix for Unicode
INSERT INTO Users (Username) VALUES (N'José');
INSERT INTO Users (Username) VALUES (N'你好');

-- ❌ WRONG: Without N prefix (may lose data)
INSERT INTO Users (Username) VALUES ('José');  -- May become 'Jos?'
```

### When to Use Unicode vs Regular Types

| Use NVARCHAR/NCHAR | Use VARCHAR/CHAR |
|-------------------|------------------|
| International characters needed | English-only data |
| Names with accents (José, François) | Product codes, IDs |
| Multi-language support | Log messages (English) |
| User-generated content | Internal system data |
| Future-proofing | Performance-critical (smaller size) |

**Best Practice:** Use NVARCHAR by default unless you have a specific reason not to.

## Fixed vs Dynamic Length Types

### Fixed-Length (CHAR, NCHAR)

```sql
DECLARE @Code CHAR(5) = 'ABC';
-- Stored as: 'ABC  ' (padded with 2 spaces)
-- Always uses 5 bytes
```

**Use when:**
- Data is always the same length
- Examples: Country codes (US, UK), product codes (ABC123)

**Pros:**
- Predictable storage
- Slightly faster for fixed-length data

**Cons:**
- Wastes space if data varies in length
- Trailing spaces can cause issues

### Variable-Length (VARCHAR, NVARCHAR)

```sql
DECLARE @Name VARCHAR(100) = 'John';
-- Stored as: 'John' (no padding)
-- Uses 4 bytes + 2 bytes overhead
```

**Use when:**
- Data length varies
- Examples: Names, descriptions, emails

**Pros:**
- Saves storage space
- More flexible

**Cons:**
- 2 bytes overhead for length tracking

### Comparison

```sql
-- Fixed-length examples
CHAR(10)        -- Social Security Numbers: '123-45-6789'
NCHAR(2)        -- Country codes: 'US', 'UK', 'FR'

-- Variable-length examples
VARCHAR(100)    -- Email addresses
NVARCHAR(200)   -- User names
VARCHAR(MAX)    -- Long text content
```

## T-SQL Syntax Differences

### 1. FROM Clause is Optional

```sql
-- ✅ T-SQL: FROM is optional
SELECT 1;
SELECT GETDATE();
SELECT 1 + 1 AS Result;

-- ❌ Standard SQL (Oracle, PostgreSQL): FROM required
SELECT 1 FROM DUAL;  -- Oracle
SELECT 1;            -- PostgreSQL allows this
```

### 2. Statement Delimiter (Semicolon)

```sql
-- T-SQL: Semicolons are optional (but recommended)
SELECT * FROM Users;
SELECT * FROM Products;

-- Standard SQL: Semicolons required to separate statements
SELECT * FROM Users;
SELECT * FROM Products;
```

**Best Practice:** Always use semicolons for clarity and future compatibility.

### 3. NULL Handling in Arithmetic

```sql
-- NULL in arithmetic operations returns NULL
SELECT 10 + NULL;        -- Returns NULL
SELECT 'Hello' + NULL;   -- Returns NULL

-- Use ISNULL or COALESCE to handle NULLs
SELECT 10 + ISNULL(NULL, 0);     -- Returns 10
SELECT 10 + COALESCE(NULL, 0);   -- Returns 10
```

## Aliases and AS Keyword

### Column Aliases

```sql
-- ✅ GOOD: Use AS keyword (most readable)
SELECT
    FirstName AS First,
    LastName AS Last
FROM Employees;

-- ✅ OK: Without AS (T-SQL allows this)
SELECT
    FirstName First,
    LastName Last
FROM Employees;

-- ❌ AVOID: String literals as aliases (confusing)
SELECT
    FirstName 'First Name',
    LastName 'Last Name'
FROM Employees;

-- ✅ GOOD: Use square brackets for spaces
SELECT
    FirstName AS [First Name],
    LastName AS [Last Name]
FROM Employees;
```

### Table Aliases

```sql
-- ✅ GOOD: Use AS keyword
SELECT e.FirstName, e.LastName, d.DepartmentName
FROM Employees AS e
JOIN Departments AS d ON e.DepartmentId = d.Id;

-- ✅ OK: Without AS
SELECT e.FirstName, e.LastName, d.DepartmentName
FROM Employees e
JOIN Departments d ON e.DepartmentId = d.Id;
```

**Best Practice:** Always use `AS` keyword for clarity.

## Square Brackets and Identifiers

### When to Use Square Brackets

```sql
-- Use brackets for:
-- 1. Reserved keywords
SELECT [Order], [User], [Select] FROM [Table];

-- 2. Spaces in names (avoid this!)
SELECT [First Name], [Last Name] FROM [User Data];

-- 3. Special characters
SELECT [Email@Address] FROM Users;

-- 4. Names starting with numbers
SELECT [123Column] FROM Data;
```

**Best Practice:** Avoid needing brackets by using proper naming:
- No spaces: Use `FirstName` not `First Name`
- No special characters: Use `EmailAddress` not `Email@Address`
- Don't use reserved keywords: Use `OrderId` not `Order`

## Common T-SQL Functions

### String Functions

```sql
-- Concatenation
SELECT 'Hello' + ' ' + 'World';              -- 'Hello World'
SELECT CONCAT('Hello', ' ', 'World');        -- 'Hello World'

-- Length
SELECT LEN('Hello');                         -- 5
SELECT DATALENGTH('Hello');                  -- 5 (bytes)

-- Substring
SELECT SUBSTRING('Hello World', 1, 5);       -- 'Hello'
SELECT LEFT('Hello', 3);                     -- 'Hel'
SELECT RIGHT('Hello', 3);                    -- 'llo'

-- Case conversion
SELECT UPPER('hello');                       -- 'HELLO'
SELECT LOWER('HELLO');                       -- 'hello'

-- Trim
SELECT LTRIM('  Hello');                     -- 'Hello'
SELECT RTRIM('Hello  ');                     -- 'Hello'
SELECT TRIM('  Hello  ');                    -- 'Hello' (SQL Server 2017+)

-- Replace
SELECT REPLACE('Hello World', 'World', 'SQL');  -- 'Hello SQL'
```

### Date Functions

```sql
-- Current date/time
SELECT GETDATE();                            -- 2025-01-15 14:30:00.123
SELECT GETUTCDATE();                         -- UTC time
SELECT SYSDATETIME();                        -- Higher precision

-- Date parts
SELECT YEAR(GETDATE());                      -- 2025
SELECT MONTH(GETDATE());                     -- 1
SELECT DAY(GETDATE());                       -- 15
SELECT DATEPART(HOUR, GETDATE());            -- 14

-- Date arithmetic
SELECT DATEADD(DAY, 7, GETDATE());           -- 7 days from now
SELECT DATEADD(MONTH, -1, GETDATE());        -- 1 month ago
SELECT DATEDIFF(DAY, '2025-01-01', GETDATE());  -- Days since Jan 1

-- Formatting
SELECT FORMAT(GETDATE(), 'yyyy-MM-dd');      -- '2025-01-15'
SELECT CONVERT(VARCHAR, GETDATE(), 120);     -- '2025-01-15 14:30:00'
```

### Conversion Functions

```sql
-- CAST (ANSI standard)
SELECT CAST('123' AS INT);
SELECT CAST(123.45 AS DECIMAL(10,1));

-- CONVERT (T-SQL specific, allows format styles)
SELECT CONVERT(INT, '123');
SELECT CONVERT(VARCHAR, GETDATE(), 120);     -- Date format

-- TRY_CAST and TRY_CONVERT (return NULL on error)
SELECT TRY_CAST('abc' AS INT);               -- NULL (instead of error)
SELECT TRY_CONVERT(INT, 'abc');              -- NULL
```

### NULL Handling Functions

```sql
-- ISNULL (T-SQL specific, 2 parameters only)
SELECT ISNULL(NULL, 'default');              -- 'default'
SELECT ISNULL(MiddleName, '') FROM Employees;

-- COALESCE (ANSI standard, multiple parameters)
SELECT COALESCE(NULL, NULL, 'third', 'fourth');  -- 'third'

-- NULLIF (returns NULL if values are equal)
SELECT NULLIF(10, 10);                       -- NULL
SELECT NULLIF(10, 20);                       -- 10
```

## Logical Query Processing Order

Understanding the logical order SQL Server processes a query helps write better SQL.

### Logical Processing Order

```sql
-- Written order:
SELECT column
FROM table
WHERE condition
GROUP BY column
HAVING condition
ORDER BY column;

-- Logical processing order:
1. FROM       -- Load tables
2. WHERE      -- Filter rows
3. GROUP BY   -- Group rows
4. HAVING     -- Filter groups
5. SELECT     -- Select columns
6. ORDER BY   -- Sort results
```

### Example

```sql
SELECT
    DepartmentId,
    COUNT(*) AS EmployeeCount
FROM Employees
WHERE Salary > 50000
GROUP BY DepartmentId
HAVING COUNT(*) > 5
ORDER BY EmployeeCount DESC;
```

**Processing:**
1. **FROM** - Load Employees table
2. **WHERE** - Filter employees with Salary > 50000
3. **GROUP BY** - Group by DepartmentId
4. **HAVING** - Keep groups with more than 5 employees
5. **SELECT** - Select DepartmentId and count
6. **ORDER BY** - Sort by EmployeeCount descending

### Important Implications

```sql
-- ❌ ERROR: Can't use alias in WHERE (WHERE processes before SELECT)
SELECT
    Salary * 1.1 AS NewSalary
FROM Employees
WHERE NewSalary > 60000;  -- Error: Invalid column name 'NewSalary'

-- ✅ CORRECT: Repeat expression or use subquery
SELECT
    Salary * 1.1 AS NewSalary
FROM Employees
WHERE Salary * 1.1 > 60000;

-- ✅ CORRECT: Use subquery or CTE
WITH SalaryCalc AS (
    SELECT Salary * 1.1 AS NewSalary
    FROM Employees
)
SELECT * FROM SalaryCalc
WHERE NewSalary > 60000;

-- ✅ OK: Can use alias in ORDER BY (ORDER BY processes after SELECT)
SELECT
    Salary * 1.1 AS NewSalary
FROM Employees
ORDER BY NewSalary;  -- Works!
```

## Common T-SQL Patterns

### TOP N Rows

```sql
-- Get top 10 rows
SELECT TOP 10 *
FROM Orders
ORDER BY OrderDate DESC;

-- Get top 10% of rows
SELECT TOP 10 PERCENT *
FROM Orders;

-- TOP with WITH TIES (include ties)
SELECT TOP 3 WITH TIES ProductName, Price
FROM Products
ORDER BY Price DESC;
```

### Pagination (OFFSET/FETCH)

```sql
-- Skip 20, take 10 (page 3 of 10 items per page)
SELECT *
FROM Products
ORDER BY ProductId
OFFSET 20 ROWS
FETCH NEXT 10 ROWS ONLY;

-- Parameters for page 2, 25 items per page
DECLARE @PageNumber INT = 2;
DECLARE @PageSize INT = 25;

SELECT *
FROM Products
ORDER BY ProductId
OFFSET (@PageNumber - 1) * @PageSize ROWS
FETCH NEXT @PageSize ROWS ONLY;
```

### Common Table Expressions (CTE)

```sql
-- Simple CTE
WITH HighEarners AS (
    SELECT *
    FROM Employees
    WHERE Salary > 100000
)
SELECT * FROM HighEarners;

-- Multiple CTEs
WITH
HighEarners AS (
    SELECT * FROM Employees WHERE Salary > 100000
),
Departments AS (
    SELECT * FROM Departments WHERE Active = 1
)
SELECT e.*, d.DepartmentName
FROM HighEarners e
JOIN Departments d ON e.DepartmentId = d.Id;

-- Recursive CTE (hierarchical data)
WITH OrgChart AS (
    -- Anchor member
    SELECT EmployeeId, ManagerId, FirstName, 1 AS Level
    FROM Employees
    WHERE ManagerId IS NULL

    UNION ALL

    -- Recursive member
    SELECT e.EmployeeId, e.ManagerId, e.FirstName, oc.Level + 1
    FROM Employees e
    JOIN OrgChart oc ON e.ManagerId = oc.EmployeeId
)
SELECT * FROM OrgChart;
```

### Window Functions

```sql
-- ROW_NUMBER
SELECT
    ProductName,
    Price,
    ROW_NUMBER() OVER (ORDER BY Price DESC) AS PriceRank
FROM Products;

-- RANK and DENSE_RANK
SELECT
    ProductName,
    Price,
    RANK() OVER (ORDER BY Price DESC) AS Rank,
    DENSE_RANK() OVER (ORDER BY Price DESC) AS DenseRank
FROM Products;

-- Partition by department
SELECT
    DepartmentId,
    EmployeeName,
    Salary,
    ROW_NUMBER() OVER (PARTITION BY DepartmentId ORDER BY Salary DESC) AS DeptRank
FROM Employees;

-- Running total
SELECT
    OrderDate,
    Amount,
    SUM(Amount) OVER (ORDER BY OrderDate) AS RunningTotal
FROM Orders;
```

## Stored Procedures (T-SQL Feature)

Stored procedures are reusable T-SQL code blocks:

```sql
-- Basic stored procedure
CREATE PROCEDURE GetCustomerOrders
    @CustomerId INT
AS
BEGIN
    SET NOCOUNT ON;  -- Prevents "N rows affected" messages

    SELECT OrderId, OrderDate, Total
    FROM Orders
    WHERE CustomerId = @CustomerId
    ORDER BY OrderDate DESC;
END;
GO

-- Execute procedure
EXEC GetCustomerOrders @CustomerId = 1;

-- Procedure with output parameter
CREATE PROCEDURE GetOrderCount
    @CustomerId INT,
    @OrderCount INT OUTPUT
AS
BEGIN
    SELECT @OrderCount = COUNT(*)
    FROM Orders
    WHERE CustomerId = @CustomerId;
END;
GO

-- Use output parameter
DECLARE @Count INT;
EXEC GetOrderCount @CustomerId = 1, @OrderCount = @Count OUTPUT;
PRINT 'Order count: ' + CAST(@Count AS VARCHAR);

-- Procedure with return value
CREATE PROCEDURE CreateOrder
    @CustomerId INT,
    @Total DECIMAL(10,2)
AS
BEGIN
    INSERT INTO Orders (CustomerId, Total, OrderDate)
    VALUES (@CustomerId, @Total, GETDATE());

    RETURN SCOPE_IDENTITY();  -- Return new OrderId
END;
GO
```

## User-Defined Functions (T-SQL Feature)

```sql
-- Scalar function (returns single value)
CREATE FUNCTION dbo.CalculateTax
(
    @Amount DECIMAL(10,2),
    @TaxRate DECIMAL(5,2)
)
RETURNS DECIMAL(10,2)
AS
BEGIN
    RETURN @Amount * @TaxRate / 100;
END;
GO

-- Use scalar function
SELECT Total, dbo.CalculateTax(Total, 8.5) AS Tax
FROM Orders;

-- Table-valued function (returns table)
CREATE FUNCTION dbo.GetCustomerOrders
(
    @CustomerId INT
)
RETURNS TABLE
AS
RETURN
(
    SELECT OrderId, OrderDate, Total
    FROM Orders
    WHERE CustomerId = @CustomerId
);
GO

-- Use table-valued function
SELECT * FROM dbo.GetCustomerOrders(1);
```

## Transactions with Savepoints (T-SQL Enhancement)

```sql
BEGIN TRANSACTION;

-- Create savepoint
INSERT INTO Orders (CustomerId, Total) VALUES (1, 100.00);
SAVE TRANSACTION SavePoint1;

-- More operations
INSERT INTO OrderDetails (OrderId, ProductId, Quantity) VALUES (1, 101, 2);

-- Rollback to savepoint (not entire transaction)
ROLLBACK TRANSACTION SavePoint1;

-- This insert still exists
COMMIT TRANSACTION;

-- Check transaction nesting level
SELECT @@TRANCOUNT;  -- T-SQL specific
```

## T-SQL System Functions

```sql
-- Identity and sequence values
SELECT SCOPE_IDENTITY();     -- Last identity in current scope
SELECT @@IDENTITY;           -- Last identity in session
SELECT IDENT_CURRENT('Orders');  -- Current identity for table

-- Row count
SELECT @@ROWCOUNT;  -- Rows affected by last statement

-- Error information (in CATCH block)
SELECT
    ERROR_NUMBER() AS ErrorNumber,
    ERROR_MESSAGE() AS ErrorMessage,
    ERROR_SEVERITY() AS ErrorSeverity,
    ERROR_STATE() AS ErrorState,
    ERROR_LINE() AS ErrorLine,
    ERROR_PROCEDURE() AS ErrorProcedure;

-- System information
SELECT @@VERSION;       -- SQL Server version
SELECT @@SERVERNAME;    -- Server name
SELECT DB_NAME();       -- Current database
```

## Best Practices for T-SQL

### 1. Always Use Schema Names

```sql
-- ✅ GOOD: Include schema
SELECT * FROM dbo.Users;
EXEC dbo.GetCustomerOrders @CustomerId = 1;

-- ❌ BAD: No schema (slower lookup, ambiguity)
SELECT * FROM Users;
```

### 2. Use SET NOCOUNT ON in Procedures

```sql
CREATE PROCEDURE GetUsers
AS
BEGIN
    SET NOCOUNT ON;  -- Reduces network traffic
    SELECT UserId, Username FROM Users;
END;
```

### 3. Use TRY...CATCH for Error Handling

```sql
BEGIN TRY
    -- Your code
END TRY
BEGIN CATCH
    -- Log error, rollback transaction
    DECLARE @ErrorMsg NVARCHAR(4000) = ERROR_MESSAGE();
    RAISERROR(@ErrorMsg, 16, 1);
END CATCH;
```

### 4. Prefer sp_executesql Over EXEC for Dynamic SQL

```sql
-- ✅ GOOD: Parameterized, plan reuse
DECLARE @SQL NVARCHAR(MAX) = N'SELECT * FROM Users WHERE UserId = @Id';
EXEC sp_executesql @SQL, N'@Id INT', @Id = 1;

-- ❌ BAD: SQL injection risk, no plan reuse
DECLARE @SQL VARCHAR(MAX) = 'SELECT * FROM Users WHERE UserId = ' + CAST(@Id AS VARCHAR);
EXEC(@SQL);
```

### 5. Use Appropriate Transaction Isolation Levels

```sql
-- Default: READ COMMITTED
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;  -- Dirty reads allowed
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;   -- Prevents non-repeatable reads
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;      -- Strictest isolation
SET TRANSACTION ISOLATION LEVEL SNAPSHOT;          -- Row versioning
```

## Resources

- [T-SQL Reference](https://learn.microsoft.com/en-us/sql/t-sql/language-reference)
- [SQL Server Documentation](https://learn.microsoft.com/en-us/sql/)
- [T-SQL Tutorial](https://www.sqlservertutorial.net/)
- [Itzik Ben-Gan's T-SQL Books](https://tsql.solidq.com/)

## T-SQL vs Standard SQL Quick Reference

| Feature | Standard SQL | T-SQL |
|---------|-------------|-------|
| **Limit rows** | `LIMIT 10` | `TOP 10` |
| **Variables** | Not supported | `DECLARE @Var INT` |
| **Error handling** | Varies | `TRY...CATCH` |
| **String concat** | \|\| or `CONCAT()` | `+` or `CONCAT()` |
| **Temporary tables** | Varies | `#temp`, `##global` |
| **Table variables** | Not supported | `DECLARE @Table TABLE (...)` |
| **Procedures** | Standard syntax | T-SQL enhanced |
| **Identity** | `AUTO_INCREMENT` | `IDENTITY(1,1)` |
| **Sequences** | Standard | `NEXT VALUE FOR` |

## T-SQL Quick Reference

```sql
-- Variables
DECLARE @Var INT = 10;
SET @Var = 20;

-- Control flow
IF @Var > 10 PRINT 'Greater';
WHILE @Var > 0 SET @Var = @Var - 1;

-- Error handling
BEGIN TRY
    -- Code
END TRY
BEGIN CATCH
    PRINT ERROR_MESSAGE();
END CATCH;

-- Temporary tables
CREATE TABLE #Temp (Id INT, Name VARCHAR(50));
DECLARE @TableVar TABLE (Id INT);

-- TOP N
SELECT TOP 10 * FROM Table ORDER BY Column;
SELECT TOP 10 PERCENT * FROM Table;

-- System functions
@@ROWCOUNT, @@IDENTITY, @@TRANCOUNT
SCOPE_IDENTITY(), ERROR_MESSAGE()
GETDATE(), GETUTCDATE()

-- Stored procedures
CREATE PROCEDURE ProcName @Param INT
AS BEGIN
    SET NOCOUNT ON;
    SELECT * FROM Table WHERE Id = @Param;
END;

-- Functions
CREATE FUNCTION FuncName(@Param INT) RETURNS INT
AS BEGIN
    RETURN @Param * 2;
END;
```
