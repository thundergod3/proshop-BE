import { Router } from "express";
import ProductsController from "../app/controllers/products.controller";
import asyncHandler from "express-async-handler";

import { authentication } from "../middlewares/authentication";

const productsRoute = Router();

// [GET]
productsRoute.get("/", asyncHandler(ProductsController.fetchProductList));
productsRoute.get("/top", asyncHandler(ProductsController.fetchTopRatingProductList));
productsRoute.get("/:id", asyncHandler(ProductsController.fetchProductDetail));

// [POST]
productsRoute.post("/:id/review", authentication, asyncHandler(ProductsController.createProductReview));

export default productsRoute;
