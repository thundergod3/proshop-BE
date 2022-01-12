import dotenv from "dotenv";

import userList from "./app/configs/data/users";
import productList from "./app/configs/data/products";

import UsersModal from "./app/models/users.model";
import ProductsModel from "./app/models/products.model";
import OrdersModal from "./app/models/orders.model";

import connectDB from "./app/configs/mongoDB";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await UsersModal.deleteMany();
    await ProductsModel.deleteMany();
    await OrdersModal.deleteMany();

    const createdUser = await UsersModal.insertMany(userList);
    const adminUser = createdUser[0]._id;
    const sampleProductList = productList.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await ProductsModel.insertMany(sampleProductList);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
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
