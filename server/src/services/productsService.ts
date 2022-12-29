import Store from "../models/storeModel";
import Product from "../models/productModel";
import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";
import { uploadImages } from "../utils/imageUpload";

// create product
const create = async (store_id: string, id: string, productParams: any) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	if (store_id.toString() !== id.toString()) {
		throw new ExpressError(
			`User lacks authority to add a product on store ${store.id}`,
			401
		);
	}

	productParams.store_id = id;

	const photos = await uploadImages(productParams.photos);

	productParams.photos = {
		main: "",
		front: "",
		back: "",
		leftSide: "",
		rightSide: "",
	};

	for (let i = 0; i < photos.length; i++) {
		// get key of object
		const key = Object.keys(productParams.photos)[i];

		// assign value to photos key
		productParams.photos[key] = photos[i];
	}

	const product = await Product.create(productParams);
	await product.save();
	return product;
};

// get product by id
const getById = async (id: string) => {
	const product = await Product.findById(id);

	if (!product) {
		throw new ExpressError(`Product ${id} not found`, 404);
	}

	return product;
};

// get products by store id
const getProductsOfStore = async (store_id: string) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	const products = await Product.find({ store_id });
	return products;
};

// update product
const update = async (
	store_id: string,
	product_id: string,
	productParams: any
) => {
	const product = await Product.findById(product_id);

	if (!product) {
		throw new ExpressError(`Product ${product_id} not found`, 404);
	}

	if (product.store_id.toString() !== store_id.toString()) {
		throw new ExpressError(
			`Lacking Credentials to update ${product_id}`,
			401
		);
	}

	if (productParams.photos) {
		const photos = await uploadImages(productParams.photos);

		productParams.photos = {
			main: "",
			front: "",
			back: "",
			leftSide: "",
			rightSide: "",
		};

		for (let i = 0; i < photos.length; i++) {
			// get key of object
			const key = Object.keys(productParams.photos)[i];

			// assign value to photos key
			productParams.photos[key] = photos[i];
		}
	}

	Object.assign(product, productParams);
	await product.save();
	return product;
};

// delete product
const _delete = async (store_id: string, product_id: string) => {
	const product = await Product.findById(product_id);

	if (!product) {
		throw new ExpressError(`Product ${product_id} not found`, 404);
	}

	if (product.store_id.toString() !== store_id.toString()) {
		throw new ExpressError(
			`Lacking Credentials to delete ${product_id}`,
			401
		);
	}

	await Product.deleteOne({ _id: product_id });
	return;
};

export default {
	create,
	getById,
	getProductsOfStore,
	update,
	delete: _delete,
};
