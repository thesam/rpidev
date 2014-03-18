var express = require('express');
var app = express();

//app.get('/', function(req, res){
//  res.send('Hello World');
//});

app.post('/lampa', function(req,res){
  console.log("POST!");
  var exec = require('child_process').exec;
  exec ("ls -la", console.log);
  res.send();
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});
