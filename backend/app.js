import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/ProductRoutes.js";
import { connectDatabase } from "./config/dbConnect.js";
const app = express();

dotenv.config({ path: "backend/config/config.env" }); // จะโหลดค่าจากไฟล์ .env ที่อยู่ในโฟลเดอร์ backend/config/ โดยระบุตำแหน่งของไฟล์ .env ที่จะถูกโหลดด้วยพารามิเตอร์ path ในนี้คือ "backend/config/config.env"

//connecting to database
connectDatabase();

app.use("/api/v1", productRoutes);
app.listen(process.env.PORT, () => {
  console.log(
    `Server start on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
