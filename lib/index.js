var qs = require('qs');
var url = require('url');
var crypto = require('crypto');
var debug = require('debug')("qs:signature")

exports.stringify = function(options, urlOrPath) {
  if (!options || !options.signature || !urlOrPath)
    return qs.stringify(options);
  debug("original url/path", urlOrPath);

  var usablePrivateKey = new Buffer(websafe(options.signature), 'base64');
  delete options.signature;

  var query = qs.stringify(options);
  debug("query", query);

  var location = url.parse(urlOrPath);

  var hmac = crypto.createHmac('sha1', usablePrivateKey);
  location.search = query;

  var urlToSign = location.pathname + "?" + location.search;
  debug("url to sign", urlToSign);

  hmac.update(urlToSign);

  debug("full url to sign", location.format());

  var hash = hmac.digest('base64');
  options.signature = unWebsafe(hash);

  debug("signature", options.signature);

  var result = qs.stringify(options).replace(/signature[=](.*?)([&]|$)/, function(all, theMatch, end) {
    //console.log(arguments)
    var finalQs = decodeURIComponent("signature=" + theMatch + end);

    debug("qs signature", finalQs);
    return finalQs;
  });

  debug("qs", result);
  return result;
};

function websafe(str) {
  return str.replace(/[-]/g, "+").replace(/[_]/g, "/");
}

function unWebsafe(str) {
  return str.replace(/[+]/g, "-").replace(/[/]/g, "_");
}
