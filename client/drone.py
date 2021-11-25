from sensors import speedSensor, batterySensor, gpsSensor
import droneRequests
import time
from datetime import date, datetime, timedelta

id = '7f639f3e-71b4-464b-81da-2a3798242716'
data = {}
data['id'] = id
start_time = datetime.now()

while(True):
    time.sleep(2)
    data['velocity'] = speedSensor.getSpeed()
    data['battery'] = batterySensor.getBatteryLevel()
    data['latitude'] = gpsSensor.getLatitude()
    data['longitude'] = gpsSensor.getLongitude()
    exec_time = datetime.now() - start_time
    data['time'] = str(exec_time)

    commands = droneRequests.postData(data)
    print(commands)