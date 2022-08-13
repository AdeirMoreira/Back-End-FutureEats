export const order = {
    id:'id',
    restaurantId: 'restaurantId', 
    restaurantName: 'restaurantName',
    clientId: 'clientId',
    createdAt: 100000000,
    expiresAt: 100000000,
    totalPrice: 0
}

const createdAt = new Date().getTime() - (new Date().getTimezoneOffset() * 60000)
const expiresAt = createdAt + (10 * 60000)

export const currentOder = {
    id:'id',
    restaurantId: 'restaurantId', 
    restaurantName: 'restaurantName',
    clientId: 'clientId',
    createdAt,
    expiresAt,
    totalPrice: 0
}

