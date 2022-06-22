import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class MelodyApi {
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `${MelodyApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API routes

    /** Get details on a company by handle. */

    static async login(data) {
        let res = await this.request("auth/login", data, "post");
        console.log(res)
        return res.token;
    }

    static async signUp(data) {
        let res = await this.request("auth/register", data, "post");
        return res.token;
    }

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async getAllGenres() {
        let res = await this.request("genres");
        return res.genres;
    }

    static async getAllPlaylist() {
        let res = await this.request("playlists");
        return res.playlist;
    }

    static async getAllSong() {
        let res = await this.request("songs");
        return res.songs;
    }

}

export default MelodyApi;
