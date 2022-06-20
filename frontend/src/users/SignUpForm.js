import React, { Component } from 'react';

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
                <h1>Register an account</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor='username'>Username: </label>
                        <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password: </label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='email'>Email: </label>
                        <input
                            type="text"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='location'>Location: </label>
                        <input
                            type="text"
                            name="location"
                            value={this.state.location}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button className='btn btn-primary'>Register</button>
                </form>
            </div>
        )
    }
}
export default SignUpForm;
