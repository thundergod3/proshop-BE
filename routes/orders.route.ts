import { Router } from "express";
import asyncHandler from "express-async-handler";

import { authentication } from "../middlewares/authentication";

import OrdersController from "../app/controllers/orders.controller";

const ordersRoute = Router();
// [GET]
ordersRoute.get("/myorders", authentication, asyncHandler(OrdersController.getOrderUser));
ordersRoute.get("/:id", authentication, asyncHandler(OrdersController.getOrderDetail));

// [POST]
ordersRoute.post("/", authentication, asyncHandler(OrdersController.addOrderItem));

// [PUT]
ordersRoute.put("/:id/pay", authentication, asyncHandler(OrdersController.updateOrderToPaid));

export default ordersRoute;
