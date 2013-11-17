var _ = require('lodash');
var Table = require('easy-table');

function report(username, counts) {
  if (!counts) {
    console.log('nothing to print');
    return;
  }

  counts = _.pairs(counts);
  counts = _.sortBy(counts, function (nameCount) {
    return nameCount[1];
  });
  counts = counts.reverse();
  var total = counts.reduce(function (sum, nameCount) {
    return sum + nameCount[1];
  }, 0);
  counts.push(['Total', total]);

  var t = new Table();
  counts.forEach(function (nameCount) {
    t.cell('Module', nameCount[0]);
    t.cell('Downloads last month', nameCount[1]);
    t.newRow();
  });

  return 'username: ' + username + '\n' + t.toString();
}

module.exports = report;
