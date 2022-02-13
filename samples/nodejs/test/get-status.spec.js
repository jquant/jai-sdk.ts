const supertest = require("supertest");
const app = require("../index");

describe("GET /get-status", function () {
    it("it should has status code 200", function (done) {
        supertest(app)
            .get("/get-status")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });
});
