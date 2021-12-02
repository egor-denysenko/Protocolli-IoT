import json
import requests
import paho.mqtt.client as paho
broker = "test.mosquitto.org"
port = 1883

def on_publish(client, userdata, result):
    print("Data published")

def postData(dataDict):
    
    droneName = f"drone-{dataDict['id']}"
    client = paho.Client(droneName)
    client.on_publish = on_publish
    client.connect(broker, port)
    jsonData = json.dumps(dataDict, indent=4)
    response = client.publish(f"protocolli-IoT/{droneName}/telemetry", jsonData)
    return response
            