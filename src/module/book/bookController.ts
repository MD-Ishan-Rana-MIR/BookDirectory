import { Request, Response } from "express";
import bookModel from "./bookModel";


export const bookUpload = async (req: Request, res: Response) => {
    const reqBody = req.body;
    try {

        const data = await bookModel.create(reqBody);
        return res.status(201).json({
            message: "Book uploaded successfully",
            data: data
        })

    } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}


export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const data = await bookModel.find();
        return res.status(200).json({
            message: "Books retrieved successfully",
            data: data
        });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};

export const bookByUser = async (req: Request, res: Response) => {
    try {
        const userId = req.headers.id;
        const books = await bookModel.find({ userId: userId });

        if (books.length === 0) {
            return res.status(404).json({ message: "No books found for this user" });
        }

        return res.status(200).json({
            message: "Books retrieved successfully",
            data: books
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const book = await bookModel.findById({ _id: bookId });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "Book retrieved successfully",
            data: book
        });
    } catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};


export const bookFilter = async (req: Request, res: Response) => {
    const { title, author, genre, publicationYear } = req.query;
    const filter: any = {};
    try {
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (author) {
            filter.author = { $regex: author, $options: 'i' }; // Case-insensitive search
        }
        if (genre) {
            filter.genre = { $regex: genre, $options: 'i' }; // Case-insensitive search
        }
        if (publicationYear) {
            filter.publicationYear = publicationYear;
        }
        const books = await bookModel.find(filter);
        if (books.length === 0) {
            return res.status(404).json({ message: "No books found matching the criteria" });
        }
        return res.status(200).json({
            message: "Books filtered successfully",
            data: books
        });

    } catch (error) {
        console.error("Error filtering books:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}


export const updateBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    const reqBody = req.body;
    try {
        const updateBook = await bookModel.findByIdAndUpdate({ _id: bookId }, reqBody, { new: true });
        if (!updateBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "Book updated successfully",
            data: updateBook
        });
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};


export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const deleteBook = await bookModel.findByIdAndDelete({ _id: bookId });
        if (!deleteBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({
            message: "Book deleted successfully",
            data: deleteBook
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

