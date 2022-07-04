import React, { Component } from "react";
import SongList from "../song/SongList";
import { Link } from "react-router-dom";
import MelodyApi from "../api";
import SongCard from "../song/SongCard";

class PlaylistCard extends Component {
    render() {
        let { name, id } = this.props;
        let playlistPage = `/playlist/${id}`;

        return (
            <div>
                <div className="playlist-card my-3">
                    <div className="card-body">
                        <Link to={playlistPage}>
                            <h5 className="card-title">{name}</h5>
                        </Link>
                     </div>
                </div>
            </div>
        );
    }
}

export default PlaylistCard;
