import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../models/userModel";

// test authentication
describe("Authentication", () => {
	// clean mongoose database before all tests
	beforeEach(async () => {
		await mongoose.connect(process.env.MONGO_URI!);
	});

	afterAll(async () => {
		await User.deleteMany({});
		await mongoose.connection.close();
	});

	it("register as a customer", async () => {
		const res = await request(app).post("/api/auth/register").send({
			email: "test1@test.com",
			password: "test123",
			firstName: "test",
			lastName: "1",
			role: "customer",
		});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("ok");
	});

	it("register as a store", async () => {
		const res = await request(app).post("/api/auth/register").send({
			email: "test2@test.com",
			password: "test123",
			firstName: "test",
			lastName: "2",
			role: "store",
		});

		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("ok");
	});

	it("login as a customer", async () => {
		const res = await request(app).post("/api/auth/login").send({
			email: "test1@test.com",
			password: "test123",
		});
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("token");
	});

	it("login as a store", async () => {
		const res = await request(app).post("/api/auth/login").send({
			email: "test2@test.com",
			password: "test123",
		});
		expect(res.status).toBe(200);
		expect(res.body).toHaveProperty("token");
	});
});
