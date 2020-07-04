import React, { Component } from "react";
// import PropTypes from "prop-types";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
    //   profileImageUrl: ""
    };
  }

handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.register ? "register" : "login";
    this.props
        .onAuth(authType, this.state)
        .then(() => {
            this.props.history.push("/");
        })
        .catch(() => {
            return;
        });
};

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { email, name } = this.state;
        const {
            register,
            heading,
            buttonText,
            errors,
            history,    
            removeError
        } = this.props;
      
        history.listen(() => {  //for aany change in the route
            removeError();
        });
      
        return (
            <div>
                <div className="row justify-content-md-center text-center">
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <h2>{heading}</h2>
                            {errors.message && (
                                <div className="alert alert-danger">{errors.message}</div>
                            )}
                            <label htmlFor="email">Email:</label>
                            <input
                                // autoComplete="off"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={this.handleChange}
                                type="text"
                                value={email}
                            />
                            <label htmlFor="password">Password:</label>
                            <input
                                // autoComplete="off"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={this.handleChange}
                                type="password"
                                // value={password}
                            />
                            {register && (
                            <div>
                                <label htmlFor="name">Name:</label>
                                <input
                                    autoComplete="off"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={this.handleChange}
                                    type="text"
                                    value={name}
                                />
                            </div>
                            )} 
                            <button
                                type="submit"
                                className="btn btn-primary btn-block btn-lg"
                            >
                            {buttonText}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


// AuthForm.propTypes = {
//   buttonText: PropTypes.string,
//   errors: PropTypes.object,
//   heading: PropTypes.string,
//   history: PropTypes.object,
//   onAuth: PropTypes.func,
//   signIn: PropTypes.bool,
//   removeError: PropTypes.func
// };

export default AuthForm;

