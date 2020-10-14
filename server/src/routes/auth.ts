import express from "express";
import { User } from "../entity/User";

const router = express();

router.get("/me", async (req, res) => {
  if (!req.session!.userId) return res.status(500).send();

  const user = await User.findOne(req.session!.userId);
  if (!user) return res.status(500).send();

  res.send(user);
});

type LoginParams = {};

router.post<LoginParams>("/login", async (req, res) => {
  const user = await User.findOne({ where: {} });
});

export { router as authRoutes };
