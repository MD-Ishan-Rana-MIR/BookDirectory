
import dotenv from 'dotenv';

dotenv.config();

type Config = {
    port ?: number | string;
    dbUrl ?: string | undefined;
}

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL;

export const config : Config = {
    port: port || 3000,
    dbUrl: dbUrl as string | undefined
}  