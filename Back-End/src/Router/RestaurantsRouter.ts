import { Router } from "express";
import restaurantController from "../Controller/RestaurantController";

export const RestaurantsRouter = Router()

RestaurantsRouter.get('/all', restaurantController.Restaturants)
RestaurantsRouter.get('/detail/:id', restaurantController.Detail)
RestaurantsRouter.get('/product', restaurantController.product)
