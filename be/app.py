from flask import Flask
import os
from config import get_config
from api.middleware import setup_cors
from api.auth.routes import auth_bp
from api.marine_sensor.routes import marine_sensor_bp

def create_app():
    """Create and configure the Flask application."""
    app = Flask(__name__)
    
    # Load configuration
    config = get_config()
    app.config.from_object(config)
    
    # Set up CORS
    setup_cors(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(marine_sensor_bp, url_prefix='/api/marine-sensor')
    
    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 