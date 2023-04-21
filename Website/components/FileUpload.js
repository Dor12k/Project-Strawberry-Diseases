import React from 'react'
import axios from 'axios';
import {Post} from './Post';
// eslint-disable-next-line
import { useState, useRef } from "react";
 
class FileUpload extends React.Component{

    constructor(props){
        super(props);
        this.state = { posts: [],};
        this.handleInputChange = this.handleInputChange.bind(this);
    }
 
    submit(){

        const formData = new FormData() 

        formData.append('file', this.state.selectedFile)
        console.warn(this.state.selectedFile);
        let url = "http://localhost:8000/predict";
 
        let res = axios.post(url, formData, { // receive two parameter endpoint url ,form data 
        })
        .then((response) => {

            const posts = [];

            posts.push( {id:'1', class: response.data.class});
            posts.push( {id:'2', confidence: response.data.confidence});

            console.log(posts)

            this.setState({ posts : posts,});

        })
        .then(res => { // then print response status
            console.warn(res);
        })
        if (res.status === 200) {

            // let confidence = (parseFloat(data.confidence) * 100).toFixed(2);
        }
 
    }
 
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    
    render(){

        const posts = this.state.posts.map((post) => {
            return <Post key={post.id} post={post} />; 
        });

        return(
            <>
            
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />
                            <h3 className="text-white">Welcome to Strawberry Diseases Classification</h3>
                            <br />

                            <div className="form-row">
                                <video src="/videos/video-8.mp4" autoPlay loop muted />
 
                                {/* <div className="form-group col-md-6"> */}
                                    <label className="text-white">Select File : </label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                                {/* </div> */}
                            </div>
 
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Upload</button>
                                </div>
                            </div>

                            <div >
                                <h1 className='font-bold text-xl my-3'> Result</h1>
                                <div className='flex mx-2'>{posts}</div>

                            </div>
                    </div>
                </div>
            </div>
            </>
        )  
    }
}
 
export default FileUpload;