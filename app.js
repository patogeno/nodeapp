var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.render('index.ejs');
});

app.get('/about', function(req, res) {
    res.render('layout.ejs',{
        title: 'About Us',
        body:'<h1>About Usss</h1>'
    });
});

app.get('/*', function(req, res) {
    res.status(404).render('error.ejs');
});

console.log('Server started');

app.listen(3000);