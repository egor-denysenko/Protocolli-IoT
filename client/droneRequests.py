import json
import paho.mqtt.client as paho

broker = "test.mosquitto.org"
port = 1883
subscribed = False

class droneRequests:
    
    def __init__(self, droneName):
        self.droneName = f"drone-{droneName}"
        self.client = paho.Client(self.droneName)
        self.client.on_publish = self.on_publish
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.connect(broker, port)
        self.commands = []

    def on_publish(self, client, userdata, result):
        print("Data published")

    def on_connect(self, client, userdata, flags, rc):
        print("Client connected")
        self.client.subscribe(f"protocolli-IoT/{self.droneName}/command")

    def on_message(self, client, userdata, msg):
        # Incoming messages are saved in a list
        print(f"Message received: {msg.payload}")
        self.commands.append(msg.payload.decode())

    def checkCommands(self):
        # Loop awaiting for commands
        self.client.loop_read()
    
    def readCommands(self):
        # Return command list
        commands = []
        if(self.commands):
            commands = self.commands
            self.commands = []
        return commands

    def postData(self, dataDict):
        jsonData = json.dumps(dataDict, indent=4)
        self.client.publish(f"protocolli-IoT/{self.droneName}/telemetry", jsonData)
