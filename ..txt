require("dotenv").config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
});
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoDBStore = require("connect-mongodb-session")(session);
const path = require("path");

const app = express();
app.set("trust proxy", 1);

// === 🔧 ENABLE CORS FIRST (NO SLASH at end) ===
const allowedOrigins = [process.env.FRONTEND_DEV, process.env.FRONTEND_PROD];

// Dynamic CORS config
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
const webhookRoutes = require("./routes/webhook");

// ✅ Mount this FIRST and directly handle raw body
app.use("/api/webhook", webhookRoutes);

// === 📦 MIDDLEWARES ===
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// === 🍪 SESSION SETUP ===
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // required for cross-site cookies
    },
  })
);

// === 🧠 YOUR ROUTES ===
const methodUrlRouter = require("./routes/method-url");
const authRouter = require("./routes/auth");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/user");
const favouriteProductRouter = require("./routes/favourite");
const profileRouter = require("./routes/profile");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");
const orderRouter = require("./routes/order");
// index.js or server.js

app.get("/me", (req, res) => {
  if (req.session.user && req.session.isLoggedIn) {
    res.json({ user: req.session.user, isLoggedIn: true });
  } else {
    res.json({ user: null, isLoggedIn: false });
  }
});

app.use(methodUrlRouter);
app.use(authRouter);
app.use(hostRouter);
app.use(userRouter);
app.use(favouriteProductRouter);
app.use(profileRouter);
app.use(cartRouter);
app.use("/api/stripe", stripeRouter);
app.use(orderRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "404 page not found" });
});

// === 🔌 DB CONNECTION ===
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    console.log("MongoDB connected!");
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.log("Mongoose error:", err));
