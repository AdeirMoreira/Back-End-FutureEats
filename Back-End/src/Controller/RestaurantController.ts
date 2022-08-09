import { Request, Response } from "express"
import restaturantBusiness ,{ RestaturantBusiness } from "../Business/RestaturantsBusiness"
import { DetailDTO, TokenDTO } from "../Model/types"

export class RestaturantController {
    constructor( private restaurantBusiness : RestaturantBusiness ){}

    Restaturants = async (req:Request,res:Response) => {
        const token = req.headers.authorization as string
        try {
            const Token:TokenDTO = {token} 

            const response = await this.restaurantBusiness.Restaturants(Token)

            res.status(200).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
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
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    product = async (req:Request,res:Response) => {
        await this.restaurantBusiness.produto(req.body)
        res.status(201).send()
    }
}

export default new RestaturantController( restaturantBusiness )