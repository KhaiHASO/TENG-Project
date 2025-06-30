from config import get_config

config = get_config()

def setup_cors(app):
    """Set up CORS headers for the application."""
    @app.after_request
    def add_cors_headers(response):
        response.headers.add("Access-Control-Allow-Origin", config.CORS_ORIGIN)
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response
    
    return app 