import { Schema, model, Types } from "mongoose";

interface IUser {
	email: string;
	password: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	role: string;
	createdAt: Date;
}

const userSchema = new Schema<IUser>({
	email: { type: String, required: true },
	password: { type: String, required: true },
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	role: { type: String, required: true, default: "customer" },
	createdAt: { type: Date, required: true, default: new Date() },
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

const userModel = model<IUser>("User", userSchema);

export default userModel;
