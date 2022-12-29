import { Types } from "mongoose";
import Product from "../models/productModel";
import Reservation from "../models/reservationModel";
import ExpressError from "../utils/ExpressError";

// create reservation
const create = async (user_id: Types.ObjectId, product_id: string) => {
	const product = await Product.findById(product_id);

	if (!product) {
		throw new ExpressError(`Product ${product_id} not found`, 404);
	}

	const reservation = new Reservation(user_id, product_id);

	// add reservation to queue list
	product.queueList.unshift(reservation.id);

	await reservation.save();
	await product.save();

	return reservation;
};

// get reservations by user
const getReservationsByUser = async (user_id: Types.ObjectId) => {
	const reservations = await Reservation.find({ user_id: user_id });
	return reservations;
};

// get reservations by product
const getReservationsByProduct = async (product_id: string) => {
	const reservations = await Reservation.find({ product_id: product_id });
	return reservations;
};

// remove reservation by id
const deleteById = async (user_id: Types.ObjectId, id: Types.ObjectId) => {
	const reservation = await Reservation.findById(id);

	if (!reservation) {
		throw new ExpressError(`Reservation ${id} not found`, 404);
	}

	if (reservation.user_id.toString() !== user_id.toString()) {
		throw new ExpressError(`Lacking Credentials to delete ${id}`, 401);
	}

	await Reservation.deleteOne(id);
	await Product.updateOne(
		{ id: reservation.product_id },
		{ $pull: { queueList: id } }
	);
	return;
};

// get queue list
// remove reservation in front, if older than 2 hours
// queue list updates whenever a reservation is created or deleted or someone visits the product page
const getQueueList = async (product_id: string) => {
	const product = await Product.findById(product_id);

	if (!product) {
		throw new ExpressError(`Product ${product_id} not found`, 404);
	}

	const reservation = await Reservation.findById(product.queueList[0]);

	if (reservation) {
		const now = new Date();
		const diff = now.getTime() - reservation.createdAt.getTime();
		const minutes = Math.floor(diff / 1000 / 60);

		// if reservation is older than 2 hours, remove it
		if (minutes > 120) {
			await Reservation.deleteOne(reservation.id);
			// remove reservation in front of queue list
			product.queueList.shift();
			await product.save();
		}
	}

	return product;
};

export default {
	create,
	getReservationsByUser,
	getReservationsByProduct,
	deleteById,
	getQueueList,
};
