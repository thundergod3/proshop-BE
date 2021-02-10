import mongoose, { Document } from "mongoose";
import dotenv from "dotenv";

import userList from "./app/configs/data/users";
import productList from "./app/configs/data/products";

import UsersModal, { UserListI } from "./app/models/users.model";
import ProductsModel from "./app/models/products.model";
import OrdersModal from "./app/models/orders.model";

import connectDB from "./app/configs/mongoDB";
import { ProductItemI } from "../client/src/stores/redux/reducers/productsReducer.js";

dotenv.config();

connectDB();

const importData = async (): Promise<any> => {
	try {
		await UsersModal.deleteMany();
		await ProductsModel.deleteMany();
		await OrdersModal.deleteMany();

		const createdUser: Document<UserListI> = await UsersModal.insertMany(userList as any);
		const adminUser: string = createdUser[0]._id;
		const sampleProductList = productList.map(
			(product: ProductItemI): ProductItemI => {
				return {
					...product,
					user: adminUser,
				};
			}
		);

		await ProductsModel.insertMany(sampleProductList);

		console.log("Data Imported!");
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const destroyData = async (): Promise<any> => {
	try {
		await UsersModal.deleteMany();
		await ProductsModel.deleteMany();
		await OrdersModal.deleteMany();

		console.log("Data Destroyed!");
		process.exit();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

if (process.argv[2] === "-d") {
	destroyData();
} else {
	importData();
}
