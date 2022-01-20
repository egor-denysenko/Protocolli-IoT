import json
import os
import pika

broker = os.environ.get('CLOUDAMQP_URL', "amqp://wsthotdv:I6poeag5EMMsqO3b3S9dlE_lvHA5t_RN@rattlesnake.rmq.cloudamqp.com/wsthotdv")
exchange = "droneBuffer"
routing_key = "droneBuffer"
port = 1883
subscribed = False

class droneRequests:
    
    def __init__(self, droneName):
        self.droneName = f"drone-{droneName}"
        params = pika.URLParameters(broker)
        params.socket_timeout = 5
        self.connection = pika.BlockingConnection(params)
        self.channel = self.connection.channel()
        self.channel.queue_declare(queue='droneTelemetry')

    def postData(self, dataDict):
        jsonData = json.dumps(dataDict, indent=4)
        self.channel.basic_publish(exchange=exchange, routing_key=routing_key, body=jsonData)
        print("Data sent")