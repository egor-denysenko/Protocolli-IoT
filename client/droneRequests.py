import json
import requests
import paho.mqtt.client as paho
from requests.models import to_native_string
broker = "test.mosquitto.org"
port = 1883

def on_publish(client, userdata, result):
    print("Data published")

def postData(dataDict):
    
    droneName = f"drone-{dataDict['id']}"
    client = paho.Client(droneName)
    client.on_publish = on_publish
    client.connect(broker, port)
    for line in dataDict:
        if line != 'id':
            value = dataDict[line]
            response = client.publish(f"protocolli-IoT/{droneName}/telemetry/{line}", value)
            