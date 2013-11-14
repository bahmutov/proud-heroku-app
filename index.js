var connect = require('connect');
var http = require('http');
var proud = require('proud');
// var proudBadge = require('proud-badge');
var report = require('./src/report');
var fs = require('fs');
var check = require('check-types');

var port = process.env.PORT || 3000;

function getBadge(username) {
  var image = fs.readFileSync(username + '.png');
  return image;
}

function sendBadge(username, res) {
  console.log('returning badge image for', username);
  check.verify.unemptyString(username, 'expected username');

  var image = getBadge(username);
  res.writeHead(200, {
    'Content-Length': image.length,
    'Content-Type': 'image/png'
  });
  res.write(image);
  res.end();
}

function sendTextReport(username, res) {
  console.log('returning text for', username);

  proud(username)
  .then(report.bind(null, username))
  .then(function (report) {
    console.log('report', report);

    if (!report) {
      res.end(username + ' has no modules\n');
    } else {
      res.end(report);
    }
  })
  .catch(console.error);
}

var app = connect()
  .use(connect.favicon())
  .use(connect.logger('dev'))
  .use(connect.static('public'))
  .use(connect.query())
  .use(function (req, res){
    if (!req.url || req.url === '/') {
      res.writeHead(401, 'missing NPM username');
      res.end();
      return;
    }

    var username = req.url.split('/')[1];
    if (!username) {
      res.writeHead(401, 'missing NPM username');
      res.end();
      return;
    }

    if (/image/.test(req.headers.accept)) {
      sendBadge(username, res);
    } else {
      sendTextReport(username, res);
    }
  });

http.createServer(app).listen(port);
console.log('listening to port', port);
