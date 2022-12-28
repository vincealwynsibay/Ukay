import mongoose, { Schema, model, Types } from "mongoose";

interface IReview {
	_id: Types.ObjectId;
	user_id: Types.ObjectId;
	store_id: Types.ObjectId;
	rating: number;
	content?: string;
	created_at: Date;
}

const reviewSchema = new Schema<IReview>({
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	store_id: {
		type: Schema.Types.ObjectId,
		ref: "StoreProfile",
		required: true,
	},
	rating: { type: Number, required: true },
	content: { type: String, required: false },
	created_at: { type: Date, required: true, default: new Date() },
});

reviewSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const reviewModel = model("Review", reviewSchema);

export default reviewModel;
