import json
import socket

from shapely.geometry import shape, Point

hostname = socket.gethostname()
local_ip = socket.gethostbyname(hostname)

print(local_ip)