import React from "react";
import DocList from "../containers/DocList";
import UserAside from "./UserAside";

const DocTimeline = props => {
  return (
    <div className="row">
      <UserAside
        name={props.name}
      />
      <DocList />
    </div>
  );
};

export default DocTimeline;
