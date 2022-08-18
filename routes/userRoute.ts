import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  getUser,
  getUsers,
  signupUser,
  deleteUser,
  updateUser,
  loginUser,
} from "../controllers/userController";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

userRouter.post(
  "/signup",
  body("username").isAlphanumeric().isLength({ min: 10 }),
  body("password").isStrongPassword(),
  signupUser
);

userRouter.post(
    "/login",
    loginUser
  );

userRouter.delete("/:id", deleteUser);

userRouter.patch("/:id", updateUser);

export default userRouter;
