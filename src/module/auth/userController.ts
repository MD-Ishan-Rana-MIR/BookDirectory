import { Request, Response } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "./userModel";
import jwt from "jsonwebtoken";

const saltRounds = 10;

import dotenv from "dotenv"
dotenv.config;


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

export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({ status: "fail", msg: "Please enter your email" });
        }
        if (!password) {
            return res.status(400).json({ status: "fail", msg: "Enter your password" });
        }
        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "fail", msg: "User not found" });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ status: "fail", msg: "Incorrect password" });
        }

       

        // Sign JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,

            { expiresIn: "1h" }
        );

        // Return success with token and user data (excluding password)
        res.status(200).json({
            status: "success",
            token,
            user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
                role: user.role,
                address: user.address,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ status: "error", msg: "Server error" });
    }
};