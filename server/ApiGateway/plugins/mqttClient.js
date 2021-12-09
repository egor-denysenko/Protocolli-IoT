'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function(fastify, opts) {
    // const aedes = require('aedes')()
    // const server = require('net').createServer(aedes.handle)
    // const port = 1883

    // server.listen(port, function() {
    //     console.log('server started and listening on port ', port)
    // })
    let mqtt = require('mqtt')
    let client = mqtt.connect('mqtt://127.0.0.1')

    client.on('connect', function() {
        client.subscribe('protocolli-IoT/+/telemetry')
    })

    client.on('message', function(topic, message) {
        const ProtocolliIoTRegex = new RegExp('protocolli-IoT/drone-*');
        if (ProtocolliIoTRegex.test(topic)) {
            // message is Buffer
            let obj = JSON.parse(message)
            topic = topic.slice(topic.indexOf('/') + 1)
            topic = topic.slice(0, topic.indexOf('/'))
            topic = topic.slice(6)
            obj.id = parseInt(topic)
            fastify.writeDroneData(obj)
            client.end()
        } else {
            console.log("messaggio non per te")
        }
    })

    function sendCommandToDrone(droneID) {
        console.log("manda mess")
        client.publish(`protocolli-IoT/drone-${droneID}/command`, 'shutdown', { qos: 2 })
    }
    setInterval(sendCommandToDrone, 2000, 654)
})