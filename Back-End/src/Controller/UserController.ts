import { Request, Response } from "express"
import userBusiness, { UserBusiness } from "../Business/UserBusiness"
import { LoginInputDTO, SignupInputDTO, UpdateInputDTO } from "../Model/types"


export class UserController {
    constructor( private userBusiness: UserBusiness ){}

    Signup = async (req:Request,res:Response):Promise<void> => {
        const  {name, email, cpf, password} = req.body
        try {
            const inputs:SignupInputDTO = {name, email, cpf, password}

            const response = await this.userBusiness.Signup(inputs)

            res.statusMessage = 'Cadastro realizado com sucesso!'
            res.status(201).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    Login = async (req:Request,res:Response):Promise<void> => {
        const {email,password} = req.body
        try {
            const input:LoginInputDTO = {email, password}

            const response = await this.userBusiness.Login(input)

            res.statusMessage = 'Login realizado com sucesso!'
            res.status(200).send(response)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    Profile = async (req:Request,res:Response):Promise<void> => {
        const token = req.headers.authorization as string
        try {
            const profile = await this.userBusiness.Profile(token)

            res.status(200).send(profile)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }

    Update = async (req:Request,res:Response):Promise<void> => {
        const token = req.headers.authorization as string
        const  {name, email, cpf} = req.body
        try {
            const inputs:UpdateInputDTO = {name, email, cpf, token}

            const result = await this.userBusiness.Update(inputs)
            res.statusMessage = 'Ateracao realizada com sucesso!'
            res.status(200).send(result)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({message:error.message})
        }
    }
}

export default new UserController(userBusiness)