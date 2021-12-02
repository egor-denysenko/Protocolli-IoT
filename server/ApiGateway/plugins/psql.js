'use strict'

const fp = require('fastify-plugin')
const db = require('pg-promise')()
module.exports = fp(async function(fastify, opts) {
    const psql = db(process.env.POSTGRESQL_URI)
    fastify.decorate('psql', psql);
})