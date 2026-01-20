# 🛒 E-commerce Data Pipeline

A full-stack e-commerce application demonstrating SQL database design, Flask REST API, and React frontend.

**Repository:** [github.com/asqasim/ecommerce-data-pipeline](https://github.com/asqasim/ecommerce-data-pipeline)

## 🏗️ Architecture
```
React Frontend (Port 3000)
        ↓ HTTP/JSON
Flask REST API (Port 5000)
        ↓
SQLite Database
```

## 📊 Database Schema

**5 Tables:**
- Categories (1-to-many with Products)
- Products
- Users (1-to-many with Orders)
- Orders (many-to-many with Products via OrderItems)
- OrderItems (junction table)

Full schema: [`docs/database_design.md`](docs/database_design.md)

## 🚀 Tech Stack

**Backend:** Python 3.12, Flask 3.1.2, SQLAlchemy, SQLite
**Frontend:** React 18
**Tools:** Git, venv

## 📁 Project Structure
```
ecommerce-data-pipeline/
├── app/
│   ├── __init__.py       # Flask app factory
│   ├── models.py         # Database models
│   └── routes.py         # API endpoints (8 total)
├── docs/
│   └── database_design.md
├── instance/
│   └── ecommerce.db
├── config.py
├── init_db.py
├── seed_data.py
├── run.py
└── requirements.txt
```

## 🔧 Quick Start
```bash
# Setup
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Initialize database
python init_db.py
python seed_data.py

# Run server
python run.py
```

Visit: `http://localhost:5000/api/test`

## 🌐 API Endpoints
```
GET  /api/products              # All products
GET  /api/products/<id>         # Single product
GET  /api/categories            # All categories
GET  /api/categories/<id>/products
GET  /api/orders                # All orders
GET  /api/orders/<id>           # Single order
POST /api/orders                # Create order
GET  /api/test                  # Health check
```

## 📚 Skills Demonstrated

- Database design with proper relationships
- SQLAlchemy ORM
- REST API principles
- HTTP methods & status codes
- JSON serialization
- Input validation & error handling
- CORS configuration
- Transaction management
- Git workflow

## 🎯 Future Enhancements

- User authentication (JWT)
- Product search & filtering
- Admin dashboard
- Payment integration
- Unit tests
- Docker deployment

## 👤 Author

**GitHub:** [@asqasim](https://github.com/asqasim)

---

⭐ Learning project - feedback welcome!
