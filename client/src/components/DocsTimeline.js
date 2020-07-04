import React from "react";
import DocsList from "../containers/DocsList";
// import UserAside from "./UserAside";

const DocsTimeline = props => {
  return (
    <div className="row">
      {/* <UserAside
        profileImageUrl={props.profileImageUrl}
        username={props.username}
      /> */}
      <MessageList />
    </div>
  );
};

export default DocsTimeline;
