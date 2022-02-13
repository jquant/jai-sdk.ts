const supertest = require("supertest");
const app = require("../index");

const { databaseName, checkInsertedDataMode } = require('./constants')

describe("GET /check-inserted-data", function () {
    it("it should has status code 200", async function () {
        await supertest(app)
            .get(`/check-inserted-data/${databaseName}/${checkInsertedDataMode}`)
            .expect(200);
    });
});
