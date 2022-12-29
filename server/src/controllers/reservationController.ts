import reservationsService from "../services/reservationsService";
import { IGetAuthRequest } from "../types";
import catchAsync from "../utils/catchAsync";
import { Request, Response, Router } from "express";
import { checkRole } from "src/utils/jwt";

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

const getProductQueueList = catchAsync(async (req: Request, res: Response) => {
	const queueList = await reservationsService.getQueueList(req.params.id);
	return res.json(queueList);
});

// POST /api/products/:id/reservations
router.post("/:id/reservations", checkRole("customer"), createReservation);

// GET /api/products/:id/reservations
router.get("/:id/reservations", getReservationsByProduct);

// DELETE /api/products/:product_id/reservations/:id
router.delete("/reservations", checkRole("customer"), deleteReservations);

// GET /api/products/:id/queue
router.get("/:id/queue", getProductQueueList);

export default router;
