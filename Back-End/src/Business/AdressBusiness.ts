import adressDataBase, { AdressDataBase } from "../Data/AdressDataBase";
import { CustonError } from "../Model/CustonError/CustonError";
import { AdressDB, AdressDTO } from "../Model/types";
import authentication,{ Authentication} from "../Services/Authentication";
import idGenerator,{ IdGenerator } from "../Services/IDGenerator";
import inputsValidation,{ InputsValidation } from "./InputsValidation/InputsValidation";


export class AdressBusiness {
    constructor(
        private inputsValidation: InputsValidation,
        private idGenerator: IdGenerator,
        private authentication: Authentication,
        private adressData : AdressDataBase
    ){}

    Adress = async (inputs:AdressDTO) => {
        const {CEP, street, number, neighbourhood, city, state, complement, token} = inputs
        try {
            this.inputsValidation.Adress(inputs)

            const userId = this.authentication.getTokenData(token as string)
            const [userAdress] =  await this.adressData.getAndress(userId)
            
            const id = this.idGenerator.ID()
            const adress:AdressDB = {id, userId ,CEP, street, number, neighbourhood, city, state, complement}

            !userAdress && this.insertAdress(adress)
            userAdress && this.changeAdress(adress)

            return this.authentication.generateToken({id:userId})
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    fullAndress = (token:string) => {
        try {
            this.inputsValidation.FullAdress(token)

            const userId = this.authentication.getTokenData(token as string)
            return this.adressData.getAndress(userId)
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.message)
        }
    }

    private  insertAdress = (adress:AdressDB) => this.adressData.insert(adress)

    private  changeAdress = (adress:AdressDB) => this.adressData.change(adress)

    private tokenError = (errorMessage:string):void => {
        if(errorMessage.includes('jwt expired')) {
            throw new CustonError(401, 'Token expirado')
        }
        if(errorMessage.includes('jwt malformed')) {
            throw new CustonError(401, 'Token inválido')
        }
    }
}

export default new AdressBusiness(
    inputsValidation,
    idGenerator,
    authentication,
    adressDataBase
)
