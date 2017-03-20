var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

var configs = require('./configs.json');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/listFolder', function (req, res) {
  fs.readdir(configs.dir, (err, files) => {
    var allFiles = {};
    files.forEach(file => {
      var path = configs.dir + '/' + file;
      if (fs.lstatSync(path).isDirectory()) {
        allFiles[file] = path;
      }
    });
    res.end(JSON.stringify(allFiles));
  })
});

app.post('/addSome', function (req, res) {
  console.log('POST addSome')
  console.log(req.body);
  res.end('{"result":"ok"}');
});

var server = app.listen(8081, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

})
