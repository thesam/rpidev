var exec = require('child_process').exec;
var express = require('express');
var app = express();
app.use(express.bodyParser());

// Needed to parse JSON body from POST/PUT
app.use(express.json());

//app.get('/', function(req, res){
//  res.send('Hello World');
//});

var Nedb = require('nedb');
var lampsdb = new Nedb({ filename: 'db/lamps.db', autoload: true });

// Fyll databasen om den är tom
lampsdb.find({}, function (err, lamps) {
    if (lamps.length === 0) {
        // state = simple = 1 - on, 0 - off.
        // state = dimmer = 0 - off, 1 -5 different % of dimming
        lampsdb.insert({ name: 'Kök', type: 'dimmer', state: '5'});
        lampsdb.insert({ name: 'Vardagsrum', type: 'simple', state: '0'});
        lampsdb.insert({ name: 'Fönster, sovrum', type: 'dimmer', state: '5'});
        lampsdb.insert({ name: 'Kjell A', number: 'A', type: 'simple', state: '0', protocol: 'kjell'});
        lampsdb.insert({ name: 'Kjell B', number: 'B', type: 'simple', state: '0', protocol: 'kjell'});
        lampsdb.insert({ name: 'Kjell C', number: 'C', type: 'simple', state: '0', protocol: 'kjell'});
    }
});

// List all lamps
app.get('/lampa', function (req, res) {
    lampsdb.find({}, function (err, lamps) {
        console.log(lamps);
        res.send(lamps);
    })
});

// Add new lamp
app.post('/lampa', function (req, res) {
    var lampFromRequest = req.body;
    //TODO: Validate input
    //console.log(lampFromRequest);
    lampsdb.insert(lampFromRequest);
    res.send("New lamp has been added");
});

// Change state of a lamp
app.put('/lampa/:id/:ctrlState', function (req, res) {
    //exec("ls -la", console.log);
    var id = req.params.id;
    var ctrlState = req.params.ctrlState;
    console.log("id = " + id);
    console.log("ctrlState = " + ctrlState);
    lampsdb.findOne({_id: id}, function (err, lamp) {
        console.log("LAMPA: " + JSON.stringify(lamp.protocol));
        if (lamp.protocol == "kjell") {
            //TODO: Validate input!!
            var state = "off";
            if (ctrlState == 1) {
                state = "on";
            }
            var cmd = "../transmit kjell " + lamp.number + " " + state;
            exec(cmd, console.log);
        }
    });
    //TODO: Overwrite lamp in db
    res.send();
});

//TODO: app.delete(..)

// List all sensors
app.get('/sensor', function (req, res) {
    var cmd = 'tdtool -l';
    res.setHeader('Content-Type', 'application/json');
    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      res.send(JSON.stringify({'output': stdout}));
    })
});

app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
