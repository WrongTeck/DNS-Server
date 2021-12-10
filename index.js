const dns2 = require('dns2');
const udp = require('dns2/client/udp');
const config = require("./config.json");
const { Packet, UDPServer } = dns2;

const server = dns2.createServer({
  udp: true
});

server.on("request", (request, send, rinfo)=> {
  //Need to research along the right DB/file
  
});

server.on("listening", ()=> {
  console.log("Listening");
})

server.listen({
  udp: 5333
});