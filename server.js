import connectDB from "./db.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  await connectDB(); // ✅ IMPORTANT

  app.listen(3000, () => {
    console.log("🚀 Server running on port 3000");
  });
};

startServer();