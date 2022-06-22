import React, { Component } from "react";

class GenreCard extends Component {

    render() {
        let { name } = this.props;

        return (
            <div>
                <div className="genre-card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p>List of songs</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default GenreCard;
