import  dotenv from 'dotenv'

dotenv.config()

type ConfigType = {
    port : string;
    dbUrl : string;
}


const port = process.env.PORT || 3000
const dbUrl = process.env.DB_URL

if (!dbUrl) {
  throw new Error('DB_URL is not defined in the environment variables')
}

const config: ConfigType = {
    port: port as string,
    dbUrl: dbUrl as string
}

export default config