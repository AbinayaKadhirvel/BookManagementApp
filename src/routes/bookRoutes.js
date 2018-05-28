const express = require('express');

const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');
const nav = [
    { link: '/books', title: 'Book' }
];
function router() {
    const { getIndex, getById, postNew, addNewBook, updateOneBook, deleteBook } = bookController(bookService, nav);
    bookRouter.route('/')
        .get(getIndex)
        .post(postNew);
    bookRouter.route('/:bookId')
        .get(getById)
        .put(addNewBook)
        .patch(updateOneBook)
        .delete(deleteBook);
    return bookRouter;
}

module.exports = router;
