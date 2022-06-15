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
            RETURNING id, username, name, image_url`,
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

    static async addSong( playlist_id, song_id ) {
        const songRes = await db.query(
            `SELECT id
            FROM songs
            WHERE id = $1`,
            [song_id]
        );
        const song = songRes.rows[0];

        if (!song) throw new NotFoundError(`No song id: ${song_id}`)

        const playlistRes = await db.query(
            `SELECT id
            FROM playlists
            WHERE id = $1`,
            [playlist_id]
        );
        const playlist = playlistRes.rows[0];

        if (!playlist) throw new NotFoundError(`No playlist id: ${playlist_id}`)

        const songsInPlaylist = await db.query(
            `INSERT INTO playlists_songs
            (song_id, playlist_id)
            VALUES($1, $2)
            RETURNING id, song_id, playlist_id`,
            [song_id,
            playlist_id]
        )
        return songsInPlaylist;
    }

    static async getPlaylist(playlist_id) {
        const playlistRes = await db.query(
            `SELECT id, name, image_url, username
            FROM playlists
            WHERE id = $1`,
            [playlist_id]
        );
        const playlist = playlistRes.rows[0];

        if (!playlist) throw new NotFoundError(`No playlist: ${playlist_id}`);
        return playlist;
    }

    static async getAllPlaylist() {
        const playlistRes = await db.query(
            `SELECT id, name
            FROM playlists
            ORDER BY name`
        );
        const playlist = playlistRes.rows;

        if (!playlist) throw new NotFoundError(`No playlist: ${playlist_id}`);
        return playlist;
    }

    static async getAllPlaylistByUser(username) {
        const playlistRes = await db.query(
            `SELECT id, name, image_url, username
            FROM playlists
            WHERE username = $1`,
            [username]
        );
        const playlist = playlistRes.rows;

        if (playlist.length === 0) throw new NotFoundError(`No user: ${username}`);
        return playlist;
    }
}

module.exports = Playlist;
