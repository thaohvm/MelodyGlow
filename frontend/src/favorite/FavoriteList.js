import React, { Component } from "react";
import NewPlaylistForm from "./NewPlaylistForm";
import MelodyApi from "../api";
import CurrentUserContext from "../users/CurrentUserContext";

class FavoriteList extends Component {
    static contextType = CurrentUserContext;

    constructor(props) {
        super(props);
        this.state = {
            playlists: null
        }
        this.refreshPlaylists = this.refreshPlaylists.bind(this);
    }

    async componentDidMount() {
        await this.refreshPlaylists();
    }

    async refreshPlaylists() {
        const { currentUser } = this.context;
        if (currentUser !== null) {
            let playlists = await MelodyApi.getPlaylistByUser(currentUser);
            console.log(playlists);
            this.setState({ playlists: playlists });
        }
    }

    render() {
        let playlists = null;
        if (this.state.playlists !== null) {
            playlists = this.state.playlists.map((playlist) =>
                <div>
                    <li>{playlist.name}</li>
                    <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/record.png" width="100"></img>
                </div>

            );
        }

        return (
            <div>
                <NewPlaylistForm refreshPlaylists={this.refreshPlaylists} />
                <h2>
                    Your playlists:
                </h2>
                <ul>
                    {playlists}
                </ul>
            </div>
        );
    }
}

export default FavoriteList;
