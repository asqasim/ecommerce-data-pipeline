from run import app
from app.models import db, Category, Product, User, Order, OrderItem
from werkzeug.security import generate_password_hash
from datetime import datetime

def seed_database():
    """Add sample data to the database"""
    
    with app.app_context():
        print("🌱 Starting to seed database...")
        
        # Clear existing data
        db.drop_all()
        db.create_all()
        print("Tables recreated")
        
        # ============= CATEGORIES =============
        print("\nAdding categories...")
        
        electronics = Category(
            name='Electronics',
            description='Electronic devices and gadgets'
        )
        
        clothing = Category(
            name='Clothing',
            description='Fashion and apparel'
        )
        
        books = Category(
            name='Books',
            description='Books and literature'
        )
        
        home = Category(
            name='Home & Kitchen',
            description='Home appliances and kitchen items'
        )
        
        # Add categories to database
        db.session.add_all([electronics, clothing, books, home])
        db.session.commit()
        print(f"Added {Category.query.count()} categories")
        
        # ============= PRODUCTS =============
        print("\nAdding products...")
        
        # Electronics products
        laptop = Product(
            name='Gaming Laptop',
            description='High-performance laptop with RTX 4060 graphics',
            price=1299.99,
            stock_quantity=15,
            category_id=electronics.id,
            image_url='/static/images/laptop.jpg'
        )
        
        smartphone = Product(
            name='Smartphone Pro',
            description='Latest smartphone with 256GB storage',
            price=899.99,
            stock_quantity=30,
            category_id=electronics.id,
            image_url='/static/images/phone.jpg'
        )
        
        headphones = Product(
            name='Wireless Headphones',
            description='Noise-cancelling over-ear headphones',
            price=249.99,
            stock_quantity=50,
            category_id=electronics.id,
            image_url='/static/images/headphones.jpg'
        )
        
        # Clothing products
        tshirt = Product(
            name='Cotton T-Shirt',
            description='Comfortable 100% cotton t-shirt',
            price=19.99,
            stock_quantity=100,
            category_id=clothing.id,
            image_url='/static/images/tshirt.jpg'
        )
        
        jeans = Product(
            name='Denim Jeans',
            description='Classic blue denim jeans',
            price=49.99,
            stock_quantity=75,
            category_id=clothing.id,
            image_url='/static/images/jeans.jpg'
        )
        
        # Books products
        python_book = Product(
            name='Python Programming',
            description='Learn Python from basics to advanced',
            price=39.99,
            stock_quantity=40,
            category_id=books.id,
            image_url='/static/images/python-book.jpg'
        )
        
        sql_book = Product(
            name='SQL Mastery',
            description='Complete guide to SQL databases',
            price=34.99,
            stock_quantity=35,
            category_id=books.id,
            image_url='/static/images/sql-book.jpg'
        )
        
        # Home products
        blender = Product(
            name='Power Blender',
            description='High-speed blender for smoothies',
            price=79.99,
            stock_quantity=25,
            category_id=home.id,
            image_url='/static/images/blender.jpg'
        )
        
        # Add products to database
        db.session.add_all([
            laptop, smartphone, headphones,
            tshirt, jeans,
            python_book, sql_book,
            blender
        ])
        db.session.commit()
        print(f"Added {Product.query.count()} products")
        
        # ============= USERS =============
        print("\nAdding users...")
        
        user1 = User(
            username='johndoe',
            email='john@example.com',
            password_hash=generate_password_hash('password123'),
            first_name='John',
            last_name='Doe'
        )
        
        user2 = User(
            username='janedoe',
            email='jane@example.com',
            password_hash=generate_password_hash('password123'),
            first_name='Jane',
            last_name='Doe'
        )
        
        user3 = User(
            username='bobsmith',
            email='bob@example.com',
            password_hash=generate_password_hash('password123'),
            first_name='Bob',
            last_name='Smith'
        )
        
        # Add users to database
        db.session.add_all([user1, user2, user3])
        db.session.commit()
        print(f"Added {User.query.count()} users")
        
        # ============= ORDERS =============
        print("\nAdding orders...")
        
        # Order 1 - John's order
        order1 = Order(
            user_id=user1.id,
            total_amount=1549.98,  # laptop + smartphone
            status='delivered',
            shipping_address='123 Main St, New York, NY 10001'
        )
        
        # Order 2 - Jane's order
        order2 = Order(
            user_id=user2.id,
            total_amount=69.98,  # tshirt + jeans
            status='shipped',
            shipping_address='456 Oak Ave, Los Angeles, CA 90001'
        )
        
        # Order 3 - Bob's order
        order3 = Order(
            user_id=user3.id,
            total_amount=154.97,  # headphones + python_book + sql_book
            status='pending',
            shipping_address='789 Pine Rd, Chicago, IL 60601'
        )
        
        # Add orders to database
        db.session.add_all([order1, order2, order3])
        db.session.commit()
        print(f"Added {Order.query.count()} orders")
        
        # ============= ORDER ITEMS =============
        print("\nAdding order items...")
        
        # Order 1 items
        order1_item1 = OrderItem(
            order_id=order1.id,
            product_id=laptop.id,
            quantity=1,
            price_at_purchase=1299.99
        )
        
        order1_item2 = OrderItem(
            order_id=order1.id,
            product_id=smartphone.id,
            quantity=1,
            price_at_purchase=899.99
        )
        
        # Order 2 items
        order2_item1 = OrderItem(
            order_id=order2.id,
            product_id=tshirt.id,
            quantity=1,
            price_at_purchase=19.99
        )
        
        order2_item2 = OrderItem(
            order_id=order2.id,
            product_id=jeans.id,
            quantity=1,
            price_at_purchase=49.99
        )
        
        # Order 3 items
        order3_item1 = OrderItem(
            order_id=order3.id,
            product_id=headphones.id,
            quantity=1,
            price_at_purchase=249.99
        )
        
        order3_item2 = OrderItem(
            order_id=order3.id,
            product_id=python_book.id,
            quantity=1,
            price_at_purchase=39.99
        )
        
        order3_item3 = OrderItem(
            order_id=order3.id,
            product_id=sql_book.id,
            quantity=1,
            price_at_purchase=34.99
        )
        
        # Add order items to database
        db.session.add_all([
            order1_item1, order1_item2,
            order2_item1, order2_item2,
            order3_item1, order3_item2, order3_item3
        ])
        db.session.commit()
        print(f"Added {OrderItem.query.count()} order items")
        
        # ============= SUMMARY =============
        print("\n" + "="*50)
        print("Database seeded successfully!")
        print("="*50)
        print(f"Categories: {Category.query.count()}")
        print(f"Products: {Product.query.count()}")
        print(f"Users: {User.query.count()}")
        print(f"Orders: {Order.query.count()}")
        print(f"Order Items: {OrderItem.query.count()}")
        print("="*50)

if __name__ == '__main__':
    seed_database()