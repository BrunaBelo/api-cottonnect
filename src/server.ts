import express from "express";

import { newConnection } from "./database/connection";
import { routers } from "./routes/index.routes";

const PORT = 3000;
const HOST = "localhost";

const app = express();
newConnection("localhost");
app.use(express.json());
app.use(routers);

app.listen(PORT, HOST, () => console.log("Server is running!"));
