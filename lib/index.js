(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) define(definition);
  else context[name] = definition();

})('li', function () {


  return {
    parse: function (linksHeader) {
      var result = {};
      var entries = linksHeader.split(',');
      // compile regular expressions ahead of time for efficiency
      var relsRegExp = /\brel=(?:"([^"]+)"|([^";,]+)(?:[;,]|$))/;
      var keysRegExp = /([^\s]+)/g;
      var sourceRegExp = /^<(.*)>/;

      for (var i = 0; i < entries.length; i++) {
        var entry = entries[i].trim();
        var source = sourceRegExp.exec(entry);
        var rels = relsRegExp.exec(entry);
        if (source && rels) {
          var href = source[1];
          var rel = rels[1] || rels[2];
          var keys = rel.match(keysRegExp);
          var k, kLength = keys.length;
          for (k = 0; k < kLength; k += 1) {
            result[keys[k]] = href;
          }
        }
      }

      return result;
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
