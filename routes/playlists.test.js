"use strict";

const request = require("supertest");

const app = require("../app");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testSongIds,
    testPlaylistIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST playlist/create */

describe("POST playlist/create", function () {
    test("can create a playlist", async function () {
        const resp = await request(app)
            .post("/playlists/create")
            .send({
                username: "u1",
                name: "playlist3",
                image_url: "http://p3.img"
            })
        expect(resp.body).toEqual({
            playlist:
            {
                id: expect.any(Number),
                username: "u1",
                name: "playlist3",
                image_url: "http://p3.img"
            },
        });
    });
});

/************************************** POST /:playlist_id/add/:song_id */

describe("POST playlists/:playlist_id/add/:song_id", function () {
    test("can add a song to playlist", async function () {
        const resp = await request(app)
            .post(`/playlists/${testPlaylistIds[1]}/add/${testSongIds[0]}`)
            .send({
                playlist_id: testPlaylistIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.body).toEqual({
            playlist:
            {
                id: expect.any(Number),
                playlist_id: testPlaylistIds[1],
                song_id: testSongIds[0]
            },
        });
    });
    test("throw error if playlist is not exist", async function () {
        const resp = await request(app)
            .post(`/playlists/0/add/${testSongIds[0]}`)
            .send({
                playlist_id: testPlaylistIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.statusCode).toEqual(404);
    });
    test("throw error if song is not exist", async function () {
        const resp = await request(app)
            .post(`/playlists/${testPlaylistIds[0]}/add/0`)
            .send({
                playlist_id: testPlaylistIds[1],
                song_id: testSongIds[0]
            })
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** GET playlists/:playlist_id */

describe("GET playlists/:playlist_id", function () {
    test("can get details of a playlist", async function () {
        const resp = await request(app)
            .get(`/playlists/${testPlaylistIds[1]}`)
        expect(resp.body).toEqual({
            playlist:
            {
                id: testPlaylistIds[1],
                username: "u2",
                name: "playlist2",
                image_url: "http://p2.img"
            },
        });
    });
    test("throw error if playlist id is not exist", async function () {
        const resp = await request(app)
            .get(`/playlists/0`)
        expect(resp.statusCode).toEqual(404);
    });
});

/************************************** GET playlists */

describe("GET playlists/", function () {
    test("can list all playlists exist", async function () {
        const resp = await request(app)
            .get(`/playlists`)
        expect(resp.body).toEqual({
            playlist:[
            {
                id: testPlaylistIds[0],
                name: "playlist1",
            },
            {
                id: testPlaylistIds[1],
                name: "playlist2",
            }],
        });
    });
});

/************************************** GET playlists/user/:username */

describe("GET playlists/user/:username", function () {
    test("can list all playlists of a user", async function () {
        const resp = await request(app)
            .get(`/playlists/user/u1`)
        expect(resp.body).toEqual({
            playlist:[
            {
                id: testPlaylistIds[0],
                username: "u1",
                name: "playlist1",
                image_url: "http://p1.img"
            }],
        });
    });
    test("throw error if username is not exist", async function () {
        const resp = await request(app)
            .get(`/playlists/user/nope`)
            expect(resp.statusCode).toEqual(404);
    });
});
