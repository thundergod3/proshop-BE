import { Request, Response } from "express";

import ProductsModel, { ProductItemI, ProductListI, ReviewI } from "../models/products.model";

class ProductsController {
	// [GET]
	fetchProductList = async (req: Request, res: Response): Promise<any> => {
		const pageSize: number = 10;
		const page: number = Number(req.query.pageNumber) || 1;
		const keyword = req.query.keyword
			? {
					name: {
						$regex: req.query.keyword,
						$options: "i",
					},
			  }
			: {};
		const count = await ProductsModel.countDocuments({ ...keyword });
		const productList: ProductListI = await ProductsModel.find({ ...keyword })
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		res.status(200).json({ productList, page, pages: Math.ceil(count / pageSize) });
	};
	fetchTopRatingProductList = async (req: Request, res: Response): Promise<any> => {
		const productList: ProductListI = await ProductsModel.find({}).sort({ rating: -1 }).limit(3);
		res.status(200).json(productList);
	};
	fetchProductDetail = async (req: Request, res: Response): Promise<any> => {
		const productDetail: ProductItemI = await ProductsModel.findById(req.params.id);

		if (productDetail) {
			res.status(200).json(productDetail);
		} else {
			res.status(404);
			throw new Error("Product not found");
		}
	};

	// [POST]
	createProductReview = async (req: Request | any, res: Response): Promise<any> => {
		const { rating, comment } = req.body;
		const productDetail: ProductItemI | any = await ProductsModel.findById(req.params.id);

		if (productDetail) {
			const alreadyReviewed = productDetail.reviews.find(
				(r: ReviewI) => r.user.toString() === req.user._id.toString()
			);

			if (alreadyReviewed) {
				res.status(400);
				throw new Error("Product already reviewed");
			}

			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			};

			productDetail.reviews.push(review);
			productDetail.numReviews = productDetail.reviews.length;
			productDetail.rating =
				productDetail.reviews.reduce((acc: number, item: ReviewI) => item.rating + acc, 0) /
				productDetail.reviews.length;

			await productDetail.save();
			res.status(201).json({ msg: "Review added" });
		}
	};
}

export default new ProductsController();
