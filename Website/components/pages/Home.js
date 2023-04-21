import React from 'react';
import '../../App.css';
// import Cards from '../Cards';
import Footer from '../Footer';
import HeroSection from '../HeroSection';
import FileUpload from '../FileUpload';
import DragDropFile from '../DragDropFile';

function Home() {
  return (
    <>
      {/* <HeroSection /> */}
      {/* <Cards /> */}
      <DragDropFile />
      {/* <FileUpload /> */}
      <Footer /> 
    </>
  );
}

export default Home;