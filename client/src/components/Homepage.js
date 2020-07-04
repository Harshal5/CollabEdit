import React from "react";
import { Link } from "react-router-dom";
import DocTimeline from './DocTimeline';

const Homepage = ({ currentUser }) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>What's Happening?</h1>
                <h4>New to Warbler?</h4>
                <Link to="/register" className="btn btn-primary">
                    Sign up here
                </Link>
            </div>
        );
    }
    
  return (
    <div>
        <h1>You have made it!!</h1>
      <DocTimeline
        name={currentUser.user.name}
      />
    </div>
  );
};

export default Homepage;
