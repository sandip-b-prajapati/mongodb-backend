import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import tranferRouter from "./routes/transfer";
import cors from "cors";

dotenv.config();
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => console.log("Database is Exersicing......."))
  .catch((err) => console.error("Error in Connection" + err));

// v1 api
app.use("/v1", tranferRouter);
app.listen(8000, () => {
  console.log("server is running");
});
