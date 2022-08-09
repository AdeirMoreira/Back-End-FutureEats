import { app } from "./app";
import { AdressRouter } from "./Router/AdressRouter";
import { RestaurantsRouter } from "./Router/RestaurantsRouter";
import { UserRouter } from "./Router/UserRouter";

app.use('/user', UserRouter)
app.use('/adress', AdressRouter)
app.use('/restaurant', RestaurantsRouter)