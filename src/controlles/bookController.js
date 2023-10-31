const bookModel = require('../models/bookModel.js')
const mongoose = require('mongoose')


const createBook = async (req, res) => {
    try {
        const {title, author, summary} = req.body
        if(!title){
            return res.status(400).json({status:false, message:"Please provide title"})
        }
        if(!author){
            return res.status(400).json({status:false, message:"Please provide author"})
        }
        if(!summary){
            return res.status(400).json({status:false, message:"Please provide summary"})
        }
        const titleBook = await bookModel.findOne({title:title})
        if(titleBook){
            return res.status(400).json({ status:false, message:"Title is already present please provide different title"})
        }
        const book = await bookModel.create(req.body)
        res.status(201).json({status:true, data:book})
    } catch (error) {
        res.status(500).json({status:false, message:error.message})
    }
}

const getBooks = async (req, res) => {
    try {
        const books = await bookModel.find()
        if (books.length == 0) {
            return res.status(404).json({ status: false, message: 'No books found' });
        }
        res.status(200).json({ status: true, message: 'Books list', data: books });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const getBooksById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const ObjectId = mongoose.Types.ObjectId
        if (!ObjectId.isValid(bookId)) {
            return res.status(400).json({ status: false, message: 'Book Id is invalid' });
        }
        const book = await bookModel.findById(bookId)
        if (!book) {
            return res.status(404).json({ status: false, message: 'Book does not exist' });
        }
        res.status(200).json({ status: true, data: book });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
}

const updateBooks = async function (req, res) {
    try {
        let BookID = req.params.bookId;
        let data = req.body;

        const { title, author, summary } = data;

        if (Object.keys(data).length != 0) {

            if (!title && !author && !summary ) {
                return res.status(400).json({ status: false, message: "At least one field is required." });
            }

            let updateData = {};

            if (title) {
                if (title && typeof title != "string") {
                    return res.status(400).json({ status: false, message: "Title must be in string" });
                }
                if (!title.trim()) {
                    return res.status(400).json({ status: false, message: "Title can not be empty." });
                }
                let trimTitle = title.toLowerCase().trim();
                const checkTitle = await bookModel.findOne({ title: trimTitle });
                if (checkTitle) {
                    return res.status(400).json({ status: false, message: `The title ${trimTitle} is already is in use for a Book.Try another one.` });
                }
                updateData.title = trimTitle;
            }

            if (author) {
                if (author && typeof excerpt != "string") {
                    return res.status(400).json({ status: false, message: "author must be in string" });
                }
                let trimAuthor = author.trim();
                const checkAuthor = await bookModel.findOne({ author: trimAuthor });
                if (checkAuthor) {
                    return res.status(400).json({ status: false, message: `The ISBN ${trimAuthor} is already is in use for a Book.Try another one.` });
                }
                updateData.author = trimAuthor;
            }

            if (summary) {
                if (summary && typeof summary != "string") {
                    return res.status(400).json({ status: false, message: "summary must be in string" });
                }
                let trimSummary = summary.trim();

                const checkSummary= await bookModel.findOne({ summary: trimSummary });
                if (checkSummary) {
                    return res.status(400).json({ status: false, message: `The ISBN ${trimSummary} is already is in use for a Book.Try another one.` });
                }
                updateData.summary = trimSummary;
            }


            const updateBookDetails = await bookModel.findOneAndUpdate(
                { _id: BookID },
                updateData,
                { new: true }
            );

            if (!updateBookDetails) {
                return res.status(404).json({ status: false, message: "No data found for updation." });
            }

            return res.status(200).json({ status: true, message: "Success", data: updateBookDetails });
        } else {
            return res.status(400).json({ status: false, message: "Invalid request, body can't be empty." });
        }
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message });
    }
}


const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ status: false, message: 'Book Id is invalid' });
        }
        const book = await bookModel.findByIdAndDelete({ _id: bookId });
        if (book) {
            return res.status(404).json({ status: true, message: 'Delete bokk successfully' });
        }
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ status: false, message: error.message });
        }
        res.status(500).json({ status: false, message: error.message });
    }
}


module.exports= createBook
module.exports = getBooks
module.exports = getBooksById
module.exports = updateBooks
module.exports = deleteBookById
