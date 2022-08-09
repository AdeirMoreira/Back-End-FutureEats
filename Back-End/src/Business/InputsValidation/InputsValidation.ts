import { CustonError } from "../../Model/CustonError/CustonError"
import { AdressDTO, DetailDTO, LoginInputDTO, SignupInputDTO, UpdateInputDTO } from "../../Model/types"


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
        this.token(inputs.token)
        this.name(inputs.name)
        this.email(inputs.email)
        this.cpf(inputs.cpf)
        
    }

    Adress = (inputs:AdressDTO):void => {
        this.token(inputs.token)
        this.AdressData(inputs)
    }

    FullAdress = (token:string):void => {
        this.token(token)
    }

    Restaurants = (token:string):void => {
        this.token(token)
    }

    Detail = (inputs:DetailDTO):void => {
        this.id(inputs.id)
        this.token(inputs.token)
    }
    
    private token = (token:string | undefined):void => {
        if(!token){
            throw new CustonError(401,'Token inválido')
        }
    }

    private id = (id:string):void => {
        if(!id || typeof(id) !== 'string') {
            throw new CustonError(422,'Id inválido')
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

    private AdressData = (inputs:AdressDTO):void => {
        delete inputs.token
        Object.values(inputs).forEach(value => {
                if(!value || typeof(value) !== 'string') {
                    throw new CustonError(422,'Endereço inválido')
                }
            }
        )
    }
}

export default new InputsValidation()