import restaurantDataBase,{ RestaurantDataBase } from "../Data/RestaurantDataBase"
import { CustonError } from "../Model/CustonError/CustonError"
import { checkAdressDB, DetailDTO, ProductDB, TokenDTO } from "../Model/types"
import authentication,{ Authentication } from "../Services/Authentication"
import inputsValidation,{ InputsValidation } from "./InputsValidation/InputsValidation"
import adressBusiness from "./AdressBusiness"


export class RestaturantBusiness {
    constructor(
        private inputsValidation : InputsValidation,
        private authentication : Authentication,
        private restaurantData : RestaurantDataBase,
        private adressConsult : (token: string) => Promise<checkAdressDB>
    ){}

    Restaturants = async (Token:TokenDTO) => {
        try {
            this.inputsValidation.Token(Token.token)
            this.authentication.getTokenData(Token.token as string)

            const hasAddress = await this.adressConsult(Token.token)
            if(hasAddress.hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            const restaurants = await this.restaurantData.Restaurants()

            return { restaurants }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode,error.message)
        }
    }

    Detail = async (inputs:DetailDTO) => {
        try {
            this.inputsValidation.Token(inputs.token)
            this.authentication.getTokenData(inputs.token as string)

            const hasAddress = await this.adressConsult(inputs.token)
            if(hasAddress.hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            const [restaurant] = await this.restaurantData.RestaurantsById(inputs.id)
            const products = await this.restaurantData.Products(inputs.id)

            restaurant.products = products
            
            return { restaurant }
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
    restaurantDataBase,
    adressBusiness.checkAdress
)