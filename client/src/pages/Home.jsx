import Hero from '../components/Hero.jsx';
import CategoryGrid from '../components/CategoryGrid.jsx';

export default function Home() {
  return <><Hero /><section className="home-intro"><p className="eyebrow">A slower way to see the city</p><h2>Skip the checklist.<br /><em>Find your kind of place.</em></h2><p>From a beloved momo counter to a courtyard hidden behind an unmarked door, Kathmandu is best discovered one local story at a time.</p></section><CategoryGrid /></>;
}
