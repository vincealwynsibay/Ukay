import mongoose, { Schema, model, Types } from "mongoose";

interface IUserProfileSchema {
	_id: Types.ObjectId;
	avatarUrl: string;
	description: string;
	following: Types.ObjectId[];
	reservations: Types.ObjectId[];
}

const userProfileSchema = new Schema<IUserProfileSchema>({
	avatarUrl: {
		type: String,
		required: true,
		default: "https://i.imgur.com/1Q9ZQ9r.png",
	},
	description: { type: String, required: true },
	following: [{ type: Schema.Types.ObjectId, ref: "User" }],
	reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }],
});

userProfileSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const userProfileModel = model("UserProfile", userProfileSchema);

export default userProfileModel;
