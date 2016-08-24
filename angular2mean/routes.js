var express = require('express');
var router = express.Router();


var url ='mongodb://localhost:27017/test';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
mongoose.Promise = global.Promise;
var bookSchema = mongoose.Schema({
    bname: String,
    author: String,
    pages: Number
});
var Book = mongoose.model('Book', bookSchema);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB');
db.collection('books').createIndex({bname:"text"});



   router.route('/books').get( function(req, res) {
        Book.find({}, function(err, docs) {
           if(err) return console.error(err);
            res.json(docs);
        });
     });

    
   router.route('/books/count').get( function(req, res) {
        Book.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
     });


    router.route('/book').post(function(req, res) {
        var obj = new Book(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
     });
  
    router.route('/book/:id').get( function(req, res) {
        Book.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })
     });

    
    router.route('/book/:id').put( function(req, res) {
        console.log(req.params.id)
        Book.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
     });

    
    router.route('/book/:id').delete( function(req, res) {
        Book.findOneAndRemove({_id: req.params.id}, function(err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        });
     });

    router.route('/books/:name').get( function(req, res) {
         Book.find({$text:{$search: req.params.name}}, function(err, obj) {
           if(err) return console.error(err);
            res.json(obj);
        })
     }); 
        
  
	
	 router.route('/*').get(function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
        });

	 });
        
    module.exports = router;


