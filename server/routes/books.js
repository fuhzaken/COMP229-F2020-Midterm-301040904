/*
File Name: books.js
Author: Kenneth Agustin
StudentID: 301040904
Web App Name: Favourite Books List
*/
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
  res.render('books/add', {title: 'Add Book'});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let newBook = new book({
      "Title": req.body.Title,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
    });
    book.create(newBook, (err, book) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //refresh the book list
        res.redirect('/books');
      }
    })
});

// GET the Book Details page in order to edit an existing Book
router.get('/update/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.findById(id, (err, bookToEdit) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //show the edit view
        res.render('books/update',
         {title: 'Edit Book', 
         book: bookToEdit})
      }
    })
});

// POST - process the information passed from the details form and update the document
router.post('/update/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "Title": req.body.Title,
      "Price": req.body.Price,
      "Author": req.body.Author,
      "Genre": req.body.Genre
    });
    book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        //show books
        res.redirect('/books');
      }
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        // show books
        res.redirect('/books');
      }
    })
});


module.exports = router;
