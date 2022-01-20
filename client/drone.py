from sensors import gpsSensor, batterySensor, speedMeasurer
from droneRequests import droneRequests
from datetime import datetime, timedelta

id = 123456
data = {}
data['id'] = id

start_time = datetime.now()
positionSensor = gpsSensor.GpsSensor()
spdSensor = speedMeasurer.SpeedMeasurer(positionSensor, timedelta())
amqpModule = droneRequests(id)
dataSent = False

while(True):

    exec_time = datetime.now() - start_time

    # every 5 seconds send telemetry data
    if(not dataSent and not int(exec_time.total_seconds()) % 5):
        gpsData = positionSensor.getPositionData()

        data['latitude'] = gpsData['latitude']
        data['longitude'] = gpsData['longitude']
        data['velocity'] = spdSensor.getSpeed(exec_time)
        data['battery'] = batterySensor.getBatteryLevel()
        data['time'] = datetime.now().isoformat()

        amqpModule.postData(data)
        dataSent = True

    elif(int(exec_time.total_seconds()) % 5):
        dataSent = False