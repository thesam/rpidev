$(document).ready(function(){



var Datastore = require('nedb');
var db = new Datastore({ filename: 'test.db', autoload: true });


db.insert([{ a: 5 }, { a: 42 }, { a: 5 }], function (err) {});

// Find all documents in the collection
db.find({}, function (err, docs) {
	docs.forEach(function(entry) {
    	console.log(entry);
	});
});

});