import { orderDB } from "../../src/Model/types"
import { order } from "./InputsDataMock/orderDataMock"


class OrderDataBaseMock {
    Place = async (order:orderDB):Promise<void> => {}

    getOrders = async (clientId:string):Promise<orderDB[]> => [order]
}

export default new OrderDataBaseMock()