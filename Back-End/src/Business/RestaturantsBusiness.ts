import restaurantDataBase,{ RestaurantDataBase } from "../Data/RestaurantDataBase"
import { CustonError } from "../Model/CustonError/CustonError"
import { DetailDTO, ProductDB, TokenDTO } from "../Model/types"
import authentication,{ Authentication } from "../Services/Authentication"
import inputsValidation,{ InputsValidation } from "./InputsValidation/InputsValidation"


export class RestaturantBusiness {
    constructor(
        private inputsValidation : InputsValidation,
        private authentication : Authentication,
        private restaurantData : RestaurantDataBase
        
    ){}

    Restaturants = async (Token:TokenDTO) => {
        try {
            this.inputsValidation.Restaurants(Token.token)
            this.authentication.getTokenData(Token.token as string)

            const restaurants = await this.restaurantData.Restaurants()

            return { restaurants }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode,error.message)
        }
    }

    Detail = async (inputs:DetailDTO) => {
        try {
            this.inputsValidation.Restaurants(inputs.token)
            this.authentication.getTokenData(inputs.token as string)
            
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode,error.message)
        }
    }

    private tokenError = (errorMessage:string):void => {
        if(errorMessage.includes('jwt expired')) {
            throw new CustonError(401, 'Token expirado')
        }
        if(errorMessage.includes('jwt malformed')) {
            throw new CustonError(401, 'Token inválido')
        }
    }

    produto = async (product:ProductDB) => {
        await this.restaurantData.produto(product)
    }
}

export default new RestaturantBusiness(
    inputsValidation,
    authentication,
    restaurantDataBase
)