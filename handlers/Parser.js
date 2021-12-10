const Packet = require("dns2").Packet;
class Parser {
  constructor(data) {
    if(data.class) {
      this.class = this.classParser(data.class);
    }
    if(data.type) {
      this.type = this.typeParser(data.type);
    }
    if(data.name) {
      this.name = this.nameParser(data.name);
    }
    if(data.address) {
      this.address = data.address;
    }
    return this;
  }
  classParser(data) {
    var flag = true;
    for(let type in Object.keys(Packet.CLASS)) {
      if(data.toUpperCase() == type) {
        flag = false;
        return Packet.CLASS[type];
      }
    }
    if(flag) {
      return Packet.CLASS.ANY;
    }
  }
  typeParser(data) {
    var flag = true;
    for(let type in Object.keys(Packet.TYPE)) {
      if(data.toUpperCase() == type) {
        flag = false;
        return Packet.TYPE[type];
      }
    }
    if(flag) {
      return Packet.TYPE.ANY;
    }
  }
  nameParser(data) {
    return data;
  }

}

module.exports = Parser;