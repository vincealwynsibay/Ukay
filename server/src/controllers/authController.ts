import express from "express";
import usersService from "../services/usersService";
import catchAsync from "../utils/catchAsync";
import { IGetAuthRequest } from "../types";
const router = express.Router();

const authenticate = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const { user, token } = await usersService.authenticate(req.body);
		return res.json({ user, token });
	}
);

const register = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = await usersService.register(req.body);
		return res.json(user);
	}
);

// POST /api/auth/login
router.post("/login", authenticate);

// POST /api/auth/register
router.post("/register", register);

export default router;
