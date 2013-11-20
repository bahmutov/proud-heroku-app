var check = require('check-types');
var Q = require('q');
var dexec = require('deferred-exec');
var humanize = require('humanize-plus');

function unknownUserCommand(filename) {
  check.verify.unemptyString(filename, 'expected filename');

  return 'convert -background lightgray -fill black -font Helvetica ' +
    '-size 280x72 -gravity center label:\'Unknown user\' ' +
    '-frame 2x2+2+0 ' + filename;
}

function existingCountBadgeCommand(username, n, filename) {
  check.verify.unemptyString(username, 'expected username');
  check.verify.number(n, 'expected number of downloads');
  check.verify.unemptyString(filename, 'expected filename');

  return 'convert -background lightblue -fill black -font Helvetica ' +
    '-size 280x72 -gravity center label:\'' + username + ' proud ' +
    humanize.compactInteger(n, 1) + '\nNPM downloads\' ' +
    '-frame 2x2+2+0 ' +
    filename;
}

function generate(cmd) {
  check.verify.unemptyString(cmd, 'missing generate badge command');
  var defer = Q.defer();
  dexec(cmd)
  .done(function (stdout, stderr) {
    if (stderr) {
      console.log(stderr);
    }
    defer.resolve(stdout);
  })
  .fail(function (err) {
    console.error('could not get generate badge');
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

function proudBadge(username, n, filename) {
  var cmd;
  if (check.unemptyString(filename)) {
    cmd = existingCountBadgeCommand(username, n, filename);
  } else {
    filename = n;
    cmd = unknownUserCommand(filename);
  }

  return generate(cmd);
}

module.exports = proudBadge;
