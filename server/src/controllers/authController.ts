import express from "express";
import usersService from "src/services/usersService";
import catchAsync from "src/utils/catchAsync";
import { IGetAuthRequest } from "../types";
const router = express.Router();

const authenticate = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = usersService.authenticate(req.body);
		return res.json(user);
	}
);

const register = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = usersService.register(req.body);
		return res.json(user);
	}
);

const getUserById = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = usersService.getById(req.body.id);
		return res.json(user);
	}
);

const getAll = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const users = usersService.register(req.body);
		return res.json(users);
	}
);

const getUserByEmail = catchAsync(
	async (req: express.Request, res: express.Response) => {
		const user = usersService.getByEmail(req.body.email);
		return res.json(user);
	}
);

const updateUser = catchAsync(
	async (req: IGetAuthRequest, res: express.Response) => {
		const user = usersService.update(req.user.id, req.body);
		return res.json(user);
	}
);

const deleteUser = catchAsync(
	async (req: IGetAuthRequest, res: express.Response) => {
		const user = usersService.delete(req.user.id);
		return res.json(user);
	}
);

// POST /api/auth/login
router.post("/login", authenticate);

// POST /api/auth/register
router.post("/register", register);

// GET /api/users/:id
router.get("/:id", getUserById);

// GET /api/users/
router.get("/", getAll);

// PUT: /api/users/:id
router.put("/:id", updateUser);
// DELETE: /api/users/:id
router.delete("/:id", deleteUser);

export default router;
