from flask import Blueprint, request, jsonify
import jwt
import datetime
from .models import authenticate_user
from config import get_config

# Create a Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)
config = get_config()

def generate_token(user):
    """Generate a JWT token for a user."""
    token_payload = {
        "sub": str(user["uid"]),
        "name": user["username"],
        "admin": user["role"] == "admin",
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
    }
    
    return jwt.encode(token_payload, config.SECRET_KEY, algorithm="HS256")

@auth_bp.route('/signin', methods=['POST', 'OPTIONS'])
def signin():
    """Handle signin requests."""
    if request.method == "OPTIONS":
        return "", 200
    
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400
    
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    user = authenticate_user(email, password)
    
    if user:
        token = generate_token(user)
        
        # Format response to match frontend expectations
        response = {
            "uid": user["uid"],
            "email": user["email"],
            "username": user["username"],
            "role": user["role"],
            "token": token,
            "accessToken": f"Bearer {token}"
        }
        return jsonify(response), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

@auth_bp.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    """Handle signup requests."""
    # For this simple implementation, we'll just return a message
    # In a real application, you'd add the user to the database
    if request.method == "OPTIONS":
        return "", 200
        
    return jsonify({"message": "Signup functionality not implemented yet"}), 501

@auth_bp.route('/forgot-password', methods=['POST', 'OPTIONS'])
def forgot_password():
    """Handle forgot password requests."""
    if request.method == "OPTIONS":
        return "", 200
        
    return jsonify({"message": "Password reset functionality not implemented yet"}), 501 