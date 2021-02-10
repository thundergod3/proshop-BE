import express, { Express } from "express";

import productsRoute from "./products.route";
import cartsRoute from "./carts.routes";
import usersRoute from "./users.route";
import ordersRoute from "./orders.route";
import adminRoute from "./admin.route";

const routes = (express: Express): void => {
	express.use("/api/products", productsRoute);
	express.use("/api/carts", cartsRoute);
	express.use("/api/users", usersRoute);
	express.use("/api/orders", ordersRoute);
	express.use("/api/admin", adminRoute);
};

export default routes;
