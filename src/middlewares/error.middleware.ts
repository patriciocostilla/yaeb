import { NextFunction, Request, Response } from 'express';
import { logger } from '@utils/logger';
import HttpException from '@exceptions/http.exception';
import config from '@/configs/config';

const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    let status: number;
    let message: string;
    const { stack } = error;
    if (error instanceof HttpException) {
      status = error.status;
      message = error.message;
    } else {
      status = 500;
      message = 'Something went wrong';
    }

    const level = status < 500 ? 'warn' : 'error';

    const payload: any = {
      method: req.method,
      path: req.path,
      status,
    };

    if (!config.isTest) {
      payload.stack = stack;
    }

    logger.log(level, message, payload);

    res.status(status).json({ message });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
