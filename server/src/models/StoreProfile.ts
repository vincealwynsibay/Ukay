import mongoose, { Schema, model, Types } from "mongoose";

interface IStoreProfile {
	_id: Types.ObjectId;
	description: string;
	name: string;
	avatarUrl: string;
	followers: Types.ObjectId[];
	createdAt: Date;
}

const storeProfileSchema = new Schema<IStoreProfile>({
	name: { type: String, required: true },
	avatarUrl: {
		type: String,
		required: true,
		default: "https://i.imgur.com/1Q9ZQ9r.png",
	},
	description: { type: String, required: true },
	followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
	createdAt: { type: Date, required: true, default: Date.now },
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
