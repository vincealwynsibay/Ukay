import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import ExpressError from "./ExpressError";
import User from "../models/userModel";
import Store from "../models/storeModel";
import Customer from "../models/customerModel";

export const checkAuth = catchAsync(
	async (req: Request, res: Response, next: NextFunction) => {
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
		(req as any).role = user.role;

		// check role and find store or customer profile
		// and attach the id to req.user
		if (user.role.toLowerCase() === "store") {
			const store = await Store.findOne({ user_id: user.id });

			if (!store) {
				throw new ExpressError(
					`Store not found for user ${user.id}`,
					401
				);
			}

			(req as any).user.store = store.id;
		} else if (user.role.toLowerCase() === "customer") {
			const customer = await Customer.findOne({ user_id: user.id });
			if (!customer) {
				throw new ExpressError(
					`Profile not found for user ${user.id}`,
					401
				);
			}
			(req as any).user.customer = customer.id;
		}

		next();
	}
);

export const checkRole = (role: string) => {
	return catchAsync(
		async (req: Request, res: Response, next: NextFunction) => {
			const user = (req as any).user;
			if (user.role.toLowerCase() !== role.toLowerCase()) {
				throw new ExpressError(
					`User ${user.id} lacks authority to access this resource`,
					401
				);
			}
			next();
		}
	);
};
