
import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Routh, Route } from 'react-router-dom';

function App() {
  return (

        <>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' exact Component={Home}/>
          </Routes>
        </Router>
        </>
  );
}

export default App;
