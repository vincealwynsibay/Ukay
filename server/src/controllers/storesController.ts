import { IGetAuthRequest } from "../types";
import catchAsync from "../utils/catchAsync";
import storesService from "../services/storesService";
import reviewsService from "../services/reviewsService";
import { Request, Response, Router } from "express";
import reviewsServices from "../services/reviewsService";
import { checkAuth, checkRole } from "../utils/jwt";
import ordersService from "../services/ordersService";
import productsService from "../services/productsService";
import { upload } from "../utils/imageUpload";
import { sort } from "../utils/sort";
import { paginate } from "../utils/paginate";
import storeModel from "../models/storeModel";

export const router = Router({ mergeParams: true });

const createStore = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const store = await storesService.create(req.user.id, {
		avatar: req.file,
		...req.body,
	});
	return res.json(store);
});

const getStoreById = catchAsync(async (req: Request, res: Response) => {
	const store = await storesService.getById(req.params.id);
	return res.json(store);
});

const getAllStores = catchAsync(async (req: Request, res: Response) => {
	let sortParams = {};

	if (req.query.followers) {
		sortParams = { ...sortParams, followers: req.query.order };
	}

	if (req.query.rating) {
		sortParams = { ...sortParams, rating: req.query.order };
	}

	if (req.query.reviews) {
		sortParams = { ...sortParams, reviews: req.query.order };
	}

	const stores = await storesService.getAll(sortParams);
	return res.json(stores);
});

const getStorePaginated = async (req: Request, res: Response) => {
	return res.json((res as any).paginatedResults);
};

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
	const store = await storesService.update(req.user.id, req.params.id, {
		avatar: req.file,
		...req.body,
	});
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
// create store
router.post(
	"/",
	checkAuth,
	checkRole("store"),
	upload.single("avatar"),
	createStore
);

// GET /api/stores/:id
// get store by id
router.get("/:id", getStoreById);

// GET /api/stores/:name
// get store by name
router.get("/:name", getStoreByName);

// // GET /api/stores/
// // get all stores
// router.get("/", getAllStores);

// GET /api/stores/
// get paginated stores
router.get(
	"/",
	sort([
		["followers", "array"],
		["reviews", "array"],
	]),
	paginate(storeModel),
	getStorePaginated
);

// PUT /api/stores/:id/follow
// follow a store
router.put("/:id/follow", checkRole("customer"), checkAuth, toggleFollowStore);

// PUT /api/stores/:id
// update store
router.put(
	"/:id",
	checkAuth,
	checkRole("store"),
	upload.single("avatar"),
	updateStore
);

// DELETE /api/stores/:id
// delete store
router.delete("/:id", checkAuth, checkRole("store"), deleteStore);

// GET /api/stores/:id/products/
// get products of store
router.get("/:id", getProductsOfStore);

// POST /api/stores/:id/reviews
// create review
router.post("/:id/reviews", checkAuth, checkRole("customer"), createReview);

// GET /api/store/:id/orders
// get orders of store
router.get("/store/:id/orders", getOrdersByStore);
