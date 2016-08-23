var express = require('express');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 3000));

app.use('/public', express.static(__dirname + '/public'));
app.use('/public/scripts', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));
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
    // select all
    app.get('/books', function(req, res) {
        Book.find({}, function(err, docs) {
           
            if(err) return console.error(err);
            res.json(docs);
       
       });

    });

    
    app.get('/books/count', function(req, res) {
        Book.count(function(err, count) {
            if(err) return console.error(err);
            res.json(count);
        });
    });

    // create
     app.post('/book', function(req, res) {
        var obj = new Book(req.body);
        obj.save(function(err, obj) {
            if(err) return console.error(err);
            res.status(200).json(obj);
        });
    });
 
    app.get('/book/:id', function(req, res) {
        Book.findOne({_id: req.params.id}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
        })

    });

    
    app.put('/book/:id', function(req, res) {
console.log(req.params.id)
        Book.findOneAndUpdate({_id: req.params.id}, req.body, function (err) {
            if(err) return console.error(err);
            res.sendStatus(200);
        })
    });

    
    app.delete('/book/:id', function(req, res) {
        Book.findOneAndRemove({_id: req.params.id}, function(err) {
            
            
            
            if(err) return console.error(err);
            res.sendStatus(200);
        });
    });

 app.get('/books/:name', function(req, res) {
        
        
        
    Book.find({$text:{$search: req.params.name}}, function(err, obj) {
           
            if(err) return console.error(err);
            res.json(obj);
       
       })

    }); 
        
    
        
        
        
        
        
        
        
      /*   Book.find({bname: req.params.name}, function (err, obj) {
            if(err) return console.error(err);
            res.json(obj);
       
       }) 
    }); */
   
    app.get('/*', function(req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });

      
 
    
    
    
    
    app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });
});

