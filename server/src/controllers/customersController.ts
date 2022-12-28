import customersService from "../services/customersService";
import { IGetAuthRequest } from "src/types";
import { Request, Response } from "express";
import catchAsync from "src/utils/catchAsync";
import express from "express";

const router = express.Router();

const createCustomerProfile = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const profile = await customersService.create(req.user.id, req.body);
		return res.json(profile);
	}
);

const getProfileByUsername = catchAsync(async (req: Request, res: Response) => {
	const profile = await customersService.getByUsername(req.body.username);
	return res.json(profile);
});

const getProfileByUserId = catchAsync(async (req: Request, res: Response) => {
	const profile = await customersService.getByUserId(req.params.id);
	return res.json(profile);
});

const updateProfile = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const profile = await customersService.update(req.user.id, req.body);
		return res.json(profile);
	}
);

const deleteProfile = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		await customersService.delete(req.user.id, req.params.id);
		return res.json({ ok: true });
	}
);

// POST /api/profile/
router.post("/", createCustomerProfile);

// GET /api/profile/:id
router.get("/:id", getProfileByUserId);

// GET /api/profile/:username
router.get("/:username", getProfileByUsername);

// PUT /api/profile/:id
router.put("/:id", updateProfile);

// DELETE /api/profile/:id
router.delete("/:id", deleteProfile);

export default router;
