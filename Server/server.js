const express = require('express')
const app = express()
const PORT = 4000
const index = require('./routes/index')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.use(index)

app.listen(PORT)