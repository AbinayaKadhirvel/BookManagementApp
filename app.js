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
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { list: ['a', 'b'], title: 'Library' });
});

app.get('/books', (req, res) => {
    res.send('Hello Books');
});

app.listen(port, (err) => {
    if (err) {
        debug('Server error: ' + chalk.red(err));
    } else {
        debug(`Running server on port: ${chalk.green(port)}`);
    }
});
