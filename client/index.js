const coap = require('coap')
let req = coap.request('coap://localhost/.well-known/core')
console.log("Client Request...")

req.on('response', function(res) {
    res.pipe(process.stdout)
})
req.end()