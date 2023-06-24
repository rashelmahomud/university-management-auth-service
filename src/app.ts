import express, {
  Application,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express';
import cors from 'cors';

import globallErrorHandelars from './app/moddlewars/globallErrorHandelars';
import routers from './app/routs';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
const app: Application = express();

// const port = 5000

app.use(cors());
app.use(cookieParser());

// perser
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use('/api/v1/', routers);

app.use(globallErrorHandelars);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: [
      {
        path: '.',
        message: req.originalUrl,
      },
    ],
  });
  next();
});

export default app;
