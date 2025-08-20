import express from "express";
import { prisma } from "../config/prisma";
import jwt from "jsonwebtoken";
import validateUser, { customRequest } from "../middlewares/verifyToken";

const userRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

userRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(500).json({
        error: "user already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    const userInfo = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true },
    });

    const token = jwt.sign(
      { email, userInfo },
      JWT_SECRET ?? "SOME_DEFAULT_SECRET"
    );

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

userRouter.post("/signin", async (req: customRequest, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        error: "invalid email or password",
      });
    }

    const userInfo = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true },
    });

    const token = jwt.sign(
      { email, userInfo },
      JWT_SECRET ?? "SOME_DEFAULT_SECRET"
    );

    return res.json({
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});


userRouter.get('/me', validateUser, async (req: customRequest, res) => {
  const userId = req.user.userInfo.id

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }, 
      select: {
        name: true,
        email: true,
        role: true
      }
    })

    return res.json({
      user
    })
  } catch (error) {
    return res.status(500).json({
      error
    })
  }
})
export default userRouter;