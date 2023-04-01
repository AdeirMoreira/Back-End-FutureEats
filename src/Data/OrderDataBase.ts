import { CustonError } from "../Model/CustonError/CustonError";
import { orderDB } from "../Model/types";
import BaseDatabase from "./BaseDataBase";


export class OrderDataBase extends BaseDatabase{
    private tableName = 'FutureEats_Order'

    Place = async (order:orderDB):Promise<void> => {
        try {
            await BaseDatabase.connection(this.tableName)
            .insert(order)
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    getOrders = async (clientId:string):Promise<orderDB[]> => {
        try {
            const resultDB:orderDB[] = await BaseDatabase.connection(this.tableName)
            .select('totalPrice','restaurantName','createdAt','expiresAt')
            .where({clientId})
            
            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}

export default new OrderDataBase()