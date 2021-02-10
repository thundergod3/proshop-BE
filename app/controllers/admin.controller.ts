import { Document } from "mongoose";
import { Request, Response } from "express";

import UsersModel, { UserI, UserListI } from "../models/users.model";
import ProductsModel, { ProductItemI } from "../models/products.model";
import OrdersModel, { OrderI, OrderListI } from "../models/orders.model";

class AdminController {
	// [GET]
	getAllUser = async (req: Request, res: Response): Promise<any> => {
		const userList: UserListI = await UsersModel.find({});

		res.status(200).json(userList);
	};
	getUserDetail = async (req: Request, res: Response): Promise<any> => {
		const user: UserI = await UsersModel.findById(req.params.id).select("-password");

		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	};
	getOrderList = async (req: Request, res: Response): Promise<any> => {
		const orderList: OrderListI | any = await OrdersModel.find({}).populate("user", "id name");

		res.status(200).json(orderList);
	};

	// [POST]
	createPostItem = async (req: Request | any, res: Response): Promise<any> => {
		const product: ProductItemI | any = new ProductsModel({
			name: req.body.name,
			price: req.body.price,
			user: req.user._id,
			image: req.body.image,
			brand: req.body.brand,
			category: req.body.category,
			counInStock: req.body.countInStock,
			numReviews: 0,
			description: req.body.description,
		});
		const createdProduct: ProductItemI = await product.save();
		res.status(201).json(createdProduct);
	};
	uploadImage = (req: Request, res: Response): any => res.send(`/${req.file.path}`);

	// [PUT]
	updateUser = async (req: Request, res: Response): Promise<any> => {
		const user: UserI | any = await UsersModel.findById(req.params.id).select("-password");

		if (user) {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.isAdmin = req.body.isAdmin;

			const updateUser: UserI = await user.save();

			res.status(200).json({
				_id: updateUser._id,
				name: updateUser.name,
				email: updateUser.email,
				isAdmin: updateUser.isAdmin,
			});
		} else {
			res.status(400);
			throw new Error("Invalid user data");
		}
	};
	updateProduct = async (req: Request, res: Response): Promise<any> => {
		const { name, price, description, image, brand, category, countInStock } = req.body;
		const product: ProductItemI | any = await ProductsModel.findById(req.params.id);

		if (product) {
			product.name = name;
			product.price = price;
			product.description = description;
			product.image = image;
			product.brand = brand;
			product.category = category;
			product.countInStock = countInStock;

			const updateProduct: ProductItemI = await product.save();

			res.status(200).json(updateProduct);
		} else {
			res.status(400);
			throw new Error("Product not found");
		}
	};
	updateOrderToDeliver = async (req: Request, res: Response): Promise<any> => {
		const order: OrderI | any = await OrdersModel.findById(req.params.id);

		if (order) {
			order.isDelivered = true;
			order.deliveredAt = new Date();

			const updatedOrder: OrderI = await order.save();

			res.status(200).json(updatedOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	};

	// [DELETE]
	deleteUser = async (req: Request, res: Response): Promise<any> => {
		const user: UserI | any = await UsersModel.findById(req.params.id);

		if (user) {
			await user.remove();
			res.status(200).json({ msg: "User removed" });
		} else {
			res.status(404);
			throw new Error("User not found");
		}
	};
	deleteProduct = async (req: Request, res: Response): Promise<any> => {
		const product: ProductItemI | any = await ProductsModel.findById(req.params.id);

		if (product) {
			await product.remove();
			res.status(200).json({ msg: "Product removed" });
		} else {
			res.status(404);
			throw new Error("Product not found");
		}
	};
}

export default new AdminController();
