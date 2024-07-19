import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config({ path: "backend/config/config.env" });

console.log("Hello");
app.listen(process.env.PORT, () => {
  console.log(`Server start is on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
