import express from "express";
import { userRegistration } from "./userController";

const authRouter = express.Router();

authRouter.post(`/registration`, userRegistration )



export default authRouter;