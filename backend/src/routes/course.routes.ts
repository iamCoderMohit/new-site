import express from "express";
import { prisma } from "../config/prisma";
import validateUser from "../middlewares/verifyToken";
import isAdmin from "../middlewares/isAdmin";

const courseRouter = express.Router();

courseRouter.post("/", validateUser, isAdmin, async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const course = await prisma.course.create({
      data: {
        title,
        description,
        price,
      },
    });

    return res.json({
      course,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

courseRouter.put("/:courseId", validateUser, isAdmin, async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price } = req.body;

  try {
    const course = await prisma.course.update({
      where: {
        id: Number(courseId),
      },
      data: {
        title,
        description,
        price,
      },
    });

    return res.json({
      course,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

courseRouter.delete("/:courseId", validateUser, isAdmin, async (req, res) => {
  const { courseId } = req.params;

  try {
    await prisma.course.delete({
      where: {
        id: Number(courseId),
      },
    });

    return res.json({
      msg: "course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

courseRouter.get('/all', async (req, res) => {
    try {
        const courses = await prisma.course.findMany()

        return res.json({
            courses
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

courseRouter.get('/:courseId', async (req, res) => {
    const {courseId} = req.params

    try {
        const course = await prisma.course.findUnique({
            where: {
                id: Number(courseId)
            }
        })

        return res.json({
            course
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

//review routes for a course is remaining

export default courseRouter;
