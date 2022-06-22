import React, { Component } from "react";
import MelodyApi from "../api";
import PlaylistCard from "./PlaylistCard";

class PlaylistList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlists: []
        }
    }

    async componentDidMount() {
        let playlists = await MelodyApi.getAllPlaylist();
        console.log(playlists);
        this.setState({ playlists });
    }

    render() {
        let { playlists } = this.state;
        return (
            <div className='Playlist'>
                <h1> List of playlists</h1>

                {playlists.map(playlist => (
                    <PlaylistCard
                    key={playlist.id}
                    name={playlist.name}
                    image_url={playlist.image_url}
                    username={playlist.username}
                    />
                ))}
            </div>
        )
    }
}

export default PlaylistList;
