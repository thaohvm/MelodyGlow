import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'react-bootstrap';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        this.state = {
            username: "",
            password: "",
            email: "",
            location: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.handleSignUp(this.state);
        this.props.history.push("/");
    }
    render() {
        return (
            <div className='SignUpForm'>
                <div className='container'>
                    <h1>Register an account</h1>
                    <form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={this.state.username}
                                onChange={this.handleChange} />

                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.handleChange} />

                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange} />

                            <Form.Label>Location:</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={this.state.location}
                                onChange={this.handleChange} />
                        </Form.Group>
                        <Button variant="primary" type="submit">Register</Button>
                    </form>
                </div>

            </div>
        )
    }
}
export default SignUpForm;
