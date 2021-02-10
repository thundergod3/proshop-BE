import { Request, Response } from "express";
import CartsModel, { CartItemI, CartListI } from "../models/carts.model";

class CartsController {
	// [GET]
	fetchCartList = async (req: Request | any, res: Response): Promise<any> => {
		const cartList: CartListI = await CartsModel.find({ user: req.user._id });

		res.status(200).json(cartList);
	};

	// [POST]
	addCartItem = async (req: Request | any, res: Response): Promise<any> => {
		const newCartItem: CartItemI = req.body;
		const findCartItem: CartItemI = await CartsModel.findById(newCartItem?._id);

		if (findCartItem) {
			await CartsModel.findByIdAndUpdate(newCartItem._id, newCartItem);
			res.status(200).json({ msg: "Update Cart Item Succeeded" });
		} else {
			await CartsModel.create(newCartItem);
			res.status(201).json({ msg: "Add Cart Item Succeeded" });
		}
	};

	// [DELETE]
	removeCartItem = async (req: Request, res: Response): Promise<any> => {
		await CartsModel.findByIdAndDelete(req.params.id);

		res.status(200).json({ msg: "Remove Cart Item Succeeded" });
	};
}

export default new CartsController();
