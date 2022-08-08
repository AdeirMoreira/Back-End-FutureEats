import { Router } from "express";
import AdressController from "../Controller/AdressController";

export const AdressRouter = Router()

AdressRouter.put('', AdressController.andress)
AdressRouter.get('/full', AdressController.fullAdress)