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

export const getBookById = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        const book = await bookModel.findById({_id : bookId});
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
}

