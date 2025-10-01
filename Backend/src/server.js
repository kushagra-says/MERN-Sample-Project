import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connectDB } from "./Config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors(
    { origin: "http://localhost:5173" }
));
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
});

//mongodb+srv://kushagra-says:kdN4JCbvh9Bvbv8m@cluster0.9ycrk7y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
