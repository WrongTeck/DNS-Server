const ioredis = require('ioredis');
const JSONreader = require('./JSON');
class Redis {
  constructor(params) {
    this.redis = new ioredis(params);
    this.cache = new JSONreader();
    return this;
  }
  get(key) {
    return this.redis.get(key);
  }
  set(key, value) {
    return this.redis.set(key, value);
  }
}