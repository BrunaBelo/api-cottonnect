import connection from "./database/connection";
import { app } from "./server";
import jobs from './jobs/index';

const PORT = 3333;

if (process.env.NODE_ENV === "development") {
    connection.create("db");
} else {
    connection.create(process.env.TYPEORM_HOST);
}

jobs.runAllJobs();

app.listen(PORT, () => console.log("Server is running on port", PORT));
