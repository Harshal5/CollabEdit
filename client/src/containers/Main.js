import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from '../components/Homepage';
import AuthForm from '../components/AuthForm';
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import DocForm from "../containers/DocForm";
import DocEdit from "../containers/DocEdit";

const Main = props => {
    const { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <HomePage currentUser= {currentUser} {...props} />} />
                <Route
                    exact
                    path="/login"
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                buttonText="Log in"
                                heading="Welcome Back."
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    exact
                    path="/register"
                    render={props => {
                        return (
                            <AuthForm
                                removeError={removeError}
                                errors={errors}
                                onAuth={authUser}
                                register
                                buttonText="Register"
                                heading="Join the Community Today"
                                {...props}
                            />
                        );
                    }}
                />
                <Route
                    path="/users/:id/docs/new"
                    component={withAuth(DocForm)}
                />
                <Route
                    path="/docs/:docId/edit"
                    component={withAuth(DocEdit)}
                />
            </Switch>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
  }
  
  export default withRouter(
    connect(mapStateToProps, { authUser, removeError })(Main)
  );