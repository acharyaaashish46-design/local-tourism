import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return <header className="site-header"><Link className="brand" to="/" aria-label="Touriguide home"><span className="brand-mark">t</span><span>touriguide<small>KATHMANDU, NEPAL</small></span></Link><nav aria-label="Main navigation"><NavLink to="/" end>Explore</NavLink><NavLink to="/experience">Plan my day <span aria-hidden="true">↗</span></NavLink></nav></header>;
}
