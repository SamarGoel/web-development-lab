const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// In-memory book collection
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 }
];

let nextId = 4;

// GET all books
app.get('/api/books', (req, res) => {
    res.json(books);
});

// GET a single book by id
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
});

// POST - add a new book
app.post('/api/books', (req, res) => {
    const { title, author, year } = req.body;
    if (!title || !author || !year) {
        return res.status(400).json({ message: "Please provide title, author, and year" });
    }
    const newBook = {
        id: nextId++,
        title,
        author,
        year: parseInt(year)
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT - update a book
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }
    const { title, author, year } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;
    if (year) book.year = parseInt(year);
    res.json(book);
});

// DELETE - delete a book
app.delete('/api/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }
    const deleted = books.splice(index, 1);
    res.json(deleted[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});