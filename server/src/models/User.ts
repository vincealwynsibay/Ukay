import mongoose, { Schema, model, Types } from "mongoose";

interface IUser {
	_id: Types.ObjectId;
	username: string;
	email: string;
	password: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },

	createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.virtual("fullName").get(function () {
	return `${this.firstName} ${this.lastName}`;
});

userSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
		delete ret.password;
	},
});

const userModel = model("User", userSchema);

export default userModel;
