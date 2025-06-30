import random
import datetime

# Mock data generators for marine sensors

def generate_sensor_data():
    """Generate mock sensor data."""
    # Generate a random update time (1-5 minutes ago)
    minutes_ago = random.randint(1, 5)
    
    return {
        "gpsCoordinates": {
            "lat": 20.5937,
            "lng": 78.9629
        },
        "lastUpdate": f"{minutes_ago} mins ago",
        "batteryLevel": random.randint(60, 95),
        "sensorStatus": "Online",
        "warnings": random.randint(0, 2),
        "timestamp": datetime.datetime.now().isoformat()
    }

def get_sensor_health():
    """Get health status of marine sensors."""
    sensors = [
        {"id": 1, "name": "Temperature Sensor", "status": "Operational", "health": random.randint(85, 95), "lastCalibration": "15 days ago"},
        {"id": 2, "name": "Barometric Sensor", "status": "Operational", "health": random.randint(80, 90), "lastCalibration": "30 days ago"},
        {"id": 3, "name": "GPS Module", "status": "Operational", "health": random.randint(90, 98), "lastCalibration": "7 days ago"},
        {"id": 4, "name": "Wind Sensor", "status": "Operational", "health": random.randint(85, 95), "lastCalibration": "21 days ago"},
        {"id": 5, "name": "Wave Height Sensor", "status": "Warning", "health": random.randint(65, 75), "lastCalibration": "45 days ago"},
        {"id": 6, "name": "Water Quality Module", "status": "Critical", "health": random.randint(50, 65), "lastCalibration": "60 days ago"}
    ]
    
    return sensors

def get_sensor_locations():
    """Get locations of marine buoys."""
    buoys = [
        { 
            "id": 1, 
            "position": { "lat": 16.7689, "lng": 85.3496 }, 
            "name": "Buoy #1", 
            "status": "Online", 
            "lastUpdate": f"{random.randint(1, 15)} mins ago",
            "batteryLevel": random.randint(70, 85),
            "measurements": {
                "waveHeight": f"{random.uniform(1.5, 3.0):.1f}m",
                "windSpeed": f"{random.randint(10, 20)}km/h",
                "waterTemp": f"{random.uniform(20.0, 24.0):.1f}°C"
            }
        },
        { 
            "id": 2, 
            "position": { "lat": 17.1689, "lng": 84.9496 }, 
            "name": "Buoy #2", 
            "status": "Online", 
            "lastUpdate": f"{random.randint(5, 20)} mins ago",
            "batteryLevel": random.randint(60, 75),
            "measurements": {
                "waveHeight": f"{random.uniform(1.0, 2.5):.1f}m",
                "windSpeed": f"{random.randint(8, 15)}km/h",
                "waterTemp": f"{random.uniform(20.5, 23.0):.1f}°C"
            }
        },
        { 
            "id": 3, 
            "position": { "lat": 16.3689, "lng": 85.7496 }, 
            "name": "Buoy #3", 
            "status": "Warning", 
            "lastUpdate": f"{random.randint(20, 40)} mins ago",
            "batteryLevel": random.randint(15, 30),
            "measurements": {
                "waveHeight": f"{random.uniform(2.5, 4.0):.1f}m",
                "windSpeed": f"{random.randint(18, 25)}km/h",
                "waterTemp": f"{random.uniform(22.0, 24.5):.1f}°C"
            }
        }
    ]
    
    return buoys 