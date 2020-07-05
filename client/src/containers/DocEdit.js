import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDoc } from '../store/actions/doc';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class DocEdit extends Component {

    constructor(props){
        super(props);
        this.state= {
            doc: ''
        };
        // this.props.fetchDoc(this.props.match.params.docId);
    }
    componentDidMount() {
        this.props.fetchDoc(this.props.match.params.docId);
        console.log(this.props);
        // this.setState({ doc: })
    }
    
    // handleChange = (value) => {
    //     // this.setState({ doc: value });
    //     console.log(value);
    //     this.setState({ doc: value });

        
    // }

    handleUpdateDoc = (event) => {
        // this.props.postNewDoc(this.state.newdoc);
        // console.log(event.target.value);
        event.preventDefault();
        
        // this.setState({ doc: value });
        this.props.history.push("/");
    }


    render() {
        // const { currentUser } = this.props;
        // console.log(this.props.doc.text);
        
        return(
            <form onSubmit={this.handleUpdateDoc}>
                {this.props.errors.message && (
                    <div className="alert alert-danger">{this.props.errors.message}</div>
                )}
                <ReactQuill
                    value={this.props.doc.text} 
                    onChange={ value => {
                            console.log(value);
                            // const cleanedValue = value.replace(/<p><\/p><strong><\/strong>/g,' ');
                            // this.setState({ doc: value}) ;
                            // console.log(cleanedValue);
                        }
                    }
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

export default connect(mapStateToProps, { fetchDoc })(DocEdit);
// export default connect(mapStateToProps, null)(DocEdit);
