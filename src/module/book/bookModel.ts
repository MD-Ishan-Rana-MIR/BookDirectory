import mongoose from "mongoose";
import { BookType } from "./bookType";

const bookSchema = new mongoose.Schema<BookType>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    publicationYear: {
        type: Number,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    }
});


const bookModel = mongoose.model<BookType>('Book', bookSchema);

export default bookModel;