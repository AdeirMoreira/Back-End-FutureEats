import { v4 } from "uuid"

export default class IdGenerator {
    public ID = ():string => v4()
}