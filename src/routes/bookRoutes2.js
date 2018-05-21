const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:bookRoutes2');

const bookRouter2 = express.Router();

function router(nav) {
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

    bookRouter2.route('/')
        .get((req, res) => {
            const url = 'mongodb://localhost:27017';
            const dbName = 'libraryApp';

            (async function mongo() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected correctly to server');

                    const db = client.db(dbName);

                    const collection = await db.collection('books');

                    const books = await collection.find().toArray();

                    res.render(
                        'bookListView',
                        {
                            nav,
                            title: 'Library',
                            books
                        }
                    );
                } catch (err) {
                    debug(err.stack);
                }

                client.close();
            }());
        });

    bookRouter2.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const { id } = req.params;
                const request = new sql.Request();
                const { recordset } =
                    await request.input('id', sql.Int, id)
                        .query('SELECT * FROM books WHERE id = @id');
                [req.book] = recordset;
                next();
            }());
        })
        .get((req, res) => {
            res.render(
                'bookView',
                {
                    nav,
                    title: 'Library',
                    book: req.book
                }
            );
        });

    return bookRouter2;
}

module.exports = router;