module.exports = function (linksHeader) {
  var result = {};
  linksHeader.split(',')
    .map(function (entry) {
      return entry.trim();
    }).map(function (entry) {
      var key = /rel="(.*)"/.exec(entry)[1];
      var source = /^<(.*)>/.exec(entry)[1];
      return [key, source];
    }).forEach(function (kp) {
      result[kp[0]] = kp[1];
    });

  return result;
};