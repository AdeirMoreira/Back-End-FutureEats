import { Request, Response } from "express"
import restaturantBusiness , { RestaturantBusiness } from "../Business/RestaturantsBusiness"
import { DetailDTO } from "../Model/types"

export class RestaturantController {
    constructor( private restaurantBusiness : RestaturantBusiness ){}

    Restaturants = async (req:Request,res:Response) => {
        const token = req.headers.authorization as string
        try {
            const response = await this.restaurantBusiness.Restaturants(token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }

    Detail = async (req:Request,res:Response) => {
        const token = req.headers.authorization as string
        const id = req.params.id as string
        try {
            const inputs:DetailDTO = { token, id }

            const response = await this.restaurantBusiness.Detail(inputs)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }

    product = async (req:Request,res:Response) => {
        await this.restaurantBusiness.produto(req.body)
        res.status(201).send()
    }
}

export default new RestaturantController( restaturantBusiness )