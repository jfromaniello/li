var parseLinks = require('../lib');
var fixture = '</api/users?page=0&per_page=2>; rel="first", ' +
              '</api/users?page=1&per_page=2>; rel="next", ' +
              '</api/users?page=3&per_page=2>; rel="last", ' +
              '</api/users/123>;rel=self, ' +
              '</api/users/12345>;rel="related alternate"';

describe('parse-links', function () {
  it('parse the links!', function () {
    var parsed = parseLinks(fixture);
    parsed.first.should.eql('/api/users?page=0&per_page=2');
    parsed.next.should.eql('/api/users?page=1&per_page=2');
    parsed.last.should.eql('/api/users?page=3&per_page=2');
    parsed.self.should.eql('/api/users/123');
    parsed.alternate.should.eql('/api/users/12345');
    parsed.related.should.eql('/api/users/12345');
  });
});
