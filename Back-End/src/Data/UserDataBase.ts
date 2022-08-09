import { CustonError } from "../Model/CustonError/CustonError";
import { UpdateUserDB, UserDB } from "../Model/types";
import BaseDatabase from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {
    Signup = async (user:UserDB):Promise<void> => {
        try {
            await BaseDatabase.connection('FutureEats_User')
            .insert(user)
        } catch (error:any) {
            this.UniqueDataCheck(error.sqlMessage)
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    Login = async (email:string):Promise<UserDB[]> => {
        try {
            const resultDB:UserDB[] = await BaseDatabase.connection('FutureEats_User')
            .select('*')
            .where({email})

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    Profile = async (id:string):Promise<UserDB[]> => {
        try {
            const resultDB:UserDB[] = await BaseDatabase.connection('FutureEats_User')
            .select('*')
            .where({id})

            return resultDB
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    Update = async (user:UpdateUserDB):Promise<void> => {
        try {
            await BaseDatabase.connection('FutureEats_User')
            .update(user)
            .where({id:user.id})
        } catch (error:any) {
            throw new CustonError(error.statusCode, error.sqlMessage || error.message)
        }
    }

    private UniqueDataCheck = (errorMessage:string) => {
            if(errorMessage.includes('Duplicate entry')) {
                const array = errorMessage.split(' ')
            throw new CustonError(409, `${array[5]} ${array[2]} já está em uso.`)
        }
    }

}

export default new UserDataBase()