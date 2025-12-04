import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import { auth } from "./middleware/auth.js";

const app = express();


app.use(express.json());

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Tilkoblet MongoDB Lokomotivet");


    app.use("/auth", authRoutes);


    app.get("/profile", auth, (req, res) => {
      res.json({
        msg: "Du har kommet deg ombord🚂",
        user: (req as any).user,
      });
    });
  

app.listen(3001, () => {
  console.log(
    "Reketino's TSX server is sprinting for its f***ing life at http://localhost:3001 🏃‍♂️💨"
  );
});

} catch (err) {
  console.error("MongoDB klarer ikke å koble deg på:", err);
  process.exit(1);
}
}

startServer();
