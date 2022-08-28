import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getUser,
  getUsers,
  signupUser,
  deleteUser,
  loginUser,
  updateLangandGroup,
} from "../controllers/userController";
import requireAuth from "../middleware/requireAuth";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post(
  "/signup",
  body("username").isAlphanumeric().isLength({ min: 5 }),
  body("password"),
  signupUser
);

userRouter.post(
  "/login", loginUser
);

userRouter.delete("/", requireAuth, deleteUser);

userRouter.patch("/lang", requireAuth, updateLangandGroup);

export default userRouter;
