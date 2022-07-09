import React, { Component } from "react";
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
            alert(`${this.props.id} added to playlist ${this.state.selectedPlaylist}`);
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
            <div>
                <div className="song-card my-3">
                    <div className="card-body">
                        <h5>{song.title}</h5>
                        <p>By {song.artist}</p>
                        {/* <p>{song.uri}</p> */}
                        {/* <p>Length: {song.length}</p>
                        <p>Viewed: {song.viewed}</p> */}
                    </div>
                    <select onChange={this.handlePlaylistSelectChange} class="form-select">
                        <option selected>{SongCard.defaultPlaylistText}</option>
                        {playlists.map((playlist) =>
                            <option value={playlist.id}>{playlist.name}</option>)}
                    </select>
                    <button onClick={this.addToPlaylist}>Add</button>
                </div>
            </div>
        );
    }
}

export default SongCard;
