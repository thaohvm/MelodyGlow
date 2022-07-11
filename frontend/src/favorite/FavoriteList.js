import React, { Component } from "react";
import NewPlaylistForm from "./NewPlaylistForm";
import MelodyApi from "../api";
import CurrentUserContext from "../users/CurrentUserContext";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

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
                <div className="fav-card">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="https://dm0qx8t0i9gc9.cloudfront.net/thumbnails/image/rDtN98Qoishumwih/abstract-musical-notes-background_MJS0eqv__thumb.jpg" width="100"></Card.Img>
                        <Card.Body>
                            <Card.Title>
                                <Link to={`/playlist/${playlist.id}`}><h5 className="card-title">{playlist.name}</h5></Link>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </div>
            );
        }
        return (
            <div className="Favorite">
                <NewPlaylistForm refreshPlaylists={this.refreshPlaylists} />
                <h2>
                    Your playlists
                </h2>
                <div className="container">
                    {playlists}
                </div>
            </div>
        );
    }
}

export default FavoriteList;
