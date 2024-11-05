import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { generateJwt } from "../middlewares/generate-jwt";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Invalid email");
    }

    const passwordMatch = await Password.compare(
      existingUser.password,
      password,
    );
    if (!passwordMatch) {
      throw new BadRequestError("Invalid password");
    }

    // Generate JWT and store it.
    req.session = { jwt: generateJwt(existingUser.id, existingUser.email) };
    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
