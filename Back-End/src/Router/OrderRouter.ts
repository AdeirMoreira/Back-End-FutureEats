import { Router } from "express";
import orderController from "../Controller/OrderController";

export const OrderRouter = Router()

OrderRouter.post('/place/:restaurantId', orderController.Place)
OrderRouter.get('/active', orderController.Active)
OrderRouter.get('/history', orderController.History)