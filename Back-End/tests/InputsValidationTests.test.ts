import InputsValidation from '../src/Business/InputsValidation/InputsValidation'

const inputs: any = {
    id: 'id',
    restaurantId: 'restaurandId',
    name: "gatoNegro",
	email: "gatolNegro@email.com",
	cpf: "801.560.870-81",
	password: "abc123",
    token: 'token',
    street: "R. Afonso Braz",
    number: "200",
    neighbourhood: "Vila N. Conceição",
    city: "São Paulo",
    state: "SP",
    complement: "71",
    productsDTO: {
        "products": [{
            "id": "GpPdX7xtveRWYPkbE1tD",
            "quantity": 3
        }],
        "paymentMethod": "money"
    },
}

const addressInputs:any = {
    "street": "R. Afonso Braz",
    "number": "200",
    "neighbourhood": "Vila N. Conceição",
    "city": "São Paulo",
    "state": "SP",
    "complement": "71",
    "token":"token"
}

const productsBackUp = {
    "products": [{
        "id": "GpPdX7xtveRWYPkbE1tD",
        "quantity": 3
    }],
    "paymentMethod": "money"
}

describe('Test Class inputsValidation', () => {
    describe('test SignUp method', () => {
        test('missing name' , () => {
            try {
                inputs.name = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.name = 'gatoNegro'
                expect(error.message).toEqual('Nome inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing email' , () => {
            try {
                inputs.email = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.email = 'gatolNegro@email.com'
                expect(error.message).toEqual('Email inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing missing cpf' , () => {
            try {
                inputs.cpf = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.cpf = '801.560.870-81'
                expect(error.message).toEqual('CPF inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing password' , () => {
            try {
                inputs.password = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.password = 'abc123'
                expect(error.message).toEqual('Senha inválida')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
                const signup = jest.spyOn(InputsValidation,'SignUp')
                InputsValidation.SignUp(inputs)
                expect(signup).toHaveBeenCalledWith(inputs)
                expect(signup).toHaveReturned()
        })
    })
    describe('test Login method', () => {
        test('missing email' , () => {
            try {
                inputs.email = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.email = 'gatolNegro@email.com'
                expect(error.message).toEqual('Email inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing password' , () => {
            try {
                inputs.password = ''
                InputsValidation.SignUp(inputs)
            } catch (error:any) {
                inputs.password = 'abc123'
                expect(error.message).toEqual('Senha inválida')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation,'SignUp')
            InputsValidation.SignUp(inputs)
            expect(signup).toHaveBeenCalledWith(inputs)
            expect(signup).toHaveReturned()
        })
    })
    describe('test Profile method', () => {
        test('missing token' , () => {
            try {
                inputs.token = ''
                InputsValidation.Profile(inputs.token)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation,'Profile')
            InputsValidation.Profile(inputs.token)
            expect(signup).toHaveBeenCalledWith(inputs.token)
            expect(signup).toHaveReturned()
        })
    })
    describe('test Upate method', () => {
        test('missing token', () => {
            try {
                inputs.token = ''
                InputsValidation.Update(inputs)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing name' , () => {
            try {
                inputs.name = ''
                InputsValidation.Update(inputs)
            } catch (error:any) {
                inputs.name = 'gatoNegro'
                expect(error.message).toEqual('Nome inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing email' , () => {
            try {
                inputs.email = ''
                InputsValidation.Update(inputs)
            } catch (error:any) {
                inputs.email = 'gatolNegro@email.com'
                expect(error.message).toEqual('Email inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing missing cpf' , () => {
            try {
                inputs.cpf = ''
                InputsValidation.Update(inputs)
            } catch (error:any) {
                inputs.cpf = '801.560.870-81'
                expect(error.message).toEqual('CPF inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation,'Update')
            InputsValidation.Update(inputs)
            expect(signup).toHaveBeenCalledWith(inputs)
            expect(signup).toHaveReturned()
        })
    })
    describe('test Address method', () => {
        test('missing token', () => {
            try {
                inputs.token = ''
                InputsValidation.Address(inputs)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing street' , () => {
            try {
                inputs.name = ''
                InputsValidation.Address(inputs)
            } catch (error:any) {
                inputs.name = 'gatoNegro'
                inputs.token = 'token'
                expect(error.message).toEqual('Endereço inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing number' , () => {
            try {
                inputs.number = ''
                InputsValidation.Address(inputs)
            } catch (error:any) {
                inputs.number = '200'
                inputs.token = 'token'
                expect(error.message).toEqual('Endereço inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing neighbourhood' , () => {
            try {
                inputs.neighbourhood = undefined
                InputsValidation.Address(inputs)
            } catch (error:any) {
                inputs.neighbourhood = 'Vila N. Conceição'
                inputs.token = 'token'
                expect(error.message).toEqual('Endereço inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation, 'Address')
            InputsValidation.Address(addressInputs)
            expect(signup).toHaveBeenCalledWith(addressInputs)
            expect(signup).toHaveReturned()
        })
    })
    describe('test Token method', () => {
        test('missing token', () => {
            try { 
                inputs.token = ''
                InputsValidation.Token(inputs.token)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation, 'Token')
            InputsValidation.Token(inputs.token)
            expect(signup).toHaveBeenCalledWith(inputs.token)
            expect(signup).toHaveReturned()
        })
    })
    describe('tests Detail method', () => {
        test('missing id', () => {
            try {
                inputs.id = ''
                InputsValidation.Detail(inputs)
            } catch (error:any) {
                inputs.id = 'token'
                expect(error.message).toEqual('Id inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing token', () => {
            try {
                inputs.token = ''
                InputsValidation.Detail(inputs)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation, 'Detail')
            InputsValidation.Detail(inputs)
            expect(signup).toHaveBeenCalledWith(inputs)
            expect(signup).toHaveReturned()
        })
    })
    describe('tests Place method', () => {
        test('missing restaurantId', () => {
            try {
                inputs.restaurantId = ''
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.restaurantId = 'restaurantId'
                expect(error.message).toEqual('restaurantId inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing token', () => {
            try {
                inputs.token = ''
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.token = 'token'
                expect(error.message).toEqual('Token inválido')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('products not array', () => {
            try {
                inputs.productsDTO = undefined
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.productsDTO = productsBackUp
                expect(error.message).toEqual('Products deve ser um array1')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing product quantity', () => {
            try {
                inputs.productsDTO.products[0].quantity = undefined
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.productsDTO.products[0].quantity = 3
                expect(error.message).toEqual('Quantidade de produto inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing product id', () => {
            try {
                inputs.productsDTO.products[0].id = undefined
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.productsDTO.products[0].id = 'GpPdX7xtveRWYPkbE1tD'
                expect(error.message).toEqual('Id de produto inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('missing payment Method', () => {
            try {
                inputs.productsDTO.paymentMethod = 'PayPal'
                InputsValidation.Place(inputs)
            } catch (error:any) {
                inputs.productsDTO.paymentMethod = 'money' 
                expect(error.message).toEqual("Payment Method deve ser 'money' ou 'creditcard'")
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('corret input' , () => {
            const signup = jest.spyOn(InputsValidation, 'Place')
            InputsValidation.Place(inputs)
            expect(signup).toHaveBeenCalledWith(inputs)
            expect(signup).toHaveReturned()
        })
    })
})