"use strict";

const Playlist = require("./playlist.js");
const Song = require("./song.js");
const { NotFoundError } = require("../expressError");

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

/************************************** create */

describe("create", function () {
    test("can create a new playlist", async function () {
        let newPlaylist = await Playlist.create({ username: 'u1', name: 'playlist3', image_url: 'http://p3.img' });
        expect(newPlaylist).toEqual({
            id: expect.any(Number),
            username: "u1",
            name: "playlist3",
            image_url: "http://p3.img"
        });
    });
});

/************************************** addSong */

describe("addSong", function () {
    test("can add songs to playlist", async function () {
        await Playlist.addSong(testPlaylistIds[0], testSongIds[1]);
        const songsInPlaylist = await Song.getSongsInPlaylist(testPlaylistIds[0])
        expect(songsInPlaylist).toEqual([
            {
                song_id: testSongIds[0]
            },
            {
                song_id: testSongIds[1]
            }
        ]);
    });
});

/************************************** getPlaylist */

describe("getPlaylist", function () {
    test("can get detail of a playlist based on playlist_id", async function () {
        let playlist = await Playlist.getPlaylist(testPlaylistIds[0]);
        expect(playlist).toEqual({
            id: testPlaylistIds[0],
            name: "playlist1",
            image_url: "http://p1.img",
            username: "u1"
        })
    });
    test("throw Not Found Error if the playlist is not exist ", async function () {
        try {
            await Playlist.getPlaylist(0);
            fail()
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** getAllPlaylist */

describe("getAllPlaylist", function () {
    test("can get all playlist name", async function () {
        let playlists = await Playlist.getAllPlaylist();
        expect(playlists).toEqual([
            {
                id: testPlaylistIds[0],
                name: "playlist1"
            },
            {
                id: testPlaylistIds[1],
                name: "playlist2"
            }
        ])
    });
});

/************************************** getAllPlaylistByUser */

describe("getAllPlaylistByUser", function () {
    test("can get all playlist name of a user", async function () {
        let playlists = await Playlist.getAllPlaylistByUser("u1");
        expect(playlists).toEqual([
            {
                id: testPlaylistIds[0],
                name: "playlist1",
                image_url: "http://p1.img",
                username: "u1"
            },
        ])
    });
    test("throw Not Found Error if the user is not exist ", async function () {
        try {
            await Playlist.getAllPlaylistByUser("nope");
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});
