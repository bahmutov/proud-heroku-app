var Q = require('q');
var dexec = require('deferred-exec');

function convertVersion() {
  console.log('getting convert version');
  var defer = Q.defer();

  dexec('convert --version')
  .done(function (stdout, stderr) {
    if (stderr) {
      console.log(stderr);
    }
    defer.resolve(stdout);
  })
  .fail(function (err) {
    console.error('could not get version');
    console.error(err);
    defer.reject(err);
  });

  return defer.promise;
}

module.exports = convertVersion;
