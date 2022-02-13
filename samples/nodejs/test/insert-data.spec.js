const supertest = require("supertest");
const app = require("../index");

describe("GET /insert-data", function () {
    it("it should has status code 200", function (done) {

        var payload = {
            databaseName: 'iris_supervised2',
            filterName: '',
            data: {}

        };

        supertest(app)
            .post("/insert-data")
            .send(payload)
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });
});
