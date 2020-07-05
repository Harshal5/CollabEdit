import React, { Component } from "react";
import { connect } from "react-redux";
import { postNewDoc } from "../store/actions/docs";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class DocForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newdoc: ""
    };

  }

  handleNewDoc = event => {
    event.preventDefault();
    this.props.postNewDoc(this.state.newdoc);
    this.setState({ newdoc: "" });
    this.props.history.push("/");
  };

  handleChange = (value) => {
    this.setState({ newdoc: value });
  }

  render() {
    return (
      <form onSubmit={this.handleNewDoc}>
        {this.props.errors.message && (
          <div className="alert alert-danger">{this.props.errors.message}</div>
        )}
         <ReactQuill 
            value={this.state.newdoc} 
            onChange={this.handleChange} 
          />
        {/* <input
          type="text"
          className="form-control"
          value={this.state.doc}
          onChange={e => this.setState({ doc: e.target.value })}
        /> */}
        <button type="submit" className="btn btn-success">
          Add my Document!
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errors: state.errors
  };
}

export default connect(mapStateToProps, { postNewDoc })(DocForm);
