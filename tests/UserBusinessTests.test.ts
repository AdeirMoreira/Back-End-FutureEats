import { InputsValidation } from "../src/Business/InputsValidation/InputsValidation";
import { UserBusiness } from "../src/Business/UserBusiness";
import { UserDataBase } from "../src/Data/UserDataBase";
import { Authentication } from "../src/Services/Authentication";
import addressConsultMock from "./Mock/adressConsultMock";
import authenticationMock from "./Mock/servicesMock/authenticationMock";
import hashManagerMock from "./Mock/servicesMock/hashManagerMock";
import idGeneratorMock from "./Mock/servicesMock/idGeneratorMock";
import inputsValidationMock from "./Mock/inputsValidationMock";
import userDataBaseMock from "./Mock/userDataBaseMock";

const UserBusinessMock = new UserBusiness(
    inputsValidationMock as unknown as InputsValidation,
    idGeneratorMock,
    hashManagerMock,
    authenticationMock as unknown as Authentication,
    userDataBaseMock as unknown as UserDataBase,
    addressConsultMock
)

const newUser:any = {
    id: 'id',
    name: "test",
    email: "test@emailk",
    password: "password123",
    cpf: "000.000.000-00", 
    hasAddress: true,
    address: "Rua,0,bairro,casa"
}

describe('test UserBusiness methodd' , () => {
    describe('test SignUp method' , () => {
        test('test sucesso signup', async () => {
            const singup = jest.spyOn(UserBusinessMock, 'Signup')
            const result =  await UserBusinessMock.Signup(newUser)
            newUser.password = undefined,
            newUser.hasAddress = false,
            newUser.address = undefined
            expect(result).toEqual({user:newUser, token: 'token'})
            expect(singup).toBeCalledWith(newUser)
            expect.assertions(2)
            newUser.password = "password123",
            newUser.hasAddress = true,
            newUser.address = "Rua,0,bairro,casa"
        })
    })
    describe('test Login method', () => {
        test('test wrong password', async () => {
            const inputs = {
                email: 'test@emailk',
                password: 'password'
            }
            try {
                await UserBusinessMock.Login(inputs)
            } catch (error:any) {
                expect(error.message).toEqual('Email ou senha incorretos!')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('test corret data', async () => {
            const inputs = {
                email: 'test@emailk',
                password: 'password123'
            }
            const signup = jest.spyOn(UserBusinessMock,'Login')
            const result = await UserBusinessMock.Login(inputs)
            newUser.password = undefined
            expect(result).toEqual({ user: newUser, token: 'token' })
            expect(signup).toBeCalledWith(inputs)
            newUser.password = "password123"
        })
    })
    describe('test Profile method', () => {
        test('test miss profile', async () => {
            try {
                await UserBusinessMock.Profile('idd')
            } catch (error:any) {
                expect(error.message).toEqual('Usuário não encontrado')
                expect(error.statusCode).toStrictEqual(409)
            } finally {
                expect.assertions(2)
            }
        })
        test('test corret data', async () => {
            const signup = jest.spyOn(UserBusinessMock,'Profile')
            const result = await UserBusinessMock.Profile('id')
            newUser.password = undefined
            expect(result).toEqual({ user: newUser})
            expect(signup).toBeCalledWith('id')
            newUser.password = "password123"
        })
    })
    describe('test Update method', () => {
        test('test user no have address', async () => {
            const inputs = {
                token: 'idd',
                name: "test",
                email: 'test@emailk',
                cpf: "000.000.000-00"
            }
            try {
                await UserBusinessMock.Update(inputs)
            } catch (error:any) {
                expect(error.message).toEqual('Usuário não possui endereço cadastrado')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('test corret data', async () => {
            const inputs = {
                token: 'id',
                name: "test",
                email: 'test@emailk',
                cpf: "000.000.000-00"
            }
            
                const signup = jest.spyOn(UserBusinessMock,'Update')
                const result = await UserBusinessMock.Update(inputs)
                newUser.password = undefined
                expect(result).toEqual({ user: newUser})
                expect(signup).toBeCalledWith(inputs)
                newUser.password = "password123"
                expect.assertions(2)
        })
    })
})