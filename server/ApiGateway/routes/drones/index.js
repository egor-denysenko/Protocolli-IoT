'use strict'

module.exports = async function(fastify, opts) {
    fastify.register(require('fastify-formbody'))
    fastify.post('/', {
        schema: {
            tags: ['Drones'],
            description: "Route That is Constantly Called by the Edge In order to send his data to the cloud. In the resposne body could be also included a command that the Edge Nedds to Actuate",
            body: {
                type: 'object',
                required: ['id', 'velocity', 'battery', 'latitude', 'longitude', 'time'],
                properties: {
                    'id': { type: 'number', },
                    'velocity': { type: 'number' },
                    'battery': { type: 'number' },
                    'latitude': { type: 'number' },
                    'longitude': { type: 'number' },
                    'time': { type: "string" }
                }
            },
            response: {
                200: {
                    type: 'object',
                    required: ['status'],
                    properties: {
                        'status': { type: 'boolean' },
                        'command': { type: 'string' }
                    }
                }
            }
        },
        handler: async function(request, reply) {
            try {
                const { id, velocity, longitude, latitude, battery, time } = request.body
                console.log(request.body)
                    //Requesting the object parameters as local variables
                    //Part that interfaces with InfluxDB and sends data to the database
                fastify.writeDroneData(id, velocity, longitude, latitude, battery, time)
                    //Talking to redis and asking to the queue if there are some commands to actuate in the drone
                    //If there is a command save it to the database and send to the Edge response body with status OK and a string of the command 
                    //If there is not a command in the queue return Ok and listen for the new request
                return { status: true, command: process.env.DRONE_COMMAND }
            } catch (err) {
                //catch the error and log them in to the db
                console.log(err)
                return { status: false }
            }
        }
    })
}