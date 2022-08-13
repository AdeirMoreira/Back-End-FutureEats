import { produtc } from "./InputsDataMock/productDataMock"

export default async function productByID (id:string) {
    if(id === produtc.id) {return [produtc] } else {return []}
}