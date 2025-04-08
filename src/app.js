import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: "true",
  })
);

app.use(express.json({ limit: "20kb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "20kb",
  })
);

app.use(cookieParser());
app.use(express.static("public"));

//  router
import userRouter from "./routes/user.routes.js";
import itemRoute from "./routes/item.routes.js";
import billRoute from "./routes/bill.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/items", itemRoute);
app.use("/api/v1/bills", billRoute);

export { app };
