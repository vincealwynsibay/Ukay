import { IGetAuthRequest } from "../types";
import catchAsync from "../utils/catchAsync";
import { Request, Response, Router } from "express";
import ordersService from "../services/ordersService";
import { checkRole } from "../utils/jwt";

export const router = Router({ mergeParams: true });

const createOrder = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const order = await ordersService.create(req.user.id, req.body.id);
	return res.json(order);
});

const createOrders = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const orders = await ordersService.createOrders(
		req.user.id,
		req.body.orders
	);
	return res.json(orders);
});

const getOrdersByUser = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const orders = await ordersService.getOrdersByUser(req.user.id);
		return res.json(orders);
	}
);

// POST /api/users/:id/order
router.post("/user/:id/order", checkRole("customer"), createOrder);

// POST /api/users/:id/orders
router.post("/user/:id/orders", checkRole("customer"), createOrders);

// GET /api/users/:id/orders
router.get("/user/:id/orders", checkRole("customer"), getOrdersByUser);
