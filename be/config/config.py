import os

class Config:
    # Base configuration
    SECRET_KEY = os.environ.get('SECRET_KEY', 'teng-secret-key-for-jwt-auth')
    DEBUG = False
    TESTING = False

class DevelopmentConfig(Config):
    DEBUG = True
    # Development specific configs
    CORS_ORIGIN = 'http://localhost:3000'

class ProductionConfig(Config):
    # Production specific configs
    CORS_ORIGIN = os.environ.get('CORS_ORIGIN', 'https://yourdomain.com')

class TestingConfig(Config):
    TESTING = True

# Configuration dictionary
config_by_name = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig
}

# Default to development if not specified
def get_config():
    env = os.environ.get('FLASK_ENV', 'development')
    return config_by_name[env] 