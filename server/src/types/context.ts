import { Request, Response } from "express";

interface LfgRequest extends Request {
  userId?: string;
}

export interface ServerContext {
  req: LfgRequest;
  res: Response;
}
