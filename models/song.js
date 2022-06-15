"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Song {

    static async getSong(song_id) {
        const result = await db.query(
            `SELECT id, title, uri, artist, length, viewed
            FROM songs
            WHERE id = $1`,
            [song_id]
        );
        const song = result.rows[0];
        console.log(song);

        if (!song) throw new NotFoundError(`No song: ${song_id}`);
        return song;
    }

    static async create({ title, uri, artist, length, viewed }) {
        const result = await db.query(
            `INSERT INTO songs
            (title, uri, artist, length, viewed)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, title, uri, artist, length, viewed`,
            [title, uri, artist, length, viewed]
        );
        if (result.rows.length === 0) throw new NotFoundError (`No song exist: ${title}`)
        return result.rows[0];
    }

    static async increasedViews(song_id) {
        const result = await db.query(
            `UPDATE songs
            SET viewed = viewed + 1
            WHERE id = ${song_id}
            RETURNING id, title, uri, artist, length, viewed`
        )
        const song = result.rows[0];
        console.log(song)

        if (!song) throw new NotFoundError(`No song: ${song_id}`)
        return song;
    }

    static async getSongsInGenre(genre_id) {
        const result = await db.query(
            `SELECT song_id
            FROM songs_genres
            WHERE genre_id = $1`,
            [genre_id]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in ${genre_id}`)
        return songs;
    }

    static async getSongsInPlaylist(playlist_id) {
        const result = await db.query(
            `SELECT song_id
            FROM playlists_songs
            WHERE playlist_id = $1`,
            [playlist_id]
        );
        const songs = result.rows;
        if (songs.length == 0) throw new NotFoundError(`No song in playlist ${playlist_id}`);
        return songs;
    }
}

module.exports = Song;
