//DEPENDENCIES
const express = require("express");
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require("method-override")

// app.set("view engine", "ejs") - allows you not to push .ejs when referencing a template


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Middleware
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

//ROUTES/CONTROLLERS
const bookController = require("./controllers/books");
app.use("/books", bookController);


//LISTENER
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("I'm listening")
})

//alternative syntax: Promise.then() pattern
/* 
app.get('/books/:id', (req, res) => {
 	Book.findById(req.params.id).then(book => {
        res.render("show.ejs", { book })
 	})
    .catch(error => {
        res.render("show", {error})
    })
});
*/

//alternative syntax: async await - allows us to write asyncronous code - syncronously 
/*
app.get('/books/:id', async (req, res) => {
	const book = await Book.findById(req.params.id);
	res.render("show.ejs", { book },
});
*/
