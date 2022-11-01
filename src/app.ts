import { AutoRun } from '@/services/auto.service';
import { CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT } from '@config';
import { dbConnection } from '@databases';
import { IRoutes } from '@interfaces/routes.interface';
import errorMiddleware from '@middlewares/error.middleware';
import { stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { engine } from 'express-handlebars';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect, set } from 'mongoose';
import morgan from 'morgan';
import path from 'path';

class App {
  public app: Application;
  public env: string;
  public port: string | number;
  public autoRun = new AutoRun();
  constructor(routes: IRoutes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    // this.autoRun.run();
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    connect(dbConnection.url, dbConnection.options);
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.engine(
      '.hbs',
      engine({
        extname: '.hbs',
        defaultLayout: null,
      }),
    );
    this.app.set('view engine', '.hbs');
    this.app.set('views', path.join(__dirname, 'views/layout'));
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
