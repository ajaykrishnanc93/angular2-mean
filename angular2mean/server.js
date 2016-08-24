var express = require('express');
//var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use('/public', express.static(__dirname + '/public'));
app.use('/public/scripts', express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(morgan('dev'));



var routes = require('./routes');
app.use('/', routes);

 app.listen(app.get('port'), function() {
        console.log('MEAN app listening on port '+app.get('port'));
    });



