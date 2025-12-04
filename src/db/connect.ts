import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Kontakt med MongoDB opprettet");
  } catch (err) {
    console.error("MongoDB ville ikke oppnå kontakt", err);
    process.exit(1);
  }
}
