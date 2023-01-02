import { Request, Response, NextFunction } from "express";

export function sort(sortTypes: any[][]) {
	return async (req: Request, res: Response, next: NextFunction) => {
		let sortParams = {};
		if (sortTypes.length > 0) {
			sortTypes.forEach(async (element) => {
				// check if param exist in req.query
				const elementVal = element[0];
				const elementType = element[1];
				if (req.query[elementVal]) {
					if (elementType === "array") {
						sortParams = {
							...sortParams,
							[elementVal]: { $size: req.query[elementVal] },
						};
					} else {
						sortParams = {
							...sortParams,
							[elementVal]: req.query[elementVal],
						};
					}
				}
			});
		}

		(req as any).sortParams = sortParams;
		next();
	};
}
