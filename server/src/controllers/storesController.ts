import { IGetAuthRequest } from "src/types";
import catchAsync from "src/utils/catchAsync";
import storesService from "src/services/storesService";
import reviewsService from "src/services/reviewsService";
import { Request, Response, Router } from "express";
import reviewsServices from "src/services/reviewsService";

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

const createReview = catchAsync(async (req: IGetAuthRequest, res: Response) => {
	const review = await reviewsServices.createReview(
		req.user.id,
		req.params.id,
		req.body
	);

	return res.json(review);
});

// POST /api/stores/
router.post("/", createStore);

// GET /api/stores/:id
router.get("/:id", getStoreById);

// GET /api/stores/:name
router.get("/:name", getStoreByName);

// GET /api/stores/
router.get("/", getAllStores);

// UPDATE /api/stores/:id/follow
router.put("/:id/follow", toggleFollowStore);

// UPDATE /api/stores/:id
router.put("/:id", updateStore);

// DELETE /api/stores/:id
router.delete("/:id", deleteStore);

// POST /api/stores/:id/reviews
router.post("/:id/reviews", createReview);

export default router;
