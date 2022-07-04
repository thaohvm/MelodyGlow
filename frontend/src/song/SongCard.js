import React, { Component } from "react";

class SongCard extends Component {

    render() {
        let song = this.props;

        return (
            <div>
                <div className="song-card my-3">
                    <div className="card-body">
                        <h5>{song.title}</h5>
                        <p>By {song.artist}</p>
                        <p>{song.uri}</p>
                        <p>Length: {song.length}</p>
                        <p>Viewed: {song.viewed}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongCard;
