import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * If a validation chain was previously provided in the router middleware chain,
 * this function checks that all those requirements are met. Passes onto the next
 * middleware function on success, or send error message with detailed information
 * on failure.
 * @param req Express Request Object.
 * @param res Express Response Object.
 * @param next Express Next Function.
 */
function checkValidationResult(req: Request, res: Response, next: NextFunction): void | Response {
  const result = validationResult(req);

  if (result.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: result.array() });
}

export default checkValidationResult;
