import mongoose from "mongoose";

import requiredField from "../../utils/requiredField";

interface CartItemI {
	_id?: string;
	name?: string;
	price?: number;
	countInStock?: number;
	quantity?: number;
}

type CartListI = Array<CartItemI>;

const Schema = mongoose.Schema;

const cartScheme = new Schema({
	user: requiredField(mongoose.Schema.Types.ObjectId, { ref: "users" }),
	name: requiredField(String),
	image: requiredField(String),
	price: requiredField(Number),
	countInStock: requiredField(Number),
	quantity: requiredField(Number),
});

const CartsModel = mongoose.model("carts", cartScheme);

export default CartsModel;
export type { CartItemI, CartListI };
