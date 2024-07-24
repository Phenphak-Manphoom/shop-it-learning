import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";
const app = express();
dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
app.use(express.json());
app.use("/api", productRoutes);

//using middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `Server start is on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
