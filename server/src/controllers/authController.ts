import express, { Router } from "express";
import usersService from "../services/usersService";
import catchAsync from "../utils/catchAsync";
import { IGetAuthRequest } from "../types";
export const router = Router({ mergeParams: true });

const authenticate = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const { user, token } = await usersService.authenticate(req.body);
		return res.json({ user, token });
	}
);

const register = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const { user, token } = await usersService.register(req.body);
		return res.json({ user, token });
	}
);

// POST /api/auth/login
router.post("/login", authenticate);

// POST /api/auth/register
router.post("/register", register);
