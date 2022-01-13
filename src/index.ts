import connection from "./database/connection";
import { app } from "./server";

const PORT = 3333;

if (process.env.NODE_ENV === "development") {
    connection.create("db");
} else {
    connection.create(process.env.TYPEORM_HOST);
}

app.listen(PORT, () => console.log("Server is running!"));
