
import '../App.css';
import React from 'react'
import axios from 'axios';
import {Post} from './Post';

// eslint-disable-next-line
import { useState, useRef } from "react";
// eslint-disable-next-line
import { Button } from './Button';

class DragDropFile extends React.Component{

    constructor(props){
        super(props);
        // this.state = { [files, setFiles] = useState={}}
        this.inputRef = React.createRef();
        this.state = { posts: [], files: [], selectedFile: [], check: []};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
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
            const score = (parseFloat(response.data.confidence) * 100).toFixed(2) + "%";

            const pred = "Class: " + response.data.class;
            const conf = "Confidence: " + score;

            posts.push( {id:'1', class: pred});
            posts.push( {id:'2', confidence: conf});

            console.log(posts)

            this.setState({ posts : posts,});
        })
        .then(res => { // then print response status
            console.warn(res);
        })
        if (res.status === 200) {

            // this.state = {dat : res.data};
            // let confidence = (parseFloat(data.confidence) * 100).toFixed(2);
        }
 
    }
 
    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    handleDragOver(event) {
            event.preventDefault();
    }
        
    handleDrop(event){
        event.preventDefault();

        this.setState({
            selectedFile: event.dataTransfer.files[0],
          })
        
        console.log(event.dataTransfer.files)
    }

    render(){

        const posts = this.state.posts.map((post) => {
            return <Post key={post.id} post={post} />; 
        });

        return(
            <>
            
            <div>
            <div className='hero-container'>
                <video src='/videos/video-8.mp4' autoPlay loop muted />

                <div className='dropzone'
                     onDragOver={this.handleDragOver}
                     onDrop={this.handleDrop}>

                    <h1>Welcome </h1>
                    <p>Drag and drop an image of a strawberry plant leaf to process</p>

                    <input 
                        type="file"
                        multiple
                        onChange={(event) => this.setState({selectedFile : event.target.files[0]})}
                        hidden
                        accept="image/png, image/jpeg"
                        ref={this.inputRef}
                    />
                    <button onClick={() => this.inputRef.current.click()}>Select Files</button>

                    {this.state.selectedFile.name && 

                        <div className="uploads">
                            <ul>
                                {Array.from(this.state.files).map((file, idx) => <li key={idx}>{file.name}</li> )}
                            </ul>
                            <div className="actions">

                                <button onClick={() => this.setState({selectedFile: []})}>Cancel</button>
                                {/* <button onClick={this.submit()}>Upload</button> */}

                                {this.submit()}
                                {this.setState({selectedFile: []})}
                            </div>
                        </div>
                    }

                    <div className='flex mx-2' >
                        <h1> {posts} </h1>
                    </div>

                </div>
                </div>
            </div>
            </>
        )  
    }
}
 
export default DragDropFile;