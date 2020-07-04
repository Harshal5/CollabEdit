import React from "react";
import DocsList from "../containers/DocsList";
import UserAside from "./UserAside";

const DocsTimeline = props => {
  return (
    <div className="row">
      <UserAside
        name={props.name}
      />
      <DocsList />
    </div>
  );
};

export default DocsTimeline;
