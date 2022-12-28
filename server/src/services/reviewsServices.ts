import { Types } from "mongoose";
import Order from "../models/Order";
import Review from "../models/Review";
import Store from "../models/Store";
import ExpressError from "../utils/ExpressError";

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

export default {
	createReview,
};
