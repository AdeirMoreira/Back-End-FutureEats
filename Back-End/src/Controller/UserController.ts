import { Request, Response } from "express"
import UserBusiness from "../Business/UserBusiness"
import { LoginInputDTO, SignupInputDTO, UpdateInputDTO } from "../Model/types"


export class UserController {
    Signup = async (req:Request,res:Response) => {
        const  {name, email, cpf, password} = req.body
        try {
            const inputs:SignupInputDTO = {name, email, cpf, password}

            const token = await UserBusiness.Signup(inputs)

            res.statusMessage = 'Cadastro realizado com sucesso!'
            res.status(201).send({token})
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    Login = async (req:Request,res:Response) => {
        const {email,password} = req.body
        try {
            const input:LoginInputDTO = {email, password}

            const token = await UserBusiness.Login(input)

            res.statusMessage = 'Login realizado com sucesso!'
            res.status(200).send({token})
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    Profile = async (req:Request,res:Response) => {
        const token = req.headers.authorization as string
        try {
            const profile = await UserBusiness.Profile(token)

            res.status(200).send(profile)
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }

    Update = async (req:Request,res:Response) => {
        const token = req.headers.authorization as string
        const  {name, email, cpf} = req.body
        try {
            const inputs:UpdateInputDTO = {name, email, cpf, token}

            await UserBusiness.Update(inputs)
            res.statusMessage = 'Ateracao realizada com sucesso!'
            res.status(200).send()
        } catch (error:any) {
            res.status(error.statusCode || 400).send({error:error.message})
        }
    }
}

export default new UserController()