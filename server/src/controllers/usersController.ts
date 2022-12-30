import express, { Router } from "express";
import usersService from "../services/usersService";
import catchAsync from "../utils/catchAsync";
import { checkAuth } from "../utils/jwt";
import { IGetAuthRequest } from "../types";
export const router = Router({ mergeParams: true });

const getUserById = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = await usersService.getById(req.params.id);
		return res.json(user);
	}
);

const getAll = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const users = await usersService.getAll();
		return res.json(users);
	}
);

const getUserByEmail = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = await usersService.getByEmail(req.body.email);
		return res.json(user);
	}
);

const updateUser = catchAsync(
	async (req: IGetAuthRequest, res: express.Response) => {
		const user = await usersService.update(req.params.id, req.body);
		console.log("user", user);

		return res.json(user);
	}
);

const deleteUser = catchAsync(
	async (req: IGetAuthRequest, res: express.Response) => {
		// const user = await usersService.delete(req.user.id, req.params.id);
		const user = await usersService.delete(req.params.id);
		return res.json(user);
	}
);
// GET /api/users/
router.get("/", getAll);

// GET /api/users/:id
router.get("/:id", getUserById);

// PUT: /api/users/:id
router.put("/:id", checkAuth, updateUser);

// DELETE: /api/users/:id
router.delete("/:id", checkAuth, deleteUser);
