import { IGetAuthRequest } from "./../types";
import Product from "../models/product";
import catchAsync from "src/utils/catchAsync";
import { Request, Response, Router } from "express";
import productsService from "src/services/productsService";

const router = Router();

const createProduct = catchAsync(async (req: Request, res: Response) => {
	// TODO: USER VALIDATION
	const product = await productsService.create(req.params.id, req.body);
	return res.json(product);
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
	const product = await productsService.getById(req.params.id);
	return res.json(product);
});

const getProductsOfStore = catchAsync(async (req: Request, res: Response) => {
	const products = await productsService.getProductsOfStore(req.params.name);
	return res.json(products);
});

const updateProduct = catchAsync(async (req: Request, res: Response) => {
	// TODO: USER VALIDATION
	const product = await productsService.update(
		req.params.store_id,
		req.params.id,
		req.body
	);
	return res.json(product);
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
	// TODO: USER VALIDATION
	const product = await productsService.delete(
		req.params.store_id,
		req.params.id
	);
	return res.json(product);
});

// POST /api/products/
router.post("/:id", createProduct);
// GET /api/products/
router.get("/:name", getProductsOfStore);
// GET /api/products/:id
router.get("/:id", getProductById);
// PUT /api/products/:id
router.put("/:store_id/:id", updateProduct);
// DELETE /api/products/:id
router.delete("/:store_id/:id", deleteProduct);

export default router;
