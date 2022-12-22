import mongoose from "mongoose";

export const connectDB = () => {
	const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ukay";

	mongoose.connect(MONGO_URI).then(() => {
		console.log(`[server] Database connected!`);
	});
};
