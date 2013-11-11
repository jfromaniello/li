(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) define(definition);
  else context[name] = definition();

})('parseLinks', function () {


  return function (linksHeader) {
    var result = {};
    var entries = linksHeader.split(',');
    // compile regular expressions ahead of time for efficiency
    var relsRegExp = /\brel="?([^"]+)"?\s*;?/;
    var keysRegExp = /(\b[0-9a-z\.-]+\b)/g;
    var sourceRegExp = /^<(.*)>/;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i].trim();
      var rels = relsRegExp.exec(entry);
      if (rels) {
        var keys = rels[1].match(keysRegExp);
        var source = sourceRegExp.exec(entry)[1];
        var k, kLength = keys.length;
        for (k = 0; k < kLength; k += 1) {
          result[keys[k]] = source
        }
      }
    }

    return result;
  };

}, this);
