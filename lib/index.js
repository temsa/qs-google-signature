var qs = require('qs');
var url = require('url');
var crypto = require('crypto');

exports.stringify = function(options, urlOrPath) {
  if (!options || !options.signature || !urlOrPath)
    return qs.stringify(options);

  var signature = new Buffer(unWebsafe(options.signature), 'base64');
  delete options.signature;

  var queryStringNoSignature = websafe(qs.stringify(options));
  var path = url.parse(urlOrPath).pathname;

  var hmac = crypto.createHmac('sha1', signature);
  hmac.update(path + "?" + decodeURIComponent(queryStringNoSignature), 'ascii');

  var encodedSignature = hmac.digest('base64');
  options.signature = unWebsafe(encodedSignature);

  return qs.stringify(options);
};

function websafe(str) {
  return str.replace(/[-]/g, "+").replace(/[_]/g, "/");
}

function unWebsafe(str) {
  return str.replace(/[+]/g, "-").replace(/[/]/g, "_");
}
