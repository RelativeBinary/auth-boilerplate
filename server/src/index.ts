import express from "express";
import { config } from "dotenv";
import supabase from "./supabaseClient";
config();
const app = express();
const PORT = process.env.PORT || "ERROR NO PORT DEFINED";

app.get("/", async (_, res) => {
  const { data } = await supabase.from("tasks").select();
  console.log("number of tasks", data?.length);
  res.send("<h1> hello world </h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} 🔥`);
});
