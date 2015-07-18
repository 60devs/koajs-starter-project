var auth = require('../shared/auth');
var logger = require('winston');

function * authorizeUser(next) {
  // auth-free urls
  var rules = [
    /\/free.*/
  ];

  var url = this.originalUrl;
  var isFreeUrl = rules.some((exp) => {
    return exp.test(url);
  });

  if (!isFreeUrl) {
    var authToken = this.request.header.authorization;
    var result = yield auth.authorize(authToken);
    if (!result) {
      logger.info('Authorizing ' + authToken + ' ' + this.originalUrl + ' - false');
      this.throw(403);
    } else {
      logger.info('Authorizing ' + authToken + ' ' + this.originalUrl + ' - true');
    }

    this.user = result;
  }

  yield next;
}

module.exports = authorizeUser;
