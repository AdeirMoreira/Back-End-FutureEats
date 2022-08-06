import * as jwt from 'jsonwebtoken'
import { AuthenticationData } from '../Model/types';

export default class Authentication {
    generateToken = (id: AuthenticationData):string => {
        const token = jwt.sign(
        {
            id
        },
        process.env.JWT_KEY as string,
        {
            expiresIn:  process.env.EXPIRES_IN
        }
        );
        return token;
    }

    getTokenData = (token:string):string => {
        const data = jwt.verify(token, process.env.JWT_KEY as string) as any
        return data.id.id
    }
} 