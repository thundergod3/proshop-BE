import mongoose, { mongo } from "mongoose";

import requiredField from "../../utils/requiredField";

interface OrderItemI {
	_id: string;
	name: string;
	quantity: number;
	image: string;
	price: number;
	product: string;
	user: {
		_id: string;
		name: string;
	};
	createdAt: string;
	totalPrice: number;
	deliveredAt: Date;
	isDelivered: boolean;
	isPaid: boolean;
	paidAt: Date;
}

type OrderListI = Array<OrderItemI>;

interface ShippingAddressI {
	address: string;
	city: string;
	postalCode: number;
	country: string;
}

interface PaymentResultI {
	id?: string;
	status: string;
	update_time: Date;
	email_address: string;
}

interface OrderI {
	_id?: string;
	user?: string;
	orderList?: OrderListI;
	shippingAddress?: ShippingAddressI;
	paymentMethod?: string;
	paymentResult?: PaymentResultI;
	itemsPrice?: number;
	taxPrice?: number;
	totalPrice?: number;
	isPaid?: boolean;
	paidAt?: Date;
	isDelivered?: boolean;
	deliveredAt?: Date;
}

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: requiredField(mongoose.Schema.Types.ObjectId, { ref: "users" }),
		orderList: [
			{
				name: requiredField(String),
				quantity: requiredField(Number),
				image: requiredField(String),
				price: requiredField(Number),
				product: requiredField(mongoose.Schema.Types.ObjectId, { ref: "products" }),
			},
		],
		shippingAddress: {
			address: requiredField(String),
			city: requiredField(String),
			postalCode: requiredField(Number),
			country: requiredField(String),
		},
		paymentMethod: requiredField(String),
		paymentResult: {
			id: String,
			status: String,
			update_time: Date,
			email_address: String,
		},
		itemsPrice: requiredField(Number, { default: 0.0 }),
		taxPrice: requiredField(Number, { default: 0.0 }),
		shippingPrice: requiredField(Number, { default: 0.0 }),
		totalPrice: requiredField(Number, { default: 0.0 }),
		isPaid: requiredField(Boolean, { default: false }),
		paidAt: Date,
		isDelivered: requiredField(Boolean, { default: false }),
		deliveredAt: Date,
	},
	{ timestamps: true }
);

const OrdersModel = mongoose.model("orders", orderSchema);

export default OrdersModel;
export type { OrderItemI, OrderListI, PaymentResultI, OrderI };
