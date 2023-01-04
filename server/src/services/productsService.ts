import { order } from "./../types";
import Store from "../models/storeModel";
import Product, { IProduct } from "../models/productModel";
import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";
import { uploadImages } from "../utils/imageUpload";
import { paginateModel } from "../utils/paginate";
import productModel from "../models/productModel";

// create product
// TODO: notify followers of store
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

// TODO: get products by category
const getByCategory = async (category: string) => {
	const products = await Product.find({ category });
	return products;
};

// sort products by store popularity
const getSortedByStorePopularity = async (order: order) => {
	const productsList: IProduct[] = [];
	// sort stores by follower count in ascending order
	const stores = await Store.find().sort({ followers: order });
	stores.forEach(async (store) => {
		const products = await Product.find({ store_id: store._id });
		productsList.push(...products);
	});

	return productsList;
};

// sort products by price
const getSortedByPrice = async (order: order) => {
	const products = await Product.find().sort({ price: order });
	return products;
};

// sort by date added
const getSortedByDateAdded = async (order: order) => {
	const products = await Product.find().sort({ createdAt: order });
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
	getByCategory,
	getSortedByStorePopularity,
	getSortedByPrice,
	getSortedByDateAdded,
	getProductsOfStore,
	update,
	delete: _delete,
};
