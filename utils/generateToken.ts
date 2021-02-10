import jwt from "jsonwebtoken";

const generateToken = (id: string): string => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "3h",
	});
};

export default generateToken;
