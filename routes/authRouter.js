import express from "express";

import { registerUser } from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { registerUserSchema } from "../schemas/authSchemas.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

export default authRouter;
