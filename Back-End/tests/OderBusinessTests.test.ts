import { OrderBusiness } from "../src/Business/OrderBusiness";
import addressConsultMock from "./Mock/adressConsultMock";
import inputsValidationMock from "./Mock/inputsValidationMock";
import orderDataBaseMock from "./Mock/orderDataBaseMock";
import productByID from "./Mock/productByIdMock";
import restaurantByID from "./Mock/restaurantByIdMock";
import authenticationMock from "./Mock/servicesMock/authenticationMock";
import idGeneratorMock from "./Mock/servicesMock/idGeneratorMock";
import { InputsValidation } from "../src/Business/InputsValidation/InputsValidation";
import { OrderDataBase } from "../src/Data/OrderDataBase";
import { currentOder, order } from "./Mock/InputsDataMock/orderDataMock";


const OrderBusinessMock = new OrderBusiness(
    inputsValidationMock as unknown as InputsValidation,
    authenticationMock,
    idGeneratorMock,
    orderDataBaseMock as OrderDataBase,
    productByID,
    restaurantByID,
    addressConsultMock
)

const placeInput = {
    restaurantId: '0',
    token: 'id',
    productsDTO: {
        products: [{id: "id",quantity: 3}],
        paymentMethod: "money"
    }
    
}

describe('test class OrderBusiness', () => {
    describe('test Place method', () => {
        test('test user no have address', async () => {
            try {
                placeInput.token = 'idd' 
                await OrderBusinessMock.Place(placeInput)
            } catch (error:any) {
                placeInput.token = 'id'
                expect(error.message).toBe('Usuário não possui endereço cadastrado')
                expect(error.statusCode).toStrictEqual(401)
            } finally {
                expect.assertions(2)
            }
        })
        test('test order in progress', async () => {
            const mockActive = jest.spyOn(OrderBusinessMock, 'Active').mockImplementation(async (token:string) => { return {order}})
            try {
                await OrderBusinessMock.Place(placeInput)
            } catch (error:any) {
                expect(error.message).toBe('Já existe um pedido em andamento')
                expect(error.statusCode).toStrictEqual(409)
            } finally {
                expect.assertions(2)
                mockActive.mockRestore()
            }
        })
        test('test invalid restaurant', async () => {
            const mockActive = jest.spyOn(OrderBusinessMock, 'Active').mockImplementation(async (token:string) => { return {order: null}})
            try {
                placeInput.restaurantId = '1' 
                await OrderBusinessMock.Place(placeInput)
            } catch (error:any) {
                placeInput.restaurantId = '0'
                expect(error.message).toBe('Restaurante Inválido')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
                mockActive.mockRestore()
            }
        })
        test('test invalid products', async () => {
            const mockActive = jest.spyOn(OrderBusinessMock, 'Active').mockImplementation(async (token:string) => { return {order: null}})
            try {
                placeInput.productsDTO.products[0].id = 'idd'
                await OrderBusinessMock.Place(placeInput)
            } catch (error:any) {
                placeInput.productsDTO.products[0].id = 'id'
                expect(error.message).toBe('Produtos inválidos')
                expect(error.statusCode).toStrictEqual(422)
            } finally {
                expect.assertions(2)
                mockActive.mockRestore()
            }
        })
        test('test sucess place', async () => {
            const mockActive = jest.spyOn(OrderBusinessMock, 'Active').mockImplementation(async (token:string) => { return {order: null}})
            const mockPlace = jest.spyOn(OrderBusinessMock, 'Place').mockImplementation(async () => { return {order}})
            const result = await OrderBusinessMock.Place(placeInput)
            expect(result).toEqual({order})
            expect(mockPlace).toBeCalledWith(placeInput)
            expect.assertions(2)
            mockActive.mockRestore()
            mockPlace.mockRestore()
            }
        )
    })
    describe('test Active method', () => {
        test('test get active', async () => {
            const getOrdersMock = jest.spyOn(orderDataBaseMock,'getOrders').mockImplementation(async () => [currentOder])
            const active = jest.spyOn(OrderBusinessMock,'Active')
            const result = await OrderBusinessMock.Active('id')
            expect(result).toEqual({order:currentOder})
            expect(active).toBeCalledWith('id')
            expect.assertions(2)
            getOrdersMock.mockRestore()
        })
        test('test no acitve', async () => {
            const active = jest.spyOn(OrderBusinessMock,'Active')
            const result = await OrderBusinessMock.Active('id')
            expect(result).toEqual({order:null})
            expect(active).toBeCalledWith('id')
            expect.assertions(2)
        })
    })
    describe('test Active method', () => {
        test('test get active', async () => {
            const getOrdersMock = jest.spyOn(orderDataBaseMock,'getOrders').mockImplementation(async () => [])
            const active = jest.spyOn(OrderBusinessMock,'History')
            const result = await OrderBusinessMock.History('id')
            expect(result).toEqual({orders:[]})
            expect(active).toBeCalledWith('id')
            expect.assertions(2)
            getOrdersMock.mockRestore()
        })
        test('test no acitve', async () => {
            const active = jest.spyOn(OrderBusinessMock,'Active')
            const result = await OrderBusinessMock.History('id')
            expect(result).toEqual({orders:[order]})
            expect(active).toBeCalledWith('id')
            expect.assertions(2)
        })
    })

})