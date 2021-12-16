'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async function(fastify, opts) {
    let mqtt = require('mqtt')
    let client = mqtt.connect('mqtt://192.168.10.31', { clean: false, retain: true, clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8) })

    client.on('connect', function() {
        console.log("connesso")
        client.subscribe('protocolli-IoT/telemetry/#')

    })
    client.on('message', function(topic, message) {
        let obj = JSON.parse(message)

        topic = topic.slice(topic.indexOf('/') + 1)
        console.log(topic)
        topic = topic.slice(topic.indexOf('/') + 1)
        console.log(topic)
        topic = topic.slice(6)
        obj.id = parseInt(topic)
        fastify.writeDroneData(obj)
    })


    function sendCommandToDrone(droneID) {
        console.log("manda mess")
        console.log()
        console.log(`protocolli-IoT/commands/drone-${droneID}`)
        client.publish(`protocolli-IoT/commands/drone-${droneID}`, 'shutdown', { 'qos': 2, 'retain': true })
    }
    setInterval(sendCommandToDrone, 5000, 123456)
})