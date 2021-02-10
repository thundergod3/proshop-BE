import { Router } from "express";
import asyncHandler from "express-async-handler";

import CartsController from "../app/controllers/carts.controller";

import { authentication } from "../middlewares/authentication";

const cartsRoute = Router();

// [GET]
cartsRoute.get("/", authentication, asyncHandler(CartsController.fetchCartList));

// [POST]
cartsRoute.post("/", authentication, asyncHandler(CartsController.addCartItem));

// [DELETE]
cartsRoute.delete("/:id", authentication, asyncHandler(CartsController.removeCartItem));

export default cartsRoute;
