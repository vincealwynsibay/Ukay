import mongoose, { Schema, model, Types, ObjectId } from "mongoose";

interface IOrder {
	_id: Types.ObjectId;
	store_id: Types.ObjectId;
	product_id: Types.ObjectId;
	user_id: Types.ObjectId;
	createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
	store_id: {
		type: Schema.Types.ObjectId,
		ref: "StoreProfile",
		required: true,
	},
	product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	createdAt: { type: Date, required: true, default: new Date() },
});

orderSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const orderModel = model("Order", orderSchema);

export default orderModel;
