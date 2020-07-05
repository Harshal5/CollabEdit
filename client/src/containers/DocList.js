import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDocs, removeDoc } from "../store/actions/docs";
import DocItem from "../components/DocItem";

class DocList extends Component {
  componentDidMount() {
    this.props.fetchDocs();
  }
  render() {
    const { docs, removeDoc, currentUser } = this.props;
    let docList = docs.map(d => (
      <DocItem
        key={d._id}
        docId={d._id}
        date={d.createdAt}
        text={d.text}
        name={d.user.name}
        removeDoc={removeDoc.bind(this, d.user._id, d._id)}
        isCorrectUser={currentUser.user.id === d.user._id}
        // isCurrentUserAuthenticated={currentUser.isAuthenticated}
      />
    ));
    return (
      <div className="row col-sm-8">
        <div className="offset-1 col-sm-10">
          <ul className="list-group" id="docs">
            {docList}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    docs: state.docs,
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps, { fetchDocs, removeDoc })(DocList);
