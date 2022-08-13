import { Request, Response } from "express"
import adressBusiness, { AdressBusiness } from "../Business/AdressBusiness"
import { AdressDTO } from "../Model/types"

export class AdressController {
    constructor(private adressBusiness: AdressBusiness){}

    andress = async (req:Request,res:Response):Promise<void> => {
        const token = req.headers.authorization as string
        const {CEP,street,number,neighbourhood,city,state,complement} = req.body
        try {
            const inputs:AdressDTO = {CEP,street,number,neighbourhood,city,state,complement,token}

            //essa linha será removida quando a feature CEP for inplantada no front-end
            inputs.CEP = '00000-000'
            //essa linha será removida quando a feature CEP for inplantada no front-end

            const response = await this.adressBusiness.Adress(inputs)
            res.status(200).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }

    fullAdress = async (req:Request,res:Response):Promise<void> => {
        const token = req.headers.authorization as string
        try {
            const adress = await this.adressBusiness.fullAndress(token)

            res.status(200).send(adress)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }

    produto = () => {
        
    }
}

export default new AdressController(adressBusiness)