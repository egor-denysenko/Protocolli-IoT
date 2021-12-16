'use strict'

const fp = require('fastify-plugin')

const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
module.exports = fp(async function(fastify, opts) {
    // You can generate an API token from the "API Tokens Tab" in the UI
    const org = 'diqu'
    const bucket = 'diqu'
    const client = new InfluxDB({ url: 'http://localhost:8086', token: process.env.INFLUX_TOKEN })


    function writeDroneData(obj) {
        const writeApi = client.getWriteApi(org, bucket)
        writeApi.useDefaultTags({ host: 'host1' })
        console.log(obj.id)
        const point = new Point('mem')
            .intField('droneId', obj.id)
            .floatField('velocity', obj.velocity)
            .floatField('longitude', obj.longitude)
            .floatField('latitude', obj.latitude)
            .measurement("DroneData")
            .intField('battery', obj.battery)
            .timestamp(new Date(obj.time))
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