var should = require('chai').should();
var li     = require('../lib');

var fixture = '</api/users?page=0&per_page=2>; rel="first", ' +
              '</api/users?page=1&per_page=2>; rel="next", ' +
              '</api/users?page=3&per_page=2>; rel="last", ' +
              '</api/users/123>; rel="self", ' +
              '</api/users/12345>; rel="related alternate", ' +
              '</api/users?name=Joe+Bloggs>; rel="http://example.org/search-results", ' +
              '</api/users?status=registered>; rel="http://example.org/status-result collection"';
var quotfixture = '</api/users/1>; rel=home,'+
                  '</api/users/2>; rel=only one';

var linksObject = {
  first                                        : '/api/users?page=0&per_page=2',
  next                                         : '/api/users?page=1&per_page=2',
  last                                         : '/api/users?page=3&per_page=2',
  self                                         : '/api/users/123',
  'related alternate'                          : '/api/users/12345',
  'http://example.org/search-results'          : '/api/users?name=Joe+Bloggs',
  'http://example.org/status-result collection': '/api/users?status=registered'
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
      parsed['http://example.org/search-results'].should.eql('/api/users?name=Joe+Bloggs');
      parsed['http://example.org/status-result'].should.eql('/api/users?status=registered');
      parsed.collection.should.eql('/api/users?status=registered');
      Object.keys(parsed).length.should.eql(9);
    });
  });

  describe('parse links without quotes!', function() {
    it('should parse a links string without rels into an object', function () {
      var parsed = li.parse(quotfixture);
      parsed.home.should.eql('/api/users/1');
      parsed.only.should.eql('/api/users/2');
      parsed.one.should.eql('/api/users/2');
    });
  });

  describe('stringify link object', function(){
    it('should return a string with the links', function() {
      var stringified = li.stringify(linksObject);
      stringified.should.equal(fixture);
    });
  });
});
