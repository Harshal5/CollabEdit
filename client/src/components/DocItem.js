import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";

const DocItem = ({
  date,
  text,
  name,
  removeDoc,
  isCorrectUser
}) => (
  <div>
    <li className="list-group-item">
      <img
        src={''}
        alt={name}
        height="100"
        width="100"
        className="timeline-image"
      />
      <div className="message-area">
        <Link to="/">@{name} &nbsp;</Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        {isCorrectUser && (
          <a className="btn btn-danger" onClick={removeDoc}>
            Delete
          </a>
        )}
      </div>
    </li>
  </div>
);

export default DocItem;
