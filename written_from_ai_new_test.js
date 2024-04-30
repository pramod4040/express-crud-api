// Importing necessary packages
const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

// Schema definition for the Book model
const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sku: {
        type: String,
        required: true,
        unique: true  // SKU should be unique for each book
    }
}, { timestamps: true }); // Schema options for timestamps

// Applying pagination plugin
BookSchema.plugin(mongoosePaginate);

// Model creation
const Book = mongoose.model('Book', BookSchema, 'books');

// new changes here going on 

// new code added

// Exporting the model
export default Book;

