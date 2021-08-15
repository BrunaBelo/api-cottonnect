import connection from "../../database/connection";

describe("create auction", () => {
    beforeAll(async () => {
        await connection.create();
    });

    afterAll(async () => {
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
    });

    it("create auction", async () => {
    });
});
