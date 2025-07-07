import serial
import struct
from threading import Lock
import time

OPEN_LITERAL = b"\xEF\xEF\xCD\xAB" 
CLOSE_LITERAL = b"\x56\x56\x34\x12"

FORMAT = "<QH9H50H"
DATA_PACKET_SIZE = 130

FLOODING_MASK = (1 << 1)
CONNECTION_MASK = (1 << 2)

STRUCT_LIST_BUFFER = 1000

RX_TIMEOUT = 10

Flooded = False
Receiver_Connected = False
Wireless_Connected = False
curr_packet = None
curr_struct = None
struct_list = []
ser = None
lock = Lock()


def init_sensor_parser():
    ser = serial.Serial()
    ser.baudrate = 115200
    ser.port = "/dev/ttyUSB0"
    ser.timeout = RX_TIMEOUT

    while ser.is_open == False :
        ser.open()
        if ser.is_open != True:
            ser.baudrate = int(input("Baudrate: "))
            ser.port = input("Input port: ")
    
    a = ser.read_until(OPEN_LITERAL, DATA_PACKET_SIZE) # Flush the first (may be incompleted) packet

    
    Receiver_Connected = (len(a) != 0)


def sensor_read():

    lock.acquire()
    if len(struct_list) == STRUCT_LIST_BUFFER:
        struct_list.clear()
    curr_packet = ser.read_until(CLOSE_LITERAL, DATA_PACKET_SIZE)
    curr_struct = struct.unpack(FORMAT, curr_packet)

    Wireless_Connected =  ((curr_struct[1] & CONNECTION_MASK) != 0)
    if (curr_struct[1] & FLOODING_MASK) != 0:
        Flooded = True # The Flooding notif cannot be turned off

    # [TODO]: Implement a conversion from binary data to human-readable unit (like m/s^2 for acceleration data and Volts for voltage data). This is currently unavailable due to conflict config in RX and TX firmware
    struct_list.append(curr_struct)
    lock.release()
    time.sleep(0.05)

def generate_sensor_data():
    lock.acquire()
    return_dict = {}
    for inv in struct_list:
        return_dict["packet_count"] = inv[0]
        return_dict["status_byte"] = inv[1]
        return_dict["acceleration"] = inv[2:5]
        return_dict["gyroscope"] = inv[5:8]
        return_dict["magnetic"] = inv[8:11]
        return_dict["teng"] = inv[11:61]
    struct_list.clear()
    lock.release()
    return return_dict

def get_sensor_health():
    return_dict = {}
    return_dict["receiver_health":Receiver_Connected]
    return_dict["sensor_health":Wireless_Connected]
    return_dict["flooding":Flooded]
    return return_dict