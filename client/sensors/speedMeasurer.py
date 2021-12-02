import random
from math import sqrt, pow

ANGLE_TO_METER = 111139

class SpeedMeasurer:

    def __init__(self, positionSensor, time):
        self.positionSensor = positionSensor
        self.currentLat = positionSensor.latitude
        self.currentLong = positionSensor.longitude
        self.time = time

    def getSpeed(self, time):
        latDifference = abs(self.currentLat - self.positionSensor.latitude)
        longDifference = abs(self.currentLong - self.positionSensor.longitude)
        metersLat = latDifference * ANGLE_TO_METER
        metersLong = longDifference * ANGLE_TO_METER
        totalMovement = sqrt(pow(metersLat, 2) + pow(metersLong, 2))
        timeDifference = time - self.time
        secondsDifference = timeDifference.total_seconds()
        if(secondsDifference):
            speed = totalMovement / timeDifference.total_seconds()
            return round(speed, 3)
        else:
            return 0
