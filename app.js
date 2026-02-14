import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors";

import connectDatabase from "./db/connect.js";

import contactsRouter from "./routes/contactsRouter.js";

import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use(notFoundHandler);

app.use(errorHandler);

await connectDatabase();

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
