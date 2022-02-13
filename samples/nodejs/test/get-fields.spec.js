const supertest = require("supertest");
const app = require("../index");

const { databaseName } = require('./constants')

describe("GET /get-fields", function () {
    it("it should has status code 200", async function () {
        await supertest(app)
            .get(`/get-fields/${databaseName}`)
            .expect(200);
    });
});
