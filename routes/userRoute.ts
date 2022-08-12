import { Router } from "express";
import { getUser, getUsers, createUser, deleteUser, updateUser  } from "../controllers/userController";

const userRouter = Router()


userRouter.get('/', getUsers)

userRouter.get('/:id', getUser)

userRouter.post('/', createUser)

userRouter.delete('/:id', deleteUser)

userRouter.patch('/:id', updateUser)

export default userRouter;