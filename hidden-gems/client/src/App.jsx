import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Experience from './pages/Experience.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/experience" element={<Experience />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
