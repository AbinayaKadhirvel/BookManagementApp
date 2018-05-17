const express = require('express');
const bookRouter = express.Router();

const books = [{
    title: 'War and Peace',
    genre: 'Historical Fiction',
    author: 'Lev Nikolayevich Tolstoy',
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

bookRouter.route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        res.render(
            'book',
            {
                nav: [{ link: '/books', title: 'Books' },
                { link: '/authors', title: 'Authors' }],
                title: 'Library',
                book: books[id]
            }
        );
    });

module.exports = bookRouter;