import { IGetAuthRequest } from "../types";
import catchAsync from "../utils/catchAsync";
import storesService from "../services/storesService";
import reviewsService from "../services/reviewsService";
import { Request, Response, Router } from "express";
import reviewsServices from "../services/reviewsService";
import { checkAuth, checkRole } from "../utils/jwt";
import ordersService from "../services/ordersService";
import productsService from "src/services/productsService";

const router = Router();

const createStore = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const store = await storesService.create(req.user.id, req.body);
	return res.json(store);
});

const getStoreById = catchAsync(async (req: Request, res: Response) => {
	const store = await storesService.getById(req.params.id);
	return res.json(store);
});

const getAllStores = catchAsync(async (req: Request, res: Response) => {
	const stores = await storesService.getAll();
	return res.json(stores);
});

const getStoreByName = catchAsync(async (req: Request, res: Response) => {
	const store = await storesService.getByName(req.params.name);
	return res.json(store);
});

const toggleFollowStore = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const store = await storesService.toggleFollow(
			req.user.id,
			req.params.id
		);
		return res.json(store);
	}
);

const updateStore = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const store = await storesService.update(
		req.user.id,
		req.params.id,
		req.body
	);
	return res.json(store);
});

const deleteStore = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const store = await storesService.delete(req.user.id, req.params.id);
	return res.json(store);
});

const getProductsOfStore = catchAsync(async (req: Request, res: Response) => {
	const products = await productsService.getProductsOfStore(req.params.id);
	return res.json(products);
});

const createReview = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const review = await reviewsServices.createReview(
		req.user.id,
		req.params.id,
		req.body
	);

	return res.json(review);
});

const getOrdersByStore = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const orders = await ordersService.getOrdersByStore(req.params.id);
		return res.json(orders);
	}
);

// POST /api/stores/
router.post("/", checkAuth, checkRole("store"), createStore);

// GET /api/stores/:id
router.get("/:id", getStoreById);

// GET /api/stores/:name
router.get("/:name", getStoreByName);

// GET /api/stores/
router.get("/", getAllStores);

// PUT /api/stores/:id/follow
router.put("/:id/follow", checkRole("customer"), checkAuth, toggleFollowStore);

// PUT /api/stores/:id
router.put("/:id", checkAuth, checkRole("store"), updateStore);

// DELETE /api/stores/:id
router.delete("/:id", checkAuth, checkRole("store"), deleteStore);

// GET /api/stores/:id/products/
router.get("/:id", getProductsOfStore);

// POST /api/stores/:id/reviews
router.post("/:id/reviews", checkAuth, checkRole("customer"), createReview);

// GET /api/store/:id/orders
router.get("/store/:id/orders", getOrdersByStore);

export default router;
