import random

def getLatitude():
    rnd = random.random()
    latitude = round(rnd * 50, 5)
    return latitude

def getLongitude():
    rnd = random.random()
    longitude = round(rnd * 50, 5)
    return longitude