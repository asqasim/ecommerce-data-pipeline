from run import app
from app.models import db, Category, Product, User, Order, OrderItem

def init_database():
    """Initialize the database with tables"""
    with app.app_context():
        # Drop all existing tables (if any)
        db.drop_all()
        print("Dropped existing tables (if any)")
        
        # Create all tables
        db.create_all()
        print("Database tables created successfully!")
        
        # Verify tables were created
        inspector = db.inspect(db.engine)
        tables = inspector.get_table_names()
        print(f"Tables created: {tables}")

if __name__ == '__main__':
    init_database()
