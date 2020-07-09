import React from "react";
import { Link } from "react-router-dom";
import DocTimeline from './DocTimeline';

const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>Hey, Welcome!!!</h1>
                <h4>New to CollabEdit?</h4>
                <Link to="/register" className="btn btn-primary">
                    Register here
                </Link>
            </div>
        );
    }
    
  return (
    <div>
        {/* <h1>inside else!</h1> */}
      <DocTimeline
        name={currentUser.user.name}
      />
    </div>
  );
};

export default Homepage;
