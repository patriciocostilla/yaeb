import config from '@configs/config';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import path from 'path';
import morgan from '@utils/morgan';
import swaggerUi from 'swagger-ui-express';
import HttpException from '@exceptions/http.exception';
import { Route } from '@interfaces/route.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { logger } from '@utils/logger';
import swaggerJson from '@public/swagger.json';

class App {
  public app: express.Application;

  private PUBLIC_PATH = path.join(__dirname, '../public');

  constructor(routes: Route[]) {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeStaticFiles();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    this.app.use(morgan);
    this.app.use(cors({ credentials: true, origin: true }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  initializeRoutes(routes: Route[]) {
    routes.forEach((route) => this.app.use(route.path, route.router));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      next(new HttpException(404, 'Not Found'));
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  initializeSwagger() {
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
  }

  initializeStaticFiles() {
    this.app.use('/public', express.static(this.PUBLIC_PATH));
  }
  
  public listen(port: number | string) {
    return this.app.listen(port, () => logger.info(
      `🚀 App (${config.NODE_ENV}) listening on the port ${port}`,
    ));
  }
}

export default App;
