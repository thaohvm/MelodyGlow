"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

class Playlist {
    /** Create a playlist
     *
     * data should be { user_id, name, image_url }
     */

    static async create({ username, name, image_url }) {
        const UserRes = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = UserRes.rows[0];

        if (!user) throw new NotFoundError(`No username: ${username}`);

        const playlistRes = await db.query(
            `INSERT INTO playlists
            (username, name, image_url)
            VALUES ($1, $2, $3)
            RETURNING username, name, image_url`,
            [
                username,
                name,
                image_url
            ]
        );
        const playlist = playlistRes.rows[0];
        return playlist;
    }

    /** Add song to playlist
     *
     */

    static async addSong({ playlist_id, song_id }) {
        const songRes = await db.query(
            `SELECT id
            FROM songs
            WHERE song_id = $1`,
            [song_id]
        );
        const song = songRes.rows[0];

        if (!song) throw new NotFoundError(`No song id: ${song_id}`)

        const playlistRes = await db.query(
            `SELECT id
            FROM playlists
            WHERE playlist_id = $1`,
            [playlist_id]
        );
        const playlist = playlistRes.rows[0];

        if (!playlist) throw new NotFoundError(`No song id: ${playlist_id}`)

        await db.query(
            `INSERT INTO playlists_songs`
        )
    }

    static async getPlaylist(playlist_id) {
        const playlistRes = await db.query(
            `SELECT id, name
            FROM playlists
            WHERE id = $1`,
            [playlist_id]
        );
        const playlist = playlistRes.rows[0];

        if (!playlist) throw new NotFoundError(`No playlist: ${playlist_id}`);
    }
}

module.exports = Playlist;
