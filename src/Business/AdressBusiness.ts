import adressDataBase, { AdressDataBase } from "../Data/AdressDataBase";
import userDataBase from "../Data/UserDataBase";
import { CustonError } from "../Model/CustonError/CustonError";
import { AdressDB, AdressDTO, checkAdressDB, UserDB } from "../Model/types";
import authentication,{ Authentication} from "../Services/Authentication";
import idGenerator,{ IdGenerator } from "../Services/IDGenerator";
import inputsValidation,{ InputsValidation } from "./InputsValidation/InputsValidation";



export class AdressBusiness {
    constructor(
        private inputsValidation: InputsValidation,
        private idGenerator: IdGenerator,
        private authentication: Authentication,
        private adressData: AdressDataBase,
        private profile : (id: string) => Promise<UserDB[]>
    ){}

    Adress = async (inputs:AdressDTO) => {
        const {CEP, street, number, neighbourhood, city, state, complement, token} = inputs
        try {
            this.inputsValidation.Address(inputs)

            const userId = this.authentication.getTokenData(token as string)

            const [user] = await this.profile(userId)
            if(!user) {
                throw new CustonError(422,'Usuário não encontrado')
            }

            const [userAdress] =  await this.adressData.getAndress(userId)
            const id = this.idGenerator.ID()
            const adress:AdressDB = {id, userId ,CEP, street, number, neighbourhood, city, state, complement}
            
            !userAdress && this.adressData.insert(adress)
            userAdress && this.adressData.change(adress)

            delete user.hashPassword
            const {hasAddress, address} = await this.checkAdress(user.id)
            user.hasAddress = hasAddress
            user.address = address

            const newToken =  this.authentication.generateToken({id:userId})
            
            return { user, token: newToken}
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    fullAndress = async (token:string) => {
        try {
            this.inputsValidation.Token(token)
            const userId = this.authentication.getTokenData(token as string)

            const  [hasAddress]  = await this.adressData.getAndress(userId)
            if(!hasAddress) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            delete hasAddress.CEP, 
            delete hasAddress.id, 
            delete hasAddress.userId

            return  { address : hasAddress }
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.message)
        }
    }

    checkAdress = async (userId:string):Promise<checkAdressDB> => {
        const [result] =  await this.adressData.getAndress(userId)
        const address = `${result?.street},${result?.number},${result?.neighbourhood},${result?.complement}`
        if(result) { return { hasAddress: true, address}}
        else { return { hasAddress: false, address : undefined}}
    }

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
    adressDataBase,
    userDataBase.Profile
)
