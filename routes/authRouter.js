import express from "express";

import {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userCredentialsSchema } from "../schemas/authSchemas.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(userCredentialsSchema), registerUser);
authRouter.post("/login", validateBody(userCredentialsSchema), loginUser);
authRouter.get("/current", authenticate, getUser);
authRouter.post("/logout", authenticate, logoutUser);

export default authRouter;
