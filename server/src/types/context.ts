import { Request, Response, Express } from "express";

interface LfgRequest extends Request {
  session: Express.Session & { userId?: string };
}

export interface ServerContext {
  req: LfgRequest;
  res: Response;
}
