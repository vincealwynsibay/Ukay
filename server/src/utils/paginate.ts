import { Model } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { IGetPaginatedResultsResponse } from "../types";

export const paginateModel = async (
	model: any,
	page: number,
	limit: number
) => {
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;

	const results: {
		next?: { page: number; limit: number };
		previous?: { page: number; limit: number };
		results?: any[];
	} = {};

	if (endIndex < (await model.countDocuments().exec())) {
		results.next = {
			page: page + 1,
			limit: limit,
		};
	}

	if (startIndex > 0) {
		results.previous = {
			page: page - 1,
			limit: limit,
		};
	}

	results.results = await model.find().skip(startIndex).limit(limit).exec();

	return results;
};

export function paginate(model: Model<any>) {
	return async (
		req: Request,
		res: IGetPaginatedResultsResponse,
		next: NextFunction
	) => {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;

		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;

		const results: {
			next?: { page: number; limit: number };
			previous?: { page: number; limit: number };
			results?: any[];
		} = {};

		if (endIndex < (await model.countDocuments().exec())) {
			results.next = {
				page: page + 1,
				limit: limit,
			};
		}

		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
			};
		}

		let sort = [];
		sort = (req as any).sortParams;

		try {
			results.results = await model
				.find()
				.skip(startIndex)
				.limit(limit)
				.sort(sort)
				.exec();
			res.paginatedResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
}
