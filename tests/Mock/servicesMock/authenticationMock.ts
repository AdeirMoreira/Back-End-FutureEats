import { AuthenticationData } from "../../../src/Model/types"


class AuthenticationMock {
    public generateToken = (input: AuthenticationData): string => {
        return "token"
    }

    public getTokenData (token: string) {
        return token
        
    }

}

export default new AuthenticationMock()