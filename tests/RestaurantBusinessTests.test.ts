import { InputsValidation } from "../src/Business/InputsValidation/InputsValidation"
import { RestaturantBusiness } from "../src/Business/RestaturantsBusiness"
import addressConsultMock from "./Mock/adressConsultMock"
import authenticationMock from "./Mock/servicesMock/authenticationMock"
import { produtc } from "./Mock/InputsDataMock/productDataMock"
import { restaurant } from "./Mock/InputsDataMock/restaurantDataMock"
import inputsValidationMock from "./Mock/inputsValidationMock"
import restaurantDataBaseMock from "./Mock/restaurantDataBaseMock"


const RestaurantBusinessMock = new RestaturantBusiness(
    inputsValidationMock as unknown as InputsValidation,
    authenticationMock,
    restaurantDataBaseMock,
    addressConsultMock
)

describe('Test Class RestaurantBusiness', () => {
    describe('test Restaurants method', () => {
        test('test user not have address', async () => {
            try {
                await RestaurantBusinessMock.Restaturants('idd')
            } catch (error:any) {
                expect(error.message).toBe('Usuário não possui endereço cadastrado')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('test get all restaurants', async () => {
            const signup = jest.spyOn(RestaurantBusinessMock,'Restaturants')
            const result = await RestaurantBusinessMock.Restaturants('id')
            expect(result).toEqual({restaurants:[restaurant]})
            expect(signup).toBeCalledWith('id')
        })
    })
    describe('test Detail method', () => {
        test('test user not have address', async () => {
            try {
                await RestaurantBusinessMock.Detail({id:'id',token:'idd'})
            } catch (error:any) {
                expect(error.message).toBe('Usuário não possui endereço cadastrado')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('test invalid restaurant', async () => {
            try {
                await RestaurantBusinessMock.Detail({id:'1',token:'id'})
            } catch (error:any) {
                expect(error.message).toBe('Restaurante não encontrado')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
            }
        })
        test('test products l', async () => {
            const signup = jest.spyOn(RestaurantBusinessMock,'Detail')
            const result = await RestaurantBusinessMock.Detail({id:'0',token:'id'})
            restaurant.product = produtc
            expect(result).toEqual({restaurant})
            expect(signup).toBeCalledWith({id:'0',token:'id'})
            expect.assertions(2)
        })
    })
})