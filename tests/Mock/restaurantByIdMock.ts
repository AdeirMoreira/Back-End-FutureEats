import { restaurant } from "./InputsDataMock/restaurantDataMock"

export default async function restaurantByID (id:string) {
    if(id === restaurant.id) {return [restaurant] } else {return []}
}