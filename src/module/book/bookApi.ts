import express from "express";
import { bookByUser, bookFilter, bookUpload, deleteBook, getAllBooks, getBookById } from "./bookController";
import { isAdmin, isLogin } from "../../middleware/authMiddleware";

const bookRouter = express.Router();

bookRouter.post("/upload", isLogin, isAdmin, bookUpload);
bookRouter.get("/all-books", isLogin, getAllBooks);
bookRouter.get("/book-by-user", isLogin, bookByUser);
bookRouter.get("/single-book/:id", isAdmin, getBookById);
bookRouter.get("/booki-filter", bookFilter);
bookRouter.put("/update-book/:id", isLogin, bookUpload);
bookRouter.delete("/delete-book/:id", isLogin, isAdmin, deleteBook);


export default bookRouter;    