import { AdressDB } from "../../src/Model/types"
import { address } from "./InputsDataMock/addressDataMock"


export class AdressDataBaseMock {
    insert = async (andress:AdressDB):Promise<void> => {}

    change = async (andress:AdressDB):Promise<void> => {}

    getAndress = async(userId:string):Promise<AdressDB[]> => {
        if(userId === address.userId) {return [address]} else {return []}
    }
}

export default new AdressDataBaseMock()