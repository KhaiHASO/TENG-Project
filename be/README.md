# TENG Backend API

This is a Flask-based API for the TENG project that provides authentication and marine sensor data.

## Project Structure

```
be/
├── api/                    # API package
│   ├── auth/               # Authentication API
│   │   ├── models.py       # Authentication models
│   │   └── routes.py       # Authentication routes
│   ├── marine_sensor/      # Marine sensor API
│   │   ├── models.py       # Marine sensor models
│   │   └── routes.py       # Marine sensor routes
│   └── middleware.py       # Middleware utilities
├── config/                 # Configuration package
│   └── config.py           # Configuration settings
├── app.py                  # Main application file
├── start.py                # Entry point for the application
└── requirements.txt        # Python dependencies
```

## Getting Started

1. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

2. Run the application:
   ```
   python start.py
   ```

## API Endpoints

### Authentication

- `POST /auth/signin` - Sign in with email and password
- `POST /auth/signup` - Register a new user (not implemented)
- `POST /auth/forgot-password` - Reset password (not implemented)

### Marine Sensor Data

- `GET /api/marine-sensor/data` - Get sensor data
- `GET /api/marine-sensor/health` - Get sensor health status
- `GET /api/marine-sensor/locations` - Get sensor locations

## Environment Variables

- `FLASK_ENV` - Environment mode (development, production, testing)
- `PORT` - Port to run the server on (default: 5000)
- `SECRET_KEY` - Secret key for JWT token generation 