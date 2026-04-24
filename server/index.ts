import { keepAwake } from "@ikeshav26/keep-awake";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";


connectDB()



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);

    const url=process.env.RENDER_EXTERNAL_URL;
    const interval=process.env.AWAKE_INTERVAL;
    if(url){
        keepAwake({
            url,
            interval:Number(interval)
        })
    }
})