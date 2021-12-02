'use strict'

module.exports = async function(fastify, opts) {
    fastify.get('/', {
        tags: ['Rentals'],
        description: "Get All Active Rentals",
        params: {

        },
        response: {
            200: {
                type: 'object',
                required: [],
                properties: {
                    'droneId': { type: 'number' },
                    'clientId': { type: 'number' },
                    'startDate': { type: 'string', format: "date-time" },
                    'endDate': { type: ['string', 'null'], format: "date-time" }
                }
            }
        },
        handler: async function(request, reply) {
            try {
                return { status: true }
            } catch (err) {
                //catch the error and log them in to the db
                console.log(err)
                return { status: false }
            }
        }
    })

    fastify.post('/', {
        tags: ['Rentals'],
        description: "Start a new rental",
        body: {
            type: 'object',
            required: ['droneId', 'clientId', 'startDate', 'endDate'],
            properties: {
                droneId: { type: 'number' },
                clientId: { type: 'number' },
                startDate: { type: 'string', format: "date-time" },
                endDate: { type: 'string', format: "date-time" }
            }
        },
        response: {
            200: {
                type: 'object',
                required: ['status'],
                properties: {
                    'status': { type: 'boolean' },
                }
            }
        },
        handler: async function(request, reply) {
            try {
                const { droneId, clientId, startDate, endDate } = request.body

                return { status: true }
            } catch (err) {
                //catch the error and log them in to the db
                console.log(err)
                return { status: false }
            }
        }
    })

    fastify.post('/end', {
        tags: ['Rentals'],
        description: "End A Started Rental",
        body: {
            type: 'object',
            required: ['rentalId'],
            properties: {
                rentalId: { type: 'number' },
            }
        },
        response: {
            200: {
                type: 'object',
                required: ['status'],
                properties: {
                    'status': { type: 'boolean' },
                }
            }
        },
        handler: async function(request, reply) {
            try {
                const { droneId, clientId, startDate, endDate } = request.body

                return { status: true }
            } catch (err) {
                //catch the error and log them in to the db
                console.log(err)
                return { status: false }
            }
        }
    })
}