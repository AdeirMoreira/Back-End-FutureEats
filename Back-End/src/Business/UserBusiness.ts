import userDataBase, { UserDataBase } from "../Data/UserDataBase"
import { CustonError } from "../Model/CustonError/CustonError"
import { AdressDB, LoginInputDTO, SignupInputDTO, UpdateInputDTO, UpdateUserDB, UserDB, UserResponse } from "../Model/types"
import authentication, { Authentication } from "../Services/Authentication"
import hashManager, { HashManager } from "../Services/HashManager"
import idGenerator, { IdGenerator } from "../Services/IDGenerator"
import adressBusiness from "./AdressBusiness"
import inputsValidation, { InputsValidation } from "./InputsValidation/InputsValidation"


export class UserBusiness {
    constructor(
        private inputsValidation: InputsValidation,
        private idGenerator: IdGenerator,
        private hash: HashManager,
        private authentication: Authentication,
        private userData: UserDataBase,
        private adressConsult: (token: string) => Promise<AdressDB[]>
    ){}

    Signup = async (inputs:SignupInputDTO) => {
        const  {name, email, cpf, password} = inputs
        try {
            this.inputsValidation.SignUp(inputs)
            
            const id = this.idGenerator.ID()
            const hashPassword = this.hash.hash(password)
            const user:UserDB = {id, name, email, cpf, hashPassword} 

            await this.userData.Signup(user)

            const token = this.authentication.generateToken({id})
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                hasAddress: false
            }
            return { user:Response ,token }
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.message)
        }
    }

    Login = async (inputs:LoginInputDTO) => {
        const  {email, password} = inputs
        try {
            this.inputsValidation.Login(inputs)

            const [user] = await this.userData.Login(email)

            if(!user || user.email !== email || ( user && !this.hash.compare(password,user.hashPassword))){
                throw new CustonError(401,'Email ou senha incorretos!')
            }

            const token = this.authentication.generateToken({id: user.id})
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                hasAddress: await this.checkAdress(token)
            }
            return { user:Response, token}
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.message)
        }
    }

    Profile = async (token:string) => {
        try {
            this.inputsValidation.Profile(token)

            const id = this.authentication.getTokenData(token)
            const [user] = await this.userData.Profile(id)
            if(!user) {
                throw new CustonError(409, 'Usuário não encontrado')
            }

            return user
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    Update = async (inputs:UpdateInputDTO) => {
        const { name, email, cpf} = inputs
        try {
            this.inputsValidation.Update(inputs)

            const id = this.authentication.getTokenData(inputs.token)
            const user:UpdateUserDB = {id,name,email,cpf}

            await userDataBase.Update(user)
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    private checkAdress = async (token:string):Promise<boolean> => {
        const [result] = await this.adressConsult(token)
        if(result) { return true}
        else { return false}
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

export default new UserBusiness(
    inputsValidation,
    idGenerator,
    hashManager,
    authentication,
    userDataBase,
    adressBusiness.fullAndress
)