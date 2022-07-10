import React, { Component } from "react";
import SongCard from "./SongCard";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SongList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: []
        }
    }

    render() {
        let { songs } = this.state;

        return (
            <Container>
                <Row>
                    <Col  xs={6} md={4}>
                    {songs.map(song => (
                            <SongCard
                                key={song.id}
                                title={song.title}
                                uri={song.uri}
                                artist={song.artist}
                                length={song.length}
                                viewed={song.viewed}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SongList;
