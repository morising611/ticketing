import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { User } from '../models/user';
import {
  generateJwt,
  validateRequest,
  BadRequestError,
} from '@moriticket/common';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({
      email,
      password,
    });
    await user.save();

    // Generate JWT and store it.
    req.session = { jwt: generateJwt(user.id, user.email) };
    res.status(201).send(user);
  },
);

export { router as signupRouter };
