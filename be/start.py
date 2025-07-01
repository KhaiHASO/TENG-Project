import os
from app import app
import threading
from api.marine_sensor import sensor_parser
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    sensor_parser.init_sensor_parser()

    sensor_thread = threading.Thread(sensor_parser.sensor_read)
    sensor_thread.start()
    
    app.run(host='0.0.0.0', port=port, debug=True) 