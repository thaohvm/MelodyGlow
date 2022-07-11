import React, { Component } from 'react';
import MelodyApi from "../api";
import CurrentUserContext from '../users/CurrentUserContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class NewPlaylistForm extends Component {
    static contextType = CurrentUserContext;
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "",
            image_url: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/record.png"
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async handleSubmit(e) {
        e.preventDefault();
        let { currentUser } = this.context;
        await MelodyApi.createNewPlaylist({ username: currentUser, name: this.state.name, image_url: this.state.image_url });
        await this.props.refreshPlaylists();
    }

    render() {
        return (
            <div className='NewPlaylistForm'>
                <Form>
                    <h1>Create new playlist</h1>
                    <form onSubmit={this.handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Playlist Name</Form.Label>
                            <Form.Control
                                placeholder='New playlist ...'
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                    </form>
                </Form>

            </div>
        )
    }
}

export default NewPlaylistForm;
