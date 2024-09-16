import { Schema, model, connect } from "mongoose";
import ITransfer from "../interface/ITransfer";
import dotenv from "dotenv";
dotenv.config();

const transferSchema = new Schema<ITransfer>({
  from: {
    type: "String",
    required: true,
  },
  to: {
    type: "String",
    required: true,
  },
  value: {
    type: "Number",
    required: true,
  },
  transactionHash: {
    type: "String",
    required: true,
  },
});

const Transfer = model<ITransfer>("Transfer", transferSchema);

export default Transfer;
