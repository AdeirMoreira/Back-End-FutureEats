import { CustonError } from "../../Model/CustonError/CustonError"
import { AdressDTO, DetailDTO, LoginInputDTO, PlaceDTO, ProductDTO, SignupInputDTO, UpdateInputDTO } from "../../Model/types"


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

    Address = (inputs:AdressDTO):void => {
        this.token(inputs.token)
        this.adressData(inputs)
    }

    Token = (token:string):void => {
        this.token(token)
    }

    Detail = (inputs:DetailDTO):void => {
        this.id(inputs.id)
        this.token(inputs.token)
    }

    Place = (inputs:PlaceDTO) => {
        this.token(inputs.token)
        this.restaurantId(inputs.restaurantId)
        this.productsData(inputs.productsDTO)
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

    private restaurantId = (id:string):void => {
        if(!id || typeof(id) !== 'string') {
            throw new CustonError(422,'restaurantId inválido')
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

    private adressData = (inputs:AdressDTO):void => {
        delete inputs.token
        Object.values(inputs).forEach(value => {
                if(!value || typeof(value) !== 'string') {
                    throw new CustonError(422,'Endereço inválido')
                }
            }
        )
    }

    private productsData = (productsData:ProductDTO):void => {
        if(!productsData) {
            throw new CustonError(422,'Products deve ser um array1')
        }
        if(!Array.isArray(productsData.products)){
            throw new CustonError(422,'Products deve ser um array2')
        }
        productsData.products.forEach(product => {
            if(typeof(product.id) !== 'string'){
                throw new CustonError(422,'Id de produto inválido')
            }
            if(typeof(product.quantity) !== 'number'){
                throw new CustonError(422,'Quantidade de produto inválido')
            }
        })
        if(productsData.paymentMethod !== 'money' &&  productsData.paymentMethod !== 'creditcard') {
            throw new CustonError(422,"Payment Method deve ser 'money' ou 'creditcard'")
        }
    }
}

export default new InputsValidation()