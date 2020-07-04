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
        date={d.createAt}
        text={d.text}
        username={d.user.name}
        // removeDoc={removeDoc.bind(this, d.user._id, d._id)}
        // isCorrectUser={currentUser === d.user._id}
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
    currentUser: state.currentUser.user.id
  };
}

export default connect(mapStateToProps, { fetchDocs, removeDoc })(DocList);
