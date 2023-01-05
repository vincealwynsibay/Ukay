import { v2 as cloudinary } from "cloudinary";
import catchAsync from "./utils/catchAsync";
import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";

// app routes
import { router as authRoutes } from "./controllers/authController";
import { router as usersRoutes } from "./controllers/usersController";
import { router as customersRoutes } from "./controllers/customersController";
import { router as storesRoutes } from "./controllers/storesController";
import { router as productsRoutes } from "./controllers/productsController";
import { router as reservationsRoutes } from "./controllers/reservationsController";
import { router as ordersRoutes } from "./controllers/ordersController";
import { upload, uploadImage, uploadImages } from "./utils/imageUpload";

const app = express();

app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

// SEED Database
// import { seeder } from "./seeder/seed";
// seeder().catch();

app.get("/ping", (_req, res) => {
	res.json({ message: "nice" });
});

app.post(
	"/uploadImage",
	upload.single("image"),
	catchAsync(async (req: Request, res: Response) => {
		console.log("path", req.file?.path);
		const result = await uploadImage(req.file!);
		console.log(result);

		res.json(result);
	})
);

app.post(
	"/uploadImages",
	upload.array("image", 5),
	catchAsync(async (req: Request, res: Response) => {
		const results = await uploadImages(req.files);
		res.json({ results });
	})
);

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/products/:id/reservations", reservationsRoutes);
app.use("/api/users/:id/orders", ordersRoutes);

export default app;
