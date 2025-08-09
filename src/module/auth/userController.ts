import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "./userModel";


const saltRounds = 10;



export const userRegistration = async (req: Request, res: Response) => {
    const { userName, email, password, address } = req.body;

    try {
        // 1. Validate inputs
        if (!userName) {
            return res.status(400).json({
                status: "fail",
                msg: "Enter user name"
            });
        }
        if (!email) {
            return res.status(400).json({
                status: "fail",
                msg: "Enter email"
            });
        }
        if (!password) {
            return res.status(400).json({
                status: "fail",
                msg: "Enter password"
            });
        }

        // 2. Check if user already exists (by email or username)
        const existingUser = await UserModel.findOne({
            $or: [{ email }, { userName }]
        });

        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                msg: "User already exists"
            });
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Create new user
        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
            address
        });

        // 5. Save to DB
        await newUser.save();

        // 6. Send success response
        res.status(201).json({
            status: "success",
            msg: "User registered successfully",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};