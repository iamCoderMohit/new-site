import express from 'express'
import validateUser, { customRequest } from '../middlewares/verifyToken'
import { prisma } from '../config/prisma'

const reviewRouter = express.Router()

reviewRouter.post('/:courseId', validateUser, async (req: customRequest, res) => {
    const {courseId} = req.params
    const userId = req.user.userInfo.id
    const {rating, comment} = req.body

    try {
        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                courseId: Number(courseId),
                userId: userId
            }
        })

        return res.json({
            review
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

reviewRouter.delete('/:reviewId', async (req, res) => {
    const {reviewId} = req.params

    try {
        await prisma.review.delete({
            where: {
                id: Number(reviewId)
            }
        })

        return res.json({
            "msg": "review deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export default reviewRouter