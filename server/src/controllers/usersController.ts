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
		const users = await usersService.register(req.body);
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
		const user = await usersService.update(req.user.id, req.body);
		return res.json(user);
	}
);

const deleteUser = catchAsync(
	async (req: IGetAuthRequest, res: express.Response) => {
		const user = await usersService.delete(req.user.id);
		return res.json(user);
	}
);

// GET /api/users/:id
router.get("/:id", getUserById);

// GET /api/users/
router.get("/", getAll);

// PUT: /api/users/:id
router.put("/:id", checkAuth, updateUser);

// DELETE: /api/users/:id
router.delete("/:id", checkAuth, deleteUser);
