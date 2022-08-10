import { CustonError } from "../Model/CustonError/CustonError"
import { ProductDB, RestaurantsDB } from "../Model/types"
import BaseDatabase from "./BaseDataBase"


export class RestaurantDataBase extends BaseDatabase {
    Restaurants = async ():Promise<RestaurantsDB[]> => {
        try {
            const resultDB:RestaurantsDB[] = await BaseDatabase.connection('FutureEats_Restaurants')
            .select('*')

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    RestaurantsById = async (id:string):Promise<RestaurantsDB[]> => {
        try {
            const resultDB:RestaurantsDB[] = await BaseDatabase.connection('FutureEats_Restaurants')
            .select('*')
            .where({id})

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    Products = async (restaurantId:string):Promise<ProductDB[]> => {
        try {
            const resultDB:ProductDB[] = await BaseDatabase.connection('FutureEats_Products')
            .select('*')
            .where({restaurantId})

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    ProductById = async (id:string):Promise<ProductDB[]> => {
        try {
            const resultDB:ProductDB[] = await BaseDatabase.connection('FutureEats_Products')
            .select('*')
            .where({id})

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    produto = async (produto:ProductDB):Promise<void> => {
        try {
            await BaseDatabase.connection('FutureEats_Products')
            .insert(produto)
        } catch (error:any) {
            console.log(error.sqlMessage)
        }
    }
}

export default new RestaurantDataBase()