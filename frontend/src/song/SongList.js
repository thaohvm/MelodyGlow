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

    async componentDidMount() {
        let songs = await MelodyApi.getAllSong();
        console.log(songs);
        this.setState({ songs });
    }

    render() {
        let { songs } = this.state;
        return (
            <div className='Songs'>
                {songs.map(song => (
                    <SongCard
                    key={song.id}
                    title={song.title}
                    uri={song.uri}
                    artist={song.artist}
                    length={song.length}
                    viewed={song.viewd}
                    />
                ))}
            </div>
        )
    }
}

export default SongList;
