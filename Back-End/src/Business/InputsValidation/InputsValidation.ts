import { CustonError } from "../../Model/CustonError/CustonError"
import { LoginInputDTO, SignupInputDTO, UpdateInputDTO } from "../../Model/types"


export class InputsValidation {
    SignUp = (inputs:SignupInputDTO):void => {
        this.name(inputs.name)
        this.email(inputs.email)
        this.cpf(inputs.cpf)
        this.password(inputs.password)
    }

    Login = (inputs:LoginInputDTO):void => {
        this.email(inputs.email)
        this.password(inputs.password)
    }

    Profile = (token:string | undefined):void => {
        this.token(token)
    }

    Update = (inputs:UpdateInputDTO):void => {
        this.name(inputs.name)
        this.email(inputs.email)
        this.cpf(inputs.cpf)
        this.token(inputs.token)
    }
    
    private token = (token:string | undefined):void => {
        if(!token){
            throw new CustonError(401,'Token inválido')
        }
    }
    
    private name = (name:string):void => {
        if(!name || typeof(name) !== 'string') {
            throw new CustonError(422,'Nome inválido')
        }
    }

    private cpf = (cpf:string):void => {
        if(!this.checkCPFFormat(cpf)) {
            throw new CustonError(422,'CPF inválido')
        }
    }

    private email = (email:string):void => {
        if(!this.checkEmailFormat(email)) {
            throw new CustonError(422,'Email inválido')
        }
    }

    private password = (password:string):void => {
        if(!this.checkPasswordFormat(password)) {
            throw new CustonError(422,'Senha inválida')
        }
    }

    private checkPasswordFormat = (password:string):boolean => {
        const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        return passwordValid.test(password)
    }

    private checkCPFFormat = (cpf:string):boolean => {
        const cpfValid = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
        return cpfValid.test(cpf)
    }

    private checkEmailFormat = (email:string):boolean => {
        const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; 
        return emailValid.test(email)
    }
}

export default new InputsValidation()