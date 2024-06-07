import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/ProductRoutes.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

const app = express();

dotenv.config({ path: "backend/config/config.env" }); // จะโหลดค่าจากไฟล์ .env ที่อยู่ในโฟลเดอร์ backend/config/ โดยระบุตำแหน่งของไฟล์ .env ที่จะถูกโหลดด้วยพารามิเตอร์ path ในนี้คือ "backend/config/config.env"

//connecting to database
connectDatabase();
app.use(express.json()); //middleware เพื่อช่วยในการแปลงข้อมูล JSON จาก request body
app.use("/api", productRoutes);

//using error middleware
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(
    `Server start on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});
