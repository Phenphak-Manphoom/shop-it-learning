import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/error.js";
const app = express();

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});
dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
app.use(express.json());

app.use("/api", productRoutes);

//using middleware
app.use(errorMiddleware);

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server start is on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
