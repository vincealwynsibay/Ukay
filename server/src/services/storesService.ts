import { Types } from "mongoose";
import ExpressError from "src/utils/ExpressError";
import Store from "../models/Store";
import Review from "../models/Review";
import Order from "../models/Order";

// create store
const create = async (user_id: Types.ObjectId, storeParams: any) => {
	const { name } = storeParams;

	if (await Store.findOne({ name })) {
		throw new ExpressError("Store name " + name + " is already taken", 400);
	}

	storeParams.userId = user_id;

	const store = new Store(storeParams);
	await store.save();
	return store;
};

// get by id
const getById = async (id: Types.ObjectId) => {
	const store = await Store.findById(id);
	return store;
};

// get all stores
const getAll = async () => {
	const stores = await Store.find();
	return stores;
};

// get by name
const getByName = async (name: string) => {
	const store = await Store.find({ name });
	return store;
};

// toggle follow  store
const toggleFollow = async (user_id: Types.ObjectId, store_id: string) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	// if user is already following store, remove from followers
	if (
		store.followers.some((follower: any) => follower.toString() === user_id)
	) {
		store.followers = store.followers.filter(
			(follower: any) => follower.toString() !== user_id
		);
	} else {
		// else add to followers
		store.followers.unshift(user_id);
	}

	await store.save();
	return store;
};

// update store
const update = async (
	user_id: Types.ObjectId,
	store_id: Types.ObjectId,
	storeParams: any
) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	if (store.user_id.toString() !== user_id.toString()) {
		throw new ExpressError(
			`Lacking permission to update store ${store_id}`,
			401
		);
	}

	if (storeParams.name && store.name !== storeParams.name) {
		if (await Store.findOne({ name: storeParams.name })) {
			throw new ExpressError(
				"Name " + storeParams.name + " is already taken",
				400
			);
		}
	}

	Object.assign(store, storeParams);
	await store.save();
	return store;
};

// delete store
const _delete = async (user_id: Types.ObjectId, store_id: Types.ObjectId) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	if (store.user_id.toString() !== user_id.toString()) {
		throw new ExpressError(
			`Lacking permission to delete store ${store_id}`,
			401
		);
	}

	await Store.findByIdAndDelete(store_id);
	return;
};

// create review of store if already has an order from store
const createReview = async (
	user_id: Types.ObjectId,
	store_id: Types.ObjectId,
	reviewParams: any
) => {
	const store = await Store.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	// check if user already have order
	if (!(await Order.findOne({ user_id }))) {
		throw new ExpressError(
			`User does not have an order yet on this store`,
			404
		);
	}

	// check if user has already reviewed store
	if (
		store.reviews.some(
			(review: any) => review.user_id.toString() === user_id
		)
	) {
		throw new ExpressError(
			`User ${user_id} has already reviewed store ${store_id}`,
			400
		);
	}

	reviewParams.user_id = user_id;

	const review = new Review(reviewParams);
	const savedReview = await review.save();

	store.reviews.unshift(savedReview.id);
	await store.save();

	return { savedReview, store };
};

// change avatar of store
const changeAvatar = async () => {};

export default {
	create,
	getById,
	getAll,
	getByName,
	toggleFollow,
	update,
	delete: _delete,
	createReview,
	changeAvatar,
};
