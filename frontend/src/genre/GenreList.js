import React, { Component } from "react";
import { Col, Container, Row } from "react-bootstrap";
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
                <Container>
                    <Row>
                        {genres.map(genre => (
                            <Col className="mb-4">
                                <GenreCard
                                    key={genre.id}
                                    id={genre.id}
                                    name={genre.name}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>

            </div>
        )
    }
}

export default GenreList;
