"use strict";

const Genre = require("./genre.js");
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

/************************************** create */

describe("create", function () {
    test("can create a new genre", async function () {
        let newGenre = await Genre.create({ name: "genre3" });
        expect(newGenre).toEqual({
            id: expect.any(Number),
            name: "genre3"
        });
    });
});

/************************************** getAll */

describe("getAll", function () {
    test("can get name of all exist genres", async function () {
        let genres = await Genre.getAll();
        expect(genres).toEqual([
            {
                id: testGenreIds[0],
                name: "genre1"
            },
            {
                id: testGenreIds[1],
                name: "genre2"
            }
        ]);
    });
});
