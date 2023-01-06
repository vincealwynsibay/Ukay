import { Request, Response, NextFunction } from "express";

export function sort(sortTypes: any[][]) {
	return async (req: Request, _res: Response, next: NextFunction) => {
		let sortParams = {};

		sortTypes.forEach(async (element) => {
			// check if param exist in req.query
			const elementVal = element[0];

			sortParams = {
				...sortParams,
				[elementVal]: req.query[elementVal] || "desc",
			};
		});

		(req as any).sortTypes = sortTypes;
		(req as any).sortParams = sortParams;
		next();
	};
}
