"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /auth/register */

describe("POST /auth/register", function () {
    test("works for anon", async function () {
      const resp = await request(app)
          .post("/auth/register")
          .send({
            username: "u3",
            email: "user3@user.com",
            password: "password3",
            location: "US"
          });
      expect(resp.statusCode).toEqual(201);
      expect(resp.body).toEqual({
        "token": expect.any(String),
      });
    });

    test("bad request with missing fields", async function () {
      const resp = await request(app)
          .post("/auth/register")
          .send({
            username: "new",
          });
      expect(resp.statusCode).toEqual(500);
    });

    test("bad request with invalid data", async function () {
      const resp = await request(app)
          .post("/auth/register")
          .send({
            username: "new",
            password: "password",
            location: "US",
            email: "not-an-email",
          });
      expect(resp.statusCode).toEqual(500);
    });
});
