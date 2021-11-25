import requests
ipAddr = ':8086/Drones'

def postData(dataDict):

    print()
    print("Sending data")
    print(dataDict)
    print()

    response = requests.post(ipAddr, data=dataDict)
    responseData = response.read()

    print()
    print("Server response: ")
    print(responseData)
    print()
    print("-------END POST-------")
    print()

    return {}