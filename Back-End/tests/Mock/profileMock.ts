import { user } from "./InputsDataMock/userDataMock"

export default async function Profile (id:string) {
    if(id === user.id) {return [user] } else {return []}
}