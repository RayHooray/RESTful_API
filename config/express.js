import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hello everyone, this is a RESTful API production. Welcome to there!')
})

export default app