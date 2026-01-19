from flask import Blueprint, render_template
from app.models import db, Category, Product, User, Order, OrderItem

# Create a blueprint
main = Blueprint('main', __name__)


@main.route('/')
def home():
    """Homepage - shows all products"""
    return "Hello from Flask! MY e-commerce site is working!"