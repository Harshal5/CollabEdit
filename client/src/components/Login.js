import React from "react";
import { Link } from "react-router-dom";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(userData);
    };

    render() {
        const errors = this.state.errors;

        return (
            <form onSubmit={this.onSubmit}>
 
                <div class="control-group">
                    <label class="control-label" for="email">E-mail</label>
                    <div class="controls">
                    <input 
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email} 
                        id="email" 
                        name="email"  
                        class="input-xlarge" 
                        /><p class="help-block">Please provide your E-mail</p>
                    </div>
                </div>
 
                <div class="control-group">
                    <label class="control-label" for="password">Password</label>
                    <div class="controls">
                    <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        type="password"
                    />
                    <p class="help-block">Password should be at least 4 characters</p>
                    </div>
                </div>

                <div class="control-group">
                    <div class="controls">
                        <button class="btn btn-success">Register</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default Login;