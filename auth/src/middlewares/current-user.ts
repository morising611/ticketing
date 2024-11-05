import { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/custom-error";
import jwt from "jsonwebtoken";

interface UserPaylaod {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPaylaod;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.jwt) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!,
    ) as UserPaylaod;
    req.currentUser = payload;
  } catch (err) {}

  next();
};
