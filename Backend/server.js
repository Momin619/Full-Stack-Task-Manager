import express from "express";
import env from "dotenv";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import cors from "cors";
import session from "express-session";
import mongoDbStore from "connect-mongodb-session";

env.config(); // Load environment variables first

const PORT = process.env.SERVER_PORT;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Initialize MongoDB session store
const MongoDBStore = mongoDbStore(session);
const store = new MongoDBStore({
  uri: MONGO_URI,
  collection: "sessions",
});

store.on("error", (error) => {
  console.log("Session store error:", error);
});

const app = express();

app.use((req, res, next) => {
  console.log("Method is ", req.method);
  console.log("URL is ", req.url);
  next();
});

app.use(express.json());

// Enable CORS for your frontend
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Configure session middleware
app.use(
  session({
    secret: "mySecret", // you can use process.env.SESSION_SECRET
    resave: false, // recommended false
    saveUninitialized: false, // recommended false
    store: store,
    cookie: {
      httpOnly: true,
      secure: false, // true if using HTTPS in production
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  })
);

// Register your user routes
app.use(userRouter);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("Mongoose error:", err));
