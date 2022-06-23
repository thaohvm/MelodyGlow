"use strict";

const Song = require("./song.js");

const { NotFoundError } = require("../expressError");

const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll,
    testSongIds,
    testPlaylistIds,
    testGenreIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** getSong */

describe("getSong", function () {
    test("can get detail of the song based on song_id ", async function () {
        let song = await Song.getSong(testSongIds[0]);
        expect(song).toEqual({
            id: testSongIds[0],
            title: "title1",
            uri: "uri1",
            artist: "anonymous1",
            length: "3:00",
            viewed: 200
        });
    });

    test("throw Not Found Error if the song is not exist ", async function () {
        try {
            await Song.getSong(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** increased viewed */

describe("increased viewed", function () {
    test("can increase the viewed of the song by 1", async function () {
        let song = await Song.increasedViews(testSongIds[0]);
        expect(song).toEqual({
            id: testSongIds[0],
            title: "title1",
            uri: "uri1",
            artist: "anonymous1",
            length: "3:00",
            viewed: 201
        });
    });

    test("throw Not Found Error if the song is not exist ", async function () {
        try {
            await Song.increasedViews(0);
            fail();
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});

/************************************** getSongInGenre */

// describe("getSongInGenre", function () {
//     test("can list the songs which are in a particular genre", async function () {
//         let song = await Song.getSongsInGenre(testGenreIds[0]);
//         expect(song).toEqual([
//             {
//                 song_id: testSongIds[0],
//             }
//         ]);
//     });

//     test("throw Not Found Error if the genre is not exist ", async function () {
//         try {
//             const song = await Song.getSongsInGenre(0);
//             console.log(song)
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//         }
//     });
// });

/************************************** getSongInPlaylist */

// describe("getSongInPlaylist", function () {
//     test("can list the songs which are in a particular playlist", async function () {
//         let song = await Song.getSongsInPlaylist(testPlaylistIds[0]);
//         expect(song).toEqual([
//             {
//                 song_id: testSongIds[0],
//             }
//         ]);
//     });

//     test("throw Not Found Error if the playlist is not exist ", async function () {
//         try {
//             const song = await Song.getSongsInPlaylist(0);
//             fail();
//         } catch (err) {
//             expect(err instanceof NotFoundError).toBeTruthy();
//         }
//     });
// });
