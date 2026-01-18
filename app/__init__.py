from flask import Flask
from config import config
from app.models import db


def create_app(config_name='development'):
    """Application factory pattern"""
    # Create Flask app instance
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(config[config_name])
    
    # Initialize database with app
    db.init_app(app)
    
    # Register blueprints (routes) - we'll add this later
    # from app.routes import main
    # app.register_blueprint(main)
    
    return app