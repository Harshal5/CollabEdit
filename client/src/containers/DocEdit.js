import React, { Component } from "react";
import { connect } from "react-redux";

class DocEdit extends Component {
    componentDidMount() {
        // this.props.fetchEditors();
    }
    render() {


        return(
            <h1>Text Editor</h1>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    };
}

// export default connect(mapStateToProps, { fetchEditors })(DocList);
export default connect(mapStateToProps, null)(DocEdit);
