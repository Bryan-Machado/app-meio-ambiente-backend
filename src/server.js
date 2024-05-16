// const express = require('express')
import express from 'express'
const app = express()
import {PORT, HOST} from './config.js'
import cors from 'cors'

import markerRouter from './routers/markerRouter.js'
import ecopontoRouter from './routers/ecopontoRouter.js'
import categoriaRouter from './routers/categoriaRouter.js'
import cookieParser from 'cookie-parser'

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8081', 'http://meusite.com'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use(cookieParser)

app.use('/ecoponto', ecopontoRouter)
app.use('/marker', markerRouter)
app.use('/categoria', categoriaRouter)

app.get('/', (req, res) => {
  res.json({message: 'Hello World!'})
})

app.use((req, res) => {
  res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`)
})