import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import UsersModels, { UserI } from "../app/models/users.model";

const authentication = asyncHandler(
	async (req: Request | any, res: Response, next: NextFunction): Promise<any> => {
		let token: string = "";

		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			try {
				token = req.headers.authorization.split(" ")[1];

				const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

				req.user = await UsersModels.findById(decoded.id);

				next();
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error("Not authorized, token failed");
			}
		} else {
			res.status(401);
			throw new Error("Not authorized, no token");
		}
	}
);

const adminAuthentication = asyncHandler(
	async (req: Request | any, res: Response, next: NextFunction): Promise<any> => {
		let token: string = "";

		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			try {
				token = req.headers.authorization.split(" ")[1];

				const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
				const user: UserI = await UsersModels.findById(decoded.id);

				req.user = await UsersModels.findById(decoded.id);

				if (user.isAdmin) {
					next();
				} else {
					res.status(401);
					throw new Error("Not authorized as an admin");
				}
			} catch (error) {
				console.error(error);
				res.status(401);
				throw new Error("Not authorized, token failed");
			}
		} else {
			res.status(401);
			throw new Error("Not authorized, no token");
		}
	}
);

export { authentication, adminAuthentication };
