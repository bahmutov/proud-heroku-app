var proud = require('proud');
var badge = require('./src/badge');
var check = require('check-types');

function total(counts) {
  return Object.keys(counts).reduce(function (sum, name) {
    return sum + counts[name];
  }, 0);
}

function queryThenBadge(username) {
  check.verify.unemptyString(username, 'expected username');

  var filename = username + '.png';

  return proud(username)
  .then(function (counts) {
    check.verify.object(counts, 'missing counts object');
    var n = total(counts);
    console.log(n + ' total downloads last month');
    return badge(username, n, filename);
  })
  .then(function () {
    console.log('probably saved', filename);
    return filename;
  })
  .catch(function (err) {
    console.error(err);
    console.error(err.stack);
  });
}

if (module.parent) {
  module.exports = function (username) {
    return queryThenBadge(username);
  };
} else {
  var username = 'bahmutov';
  console.log('generating badge for', username);
  queryThenBadge(username);
}
