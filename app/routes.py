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


@api.route('/orders')
def get_orders():
    """Get all orders"""
    orders = Order.query.all()
    
    orders_list = []
    for order in orders:
        # Get order items for this order
        items = []
        for item in order.order_items:
            items.append({
                'product_id': item.product_id,
                'product_name': item.product.name,
                'quantity': item.quantity,
                'price': float(item.price_at_purchase),
                'subtotal': float(item.subtotal)
            })
        
        orders_list.append({
            'id': order.id,
            'user_id': order.user_id,
            'username': order.user.username,
            'total_amount': float(order.total_amount),
            'status': order.status,
            'shipping_address': order.shipping_address,
            'created_at': order.created_at.isoformat(),
            'items': items,
            'item_count': len(items)
        })
    
    return jsonify({
        'orders': orders_list,
        'count': len(orders_list)
    })


@api.route('/orders/<int:order_id>')
def get_order(order_id):
    """Get a single order by ID"""
    order = Order.query.get_or_404(order_id)
    
    # Get order items
    items = []
    for item in order.order_items:
        items.append({
            'product_id': item.product_id,
            'product_name': item.product.name,
            'quantity': item.quantity,
            'price': float(item.price_at_purchase),
            'subtotal': float(item.subtotal)
        })
    
    order_data = {
        'id': order.id,
        'user_id': order.user_id,
        'username': order.user.username,
        'user_email': order.user.email,
        'total_amount': float(order.total_amount),
        'status': order.status,
        'shipping_address': order.shipping_address,
        'created_at': order.created_at.isoformat(),
        'items': items,
        'item_count': len(items)
    }
    
    return jsonify(order_data)


@api.route('/orders', methods=['POST'])
def create_order():
    """Create a new order"""
    # Get JSON data from request
    data = request.get_json()
    
    # Validate required fields
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    required_fields = ['user_id', 'shipping_address', 'items']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Validate items array
    if not data['items'] or len(data['items']) == 0:
        return jsonify({'error': 'Order must contain at least one item'}), 400
    
    try:
        # Calculate total amount
        total_amount = 0
        order_items_to_create = []
        
        for item in data['items']:
            # Get product
            product = Product.query.get(item['product_id'])
            if not product:
                return jsonify({'error': f'Product {item["product_id"]} not found'}), 404
            
            # Check stock
            if product.stock_quantity < item['quantity']:
                return jsonify({'error': f'Insufficient stock for {product.name}'}), 400
            
            # Calculate subtotal
            subtotal = float(product.price) * item['quantity']
            total_amount += subtotal
            
            # Store for later creation
            order_items_to_create.append({
                'product': product,
                'quantity': item['quantity'],
                'price': float(product.price)
            })
        
        # Create the order
        new_order = Order(
            user_id=data['user_id'],
            total_amount=total_amount,
            status='pending',
            shipping_address=data['shipping_address']
        )
        db.session.add(new_order)
        db.session.flush()  # Get the order ID without committing yet
        
        # Create order items and update stock
        for item_data in order_items_to_create:
            order_item = OrderItem(
                order_id=new_order.id,
                product_id=item_data['product'].id,
                quantity=item_data['quantity'],
                price_at_purchase=item_data['price']
            )
            db.session.add(order_item)
            
            # Update product stock
            item_data['product'].stock_quantity -= item_data['quantity']
        
        # Commit everything
        db.session.commit()
        
        return jsonify({
            'message': 'Order created successfully',
            'order_id': new_order.id,
            'total_amount': float(new_order.total_amount)
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500