import mongoose, { Schema, Document } from "mongoose";

export enum Role {
    USER = "user",
    ADMIN = "admin"
}

export interface UserType extends Document {
    userName: string;
    email: string;
    password: string;
    address: string;
    role: Role;
}

const userSchema: Schema = new Schema<UserType>(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER
        }
    },
    { timestamps: true,versionKey:false }
);

export const UserModel = mongoose.model<UserType>("User", userSchema);
