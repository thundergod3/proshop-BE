import mongoose from "mongoose";

import requiredField from "../../utils/requiredField";

interface ReviewI {
	_id?: string;
	name?: string;
	rating?: number;
	comment?: string;
	user?: string;
}

type ReviewListI = Array<ReviewI>;

interface ProductItemI {
	_id?: string;
	name?: string;
	image?: string;
	description?: string;
	brand?: string;
	category?: string;
	price?: number;
	countInStock?: number;
	rating?: number;
	numReviews?: number;
	user?: string;
	reviews?: ReviewListI;
}
type ProductListI = Array<ProductItemI>;

const Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		name: requiredField(String),
		rating: requiredField(Number),
		comment: requiredField(String),
		user: requiredField(mongoose.Schema.Types.ObjectId, { ref: "users" }),
	},
	{ timestamps: true }
);

const productSchema = new Schema(
	{
		name: requiredField(String),
		user: requiredField(mongoose.Schema.Types.ObjectId, { ref: "users" }),
		image: requiredField(String),
		brand: requiredField(String),
		category: requiredField(String),
		description: requiredField(String),
		rating: requiredField(Number, { default: 0 }),
		numReviews: requiredField(Number, { default: 0 }),
		price: requiredField(Number, { default: 0 }),
		countInStock: requiredField(Number, { default: 0 }),
		reviews: requiredField([reviewSchema]),
	},
	{ timestamps: true }
);

const ProductsModel = mongoose.model("products", productSchema);

export default ProductsModel;
export type { ProductItemI, ProductListI, ReviewListI, ReviewI };
