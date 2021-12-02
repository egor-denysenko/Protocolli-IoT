from sensors import gpsSensor, batterySensor, speedMeasurer
import droneRequests
import time
from datetime import datetime, timedelta

id = 123456
data = {}
data['id'] = id
start_time = datetime.now()
positionSensor = gpsSensor.GpsSensor()
spdSensor = speedMeasurer.SpeedMeasurer(positionSensor, timedelta())

while(True):
    gpsData = positionSensor.getPositionData()
    data['latitude'] = gpsData['latitude']
    data['longitude'] = gpsData['longitude']
    exec_time = datetime.now() - start_time
    data['velocity'] = spdSensor.getSpeed(exec_time)
    data['battery'] = batterySensor.getBatteryLevel()
    data['time'] = datetime.now().isoformat()
    print(data)
    command = droneRequests.postData(data)
    # if(command == 'off'):
    #     print("Drone is shutting down")
    #     break
    time.sleep(1)