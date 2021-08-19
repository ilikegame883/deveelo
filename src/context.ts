import { Request, Response } from "express";

//resolver context containing the server's result (used to make cookies)
interface Context {
	req: Request;
	res: Response;
	payload?: { id: string; tag: string };
}

export default Context;
