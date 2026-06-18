const express = require('express')
const app = express()

const {PORT} = require('./utils/config')
const {connectToDb} = require('./utils/db')
const {errorHandler} = require('./utils/error')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`run on port ${PORT}`)
  })
} 

start()
