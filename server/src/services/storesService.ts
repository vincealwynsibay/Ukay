import User from "../models/userModel";
import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";
import storeModel from "../models/storeModel";
import { uploadImage } from "../utils/imageUpload";
import { paginateModel } from "src/utils/paginate";

// create store
const create = async (user_id: Types.ObjectId, storeParams: any) => {
	const { name } = storeParams;

	if (await storeModel.findOne({ name })) {
		throw new ExpressError("Store name " + name + " is already taken", 400);
	}

	storeParams.avatar = await uploadImage(storeParams.avatar);
	storeParams.userId = user_id;

	const store = new storeModel(storeParams);
	await store.save();
	return store;
};

// get by id
const getById = async (id: string) => {
	const store = await storeModel.findById(id);
	return store;
};

// get all stores
const getAll = async (sortParams: any) => {
	let stores;
	if (sortParams.keys().length === 0) {
		stores = await storeModel.find();
	} else {
		stores = await storeModel.find().sort(sortParams);
	}
	return stores;
};

// get by name
const getByName = async (name: string) => {
	const store = await storeModel.find({ name });
	return store;
};

// toggle follow  store
const toggleFollow = async (user_id: Types.ObjectId, store_id: string) => {
	const store = await storeModel.findById(store_id);

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
	store_id: string,
	storeParams: any
) => {
	const store = await storeModel.findById(store_id);

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
		if (await store.findOne({ name: storeParams.name })) {
			throw new ExpressError(
				"Name " + storeParams.name + " is already taken",
				400
			);
		}
	}

	if (storeParams.avatar) {
		storeParams.avatar = await uploadImage(storeParams.avatar);
	}

	Object.assign(store, storeParams);
	await store.save();
	return store;
};

// delete store
const _delete = async (user_id: Types.ObjectId, store_id: string) => {
	const store = await storeModel.findById(store_id);

	if (!store) {
		throw new ExpressError(`Store ${store_id} not found`, 404);
	}

	if (store.user_id.toString() !== user_id.toString()) {
		throw new ExpressError(
			`Lacking permission to delete store ${store_id}`,
			401
		);
	}

	await store.deleteOne({ id: store_id });
	await User.deleteOne({ id: user_id });
	return;
};

export default {
	create,
	getById,
	getAll,
	getByName,
	toggleFollow,
	update,
	delete: _delete,
};
