from sensors import speedSensor, batterySensor, gpsSensor
import droneRequests
import time
from datetime import date, datetime, timedelta

id = 123456
data = {}
data['id'] = id
start_time = datetime.now()

while(True):
    # time.sleep(1)
    data['velocity'] = speedSensor.getSpeed()
    data['battery'] = batterySensor.getBatteryLevel()
    data['latitude'] = gpsSensor.getLatitude()
    data['longitude'] = gpsSensor.getLongitude()
    exec_time = datetime.now() - start_time
    data['time'] = datetime.now().isoformat()

    command = droneRequests.postData(data)
    if(command == 'off'):
        print("Drone is shutting down")