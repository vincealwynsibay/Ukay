class ExpressError extends Error {
	statusCode = 500;

	constructor(message: string, statusCode: number) {
		super(message);
		Object.setPrototypeOf(this, ExpressError.prototype);
		this.statusCode = statusCode;
	}
}

export default ExpressError;
