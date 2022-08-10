import { app } from "./app";
import { AdressRouter } from "./Router/AdressRouter";
import { OrderRouter } from "./Router/OrderRouter";
import { RestaurantsRouter } from "./Router/RestaurantsRouter";
import { UserRouter } from "./Router/UserRouter";

app.use('/user', UserRouter)
app.use('/adress', AdressRouter)
app.use('/restaurant', RestaurantsRouter)
app.use('/order', OrderRouter)