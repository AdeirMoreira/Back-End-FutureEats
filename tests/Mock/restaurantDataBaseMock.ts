import { RestaurantsDB, ProductDB } from "../../src/Model/types"
import { produtc } from "./InputsDataMock/productDataMock"
import { restaurant } from "./InputsDataMock/restaurantDataMock"


export class RestaurantDataBaseMock {
    Restaurants = async ():Promise<RestaurantsDB[]> => [restaurant]

    RestaurantsById = async (id:string):Promise<RestaurantsDB[]> => {
        if(id === restaurant.id) {return [restaurant] } else {return []}
    }

    Products = async (restaurantId:string):Promise<ProductDB[]> => [produtc]

    ProductById = async (id:string):Promise<ProductDB[]> => {
        if(id === produtc.id) {return [produtc]} else {return []}
    }

    produto = async (produto:ProductDB):Promise<void> => {}
}

export default new RestaurantDataBaseMock