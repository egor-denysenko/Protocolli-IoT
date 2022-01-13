'use strict'

const fp = require('fastify-plugin')
const amqp = require('amqplib/callback_api');

module.exports = fp(async function(fastify, opts) {
    amqp.connect('amqps://wsthotdv:I6poeag5EMMsqO3b3S9dlE_lvHA5t_RN@rattlesnake.rmq.cloudamqp.com/wsthotdv',
        function(connectionError, connection) {
            if (connectionError)
                throw connectionError
            connection.createChannel(function(channelCreationError, channel) {
                if (channelCreationError)
                    throw channelCreationError

                channel.consume('DroneData', (msg) => {
                    console.log("message recieved \n")
                    console.log(msg)
                    console.log(JSON.parse(msg.content.toString()))
                    fastify.writeDroneData(JSON.parse(msg.content.toString()))
                })
            })
        })
})