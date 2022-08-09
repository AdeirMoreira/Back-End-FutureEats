import { v4 } from "uuid"

export class IdGenerator {
    public ID = ():string => v4()
}

export default new IdGenerator()