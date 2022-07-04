import React, { Component } from "react";
import { Link } from "react-router-dom";
import SongCard from "../song/SongCard";
import MelodyApi from "../api";

class PlaylistDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: { songs: [] },
        }
    }

    async componentDidMount() {
        let playlistId = this.props.match.params.playlist_id;
        let playlist = await MelodyApi.getPlaylistDetails(playlistId);
        let songs = await MelodyApi.getAllSongOfPlaylist(playlistId);
        this.setState({ playlist });
    }

    render() {
        let { songs } = this.state;

        return (
            <div>
                <div className="playlist-card my-3">
                    <div className="card-body">

                        <h5 className="card-title">Playlist: {playlist.id}</h5>
                        <p>Song list:</p>
                        {songs.map(song =>
                            <ol><SongCard
                                key={song.id}
                                id={song.id}
                                title={song.title}
                                uri={song.uri}
                                artist={song.artist}
                                length={song.length}
                                viewed={song.viewed}
                            />
                            </ol>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistDetails;
