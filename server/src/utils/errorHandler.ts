import { Request, Response, NextFunction } from "express";

function errorHandler(
	err: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	const { statusCode = 500 } = err;

	if (!err.message) {
		err.message = "Something went wrong";
	}

	return res.status(statusCode).json({ message: err.message });
}

export default errorHandler;
