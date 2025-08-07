import app from "./app.js";
import { config } from "./module/config.js";




app.listen(config.port,()=>{
    console.log(`Server is running on port ${config.port}`)
})