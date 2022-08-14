import userDataBase, { UserDataBase } from "../Data/UserDataBase"
import { CustonError } from "../Model/CustonError/CustonError"
import { checkAdressDB, LoginInputDTO, SignupInputDTO, UpdateInputDTO, UpdateUserDB, UserDB, UserResponse } from "../Model/types"
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
        private adressConsult: (token: string) => Promise<checkAdressDB>
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
            const formatedCPF = this.formatCPF(user.cpf)
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: formatedCPF,
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
            if(!user || user.email !== email || ( user && !this.hash.compare(password,user.hashPassword as string))){
                throw new CustonError(401,'Email ou senha incorretos!')
            }

            const token = this.authentication.generateToken({id: user.id})
            const {hasAddress, address} = await this.adressConsult(user.id)
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                hasAddress,
                address
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
            if(user === undefined) {
                throw new CustonError(409, 'Usuário não encontrado')
            }
            const {hasAddress, address} = await this.adressConsult(user.id)
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: user.cpf,
                hasAddress,
                address
            }
            return { user:Response }
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
            const user:UpdateUserDB = {id,name, email,cpf}
            const formatedCPF = this.formatCPF(user.cpf)
            const {hasAddress, address} = await this.adressConsult(id)
            
            if(hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            await this.userData.Update(user)
            const Response:UserResponse = {
                id: user.id,
                name: user.name,
                email: user.email,
                cpf: formatedCPF,
                hasAddress,
                address
            }
            return { user:Response }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    private formatCPF = (CPF:any):string => {
        const array = CPF.split('')
        const array2 = array.map((e:any) => +e)
        const array3 = array2.filter((e:any) => !isNaN(e))
        array3.splice(3, 0, '.')
        array3.splice(7, 0, '.')
        array3.splice(11, 0, '-')
        return array3.join('')
    }

    private tokenError = (errorMessage:string):void => {
        // if(errorMessage.includes('jwt expired')) {
        //     throw new CustonError(401, 'Token expirado')
        // }
        // if(errorMessage.includes('jwt malformed') || errorMessage.includes('signature')) {
        //     throw new CustonError(401, 'Token inválido')
        // }
    }
}

export default new UserBusiness(
    inputsValidation,
    idGenerator,
    hashManager,
    authentication,
    userDataBase,
    adressBusiness.checkAdress
)