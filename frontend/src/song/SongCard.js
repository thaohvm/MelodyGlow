import React, { Component } from "react";

class SongCard extends Component {

    render() {
        let { title, uri, artist, length, viewed } = this.props;

        return (
            <div>
                <div className="playlist-card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p>{uri}</p>
                        <p>By {artist}</p>
                        <p>Length: {length}</p>
                        <p>Viewed: {viewed}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default SongCard;
