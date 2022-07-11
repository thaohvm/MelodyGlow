import React, { Component } from "react";
import { ListGroup, Button } from "react-bootstrap";
import MelodyApi from "../api";
import CurrentUserContext from "../users/CurrentUserContext";

class SongCard extends Component {
    static contextType = CurrentUserContext;
    static defaultPlaylistText = "Add to your playlist";

    constructor(props) {
        super(props);
        this.state = {
            playlists: [],
            selectedPlaylist: SongCard.defaultPlaylistText
        }
        this.showPlaylists = this.showPlaylists.bind(this);
        this.addToPlaylist = this.addToPlaylist.bind(this);
        this.handlePlaylistSelectChange = this.handlePlaylistSelectChange.bind(this);
    }

    handlePlaylistSelectChange(e) {
        const selectedPlaylist = e.target.value;
        this.setState({
            selectedPlaylist: selectedPlaylist
        });
    }

    async componentDidMount() {
        await this.showPlaylists();
    }

    async addToPlaylist() {
        if (this.state.selectedPlaylist !== SongCard.defaultPlaylistText) {
            // Only call API if selected option is different than default text
            await MelodyApi.addSongToPlaylist(this.state.selectedPlaylist, this.props.id);
            alert(`${this.props.title} added to playlist ${this.state.selectedPlaylist}`);
        }
    }

    async showPlaylists(e) {
        const { currentUser } = this.context;
        let playlists = await MelodyApi.getPlaylistByUser(currentUser);
        this.setState({
            playlists: playlists,
        })
        console.log(playlists)
    }

    render() {
        let song = this.props;
        let { playlists } = this.state;

        return (
            <div className="Songcard">
                <ListGroup>
                    <ListGroup.Item>
                        {song.title} by {song.artist}
                        <select className="select-song" onChange={this.handlePlaylistSelectChange}>
                            <option selected> {SongCard.defaultPlaylistText}</option>
                            {playlists.map((playlist) =>
                                <option value={playlist.id}>{playlist.name}</option>)}
                        </select>
                        <Button size="sm" onClick={this.addToPlaylist}>Add</Button>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        );
    }
}

export default SongCard;
