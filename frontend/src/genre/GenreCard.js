import React, { Component } from "react";
import { Link } from "react-router-dom";

class GenreCard extends Component {

    render() {
        let { id, name } = this.props;
        let genrePage = `/genre/${id}`;
        return (
            <div>
                <div className="genre-card my-3">
                    <div className="card-body">
                        <Link to={genrePage}>
                            <h5 className="card-title">{name}</h5>
                        </Link>
                     </div>
                </div>
            </div>
        );
    }
}

export default GenreCard;
