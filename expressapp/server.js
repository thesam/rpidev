var express = require('express');
var app = express();

//app.get('/', function(req, res){
//  res.send('Hello World');
//});

var Nedb = require('nedb');
var lampsdb = new Nedb({ filename: 'db/lamps.db', autoload: true });

// Fyll databasen om den är tom
lampsdb.find({}, function (err, lamps) {
    if (lamps.length === 0) {
        lampsdb.insert({ name: 'Vardagsrum', type: 'simple'});
        lampsdb.insert({ name: 'Fönster, sovrum', type: 'dimmer'});
    }
});

app.get('/lampa', function (req, res) {
    lampsdb.find({}, function (err, lamps) {
        res.send(lamps);
    })
});

app.post('/lampa', function (req, res) {
    console.log("POST!");
    var exec = require('child_process').exec;
    exec("ls -la", console.log);
    res.send();
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
