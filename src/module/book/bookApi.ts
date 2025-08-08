import express from "express";
import { bookUpload, getAllBooks, getBookById } from "./bookController";

const bookRouter = express.Router();

bookRouter.post("/upload", bookUpload);
bookRouter.get("/all-books", getAllBooks);
bookRouter.get("/single-book/:id", getBookById);


export default bookRouter;