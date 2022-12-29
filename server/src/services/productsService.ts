import Store from "../models/Store";
import Product from "../models/product";
import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";

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

	// TODO: image upload

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
