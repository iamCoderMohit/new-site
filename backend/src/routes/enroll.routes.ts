import express from "express";
import validateUser, { customRequest } from "../middlewares/verifyToken";
import { prisma } from "../config/prisma";
import isAdmin from "../middlewares/isAdmin";

const enrollRouter = express.Router();

enrollRouter.post(
  "/:courseId",
  validateUser,
  async (req: customRequest, res) => {
    const { courseId } = req.params;
    const userId = req.user.userInfo.id;

    try {
      await prisma.enrollment.create({
        data: {
          userId: userId,
          courseId: Number(courseId),
        },
      });

      return res.json({
        msg: "enrolled successfully",
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
);

enrollRouter.get("/", validateUser, async (req: customRequest, res) => {
  const userId = req.user.userInfo.id;
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId,
      },
      include: {
        course: true,
      },
    });

    return res.json({
      enrollments,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

enrollRouter.get(
  "/admin/enrollments",
  validateUser,
  isAdmin,
  async (req, res) => {
    try {
      const enrollments = await prisma.enrollment.findMany();

      return res.json({
        enrollments,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  }
);

enrollRouter.get("/admin/enrollments/:courseId", async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: Number(courseId),
      },
    });

    return res.json({
      enrollments,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

enrollRouter.delete('/admin/enrollments/:userId', async (req, res) => {
    const {userId} = req.params

    try {
        await prisma.enrollment.deleteMany({
            where: {
                userId: Number(userId)
            }
        })

        return res.json({
            "msg": "removed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

export default enrollRouter;
