import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDoc, updateInput, updateTheDoc } from '../store/actions/doc';
import  { Redirect } from 'react-router-dom'
import io from 'socket.io-client';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ENDPOINT = "http://localhost:5000";


class DocEdit extends Component {

    constructor(props){
        super(props);
        // let socket;
        
        // this.state= {
        //     doc: ''
        // };
        // this.props.fetchDoc(this.props.match.params.docId);
    }
    componentDidMount() {
        this.props.fetchDoc(this.props.match.params.docId);
       
        this.socket = io.connect(ENDPOINT);
        this.socket.on('updatemessage', message => {
            console.log(message);
            this.props.updateInput(message);
            // outputMessage(message);
            
            // Scroll down
            // chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        // const socket = socketIOClient(ENDPOINT);
        // socket.emit("initial_data");
        // this.state= {
        //     doc: this.props.doc
        // };
        // console.log(this.props.doc);
    }

    // componentDidUpdate() {

    // }
    
    // handleChange = (value) => {
    //     // this.setState({ doc: value });
    //     console.log(value);
    //     this.setState({ doc: value });

        
    // }

    handleUpdateDoc = (event) => {
        // this.props.postNewDoc(this.state.newdoc);
        // console.log(event.target.value);
        // this.setState({ doc: value });
        event.preventDefault();
        this.props.updateTheDoc(this.props.match.params.docId);
        this.props.history.push("/");
        
        // <Redirect to='/'  />
    }
    
    handleChange = (value)=> {
        this.props.updateInput(value)
        // console.log(event.target.value);
        this.socket.emit('message', value, (error) => {
            // console.log(event.target.value);
            
            if(error) {
              alert(error);
            }
        });
        
    }


    render() {
        // const { currentUser } = this.props;
        // console.log(this.props.doc);
        // const initial = this.props.doc.text;
    
        return(
            <form onSubmit={this.handleUpdateDoc}>
                {this.props.errors.message && (
                    <div className="alert alert-danger">{this.props.errors.message}</div>
                )}
                {/* <ReactQuill
                    value={this.props.doc.text} 
                    onChange={ value => {
                            console.log(value);
                            // const cleanedValue = value.replace(/<p><\/p><strong><\/strong>/g,' ');
                            // this.setState({ doc: value}) ;
                            // console.log(cleanedValue);
                        }
                    }
                /> */}

                {/* <input
                    type="text"
                    className="form-control"
                    value={this.props.doc}
                    onChange={ this.handleChange}
                /> */}
                
                <ReactQuill 
                    value={this.props.doc} 
                    onChange={this.handleChange} 
                />

                <button type="submit" className="btn btn-success">
                    Update my Document!
                </button>
            </form>            
        );
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors,
        doc: state.doc
    };
}

export default connect(mapStateToProps, { fetchDoc, updateInput, updateTheDoc })(DocEdit);
// export default connect(mapStateToProps, null)(DocEdit);
