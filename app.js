const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
// To create an instance of express
const app = express();
const port = process.env.PORT || 5000;

const bookRouter = express.Router();

app.use(morgan('combined'));

app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/fonts')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));

app.set('views', './src/views');
app.set('view engine', 'ejs');

const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: "Lev Nikolayevich Tolstoy",
    read: false
}, {
    title: 'Les Miserables',
    genre: 'Historical Fiction',
    author: 'Victor Hugo',
    read: false
}, {
    title: 'A Journey into the Center of the Earth',
    gener: 'Science Fiction',
    author: 'Jules Verne',
    read: false
}, {
    title: 'The Time Machine',
    genre: 'Science Fiction',
    author: 'H. G. Wells',
    read: false
}, {
    title: 'The Dark World',
    genre: 'Fantasy',
    author: 'Henry Kuttner',
    read: false
}, {
    title: 'The Wind in the Willows',
    genre: 'Fantasy',
    author: 'Kenneth Grahame',
    read: false
}];

bookRouter.route('/')
    .get((req, res) => {
        res.render('books', {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library',
            books
        });
    });

bookRouter.route('/single')
    .get((req, res) => {
        res.send('hello single book');
    });

app.use('/books', bookRouter);
app.get('/', (req, res) => {
    res.render(
        'index',
        {
            nav: [{ link: '/books', title: 'Books' },
            { link: '/authors', title: 'Authors' }],
            title: 'Library'
        }
    );
});

app.listen(port, (err) => {
    if (err) {
        debug('Server error: ' + chalk.red(err));
    } else {
        debug(`Running server on port: ${chalk.green(port)}`);
    }
});
