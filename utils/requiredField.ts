const requiredField = (type: any, option: object = {}): Object => {
	return {
		type,
		required: true,
		...option,
	};
};

export default requiredField;
