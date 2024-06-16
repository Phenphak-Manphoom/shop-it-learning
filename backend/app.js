import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/ProductRoutes.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";

const app = express();

//handle uncaught exceptions

process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err}`);
  console.log("Shutting down server due to uncaught exceptions ");
  process.exit(1);
});

dotenv.config({ path: "backend/config/config.env" }); // จะโหลดค่าจากไฟล์ .env ที่อยู่ในโฟลเดอร์ backend/config/ โดยระบุตำแหน่งของไฟล์ .env ที่จะถูกโหลดด้วยพารามิเตอร์ path ในนี้คือ "backend/config/config.env"

//connecting to database
connectDatabase();
app.use(express.json()); //middleware เพื่อช่วยในการแปลงข้อมูล JSON จาก request body
app.use(cookieParser());
app.use("/api", productRoutes);
app.use("/api", authRoutes);

//using error middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server start on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection ");
  server.close(() => {
    process.exit(1);
  });
});
