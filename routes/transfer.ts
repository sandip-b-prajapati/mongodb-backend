import { Router } from "express";
import { ethers } from "ethers";
import ERC20ABI from "../abi/ERC20.json";
import Transfer from "../model/Transfer";

const TRANSFER_EVENT = "Transfer";

const provider = new ethers.providers.WebSocketProvider(
  process.env.WS_RPC as string
);
const contact = new ethers.Contract(
  process.env.TOKEN_CONTRACT as string,
  ERC20ABI,
  provider
);

const tranferRouter = Router();

contact.on(TRANSFER_EVENT, async (from, to, value, eventData) => {
  const decimals = await contact.decimals();
  const amount = ethers.utils.formatUnits(value, decimals);
  const tranfer = new Transfer({
    from,
    to,
    value: amount,
    transactionHash: eventData.transactionHash,
  });

  await tranfer.save();
});

tranferRouter.get("/transfer", async (req, res, next) => {
  const data = await Transfer.find();
  res.status(200).send(data);
});

tranferRouter.get("/transfer/:from", async (req, res, next) => {
  const fromAddress = req.params.from;
  const data = await Transfer.find({
    from: fromAddress,
  }).exec();
  res.status(200).send(data);
});

export default tranferRouter;
