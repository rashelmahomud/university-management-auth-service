import express, { Application, Request, Response, urlencoded } from 'express'
import cors from 'cors'

import userRouter from './app/modules/users/user.route'
const app: Application = express()

// const port = 5000

app.use(cors())

// perser
app.use(express.json())
app.use(urlencoded({ extended: true }))

// applicaitons

app.use('/api/v1/user', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
