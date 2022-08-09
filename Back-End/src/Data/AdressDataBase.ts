import { CustonError } from "../Model/CustonError/CustonError"
import { AdressDB } from "../Model/types"
import BaseDatabase from "./BaseDataBase"


export class AdressDataBase extends BaseDatabase {
    insert = async (andress:AdressDB):Promise<void> => {
        try {
            await BaseDatabase.connection('FutureEats_Adress')
            .insert(andress)
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    change = async (andress:AdressDB):Promise<void> => {
        try {
            await BaseDatabase.connection('FutureEats_Adress')
            .update(andress)
            .where({userId: andress.userId})
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    getAndress = async(userId:string) => {
        try {
            const resultDB:AdressDB[] =  await BaseDatabase.connection('FutureEats_Adress')
            .select('*')
            .where({userId})
            
            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }
}

export default new AdressDataBase()