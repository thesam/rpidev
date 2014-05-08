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
        lampsdb.insert({ name: 'Vardagsrum', type: 'simple', state: 'on'});
        lampsdb.insert({ name: 'Fönster, sovrum', type: 'dimmer', state: '5'});
    }
});

app.get('/lampa', function (req, res) {
    lampsdb.find({}, function (err, lamps) {
      console.log(lamps);
        res.send(lamps);
    })
});

app.post('/lampa/:id', function (req, res) {
    var exec = require('child_process').exec;
    //exec("ls -la", console.log);
    var id = req.params.id;
    console.log("id = " + id);
    res.send();
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
