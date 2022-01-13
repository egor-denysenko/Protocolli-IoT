'use strict'

const fp = require('fastify-plugin')
const coap = require('coap')

module.exports = fp(async function(fastify, opts) {
    const server = coap.createServer()

    // server.on('request', (req, res) => {
    //   res.end('Hello ' + req.url.split('/')[1] + '\n')
    // })

    server.on('request', (req, res) => {
        res.end('Hello ' + req.url.split('/')[1] + '\n')
    })

    // // the default CoAP port is 5683
    // server.listen(() => {
    //     const req = coap.request('coap://[::1]/')

    //     req.on('response', (res) => {
    //         res.pipe(process.stdout)
    //         res.on('end', () => {
    //             process.exit(0)
    //         })
    //     })

    //     req.end()
    // })
    server.on('request', (req, res) => {
            console.log(req)
            res.end('Hello from drone server')
        })
        // the default CoAP port is 5683
    server.listen(() => {
        const telemtryRoute = coap.request('coap://192.168.104.37/drone/telemetry')

        telemtryRoute.on('request', (req) => {
            console.log(req)
        })

        telemtryRoute.on('response', (res) => {
            // res.pipe(process.stdout)
            // res.on('end', () => {
            //     process.exit(0)
            // })
        })

        // telemtryRoute.end()
    })
})