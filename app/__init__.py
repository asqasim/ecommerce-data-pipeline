from flask import Flask
from config import config
from app.models import db
from flask_cors import CORS


def create_app(config_name='development'):
    """Application factory pattern"""
    # Create Flask app instance
    app = Flask(__name__)
    
    # ✅ ADD THIS LINE HERE
    CORS(app)

    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize database with app
    db.init_app(app)
    
    # Register blueprints (routes)
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api')
    
    return app
