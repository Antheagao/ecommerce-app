import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar/>
          <main className="main">
            <Routes>
              <Route path="/" element={<h1>Home</h1>} />
              
            </Routes>
          </main>
        <Footer/>
      </div>
    </Router>
    
  );
}

export default App;
