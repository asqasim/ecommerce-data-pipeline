from flask import Blueprint, jsonify, request
from app.models import db, Category, Product, User, Order, OrderItem

# Create API blueprint
api = Blueprint('api', __name__)


@api.route('/test')
def test():
    """Test endpoint to verify API is working"""
    return jsonify({
        'message': 'API is working!',
        'status': 'success'
    })


@api.route('/products')
def get_products():
    """Get all products"""
    # Query all products from database
    products = Product.query.all()
    
    # Convert to list of dictionaries
    products_list = []
    for product in products:
        products_list.append({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': float(product.price),
            'stock_quantity': product.stock_quantity,
            'category_id': product.category_id,
            'category_name': product.category.name,
            'image_url': product.image_url,
            'created_at': product.created_at.isoformat()
        })
    
    # Return JSON response
    return jsonify({
        'products': products_list,
        'count': len(products_list)
    })


@api.route('/products/<int:product_id>')
def get_product(product_id):
    """Get a single product by ID"""
    # Query product by ID
    product = Product.query.get_or_404(product_id)
    
    # Convert to dictionary
    product_data = {
        'id': product.id,
        'name': product.name,
        'description': product.description,
        'price': float(product.price),
        'stock_quantity': product.stock_quantity,
        'category_id': product.category_id,
        'category_name': product.category.name,
        'image_url': product.image_url,
        'created_at': product.created_at.isoformat()
    }
    
    return jsonify(product_data)


@api.route('/categories')
def get_categories():
    """Get all categories"""
    categories = Category.query.all()
    
    categories_list = []
    for category in categories:
        categories_list.append({
            'id': category.id,
            'name': category.name,
            'description': category.description,
            'product_count': len(category.products)
        })
    
    return jsonify({
        'categories': categories_list,
        'count': len(categories_list)
    })


@api.route('/categories/<int:category_id>/products')
def get_category_products(category_id):
    """Get all products in a specific category"""
    category = Category.query.get_or_404(category_id)
    
    products_list = []
    for product in category.products:
        products_list.append({
            'id': product.id,
            'name': product.name,
            'description': product.description,
            'price': float(product.price),
            'stock_quantity': product.stock_quantity,
            'image_url': product.image_url
        })
    
    return jsonify({
        'category': category.name,
        'products': products_list,
        'count': len(products_list)
    })