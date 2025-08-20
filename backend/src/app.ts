import express from 'express'
import userRouter from './routes/user.routes'
import courseRouter from './routes/course.routes'
import enrollRouter from './routes/enroll.routes'
import reviewRouter from './routes/review.routes'
import certificateRouter from './routes/certificate.routes'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1/user', userRouter)
app.use('/api/v1/course', courseRouter)
app.use('/api/v1/enroll', enrollRouter)
app.use('/api/v1/review', reviewRouter)
app.use('/api/v1/certificate', certificateRouter)

export default app