import { Request, Response } from "express"
import orderBusiness, { OrderBusiness } from "../Business/OrderBusiness"
import { PlaceDTO } from "../Model/types"

export class OrderController {
    constructor (private orderBusiness : OrderBusiness) {}

    Place = async (req:Request, res:Response) => {
        const restaurantId = req.params.restaurantId
        const token = req.headers.authorization as string
        const productsDTO = req.body
        try {
            const inputs:PlaceDTO = { restaurantId, token, productsDTO }

            const result = await this.orderBusiness.Place(inputs)

            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

    Active = async (req:Request, res:Response) => {
        const token = req.headers.authorization as string
        try {
            const result = await this.orderBusiness.Active(token)

            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }

    History = async (req:Request, res:Response) => {
        const token = req.headers.authorization as string
        try {
            const result = await this.orderBusiness.History(token)

            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({ message: error.message })
        }
    }
}

export default new OrderController( 
    orderBusiness

)