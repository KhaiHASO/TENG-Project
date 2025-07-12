import serial
import struct
from threading import Lock
import time
import datetime
import sys

if __name__ == "__main__":
    import matplotlib.animation as animation
    import matplotlib.pyplot as plt
    import numpy as np
    from matplotlib import use

OPEN_LITERAL = b"BEGIN_ADC" 



Flooded = False
Receiver_Connected = False
Wireless_Connected = False
curr_packet = None
curr_struct = None
struct_list = []
ser = None
lock = Lock()

b = bytes()
buf = []
x_data, y_data = [], []
fig = plt.figure()
j = 0
line, = plt.plot(x_data, y_data, '-')
file = None
ser = None
if __name__ == "__main__":
    file = open(f"log_{datetime.datetime.now()}{time.monotonic()}", "at")

def init_sensor_parser():
    ser = serial.Serial(sys.argv[1], baudrate=115200, timeout=10)

    while ser.is_open == False :
        ser.open()
        if ser.is_open != True:
            ser.baudrate = int(input("Baudrate: "))
            ser.port = input("Input port: ")
    
    a = ser.read_until(OPEN_LITERAL) # Flush the first (may be incompleted) packet

    
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

def __get_data(frame):
    global j
    b = ser.read_until(OPEN_LITERAL)
    print(b)
    if len(b) == 0:
        print("No signal !!!")
        return
    #buf.clear()
    y_data.clear()
    x_data.clear()
    for  i in range(0, (len(b) - len(b"BEGIN_ADC"))//2 - 100):
        y_data.append(int.from_bytes(b[i * 2 + 1: i*2+3], byteorder='big'))
        x_data.append(j)
        j += 1
    print(y_data)
    line.set_data(x_data, y_data)
    print(f"{datetime.datetime.now()}, {time.monotonic_ns()}", sep='\n', file=file)
    print(y_data, sep='\n', file=file)
    fig.gca().relim()
    fig.gca().autoscale_view()
    return line,

if __name__ == "__main__":
    ani = animation.FuncAnimation(fig = fig, func=__get_data, interval = 10)
    plt.show()
    ser.close()