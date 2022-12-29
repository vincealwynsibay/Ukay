import mongoose, { Schema, model, Types } from "mongoose";

interface IProduct {
	_id: Types.ObjectId;
	store_id: Types.ObjectId;
	name: string;
	price: number;
	category: string;
	queueList: Types.ObjectId[];
	photos: {
		main: string;
		front: string;
		back: string;
		leftSide: string;
		rightSide: string;
	};
}

const productSchema = new Schema<IProduct>({
	store_id: { type: Schema.Types.ObjectId, ref: "Store" },
	name: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	queueList: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
	photos: {
		main: { type: String, required: true },
		front: { type: String, required: true },
		back: { type: String, required: true },
		leftSide: { type: String, required: true },
		rightSide: { type: String, required: true },
	},
});

productSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const productModel = model("Product", productSchema);

export default productModel;
