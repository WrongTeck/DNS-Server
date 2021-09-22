const dns2 = require('dns2');
const config = require("./config.json");

const server = dns2.createServer({
  udp: true
});

server.on('request', (request, response, rinfo) => {
  
});

server.listen({
  udp: 5333
});