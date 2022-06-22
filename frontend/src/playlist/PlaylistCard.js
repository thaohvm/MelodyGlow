import React, { Component } from "react";
import SongCard from "../song/SongCard";

class PlaylistCard extends Component {

    render() {
        let { name } = this.props;

        return (
            <div>
                <div className="playlist-card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <SongCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default PlaylistCard;
