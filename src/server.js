// const express = require('express')
import express from 'express'
const app = express()
import {PORT, HOST} from './config.js'
import cors from 'cors'


import logger  from './middlewares/logger.js'

import userRouter from './routers/userRouter.js'
import productRouter from './routers/productRouter.js'
import authRouter from './routers/authRouter.js'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8081', 'http://meusite.com'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(logger)
app.use(cookieParser)

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/product', productRouter)

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`)
})