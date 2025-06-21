import express from "express";
import { config } from "dotenv";

config();
const app = express();
const PORT = process.env.PORT || "ERROR NO PORT DEFINED";

app.get('/', (_, res) => {
  res.send("<h1> hello world </h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🔥`);
});
