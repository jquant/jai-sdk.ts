const supertest = require("supertest");
const app = require("../index");

describe("GET /insert-data", function () {
    it("it should has status code 200", async function () {

        var payload = {
            "databaseName": "iris_supervised2",
            "filterName": "",
            "data": [
                {
                    "id": 1,
                    "sepal length (cm)": 5.5,
                    "sepal width (cm)": 2.4,
                    "petal length (cm)": 3.7,
                    "petal width (cm)": 1.0,
                    "target": 1
                },
                {
                    "id": 2,
                    "sepal length (cm)": 6.3,
                    "sepal width (cm)": 2.8,
                    "petal length (cm)": 5.1,
                    "petal width (cm)": 1.5,
                    "target": 2
                }]
        };

        await supertest(app)
            .post("/insert-data")
            .send(payload)
            .expect(200);

    });
});
