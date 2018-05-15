const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// To create an instance of express
const app = express();
const port = process.env.PORT || 5000;

app.use(morgan('combined'));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));

app.use(express.static('src/views'));

app.get('/', function (req, res) {
    res.send('Hello World');
});

app.get('/books', function (req, res) {
    res.send('Hello Books');
});

app.listen(port, function (err) {
    if (err) {
        debug("Server error: " + chalk.red(err));
    } else {
        debug('Running server on port: ' + chalk.green(port));
    }
});