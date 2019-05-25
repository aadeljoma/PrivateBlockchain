/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
class LevelSandbox {
  // Declaring the class constructor
  constructor() {
    this.db = level(chainDB);
  }
  // Add data to levelDB with key/value pair
  addLevelDBData(key,value){
    let self = this;
    return new Promise(function(resolve, reject) {
      self.db.put(key, value, function(err) {
        if (err){
          reject('Block ' + key + ' submission failed', err);
        } else {
          //(JSON.stringify(value)).toString()
          console.log(value);
          resolve(value);
        }
      });
    });
  }

  // Add data to levelDB with value
  addDataToLevelDB(value) {
    let i = 0;
    let self = this;
    return new Promise(function(resolve, reject){
      self.db.createReadStream().on('data', function(data) {
        i++;
      }).on('error', function(err) {
        return console.log('Unable to read data stream!', err)
      }).on('close', function() {
        console.log('Block #' + i);
        addLevelDBData(i, value);
      });
    });
  }
}
module.exports.LevelSandbox = LevelSandbox;
