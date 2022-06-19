"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users */

describe("GET /users", function () {
    test("can get list of users", async function () {
      const resp = await request(app)
          .get("/users")
          .set("authorization", `${u1Token}`);
      expect(resp.body).toEqual({
        users: [
          {
            username: "u1",
            email: "user1@user.com",
            location: "US"
          },
          {
            username: "u2",
            email: "user2@user.com",
            location: "Canada"
          },
        ],
      });
    });
});
