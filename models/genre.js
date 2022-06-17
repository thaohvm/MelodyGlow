"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Genre {
    /**
     *
     * data should be { user_id, name, image_url }
     */

    static async getAll() {
        const result = await db.query(
            `SELECT id, name
            FROM genres
            ORDER BY name`
        );
        if (result.rows.length === 0) throw new NotFoundError (`No genre exist`);
        return result.rows;
    }

    static async create({ name }) {
        const result = await db.query(
            `INSERT INTO genres
            (name)
            VALUES ($1)
            RETURNING id, name`, [name]
        );
        if (result.rows.length === 0) throw new NotFoundError (`No genre exist: ${name}`)
        return result.rows[0];
    }

    static async addSong(song_id, genre_id ) {
        const songRes = await db.query(
            `SELECT id
            FROM songs
            WHERE id = $1`,
            [song_id]
        );
        const song = songRes.rows[0];

        if (!song) throw new NotFoundError(`No song id: ${song_id}`)

        const genreRes = await db.query(
            `SELECT id
            FROM genres
            WHERE id = $1`,
            [genre_id]
        );
        const genre = genreRes.rows[0];

        if (!genre) throw new NotFoundError(`No playlist id: ${genre_id}`)

        const songsInGenre = await db.query(
            `INSERT INTO songs_genres
            (song_id, genre_id)
            VALUES($1, $2)
            RETURNING id, song_id, genre_id`,
            [song_id,
            genre_id]
        )
        console.log(songsInGenre.rows[0])
        return songsInGenre.rows[0];
    }
}

module.exports = Genre;
