import { IGetAuthRequest } from "src/types";
import catchAsync from "src/utils/catchAsync";
import { Request, Response, Router } from "express";
import ordersService from "src/services/ordersService";

const router = Router();

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

const getOrdersByStore = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const orders = await ordersService.getOrdersByStore(req.params.id);
		return res.json(orders);
	}
);

// POST /api/user/:id/order
router.post("/user/:id/order", createOrder);
// POST /api/user/:id/orders
router.post("/user/:id/orders", createOrders);
// GET /api/user/:id/orders
router.get("/user/:id/orders", getOrdersByUser);
// GET /api/store/:id/orders
router.get("/store/:id/orders", getOrdersByStore);

export default router;
