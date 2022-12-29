import { Types } from "mongoose";
import ExpressError from "../utils/ExpressError";
import Customer from "../models/Customer";
import User from "../models/User";

// create
const create = async (user_id: Types.ObjectId, customerParams: any) => {
	const { username } = customerParams;
	if (await Customer.findOne({ username })) {
		throw new ExpressError(`Username ${username} is already taken`, 400);
	}

	customerParams.user_id = user_id;
	const customer = new Customer(customerParams);
	await customer.save();
	return customer;
};

// get by id
const getById = (id: Types.ObjectId) => {
	const customer = Customer.findById(id);
	return customer;
};

// get by username
const getByUsername = async (username: string) => {
	const customer = await Customer.findOne({ username: username });
	return customer;
};

// get by user_id
const getByUserId = async (userId: string) => {
	const customer = await Customer.findOne({ user_id: userId });
	return customer;
};

// update by user_id
const update = async (id: Types.ObjectId, customerCredentials: any) => {
	const customer = await Customer.findById(id);

	if (!customer) {
		throw new ExpressError(`Customer ${id} not found`, 404);
	}

	if (customer.username !== customerCredentials.username) {
		if (
			await Customer.findOne({ username: customerCredentials.username })
		) {
			throw new ExpressError(
				"Username " +
					customerCredentials.username +
					" is already taken",
				400
			);
		}
	}

	Object.assign(customer, customerCredentials);
	await customer.save();
	return customer;
};

// delete by user_id
const _delete = async (user_id: Types.ObjectId, id: string) => {
	const customer = await Customer.findById(id);

	if (!customer) {
		throw new ExpressError(`Customer ${id} not found`, 404);
	}

	if (user_id.toString() !== customer.user_id.toString()) {
		throw new ExpressError(
			`Lacking permission to delete profile ${id}`,
			401
		);
	}

	await Customer.deleteOne({ id });
	await User.deleteOne({ id: user_id });
	return;
};

// change avatar of customer
const changeAvatar = async () => {};

// reserve a product

export default {
	create,
	getById,
	getByUsername,
	getByUserId,
	update,
	delete: _delete,
	changeAvatar,
};
