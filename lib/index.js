(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) define(definition);
  else context[name] = definition();

})('parseLinks', function () {


  return function (linksHeader) {
    var result = {};
    var entries = linksHeader.split(',');

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i].trim();
      var key = /rel="(.*)"/.exec(entry)[1];
      var source = /^<(.*)>/.exec(entry)[1];
      result[key] = source;
    }

    return result;
  };

}, this);