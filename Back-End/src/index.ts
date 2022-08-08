import { app } from "./app";
import { AdressRouter } from "./Router/AdressRouter";
import { UserRouter } from "./Router/UserRouter";

app.use('/user', UserRouter)
app.use('/adress', AdressRouter)