import random

class GpsSensor:

    def __init__(self):
        rndLat = random.uniform(-90, 90)
        self.latitude = round(rndLat, 5)
        rndLong = random.uniform(-180, 80)
        self.longitude = round(rndLong, 5)

    def getPositionData(self):
            rndLatMov = random.uniform(-0.0001, 0.0001)
            rndLongMov = random.uniform(-0.0001, 0.0001)
            self.latitude += rndLatMov
            self.longitude += rndLongMov

            self.latitude = round(self.latitude, 5)
            self.longitude = round(self.longitude, 5)
            return {'latitude': self.latitude, 'longitude': self.longitude}