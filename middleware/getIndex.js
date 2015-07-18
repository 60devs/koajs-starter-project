var redis = require('../shared/redis');

module.exports = function* () {
  this.body = {
    status: 'OK',
    result: yield redis.get('testKey')
  };
}