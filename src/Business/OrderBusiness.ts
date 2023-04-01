import orderData, { OrderDataBase } from "../Data/OrderDataBase"
import restaurantDataBase from "../Data/RestaurantDataBase"
import { CustonError } from "../Model/CustonError/CustonError"
import { checkAdressDB, orderDB, PlaceDTO, ProductDB, RestaurantsDB } from "../Model/types"
import authentication, { Authentication } from "../Services/Authentication"
import idGenerator, { IdGenerator } from "../Services/IDGenerator"
import inputsValidation, { InputsValidation } from "./InputsValidation/InputsValidation"
import adressBusiness from "./AdressBusiness"

export class OrderBusiness {
    constructor (
        private inputsValidation : InputsValidation,
        private authentication : Authentication,
        private idGenerator : IdGenerator,
        private orderData : OrderDataBase,
        private productById : (id: string) => Promise<ProductDB[]>,
        private restaurantById : (id: string) => Promise<RestaurantsDB[]>,
        private adressConsult : (token: string) => Promise<checkAdressDB>
        ) {}

    Place = async (inputs:PlaceDTO) => {
        const { restaurantId, token , productsDTO} = inputs
        try {
            this.inputsValidation.Place(inputs)
            const clientId = this.authentication.getTokenData(token)

            const hasAddress = await this.adressConsult(clientId)
            if(hasAddress.hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            const {order} = await this.Active(token)
            if(order) {
                throw new CustonError(409, 'Já existe um pedido em andamento')
            }

            const [restaurant] = await this.restaurantById(restaurantId)
            if(!restaurant) throw new CustonError(422, 'Restaurante Inválido')

            const products = productsDTO.products.map(product => this.productById(product.id))
            const results = (await Promise.all(products))
            .map(product => product[0])
            .filter(product => product !== undefined )
            
            if((results.length !== productsDTO.products.length) || results.every(product => product.restaurantId !== restaurantId)) {
                throw new CustonError(422, 'Produtos inválidos')
            }
            
            const productsAndQuantitys = productsDTO.products.map((a => {
                const price = results.find(b => a.id === b.id)
                a.price = price?.price 
                return a
            }))
            const productsPrice = productsAndQuantitys.reduce((acc,curr) => {
                acc += (curr.price || 0) * curr.quantity 
                return acc
            },0)
            const totalPrice = productsPrice + restaurant.shipping
            
            const id =  this.idGenerator.ID()
            const createdAt = new Date().getTime() - (new Date().getTimezoneOffset() * 60000)
            const expiresAt = createdAt + (restaurant.deliveryTime * 60000)
            const restaurantName = restaurant.name

            const orderDB:orderDB = { id, restaurantId, restaurantName, clientId, createdAt, expiresAt, totalPrice }
            
            await this.orderData.Place(orderDB)
            const orderActive = { totalPrice, restaurantName, createdAt, expiresAt}
            return { order: orderActive }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    Active = async (token:string) => {
        try {
            this.inputsValidation.Token(token)
            const id = this.authentication.getTokenData(token)

            const hasAddress = await this.adressConsult(id)
            if(hasAddress.hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            const orders = await this.orderData.getOrders(id)
            const active = orders.find(product => this.finalizedOrder(product) === false)
            return { order: active ? active : null }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    History = async (token:string) => {
        try {
            this.inputsValidation.Token(token)
            const id = this.authentication.getTokenData(token)

            const hasAddress = await this.adressConsult(id)
            if(hasAddress.hasAddress === false) {
                throw new CustonError(401,'Usuário não possui endereço cadastrado')
            }

            const ordersDB = await this.orderData.getOrders(id)
            const orders = ordersDB.filter(product => this.finalizedOrder(product) === true)

            return { orders }
        } catch (error:any) {
            this.tokenError(error.message)
            throw new CustonError(error.statusCode, error.message)
        }
    }

    private currentDate = () => new Date().getTime() - (new Date().getTimezoneOffset() * 60000)

    private finalizedOrder = (product:orderDB) => {
        return ((new Date(product.expiresAt).getTime() - this.currentDate()) < 0)
    }

    private tokenError = (errorMessage:string):void => {
        if(errorMessage.includes('jwt expired')) {
            throw new CustonError(401, 'Token expirado')
        }
        if(errorMessage.includes('jwt malformed')) {
            throw new CustonError(401, 'Token inválido')
        }
    }
}

export default new OrderBusiness(
    inputsValidation,
    authentication,
    idGenerator,
    orderData,
    restaurantDataBase.ProductById,
    restaurantDataBase.RestaurantsById,
    adressBusiness.checkAdress
)