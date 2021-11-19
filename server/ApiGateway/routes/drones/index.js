'use strict'

module.exports = async function(fastify, opts) {
    fastify.post('/', {
        schema: {
            tags: ['Drones'],
            description: "Route That is Constantly Called by the Edge In order to send his data to the cloud. In the resposne body could be also included a command that the Edge Nedds to Actuate",
            body: {
                type: 'object',
                required: ['id', 'velocity', 'battery', 'position'],
                properties: {
                    'id': { type: 'string', format: 'uuid' },
                    'velocity': { type: 'number' },
                    'battery': { type: 'number' },
                    'latitude': { type: 'string' },
                    'longitude': { type: 'string' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                        'id': { type: 'string', format: 'uuid' },
                        'command': { type: 'string' }
                    }
                }
            }
        },
        handler: async function(request, reply) {
            try {
                //Requesting the object parameters as local variables
                //const { id, velocity, battery, position } = request.body
                //Part that interfaces with InfluxDB and sends data to the database
                console.log(request.body)
                    //Talking to redis and asking to the queue if there are some commands to actuate in the drone
                    //If there is a command save it to the database and send to the Edge response body with status OK and a string of the command 
                    //If there is not a command in the queue return Ok and listen for the new request
            } catch (err) {
                //catch the error and log them in to the db
                console.log(err)
            }
        }
    })
}