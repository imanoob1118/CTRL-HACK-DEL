import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './pages/About/About';
import AI from './pages/Ai/Ai';
import VideoPage from './pages/Videos/VideoPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Ai" element={<AI />} />
        <Route path='/About' element={<About />} />
        <Route path='/Video' element={<VideoPage />} />

      </Routes>
    </Router>
  );
}

export default App;