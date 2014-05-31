//Module Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var morgan = require('morgan');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodeapp');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

//Set port number
var portnumber = 3000;

//Initialise Express
var app = express();
console.log('Express has been initialized');

function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(nib())
}

//Set Views Folder
app.set('views',__dirname + '/views');

//Initialise Jade
app.set('view engine', 'jade');
console.log('Jade has been initialised');

//Stylus Middleware
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(cookieParser('mykey'));
app.use(expressSession());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

app.get('/', routes.index);
//app.get('/users', user.list);
app.get('/userlist',routes.userlist(db));
app.post('/adduser',routes.adduser(db));

//Render Index Page
app.get('/', function(req, res) {
    res.render('index',
               {title: 'Welcome'}
              );
});

app.listen(portnumber);
console.log('Server is now running on port ' + portnumber);