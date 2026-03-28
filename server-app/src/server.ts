import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/dbConfig";
import shortUrl from "./routes/shortUrl";

dotenv.config();

const port = process.env.PORT || 5001;

const allowedOrigins = (process.env.FRONTEND_URL ||
  "http://localhost:3000,http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  })
);

app.use("/api/", shortUrl);

app.get("/", (_req, res) => {
  res.json({ ok: true, service: "url-shortener-api" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const start = async () => {
  await connectDb();
  app.listen(port, () => {
    console.log(`Server started running successfully on port : ${port}`);
  });
};

void start();
