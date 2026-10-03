import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Experience from './pages/Experience.jsx';

export default function App() {
  return <><Navbar /><main><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/category/:slug" element={<Category />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></main><footer className="site-footer"><span>Touriguide</span><span>A little closer to local life · Kathmandu, Nepal</span></footer></>;
}
