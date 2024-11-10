import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About/About';
import AI from './pages/Ai/Ai';
import Features from './pages/Features/Features';
import Pricing from './pages/Pricing/Pricing';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ai" element={<AI />} />
        <Route path='/About' element={<About />} />
        <Route path='/Features' element={<Features />} />
        <Route path='/Pricing' element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App;