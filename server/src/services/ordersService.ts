import Reservation from "../models/Reservation";
import Product from "../models/Product";
import Order from "../models/Order";
import { Types } from "mongoose";

// create order
const create = async (user_id: Types.ObjectId, product_id: string) => {
	const product = await Product.findById(product_id);
	if (!product) throw new Error("Product not found");

	const order = new Order({
		store_id: product.store_id,
		product_id,
		user_id,
	});

	await Product.deleteOne({ _id: product_id });
	await Reservation.deleteMany({ product_id: product_id });
	await order.save();
	return order;
};

// create orders by array of products
const createOrders = async (
	user_id: Types.ObjectId,
	products: Types.ObjectId[]
) => {
	const orders = [];
	// products.forEach(async (productId) => {
	// 	const product = await Product.findById(productId);
	// 	if (!product) throw new Error("Product not found");

	// 	const order = new Order({
	// 		store_id: product.store_id,
	// 		product_id: productId,
	// 		user_id,
	// 	});

	// 	await order.save();

	// 	// delete product and reservations after order has been created
	// 	await Product.deleteOne({ _id: productId });
	// 	await Reservation.deleteMany({ product_id: productId });

	// 	orders.push(order);
	// });
	for (let i = 0; i < products.length; i++) {
		const product = await Product.findById(products[i]);
		if (!product) throw new Error("Product not found");

		const order = new Order({
			store_id: product.store_id,
			product_id: products[i],
			user_id,
		});

		await order.save();

		// delete product and reservations after order has been created
		await Product.deleteOne({ _id: products[i] });
		await Reservation.deleteMany({ product_id: products[i] });

		orders.push(order);
	}
	return orders;
};

// get orders by user
const getOrdersByUser = async (user_id: Types.ObjectId) => {
	const orders = await Order.find({ user_id: user_id });
	return orders;
};

// get orders by store
const getOrdersByStore = async (store_id: string) => {
	const orders = await Order.find({ store_id: store_id });
	return orders;
};

export default {
	create,
	createOrders,
	getOrdersByUser,
	getOrdersByStore,
};
