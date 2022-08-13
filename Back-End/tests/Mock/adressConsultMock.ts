import { checkAdressDB } from "../../src/Model/types"

const  addressConsultMock = async (id:string):Promise<checkAdressDB> => {
    if(id === 'id') {
        return {hasAddress: true, address: "Rua,0,bairro,casa"}
    } else {
        return {hasAddress: false, address: undefined}
    }
    
}

export default addressConsultMock