import { Router } from 'express';
import { body } from 'express-validator';
import checkValidationResult from '@middlewares/validation.middleware';
import IndexController from '@controllers/index.controller';
import { Route } from '@interfaces/route.interface';

class IndexRoute implements Route {
  public path = '/';

  public router: Router = Router();

  public controller = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/ping', this.controller.ping);
    this.router.get('/breakme', this.controller.breakMe);
    this.router.post('/validate', 
      body('int').isInt(), 
      body('string').isString(), 
      checkValidationResult, 
      this.controller.validate);
  }
}

export default IndexRoute;
