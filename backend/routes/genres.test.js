"use strict";

const request = require("supertest");

const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testSongIds,
    testGenreIds,
    testPlaylistIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET genres/ */

describe("GET genres/", function () {
    test("can get all genres exist", async function () {
        const resp = await request(app)
            .get("/genres")
        expect(resp.body).toEqual({
            genres: [
                {
                    id: testGenreIds[0],
                    name: "genre1",
                },
                {
                    id: testGenreIds[1],
                    name: "genre2",
                }
            ],
        });
    });
});

/************************************** GET genres/create */

describe("GET genres/create", function () {
    test("can create new genre", async function () {
        const resp = await request(app)
            .post("/genres/create")
            .send({
                name: "genre3"
            })
        expect(resp.body).toEqual({
            newGenre:
            {
                id: expect.any(Number),
                name: "genre3",
            },
        });
    });
    test("throw Bad Request Error if data is invalid", async function () {
        const resp = await request(app)
            .post("/genres/create")
            .send({
                id: "genre3"
            })
        expect(resp.statusCode).toEqual(400);
    });
});

/************************************** POST /:genre_id/add/:song_id */

describe("POST genres/:genre_id/add/:song_id", function () {
    test("can add a song to a genre", async function () {
        const resp = await request(app)
            .post(`/genres/${testGenreIds[1]}/add/${testSongIds[0]}`)
            .send({
                genre_id: testGenreIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.body).toEqual({
            genre:
            {
                id: expect.any(Number),
                genre_id: testGenreIds[1],
                song_id: testSongIds[0]
            },
        });
    });
    test("throw error if genre is not exist", async function () {
        const resp = await request(app)
            .post(`/genres/0/add/${testSongIds[0]}`)
            .send({
                genre_id: testGenreIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.statusCode).toEqual(404);
    });
    test("throw error if song is not exist", async function () {
        const resp = await request(app)
            .post(`/genres/${testGenreIds[0]}/add/0`)
            .send({
                genre_id: testGenreIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.statusCode).toEqual(404);
    });
});
