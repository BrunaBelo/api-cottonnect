import connection from "./database/connection";
import { app } from "./server";

const PORT = 3000;

connection.create("db");
app.listen(PORT, () => console.log("Server is running!"));
