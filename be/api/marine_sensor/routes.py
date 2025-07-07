from flask import Blueprint, jsonify, request
from .models import get_sensor_locations
import sensor_parser

# Create a Blueprint for marine sensor routes
marine_sensor_bp = Blueprint('marine_sensor', __name__)

@marine_sensor_bp.route('/data', methods=['GET', 'OPTIONS'])
def get_marine_sensor_data():
    """Get marine sensor data."""
    if request.method == "OPTIONS":
        return "", 200
    
    sensor_data = sensor_parser.generate_sensor_data()
    return jsonify(sensor_data)

@marine_sensor_bp.route('/health', methods=['GET', 'OPTIONS'])
def get_marine_sensor_health():
    """Get marine sensor health data."""
    if request.method == "OPTIONS":
        return "", 200
    
    sensor_data = sensor_parser.get_sensor_health()
    return jsonify(sensor_data)

@marine_sensor_bp.route('/locations', methods=['GET', 'OPTIONS'])
def get_marine_sensor_locations():
    """Get marine sensor locations."""
    if request.method == "OPTIONS":
        return "", 200
    
    buoys = get_sensor_locations()
    return jsonify({"buoys": buoys}) 