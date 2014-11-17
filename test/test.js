//-- this should work
// URL: https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID
// Private Key: vNIXE0xscrmjlyV-12Nj_BvUPaw=
// URL Portion to Sign: /maps/api/geocode/json?address=New+York&client=clientID
// Signature: chaRF2hTJKOScPr-RQCEhZbSzIE=
// Full Signed URL: https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID&signature=Qq5Gl6GE-7nkFMlDfx0TACxSKEw=

var qs = require('..');
var should = require('chai').should();

describe('When using an "options" object with a signature', function() {
  //var url = "https://maps.googleapis.com/maps/api/geocode/json?address=New+York&client=clientID";

  //will be modified, so don't forget to clone it for re-use
  var query = {
    address: "New+York",
    client: "clientID",
    signature: "chaRF2hTJKOScPr-RQCEhZbSzIE="
  };

  var expectedQS = 'address=New+York&client=clientID&signature=Qq5Gl6GE-7nkFMlDfx0TACxSKEw=';

  describe('and a partial url', function() {

    var url = "/maps/api/geocode/json";

    it('it should match Google example', function() {
      var queryString = qs.stringify(clone(query), url);

      queryString.should.be.a('string');

      decodeURIComponent(queryString).should.equal(expectedQS);

    });
  });

  describe('and a full url', function() {

    var url = "https://maps.googleapis.com/maps/api/geocode/json";

    it('it should match Google example', function() {
      var queryString = qs.stringify(clone(query), url);

      queryString.should.be.a('string');

      decodeURIComponent(queryString).should.equal(expectedQS);


    });
  });

});

function clone(a) {
  return JSON.parse(JSON.stringify(a));
}
