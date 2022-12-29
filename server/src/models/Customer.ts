import mongoose, { Schema, model, Types } from "mongoose";

interface ICustomer {
	_id: Types.ObjectId;
	user_id: Types.ObjectId;
	username: string;
	avatar: string;
	description: string;
	following: Types.ObjectId[];
	reservations: Types.ObjectId[];
}

const customerSchema = new Schema<ICustomer>({
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	username: { type: String, required: true, unique: true },
	avatar: {
		type: String,
		required: true,
		default: "https://i.imgur.com/1Q9ZQ9r.png",
	},
	description: { type: String, required: true },
	following: [{ type: Schema.Types.ObjectId, ref: "User" }],
	reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

customerSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const customerModel = model("Customer", customerSchema);

export default customerModel;
