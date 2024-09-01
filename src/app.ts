/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import notFound from "./app/middleWares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWares/globalErrorHandler";
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1", router );


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(globalErrorHandler)

//Not Found
app.use(notFound)

export default app;
