import React, { Component } from "react";
import MelodyApi from "../api";
import SongCard from "./SongCard";

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    // async componentDidMount() {
    //     let songs = await MelodyApi.getAllSong();
    //     this.setState({ songs });
    // }

    render() {
        let { songs } = this.state;

        return (
            <div>
                <div className="song-card my-3">
                    <div className="card-body">
                        {songs.map(song => (
                            <SongCard
                                key={song.id}
                                title={song.title}
                                uri={song.uri}
                                artist={song.artist}
                                length={song.length}
                                viewed={song.viewed}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SongList;
