import { Request, Response } from "express";

import UsersModel, { UserI } from "../models/users.model";

import generateToken from "../../utils/generateToken";

class UsersController {
	// [GET]
	getUserData = async (req: Request | any, res: Response): Promise<any> => {
		const user: UserI = await UsersModel.findById(req.user._id);

		if (user) {
			res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("User not found");
		}
	};

	// [POST]
	signIn = async (req: Request, res: Response): Promise<any> => {
		const { email, password } = req.body;
		const user: UserI | any = await UsersModel.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			return res.status(200).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: generateToken(user._id),
			});
		} else {
			res.status(401);
			throw new Error("Invalid email or password");
		}
	};
	signUp = async (req: Request, res: Response): Promise<any> => {
		const { name, email, password, isAdmin } = req.body;
		const userExists: UserI | any = await UsersModel.findOne({ email });

		if (userExists) {
			res.status(400);
			throw new Error("User already exists");
		} else {
			const user: UserI = await UsersModel.create({
				name,
				email,
				password,
				isAdmin,
			});

			if (user) {
				res.status(201).json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
				});
			} else {
				res.status(400);
				throw new Error("Invalid user data");
			}
		}
	};

	// [PUT]
	updateUserData = async (req: Request | any, res: Response): Promise<any> => {
		const user: UserI | any = await UsersModel.findById(req.user._id);

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;

			if (req.body.password) {
				user.password = req.body.password;
			}

			const updateUser: UserI = await user.save();

			res.status(200).json({
				_id: updateUser._id,
				name: updateUser.name,
				email: updateUser.email,
				isAdmin: updateUser.isAdmin,
				token: generateToken(updateUser._id),
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	};
}

export default new UsersController();
