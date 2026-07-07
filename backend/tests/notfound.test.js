const request = require("supertest");
const app = require("../app");

describe("404 Route", () => {

    test("Unknown route", async () => {

        const res = await request(app).get("/abcdef");

        expect(res.statusCode).toBe(404);

    });

});