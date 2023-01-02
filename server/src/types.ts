import { Request, Response } from "express";

export interface IGetAuthRequest extends Request {
	user?: any;
}

export interface IGetPaginatedResultsResponse extends Response {
	paginatedResults?: any;
}

export type order = "asc" | "desc" | "ascending" | "descending";
