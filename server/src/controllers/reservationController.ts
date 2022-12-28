import reservationsService from "src/services/reservationsService";
import { IGetAuthRequest } from "src/types";
import catchAsync from "src/utils/catchAsync";
import { Request, Response, Router } from "express";

const router = Router();

const createReservation = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const reservation = await reservationsService.create(
			req.user.id,
			req.params.id
		);
		return res.json(reservation);
	}
);
const getReservationsByUser = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const reservations = await reservationsService.getReservationsByUser(
			req.user.id
		);
		return res.json(reservations);
	}
);

const getReservationsByProduct = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const reservations = await reservationsService.getReservationsByProduct(
			req.params.id
		);
		return res.json(reservations);
	}
);

const deleteReservations = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		await reservationsService.deleteById(req.user.id, req.body.id);
		return res.json({ ok: true });
	}
);

const getProductQueueList = catchAsync(
	async (req: IGetAuthRequest, res: Response) => {
		const queueList = await reservationsService.getQueueList(req.params.id);
		return res.json(queueList);
	}
);

// POST /api/products/:id/reservations
router.post("/:id/reservations", createReservation);
// GET /api/user/:id/reservations
router.get("/user/:id/reservations", getReservationsByUser);
// GET /api/products/:id/reservations
router.get("/:id/reservations", getReservationsByProduct);
// DELETE /api/reservations/:id
router.delete("/reservations", deleteReservations);
// GET /api/products/:id/queue
router.get("/:id/queue", getProductQueueList);

export default router;
