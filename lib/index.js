module.exports = function (linksHeader) {
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