import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Parser from 'html-react-parser';

const DocItem = ({
  docId,
  date,
  text,
  name,
  removeDoc,
  isCorrectUser
  // isCurrentUserAuthenticated
}) => (
  <div>
    <li className="list-group-item">
      {/* <img
        src={''}
        alt={name}
        height="100"
        width="100"
        className="timeline-image"
      /> */}
      {/* {console.log(name)} */}
      
      <div className="message-area">
        <Link to="/">@{name} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{Parser(text)}</p>
        {/* {isCorrectUser ? ( */}
          <div>          
            <Link to={`/docs/${docId}/edit`} className="btn btn-outline-primary">
              Edit
            </Link>
            <button type="button" className="btn btn-outline-danger" onClick={removeDoc}>
              Delete
            </button>
          </div>
        {/* ) : (null)} */}
      </div>
    </li>
  </div>
);

export default DocItem;
