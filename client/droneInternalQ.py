import pika
import os


broker = os.environ.get('CLOUDAMQP_URL', "amqp://wsthotdv:I6poeag5EMMsqO3b3S9dlE_lvHA5t_RN@rattlesnake.rmq.cloudamqp.com/wsthotdv")

internalExcanger = "droneBuffer"
internalRoutingK = "droneBuffer"

exchange = "protocolliIoTAMQP"
routing_key = "droneTelemetry"

params = pika.URLParameters(broker)
params.socket_timeout = 5
connection = pika.BlockingConnection(params)
channel = connection.channel()

def callback(ch, method, properties, body):
    print(f"Recieved message:\n{body}")
    channel.basic_publish(exchange=internalExcanger, routing_key=routing_key, body=body)

channel.queue_declare(queue='droneTelemetry')

channel.basic_consume(queue='droneTelemetry', auto_ack=True, on_message_callback=callback)
channel.start_consuming()