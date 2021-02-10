import path from "path";

const checkFileType = (file: any, cb: any): any => {
	const fileTypes = /jpg|jpeg|png/;
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	const mimeType = fileTypes.test(file.mimetype);

	if (extName && mimeType) return cb(null, true);
	else cb("Images only!");
};

export default checkFileType;
