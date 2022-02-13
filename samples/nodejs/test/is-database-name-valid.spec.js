const supertest = require("supertest");
const app = require("../index");

const { databaseName } = require('./constants')

describe("GET /is-database-name-valid", function () {
    it("it should has status code 200", async function () {
        await supertest(app)
            .get(`/is-database-name-valid/${databaseName}`)
            .expect(200);
    });
});
