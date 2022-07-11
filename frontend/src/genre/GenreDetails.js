import React, { Component } from "react";
import SongCard from "../song/SongCard";
import MelodyApi from "../api";

class GenreDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: {
                name: "",
            },
            songs: []
        }
    }

    async componentDidMount() {
        let genre_id = this.props.match.params.genre_id;
        let genre = await MelodyApi.getGenreDetails(genre_id);
        let songs = await MelodyApi.getAllSongOfGenre(genre_id);
        this.setState({
            genre: genre,
            songs: songs,
        })
    }

    render() {
        let { genre, songs } = this.state;
        return (
            <div>
                <div className="genre-card my-3">
                    <div className="card-body">

                        <h5 className="genre-title">Genre: {genre.name}</h5>
                        <p>Song list:</p>
                        {songs.map(song =>
                            <ol><SongCard
                                key={song.id}
                                id={song.id}
                                title={song.title}
                                uri={song.uri}
                                artist={song.artist}
                                length={song.length}
                                viewed={song.viewed}
                            />
                            </ol>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default GenreDetails;
