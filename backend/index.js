import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/user.route.js";
import { connectDB } from "./libs/db.js";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://amazon-store-app.vercel.app",
    credentials: true,
  })
);
connectDB();

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
