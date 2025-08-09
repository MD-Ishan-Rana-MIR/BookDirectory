import { Document } from "mongoose";

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
