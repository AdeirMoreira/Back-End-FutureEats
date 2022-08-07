export class CustonError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message)
    }
}