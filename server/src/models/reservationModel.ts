import mongoose, { Schema, model, Types } from "mongoose";

interface IReservation {
	_id: Types.ObjectId;
	product_id: Types.ObjectId;
	user_id: Types.ObjectId;
	createdAt: Date;
}

const reservationSchema = new Schema<IReservation>({
	product_id: { type: Schema.Types.ObjectId, ref: "Product" },
	user_id: { type: Schema.Types.ObjectId, ref: "User" },
	createdAt: { type: Date, required: true, default: new Date() },
});

reservationSchema.set("toJSON", {
	virtuals: true,
	versionKey: false,
	transform: function (_doc, ret) {
		delete ret._id;
	},
});

const reservationModel = model("Reservation", reservationSchema);

export default reservationModel;
