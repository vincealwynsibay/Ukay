import mongoose, { Schema, model, Types } from "mongoose";

interface IStoreProfile {
	_id: Types.ObjectId;
	user_id: Types.ObjectId;
	description: string;
	name: string;
	avatarUrl: string;
	followers: Types.ObjectId[];
	reviews: Types.ObjectId[];
	createdAt: Date;
}

const storeProfileSchema = new Schema<IStoreProfile>({
	name: { type: String, required: true },
	user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
	avatarUrl: {
		type: String,
		required: true,
		default: "https://i.imgur.com/1Q9ZQ9r.png",
	},
	description: { type: String, required: true },
	followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
	reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
	createdAt: { type: Date, required: true, default: new Date() },
});

storeProfileSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const storeProfileModel = model("StoreProfile", storeProfileSchema);

export default storeProfileModel;
