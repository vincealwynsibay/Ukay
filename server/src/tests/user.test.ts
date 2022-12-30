import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/userModel";

describe("Users", () => {
	beforeAll(async () => {
		await mongoose.connect(process.env.MONGO_URI_TEST!);
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	beforeEach(async () => {
		User.deleteMany({});
		await request(app).post("/api/auth/register").send({
			id: 1,
			email: "test3@test.com",
			password: "test123",
			firstName: "test",
			lastName: "3",
			role: "customer",
		});
		await request(app).post("/api/auth/login").send({
			email: "test3@test.com",
			password: "test123",
		});
	});

	it("get all users", async () => {
		const res = await request(app).get("/api/users");
		expect(res.status).toBe(200);
		expect(res.body.length).toBeGreaterThan(0);
	});
});
