import express from "express";
import { loginUser, userRegistration } from "./userController";

const authRouter = express.Router();

authRouter.post(`/registration`, userRegistration );
authRouter.post("/user-login",loginUser)



export default authRouter;