import { sort } from "src/utils/sort";
import { IGetAuthRequest, order } from "./../types";
import catchAsync from "../utils/catchAsync";
import { Request, Response, Router } from "express";
import productsService from "../services/productsService";
import { checkRole } from "../utils/jwt";
import { upload } from "../utils/imageUpload";
import { paginate } from "src/utils/paginate";
import productModel from "src/models/productModel";

export const router = Router({ mergeParams: true });

const createProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const product = await productsService.create(
			req.user.store_id,
			req.params.id,
			{ photos: req.files, ...req.body }
		);
		return res.json(product);
	}
);

const getProductById = catchAsync(async (req: Request, res: Response) => {
	const product = await productsService.getById(req.params.id);
	return res.json(product);
});

const getProductsByCategory = async (req: Request, res: Response) => {
	const products = await productsService.getByCategory(
		req.query.category as string
	);
	return res.json(products);
};

const getProductsStoreSortedByPopularity = async (
	req: Request,
	res: Response
) => {
	const products = await productsService.getSortedByStorePopularity(
		req.query.order! as order
	);
	return res.json(products);
};

const getProductsSortedByPrice = async (req: Request, res: Response) => {
	const products = await productsService.getSortedByPrice(
		req.query.order! as order
	);
	return res.json(products);
};

const getProductsSortedByDateAdded = async (req: Request, res: Response) => {
	const products = await productsService.getSortedByDateAdded(
		req.query.order! as order
	);
	return res.json(products);
};

const getProductsPaginated = async (req: Request, res: Response) => {
	return res.json((res as any).paginatedResults);
};

const updateProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const product = await productsService.update(
			req.user.store_id,
			req.params.id,
			{ photos: req.files, ...req.body }
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
router.post(
	"/:id",
	checkRole("store"),
	upload.array("photos", 5),
	createProduct
);

// GET /api/products/:id
router.get("/:id", getProductById);

// PUT /api/products/:id
router.put(
	"/:store_id/:id",
	checkRole("store"),
	upload.array("photos", 5),
	updateProduct
);

// DELETE /api/products/:id
router.delete("/:store_id/:id", checkRole("store"), deleteProduct);

// GET /api/products?category=...
// filter by category
router.get("/", getProductsByCategory);

// GET /api/products?types=...limit=...&page=...
// paginate
router.get(
	"/",
	sort([["createdAt"], ["price"]]),
	paginate(productModel),
	getProductsPaginated
);
