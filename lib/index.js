(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) define(definition);
  else context[name] = definition();

})('li', function () {
  // compile regular expressions ahead of time for efficiency
  var relsRegExp = /^;\s*rel=(?:"([^"]+)"|([^";,]+)(?:[;,]|$))/;
  var keysRegExp = /([^\s]+)/g;
  var sourceRegExp = /^<([^>]*)>/;
  var delimiterRegExp = /^\s*,\s*/;

  return {
    parse: function (linksHeader) {
      var links = {};
      var match;
      var source;
      var rels;

      while (linksHeader) {
        linksHeader = linksHeader.trim();

        // Parse `<link>`
        source = sourceRegExp.exec(linksHeader);
        if (!source) break;

        // Move cursor
        linksHeader = linksHeader.slice(source[0].length);

        // Parse `; rel=relation` and `; rel="relation"`
        match = relsRegExp.exec(linksHeader);
        if (!match) break;

        // Move cursor
        linksHeader = linksHeader.slice(match[0].length);

        // Add either quoted rel or unquoted rel
        rels = (match[1] || match[2]).split(/\s+/)

        // Add the link to `links` under every rel
        rels.forEach(function (rel) {
          links[rel] = source[1];
        });

        // Move cursor
        linksHeader = linksHeader.replace(delimiterRegExp, '');
      }

      return links;
    },
    stringify: function (headerObject, callback) {
      var result = "";
      for (var x in headerObject) {
        result += '<' + headerObject[x] + '>; rel="' + x + '", ';
      }
      result = result.substring(0, result.length - 2);

      return result;
    }
  };

}, this);
