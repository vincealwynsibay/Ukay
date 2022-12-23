import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ExpressError from "./ExpressError";
import User from "../models/User";

export const checkAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		throw new ExpressError("Invalid Token", 401);
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET!);

	if (!decoded) {
		throw new ExpressError("Invalid Token", 401);
	}

	const user = await User.findById(decoded.sub);

	if (!user) {
		throw new ExpressError("User not found", 404);
	}

	(req as any).user = user;
	next();
};
