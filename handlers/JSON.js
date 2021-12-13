const fs = require("fs");
const Parser = require("./Parser");
class JSONreader {
  /**
   * Initialize a new instance of the JSON DNS builder 
   * @param {Object} options Options to pass
   * @returns {JSON_reader}
   */
  constructor(options) {
    /**
     * Contains the cache of all files indexed during the
     * startup process
     * @type {Array}
     */
    this.cache = [];
    if(options) {
      this.buildCache(options);
    }
    return this;
  }
  /**
   * Build the cache of the DNS server from files
   * @param {Object} options Options to build cache
   */
  buildCache(options) {
    var dir = "dns";
    if(options && options.dir) {
      dir = options.dir;
    }
    fs.readdir(`./${dir}`, {
      encoding: 'utf-8'
    }, (err, files) => {
      if(err) throw new Error(`Error while reading the ${dir}:\n${err}`);
      files.forEach((value, index, array) => {
        fs.readFile(`./${dir}/${value}`, { encoding: 'utf-8' }, (errFile, data) => {
          if(err) throw new Error(`Error while reading ${value}:\n${errFile}`);
          this.addCache(data);
        })
      });
    });
  }
  addCache(data) {
    if(typeof data === "string") {
      this.cache.push(new Parser(JSON.parse(data)));
    } else if(typeof data === "object") {
      this.cache.push(new Parser(data));
    } else {
      throw new Error("Data must be a string or an object");
    }
  }
  /**
   * Get the cache of the DNS server
   * @returns {Array}
    */
  getCache() {
    return this.cache;
  }
  get(name, cb) { 
    var result = [];
    this.cache.forEach((value, index, array) => {
      if(value.get(name)) {
        result.push(value.get(name));
      }
    });
    cb(null, result);
  }
}

module.exports = JSONreader;