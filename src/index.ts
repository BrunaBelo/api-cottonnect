import "./database/connection";
import { app } from "./server";

const PORT = 3000;
const HOST = "localhost";

app.listen(PORT, HOST, () => console.log("Server is running!"));
