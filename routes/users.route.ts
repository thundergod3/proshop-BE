import { Router } from "express";
import UsersController from "../app/controllers/users.controller";
import asyncHandler from "express-async-handler";

import { authentication } from "../middlewares/authentication";

const usersRoute = Router();

// [GET]
usersRoute.get("/profile", authentication, asyncHandler(UsersController.getUserData));

// [POST]
usersRoute.post("/login", asyncHandler(UsersController.signIn));
usersRoute.post("/signup", asyncHandler(UsersController.signUp));

// [PUT]
usersRoute.put("/profile-update", authentication, asyncHandler(UsersController.updateUserData));

export default usersRoute;
