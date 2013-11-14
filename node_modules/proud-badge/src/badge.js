var check = require('check-types');
var Q = require('q');
var dexec = require('deferred-exec');
var humanize = require('humanize-plus');

function proudBadge(username, n, filename) {
  check.verify.unemptyString(username, 'expected username');
  check.verify.number(n, 'expected number of downloads');
  check.verify.unemptyString(filename, 'expected filename');

  var defer = Q.defer();

  dexec('convert -background lightblue -fill black -font Helvetica ' +
    '-size 280x72 -gravity center label:\'' + username + ' proud ' +
    humanize.compactInteger(n, 1) + '\nNPM downloads\' ' +
    '-frame 2x2+2+0 ' +
    filename)
  .done(function (stdout, stderr) {
    defer.resolve(stdout);
  })
  .fail(function (err) {
    console.error('could not get generate badge');
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

module.exports = proudBadge;
