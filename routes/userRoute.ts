import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
  addFriend,
  getUser,
  getFriends,
  getGroups,
  getUsers,
  signupUser,
  deleteUser,
  loginUser,
  updateLangandGroup,
  removeFriend,
} from "../controllers/userController";
import requireAuth from "../middleware/requireAuth";

const userRouter = Router();

userRouter.get("/", requireAuth, getUsers);

userRouter.get("/friends", requireAuth, getFriends);

userRouter.get("/groups", requireAuth, getGroups);


userRouter.get("/:username", requireAuth, getUser);

userRouter.post(
  "/signup",
  body("username").isAlphanumeric().isLength({ min: 5 }),
  body("password"),
  signupUser
);

userRouter.post(
  "/login", loginUser
);


userRouter.delete("/remove/:friend", requireAuth, removeFriend);

userRouter.delete("/", requireAuth, deleteUser);

userRouter.patch("/lang", requireAuth, updateLangandGroup);

userRouter.patch("/:friend", requireAuth, addFriend);

export default userRouter;
