import React, { Component } from "react";
import MelodyApi from "../api";
import GenreCard from "./GenreCard";

class GenreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: []
        }
    }

    async componentDidMount() {
        let genres = await MelodyApi.getAllGenres();
        console.log(genres);
        this.setState({ genres });
    }

    render() {
        let { genres } = this.state;
        return (
            <div className='GenreList'>
                <h1> List of genres</h1>

                {genres.map(genre => (
                    <GenreCard
                    key={genre.id}
                    name={genre.name}
                    />
                ))}
            </div>
        )
    }
}

export default GenreList;
