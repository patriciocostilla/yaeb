import { NextFunction, Request, Response } from 'express';
import os from 'os';

/**
 *  @openapi
 *  tags:
 *    - name: index
 *      description: API Index
 */
class IndexController {

  private hostname = os.hostname();

  /**
  * @openapi
  * /ping:
  *   get:  
  *     tags:
  *       - index
  *     description: Healtcheck PING
  *     responses:
  *       200:
  *         description: Returns a magical string 
  *         content: 
  *           application/json:
  *             example: pong
  */
  public ping = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(200).json({ hostname: this.hostname, date: new Date().getTime() });
    } catch (error) {
      next(error);
    }
  };

  /**
  * @openapi
  * /validate:
  *    post:
  *       tags:
  *         - index
  *       description: Validate some input params
  *       requestBody:
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/Validate'
  *       responses:
  *          200:
  *             description: Returns a mysterious string 
  *             content:
  *               application/json:
  *                 example: { message: 'Seems good!' }
  */
  public validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // If you reached here: CONGRATS!
      res.status(200).json({ message: 'Seems good!' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
