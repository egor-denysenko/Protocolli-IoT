import json
import requests
ipAddr = 'http://192.168.166.237:8642/drones/'
# ipAddr = 'http://localhost:3000/drones/'

def postData(dataDict):

    jsonData = json.dumps(dataDict, indent=4)
    print()
    print("Sending data")
    print(jsonData)
    print()
    headers = {'Content-type': 'application/json'}
    response = requests.post(ipAddr, data=str(jsonData), headers=headers)
    responseData = response.json()
    print()
    print("Server response: ")
    print(responseData)
    print()
    print("-------END POST-------")
    print()

    return responseData['command']