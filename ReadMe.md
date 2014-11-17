Introduction
------------

This is a wrapper around [qs](https://github.com/hapijs/qs) package, made in order to create a querystring conforming to [Google Digital Signature ](https://developers.google.com/maps/documentation/business/webservices/auth#digital_signatures), by simply adding your signature key as the `signature` parameter, see Usage below.

It's especially intended as an almost drop'in replacement for [qs](https://github.com/hapijs/qs) package or [querystring](http://nodejs.org/api/querystring.html) node API in packages such as :

-	[google-distance-matrix](https://github.com/ecteodoro/google-distance-matrix)

-	[google-distance](https://github.com/edwlook/node-google-distance)

-	[googleMapsUtil](https://github.com/yupitel/googleMapsUtil)

Usage
-----

```js
var qs = require('qs-google-signature');

var query = {
  address: "New+York",
  client: "clientID",
  signature: "chaRF2hTJKOScPr-RQCEhZbSzIE=" //this is the signature key provided by Google
}

var queryString = qs.stringify(query, url);
//=> address=New+York&client=clientID&signature=Qq5Gl6GE-7nkFMlDfx0TACxSKEw=
```

License
-------

MIT
