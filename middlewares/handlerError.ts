import { NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction): void => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

const handleError = (err: Error, req: Request, res: Response, next: NextFunction): void => {
	const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;

	res.status(statusCode);
	console.log("err", err.message);
	res.json({
		msg: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});

	next();
};

export { notFound, handleError };
