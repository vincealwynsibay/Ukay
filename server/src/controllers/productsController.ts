import { IGetAuthRequest } from "./../types";
import catchAsync from "../utils/catchAsync";
import { Request, Response, Router } from "express";
import productsService from "../services/productsService";
import { checkRole } from "../utils/jwt";

export const router = Router({ mergeParams: true });

const createProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const product = await productsService.create(
			req.user.store_id,
			req.params.id,
			req.body
		);
		return res.json(product);
	}
);

const getProductById = catchAsync(async (req: Request, res: Response) => {
	const product = await productsService.getById(req.params.id);
	return res.json(product);
});

const updateProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const product = await productsService.update(
			req.user.store_id,
			req.params.id,
			req.body
		);
		return res.json(product);
	}
);

const deleteProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const product = await productsService.delete(
			req.user.store_id,
			req.params.id
		);
		return res.json(product);
	}
);

// POST /api/products/
router.post("/:id", checkRole("store"), createProduct);

// GET /api/products/:id
router.get("/:id", getProductById);

// PUT /api/products/:id
router.put("/:store_id/:id", checkRole("store"), updateProduct);

// DELETE /api/products/:id
router.delete("/:store_id/:id", checkRole("store"), deleteProduct);
