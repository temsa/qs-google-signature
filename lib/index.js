var qs = require('qs');
var url = require('url');
var crypto = require('crypto');
var debug = require('debug')("qs:signature")

exports.stringify = function(options, urlOrPath) {
  if (!options || !options.signature || !urlOrPath)
    return qs.stringify(options);

  var usablePrivateKey = new Buffer(websafe(options.signature), 'base64');
  delete options.signature;

  var query = qs.stringify(options);
  debug("query", query);

  var location = url.parse(urlOrPath);

  var hmac = crypto.createHmac('sha1', usablePrivateKey);
  location.search = query;

  var urlToSign = location.pathname + "?" + location.search;
  debug("\nurlToSign", urlToSign);

  hmac.update(urlToSign);

  var hash = hmac.digest('base64');
  options.signature = unWebsafe(hash);

  return qs.stringify(options).replace(/signature[=](.*?)([&]|$)/, function(all, theMatch, end) {
    //console.log(arguments)
    return decodeURIComponent("signature=" + theMatch + end);
  });
};

function websafe(str) {
  return str.replace(/[-]/g, "+").replace(/[_]/g, "/");
}

function unWebsafe(str) {
  return str.replace(/[+]/g, "-").replace(/[/]/g, "_");
}
