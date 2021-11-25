'use strict'

const fp = require('fastify-plugin')

const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
module.exports = fp(async function(fastify, opts) {
    // You can generate an API token from the "API Tokens Tab" in the UI
    const org = 'diqu'
    const bucket = 'dronesdata'
    const client = new InfluxDB({ url: 'http://localhost:8086', token: process.env.INFLUX_TOKEN })


    function writeDroneData(id, velocity, longitude, latitude, battery, time) {
        const writeApi = client.getWriteApi(org, bucket)
        writeApi.useDefaultTags({ host: 'host1' })
        console.log(id)
        console.log(time)
        console.log(new Date(time))
        const point = new Point('mem')
            .intField('droneId', id)
            .floatField('velocity', velocity)
            .floatField('longitude', longitude)
            .floatField('latitude', latitude)
            .measurement("DroneData")
            .intField('battery', battery)
            .timestamp(new Date(time))
        writeApi.writePoint(point)
        writeApi
            .close()
            .then(() => {
                console.log('FINISHED')
            })
            .catch(e => {
                console.error(e)
                console.log('Finished ERROR')
            })

    }

    fastify.decorate('writeDroneData', writeDroneData)
})