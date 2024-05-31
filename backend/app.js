import dotenv  from "dotenv";
import express from "express";
const app = express();

dotenv.config({path:"backend/config/config.env"})

app.listen(process.env.PORT,()=>{
    console.log(`Server start on PORT : ${process.env.PORT}`);
})