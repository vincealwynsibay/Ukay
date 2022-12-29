import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./utils/db";

// app routes
import { router as authRoutes } from "./controllers/authController";
import { router as usersRoutes } from "./controllers/usersController";
import { router as customersRoutes } from "./controllers/customersController";
import { router as storesRoutes } from "./controllers/storesController";
import { router as productsRoutes } from "./controllers/productsController";
import { router as reservationsRoutes } from "./controllers/reservationsController";
import { router as ordersRoutes } from "./controllers/ordersController";

const app = express();

app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get("/ping", (_req, res) => {
	res.send("nice");
});

import multer from "multer";

const upload = multer({ dest: "uploads/" });

app.get("/upload", upload.single("image"), (_req, res) => {
	res.send("upload");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/products/:id/reservations", reservationsRoutes);
app.use("/api/users/:id/orders", ordersRoutes);

export default app;
