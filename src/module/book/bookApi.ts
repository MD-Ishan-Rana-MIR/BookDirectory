import express from "express";
import { bookFilter, bookUpload, deleteBook, getAllBooks, getBookById } from "./bookController";

const bookRouter = express.Router();

bookRouter.post("/upload", bookUpload);
bookRouter.get("/all-books", getAllBooks);
bookRouter.get("/single-book/:id", getBookById);
bookRouter.get("/booki-filter", bookFilter);
bookRouter.put("/update-book/:id", bookUpload);
bookRouter.delete("/delete-book/:id", deleteBook);


export default bookRouter;    