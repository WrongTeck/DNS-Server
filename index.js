const dns2 = require('dns2');
const config = require("./config.json");
const JSONreader = require('./handlers/JSON');
const Mongo = require('./handlers/Mongo');
const Parser = require('./handlers/Parser');
const { Packet, UDPServer } = dns2;

const server = dns2.createServer({
  udp: true
});
if(config.cache.enabled) {
  new Redis(config.cache.redis);
}
var handler;
switch(config.handler) {
  case "file":
    handler = new JSONreader(config.file);
  break;
  case "db":
    handler = new Mongo(config.db.mongo.conn_uri);
    break;
  default:
    console.log("No handler specified");
    break;
}

server.on("request", (request, send, rinfo) => {
  handler.get(request.question[0].name).then((data)=> {
    let response = Packet.createResponseFromRequest(request);
    response.answers.push(new Parser(data));
    send(response);
  });
});

server.on('listening', () => {
  console.log("Listening");
});

server.listen({
  udp: 5333
});