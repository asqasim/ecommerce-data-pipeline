# E-commerce Database Design

## Database Schema

### 1. Categories Table
Stores product categories (Electronics, Clothing, Books, etc.)

**Table name:** `categories`

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique category ID |
| name | VARCHAR(100) | NOT NULL, UNIQUE | Category name |
| description | TEXT | NULL | Category description |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When category was created |

---

### 2. Products Table
Stores all products available for sale

**Table name:** `products`

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique product ID |
| name | VARCHAR(200) | NOT NULL | Product name |
| description | TEXT | NULL | Product description |
| price | DECIMAL(10,2) | NOT NULL | Product price |
| stock_quantity | INTEGER | DEFAULT 0 | Available stock |
| category_id | INTEGER | FOREIGN KEY → categories(id) | Links to category |
| image_url | VARCHAR(500) | NULL | Product image path |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When product was added |

---

### 3. Users Table
Stores customer information

**Table name:** `users`

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique user ID |
| username | VARCHAR(80) | NOT NULL, UNIQUE | Username for login |
| email | VARCHAR(120) | NOT NULL, UNIQUE | User email |
| password_hash | VARCHAR(200) | NOT NULL | Encrypted password |
| first_name | VARCHAR(100) | NULL | First name |
| last_name | VARCHAR(100) | NULL | Last name |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation date |

---

### 4. Orders Table
Stores order information

**Table name:** `orders`

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique order ID |
| user_id | INTEGER | FOREIGN KEY → users(id) | Who placed the order |
| total_amount | DECIMAL(10,2) | NOT NULL | Total order cost |
| status | VARCHAR(20) | DEFAULT 'pending' | Order status |
| shipping_address | TEXT | NOT NULL | Delivery address |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | When order was placed |

---

### 5. Order Items Table
Links orders with products (many-to-many relationship)

**Table name:** `order_items`

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique item ID |
| order_id | INTEGER | FOREIGN KEY → orders(id) | Which order |
| product_id | INTEGER | FOREIGN KEY → products(id) | Which product |
| quantity | INTEGER | NOT NULL | How many units |
| price_at_purchase | DECIMAL(10,2) | NOT NULL | Price when ordered |

---

## Relationships

1. **Categories → Products**: One-to-Many
   - One category can have many products
   - Each product belongs to one category

2. **Users → Orders**: One-to-Many
   - One user can place many orders
   - Each order belongs to one user

3. **Orders → Products**: Many-to-Many (through order_items)
   - One order can contain many products
   - One product can be in many orders
   - `order_items` is the junction table

---

## Key Concepts Explained

**PRIMARY KEY**: Unique identifier for each row   
**FOREIGN KEY**: Links to another table's PRIMARY KEY   
**NOT NULL**: This field must have a value   
**UNIQUE**: No two rows can have the same value   
**AUTO INCREMENT**: Database automatically assigns the next number   
**DECIMAL(10,2)**: Number with 10 total digits, 2 after decimal (for money)   
**VARCHAR(n)**: Text with maximum n characters   
**TEXT**: Long text with no specific limit   
**TIMESTAMP**: Stores date and time   
