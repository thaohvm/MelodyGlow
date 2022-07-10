import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

class GenreCard extends Component {

    render() {
        let { id, name } = this.props;
        let genrePage = `/genre/${id}`;
        return (
            <Card style={{ width: '15rem' }}>
                <Card.Img variant="top" src="https://www.itl.cat/pngfile/big/115-1158096_cool-music.jpg" width="100"/>
                <Card.Body>
                    <Card.Title>
                        <Link to={genrePage}>
                        <h5 className="card-title">{name}</h5>
                    </Link>
                    </Card.Title>
                    <div className="GenreCard">
                        <div className="genre-card">
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default GenreCard;
