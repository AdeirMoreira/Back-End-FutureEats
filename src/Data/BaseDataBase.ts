import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export default class BaseDatabase{
    protected static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
            }
    });
    
    public static async destroyConnection(): Promise<void> {
        await BaseDatabase.connection.destroy();
    }
}    