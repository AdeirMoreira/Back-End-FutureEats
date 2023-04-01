import { genSaltSync, hashSync, compareSync} from "bcryptjs";

export class HashManager {
    hash = (plainText:string):string => {
    const cost = Number(process.env.BCRYPT_COST)
    const salt = genSaltSync(cost)
    return  hashSync(plainText,salt) 
    }

    compare = (plainText:string, cypherText: string):boolean => {
        return compareSync(plainText,cypherText)
    }
}

export default new HashManager()