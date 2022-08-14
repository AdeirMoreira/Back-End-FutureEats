import {AdressBusiness} from "../src/Business/AdressBusiness";
import { InputsValidation } from "../src/Business/InputsValidation/InputsValidation";
import adressDataBaseMock  from "./Mock/andressDataBaseMock";
import { address } from "./Mock/InputsDataMock/addressDataMock";
import { user } from "./Mock/InputsDataMock/userDataMock";
import  inputsValidationMock  from "./Mock/inputsValidationMock";
import Profile from "./Mock/profileMock";
import authenticationMock from "./Mock/servicesMock/authenticationMock";
import idGeneratorMock from "./Mock/servicesMock/idGeneratorMock";


const AdressBusinessMock = new AdressBusiness(
    inputsValidationMock as unknown as InputsValidation,
    idGeneratorMock,
    authenticationMock,
    adressDataBaseMock,
    Profile
)

describe('test class AddressBusiness' , () => {
    describe('test Address method', () => {
        test('test missing user', async () => {
            try {
                address.token = 'idd'
                await AdressBusinessMock.Adress(address)
            } catch (error:any) {
                expect(error.message).toBe('Usuário não encontrado')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('add or eddit address', async () => {
            address.token = 'id'
            const addressSpy = jest.spyOn(AdressBusinessMock,'Adress')
            const result = await AdressBusinessMock.Adress(address)
            expect(result).toEqual({user,token:'token'})
            expect(addressSpy).toBeCalledWith(address)
        })
    })
    describe('test fullAddress method', () => {
        test('test user not have address', async () => {
            try {
                await AdressBusinessMock.fullAndress('idd')
            } catch (error:any) {
                expect(error.message).toBe('Usuário não possui endereço cadastrado')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('sucess get full address', async () => {
            const addressSpy = jest.spyOn(AdressBusinessMock,'fullAndress')
            const result = await AdressBusinessMock.fullAndress('id')
            address.userId = 'id'
            expect(result).toEqual({address})
            expect(addressSpy).toBeCalledWith('id')
            
        })
    })
    describe('test checkAddress method', () => {
        test('test user have address' , async () => {
            
            const addressSpy = jest.spyOn(AdressBusinessMock,'checkAdress')
            const result = await AdressBusinessMock.checkAdress('id')
            expect(result).toEqual({"address": "street,0,neighbourdhood,casa", "hasAddress": true})
            expect(addressSpy).toBeCalledWith('id')
        })
        test('test user not have address' , async () => {
            const addressSpy = jest.spyOn(AdressBusinessMock,'checkAdress')
            const result = await AdressBusinessMock.checkAdress('idd')
            expect(result).toEqual({"address": undefined, "hasAddress": false})
            expect(addressSpy).toBeCalledWith('idd')
        })
    })
})