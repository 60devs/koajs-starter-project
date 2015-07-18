var getRawBody = require('raw-body');

module.exports = function* (next) {
  var rules = [
    /toBeParsedRaw/
  ];

  var url = this.originalUrl;
  var isRawUrl = rules.some((exp) => {
    return exp.test(url);
  });

  if (isRawUrl) {
    this.request.body = yield getRawBody(this.req, {
      length: this.length,
      limit: '1mb',
      encoding: this.charset
    });
  }

  yield next;
}
