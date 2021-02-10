import path from "path";
import { Request, Router } from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";

import checkFileType from "../utils/checkFileType";
import { adminAuthentication } from "../middlewares/authentication";

import AdminController from "../app/controllers/admin.controller";

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	filename(req, file, cb) {
		cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
	},
});

const upload = multer({
	storage,
	fileFilter: (req: any, file: any, cb: any) => {
		checkFileType(file, cb);
	},
});

const adminRoute = Router();

// [GET]
adminRoute.get("/users", adminAuthentication, asyncHandler(AdminController.getAllUser));
adminRoute.get("/user/:id", adminAuthentication, asyncHandler(AdminController.getUserDetail));
adminRoute.get("/products", adminAuthentication, asyncHandler(AdminController.getOrderList));

// [POST]
adminRoute.post("/product", adminAuthentication, asyncHandler(AdminController.createPostItem));
adminRoute.post(
	"/upload-image",
	adminAuthentication,
	upload.single("image"),
	asyncHandler(AdminController.uploadImage)
);

// [PUT]
adminRoute.put("/user/:id", adminAuthentication, asyncHandler(AdminController.updateUser));
adminRoute.put("/product/:id", adminAuthentication, asyncHandler(AdminController.updateProduct));
adminRoute.put("/order/:id/deliver", adminAuthentication, asyncHandler(AdminController.updateOrderToDeliver));

// [DELETE]
adminRoute.delete("/user/:id", adminAuthentication, asyncHandler(AdminController.deleteUser));
adminRoute.delete("/product/:id", adminAuthentication, asyncHandler(AdminController.deleteProduct));

export default adminRoute;
