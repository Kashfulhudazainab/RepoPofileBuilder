import express        from 'express'
import cors           from 'cors'
import cookieParser   from 'cookie-parser'
import connectDB      from './config/db.js'
import authRoutes     from './routes/authRoutes.js'
import repoRoutes     from './routes/repoRoutes.js'
import dotenv         from 'dotenv'

dotenv.config()
connectDB()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',  authRoutes)
app.use('/api/repos', repoRoutes)

app.listen(5000, () => console.log('Server running on port 5000'))