import { Request, Response } from "express";
import { Document } from "mongoose";
import OrdersModel, { OrderI, OrderItemI } from "../models/orders.model";

class OrdersController {
	// [GET]
	getOrderDetail = async (req: Request, res: Response): Promise<any> => {
		const order: OrderI = await OrdersModel.findById(req.params.id).populate("user", "name email");

		if (order) {
			res.status(200).json(order);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	};
	getOrderUser = async (req: Request | any, res: Response): Promise<any> => {
		const orders: Document<OrderI>[] = await OrdersModel.find({ user: req.user._id });
		res.status(200).json(orders);
	};

	// [POST]
	addOrderItem = async (req: Request | any, res: Response): Promise<any> => {
		const {
			orderList,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		}: any = req.body;

		if (orderList && orderList.length === 0) {
			res.status(400);
			throw Error("No order items");
		} else {
			const order: Document<OrderI> = new OrdersModel({
				orderList: orderList.map(
					(orderItem: OrderItemI): OrderItemI => {
						orderItem.product = orderItem._id;
						delete orderItem._id;
						return orderItem;
					}
				),
				shippingAddress,
				paymentMethod,
				itemsPrice,
				taxPrice,
				shippingPrice,
				totalPrice,
				user: req.user._id,
			});

			const createdOrder = await order.save();

			res.status(201).json(createdOrder);
		}
	};

	// [PUT]
	updateOrderToPaid = async (req: Request, res: Response): Promise<any> => {
		const order: OrderI | any = await OrdersModel.findById(req.params.id);

		if (order) {
			order.isPaid = true;
			order.paidAt = new Date();
			order.paymentResult = {
				id: req.body.id,
				status: req.body.status,
				update_time: req.body.update_time,
				email_address: req.body.payer.email_address,
			};

			const updatedOrder: OrderI = await order.save();

			res.status(200).json(updatedOrder);
		} else {
			res.status(404);
			throw new Error("Order not found");
		}
	};
}

export default new OrdersController();
