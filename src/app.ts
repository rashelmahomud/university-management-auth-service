import express, { Application, urlencoded } from 'express';
import cors from 'cors';

import globallErrorHandelars from './app/moddlewars/globallErrorHandelars';
import { UserRoutes } from './app/modules/users/user.route';
const app: Application = express();

// const port = 5000

app.use(cors());

// perser
app.use(express.json());
app.use(urlencoded({ extended: true }));

// applicaitons

app.use('/api/v1/user', UserRoutes);

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('testing logger...')
// })

//global error...
app.use(globallErrorHandelars);

export default app;
