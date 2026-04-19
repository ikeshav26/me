import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import https from "https";

connectDB()



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
    
    // Self-ping to keep Render free tier server awake
    const url = process.env.RENDER_EXTERNAL_URL;
    if (url) {
        setInterval(() => {
            https.get(url, (res) => {
                if (res.statusCode === 200) {
                    console.log(`Self-ping successful: ${res.statusCode}`);
                } else {
                    console.log(`Self-ping failed with status: ${res.statusCode}`);
                }
            }).on('error', (err) => {
                console.error(`Self-ping error: ${err.message}`);
            });
        }, 14 * 60 * 1000); // 14 minutes
        console.log(`Self-ping scheduled for ${url} every 14 minutes`);
    } else {
        console.log("RENDER_EXTERNAL_URL not set. Self-ping skipped.");
    }
})