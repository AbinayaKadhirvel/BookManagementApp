var express = require('express');
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');
var path = require('path');
// To create an instance of express
var app = express();

var port = 5000;

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('src/views'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.use(morgan('combined'));

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    if (err) {
        debug(err);
    } else {
        debug('Running server on port: ' + chalk.green(port));
    }
});