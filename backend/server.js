import express from "express";
import connection from "./connection/db.js";
import userRoute from "./routes/userRoute.js";
import entryRoute from './routes/entryRoute.js'
import visitRoute from './routes/visitRoute.js'
import adminRoute from './routes/adminRoute.js'
import cors from 'cors'
import dontenv from "dotenv";

dontenv.config();
const app = express();

const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());

app.use("/user", userRoute);
app.use("/entry", entryRoute);
app.use("/visit", visitRoute);
app.use("/admin", adminRoute);


app.listen(port, () => {
  connection();
  console.log(`server is running on port ${port}`);
});
