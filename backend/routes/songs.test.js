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

console.log(testSongIds)
beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /songs */

describe("GET /songs", function () {
    test("can get songs detail based on song_id", async function () {
        const resp = await request(app)
            .get(`/songs/${testSongIds[0]}`)
        expect(resp.body).toEqual({
            song:
            {
                id: testSongIds[0],
                title: "title1",
                uri: "uri1",
                artist: "anonymous1",
                length: "3:00",
                viewed: 200
            },
        });
    });
    test("throw error if song_id is not exist", async function () {
        const resp = await request(app)
            .get(`/songs/0`)
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** PUT /songs/:song_id/viewed */

describe("GET /songs", function () {
    test("can get songs detail based on song_id", async function () {
        const resp = await request(app)
            .put(`/songs/${testSongIds[0]}/viewed`)
            expect(resp.body).toEqual({
            song:
            {
                id: testSongIds[0],
                title: "title1",
                uri: "uri1",
                artist: "anonymous1",
                length: "3:00",
                viewed: 201
            },
        });
    });
    test("throw error if song_id is not exist", async function () {
        const resp = await request(app)
            .get(`/songs/0`)
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** GET /songs/genre/:genre_id */

describe("GET /songs/genre/:genre_id", function () {
    test("can get all songs of the genre", async function () {
        const resp = await request(app)
            .get(`/songs/genre/${testGenreIds[0]}`)
            expect(resp.body).toEqual({
            songs:[
            {
                song_id: testSongIds[0]
            },
            {
                song_id: testSongIds[1]
            }
        ]
        });
    });
    test("throw error if the genre is not exist", async function () {
        const resp = await request(app)
            .get(`/songs/genre/0`)
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** GET /songs/playlist/:playlist_id */

describe("GET /songs/playlist/:playlist_id", function () {
    test("can get all songs of the playlist", async function () {
        const resp = await request(app)
            .get(`/songs/playlist/${testPlaylistIds[0]}`)
            expect(resp.body).toEqual({
            songs:[
            {
                song_id: testSongIds[0]
            },
            {
                song_id: testSongIds[1]
            }
        ]
        });
    });
    test("throw error if the playlist is not exist", async function () {
        const resp = await request(app)
            .get(`/songs/playlist/0`)
        expect(resp.statusCode).toEqual(404);
    });
});
