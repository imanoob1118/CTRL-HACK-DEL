import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import AI from './pages/Ai/Ai';
import About from './pages/About/About';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ai" element={<AI />} />
        <Route path='/About' element={<About/>}/>

      </Routes>
    </Router>
  );
}

export default App;