import { Request } from "express";

export interface IGetAuthRequest extends Request {
	user?: any;
}
