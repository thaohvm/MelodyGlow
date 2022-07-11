import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleLogin(this.state, this.props.history);
    }

    render() {
        return (
            <div className='LoginForm'>
                <div className='container'>
                    <h1>Login</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange} />
                            <Form.Label>Password:</Form.Label>
                            <Form.Control type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </form>
                </div>

            </div>
        )
    }
}
export default LoginForm;
