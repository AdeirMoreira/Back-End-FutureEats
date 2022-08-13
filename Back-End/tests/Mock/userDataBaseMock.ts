import { UserDB, UpdateUserDB } from "../../src/Model/types"
import { user } from "./InputsDataMock/userDataMock"

class UserDataBaseMock {
    Signup = async (user:UserDB):Promise<void> => {}

    Login = async (email:string):Promise<UserDB[]> =>  [user]

    Profile = async (id:string):Promise<UserDB[] | undefined> => {
        if(id === user.id) {return [user]}else {return []}
    }
    
    Update = async (user:UpdateUserDB):Promise<void> => {}

    private UniqueDataCheck = (errorMessage:string) => {}
}

export default new UserDataBaseMock()

