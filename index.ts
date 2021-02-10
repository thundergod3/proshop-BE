import path from "path";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import routes from "./routes";

import connectDB from "./app/configs/mongoDB";
import { notFound, handleError } from "./middlewares/handlerError";

const app: Express = express();

// Middlewares
dotenv.config();
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ConnectDB
connectDB();

// CONNECT PAYPAL
app.get("/api/config/paypal", (req: Request, res: Response): any => res.send(process.env.PAYPAL_CLIENT_ID));

// Routes
routes(app);

// Handler Error
app.use(notFound);
app.use(handleError);

if (process.env.NODE_ENV === "development") {
	app.use(express.static(path.join(__dirname, "/client/build")));
	app.get("*", (req: Request, res: Response): any =>
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	);
} else {
	app.get("/", (req: Request, res: Response): any => res.send("API is running..."));
}

const PORT: number | string = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
