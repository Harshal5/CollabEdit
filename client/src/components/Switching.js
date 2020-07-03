import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';

const Switching = () => {
    return(
        <div>
        <BrowserRouter>
        <Switch>
          <Route exact path="/login/" >
            <Login />
          </Route>
          <Route exact path="/register/" >
            <Register />
          </Route>
          <Route exact path="/" >
            <Landing/>
          </Route>
        </Switch>
        </BrowserRouter>
    </div>
    )
}

export default Switching;