import mongoose from 'mongoose'
import config from './config/index'

import app from './app'
import { logger, errorlogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database is connectted successfully')
    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('faild to connected to data base', err)
  }
}
main()
