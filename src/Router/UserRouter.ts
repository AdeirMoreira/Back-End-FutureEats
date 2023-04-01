import { Router } from "express";
import UserController from "../Controller/UserController";

export const UserRouter = Router()

UserRouter.post('/signup', UserController.Signup)
UserRouter.post('/login', UserController.Login)
UserRouter.get('/profile', UserController.Profile)
UserRouter.put('/update', UserController.Update)

