require('chai').should();
var li     = require('../lib');

var fixture = '</api/users?page=0&per_page=2>; rel="first", ' +
              '</api/users?page=1&per_page=2>; rel="next", ' +
              '</api/users?page=3&per_page=2>; rel="last", ' +
              '</api/users/123>; rel="self", ' +
              '</api/users/12345>; rel="related alternate"';

var linksObject = {
  first               : '/api/users?page=0&per_page=2',
  next                : '/api/users?page=1&per_page=2',
  last                : '/api/users?page=3&per_page=2',
  self                : '/api/users/123',
  'related alternate' : '/api/users/12345'
};

describe('parse-links', function () {
  describe('parse the links!', function(){
    it('it should parse a links string into an object', function () {
      var parsed = li.parse(fixture);
      parsed.first.should.eql('/api/users?page=0&per_page=2');
      parsed.next.should.eql('/api/users?page=1&per_page=2');
      parsed.last.should.eql('/api/users?page=3&per_page=2');
      parsed.self.should.eql('/api/users/123');
      parsed.alternate.should.eql('/api/users/12345');
      parsed.related.should.eql('/api/users/12345');
    });
  });

  describe('stringify link object', function(){
    it('should return a string with the links', function() {
      var stringified = li.stringify(linksObject);
      stringified.should.equal(fixture);
    });
  });
});
