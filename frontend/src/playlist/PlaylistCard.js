import React, { Component } from "react";
import SongList from "../song/SongList";
import { Link } from "react-router-dom";
import MelodyApi from "../api";
import SongCard from "../song/SongCard";

class PlaylistCard extends Component {
    render() {
        let { name, id, image_url } = this.props;
        let playlistPage = `/playlist/${id}`;

        return (
            <div>
                <div className="playlist-card my-3">
                    <div className="card-body">
                        <Link to={playlistPage}>
                            <h5 className="card-title">{name}</h5>
                        </Link>
                        <img id="img-playlist" src={image_url} width="200" height="200"></img>
                     </div>
                </div>
            </div>
        );
    }
}

export default PlaylistCard;
