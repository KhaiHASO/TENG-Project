# User model and related functions

# Mock user database
users = [
    {
        "uid": 1,
        "username": "admin",
        "role": "admin",
        "password": "123456",
        "email": "admin@themesbrand.com",
    }
]

def get_user_by_email(email):
    """Find a user by email."""
    return next((u for u in users if u["email"] == email), None)

def authenticate_user(email, password):
    """Authenticate a user with email and password."""
    user = get_user_by_email(email)
    if user and user["password"] == password:
        return user
    return None 