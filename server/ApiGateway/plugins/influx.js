'use strict'

const fp = require('fastify-plugin')
const { InfluxDB } = require('@influxdata/influxdb-client')
const { Point } = require('@influxdata/influxdb-client')
module.exports = fp(async function(fastify, opts) {
    // You can generate an API token from the "API Tokens Tab" in the UI
    const org = 'diqu'
    const bucket = 'http'
    const client = new InfluxDB({ url: 'http://localhost:8086', token: process.env.INFLUX_TOKEN })
    const writeApi = client.getWriteApi(org, bucket)
    writeApi.useDefaultTags({ host: 'cloudAPI' })

    function writeDroneData(id, velocity, longitude, latitude, battery, time) {
        console.log(id)
        try {
            const point = new Point('mem')
                .stringField('droneId', id)
                .intField('velocity', velocity)
                .floatField('longitude', longitude)
                .floatField('latitude', latitude)
                .measurement("droneData")
                .intField('battery', battery)
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
        } catch (err) {
            console.log(err)
            return err
        }

    }

    fastify.decorate('writeDroneData', writeDroneData)
})