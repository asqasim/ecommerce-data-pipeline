import os

class Config:
    """Base configuration"""
    # Secret key for sessions and security
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Disable modification tracking (saves memory)
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DevelopmentConfig(Config):
    """Development configuration - uses SQLite"""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///ecommerce.db'


class ProductionConfig(Config):
    """Production configuration - uses PostgreSQL"""
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'postgresql://user:password@localhost/ecommerce'


# Dictionary to easily switch configurations
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}