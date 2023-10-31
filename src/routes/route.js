const express = require("express")
const router = express.Router()
const createBook =require('../controlles/bookController.js')
const getBooks =require('../controlles/bookController.js')
const getBooksById =require('../controlles/bookController.js')
const updateBookDetails =require('../controlles/bookController.js')
const deleteBookById =require('../controlles/bookController.js')

router.post('/create',createBook)
router.get('/books', getBooks)
router.get('/books/:bookId', getBooksById)
router.put('/books/:bookId',updateBookDetails)
router.delete('/books/:bookId',deleteBookById)



module.exports = router