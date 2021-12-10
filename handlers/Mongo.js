const mongo = require("mongodb");

class Mongo {
  constructor(params) {
    this.init(params);
  }
  init(params) {
    return new Promise((resolve, reject) => {
      mongo.MongoClient.connect(
        this.url(params),
        { useNewUrlParser: true },
        (err, client) => {
          if (err) {
            reject(err);
          } else {
            this.db = client.db(params.db);
            resolve();
          }
        }
      );
    });
  }
  get(collection, query) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).find(query).toArray((err, docs) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
    });
  }
  insert(collection, data) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).insertOne(data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  update(collection, query, data) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).updateOne(query, data, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  delete(collection, query) {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).deleteOne(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  url(params) {
    if(params.user && params.password) {
      return `mongodb://${params.user}:${params.password}@${params.host}:${params.port}/${params.db}`;
    }
    return `mongodb://${params.host}:${params.port}/${params.db}`;
  }
}
module.exports = Mongo;