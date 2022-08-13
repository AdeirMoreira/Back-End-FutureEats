export const user:any = {
    id: "id",
    name: "test",
    email: "test@emailk",
    password: "password123",
    hashPassword: 'password123',
    cpf: "000.000.000-00",
    hasAddress: true,
    address: "Rua,0,bairro,casa"
}

interface User {
    id: string,
    name: string,
    email: string,
    password?: string,
    cpf: string,
    hasAddress: boolean,
    address: string
}