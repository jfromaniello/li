Parse a [Links header](http://www.w3.org/Protocols/9707-link-header.html) into a javascript object.

## Install

    $ npm install parse-links

## Usage

~~~javascript
var parseLinks = require('parse-links');
var someLinksHeader = '</api/users?page=0&per_page=2>; rel="first", ' +
                      '</api/users?page=1&per_page=2>; rel="next", ' +
                      '</api/users?page=3&per_page=2>; rel="last"';
var linksObject = {
  first : '/api/users?page=0&per_page=2',
  next  : '/api/users?page=1&per_page=2',
  last  : '/api/users?page=3&per_page=2',
};

console.log(parseLinks.parse(someLinksHeader));

// This will print:
// { 
//   first: '/api/users?page=0&per_page=2',
//   next: '/api/users?page=1&per_page=2',
//   last: '/api/users?page=3&per_page=2' 
// }

console.log(parseLink.stringify(linksObject);

// This will print the string:
// </api/users?page=0&per_page=2>; rel="first", 
// </api/users?page=1&per_page=2>; rel="next", 
// </api/users?page=3&per_page=2>; rel="last"

~~~

## Development

    $ npm install -d

### Testing

    $ npm install -g mocha
    $ mocha -u bdd -R spec

## License

MIT!
