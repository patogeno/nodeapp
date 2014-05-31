//Module Dependencies
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var morgan = require('morgan');

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
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));
app.use(express.static(__dirname + '/public'));

//Render Index Page
app.get('/', function(req, res) {
    res.render('index',
               {title: 'Welcome'}
              );
});

app.listen(portnumber);
console.log('Server is now running on port ' + portnumber);