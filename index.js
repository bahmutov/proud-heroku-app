var connect = require('connect');
var http = require('http');
var proud = require('proud');
// var proudBadge = require('proud-badge');
var report = require('./src/report');

var port = process.env.PORT || 3000;

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
    console.log(username);

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
  });

http.createServer(app).listen(port);
console.log('listening to port', port);
