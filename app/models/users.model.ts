import { NextFunction } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import requiredField from "../../utils/requiredField";

interface UserI {
	_id?: string;
	name?: string;
	email?: string;
	password?: string;
	isAdmin?: boolean;
}

type UserListI = Array<UserI>;

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: requiredField(String),
		email: requiredField(String, { unique: true }),
		password: requiredField(String),
		isAdmin: requiredField(Boolean, { default: false }),
	},
	{ timestamps: true }
);

userSchema.methods.matchPassword = function <UserI>(enteredPassword: string) {
	return bcrypt.compareSync(enteredPassword, this.password);
};

userSchema.pre("save", function <UserI>(next: NextFunction): void {
	if (!this.isModified("password")) {
		next();
	} else {
		const salt = bcrypt.genSaltSync(10);
		this.password = bcrypt.hashSync(this.password, salt);
		next();
	}
});

const UsersModal = mongoose.model("users", userSchema);

export default UsersModal;
export type { UserI, UserListI };
