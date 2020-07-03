import React from "react";
import Switching from './Switching';
import { Link } from 'react-router-dom';


const Landing= () =>{
    return(
        <div class="container">
            <div class="jumbotron">
                <h1>Bootstrap Tutorial</h1>
                <div class="row">
                  <div class="col-sm-6">
                  <div class="card" style={{width: "18rem"}}>
                    <img src="" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <Link className="btn btn-primary" to = "/login">Login</Link>
                    </div>
                    </div>
                  </div>
                  <div class="col-sm-6">
                  <div class="card" style={{width: "18rem"}}>
                    <img src="" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Card title</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <Link className="btn btn-primary" to = "/register">Register</Link>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    );
}

export default Landing;