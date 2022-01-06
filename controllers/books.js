const express = require('express');
const bookRouter = express.Router();
const Book = require("../models/book")

//ROUTES
// SEED
const bookSeed = require('../models/bookSeed')
bookRouter.get('/books/seed', (req, res) => {
	Book.deleteMany({}, (error, allBooks) => {});

	Book.create(bookSeed, (error, data) => {
		res.redirect('/books');
	});
});

//INDEX
bookRouter.get('/', (req, res) => {
	Book.find({}, (error, allBooks) => {
		res.render('index.ejs', {
			books: allBooks,  
		});
	});
});

//NEW
bookRouter.get("/new", (req, res) => {
    res.render("new.ejs")
})

//DELETE
bookRouter.delete("/:id", (req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/books")
    })
})

//UPDATE
bookRouter.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
  
    Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true},
      (error, updatedBook) => {
        res.redirect(`/books/${req.params.id}`)
      }
    )
  })

//CREATE
bookRouter.post("/", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }
    Book.create(req.body, (error, createdBook) => {
        res.redirect("/books");
    });
});

//EDIT 
bookRouter.get("/:id/edit", (req, res) => {
    Book.findById(req.params.id, (error, foundBook) => {
        res.render("edit.ejs", {
            book: foundBook,
        })
    })
})

//SHOW
bookRouter.get('/:id', (req, res) => {
	Book.findById(req.params.id, (err, foundBook) => {
		res.render("show.ejs", {
            book: foundBook,
        });
	});
});

module.exports = bookRouter;