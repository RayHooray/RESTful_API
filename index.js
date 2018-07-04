import app from './config/express'
import config from './config/env'
import mongoose from 'mongoose'

//链接数据库
mongoose.connect(config.db)

//监视数据库链接状态
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`)
})
mongoose.connection.on('connected', () => {
    console.log(`Connected To Database: ${config.db}`)
    if (config.env === 'development') {
        mongoose.set('debug', true)
    }
})

app.listen(config.port, () => {
    console.log(`API Server Start and listening on port ${config.port} (${config.env})`)
})
export default app