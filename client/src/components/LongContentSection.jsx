import '../styles/longform.css';
import { Link } from 'react-router-dom';

export default function LongContentSection() {
  return (
    <section className="long-content-section">
      <div className="page-shell">
        <article className="long-content-article">
          <p className="eyebrow">The Philosophy</p>
          <h2>Why we travel <em>slowly.</em></h2>
          
          <div className="content-prose">
            <p className="lead">
              Kathmandu isn't a city you can simply tick off a checklist. It's a living, breathing labyrinth of stories that demand your time and patience.
            </p>
            
            <p>
              When you rush from one UNESCO heritage site to another, you miss the quiet moments that make this valley special. You miss the old woman lighting a butter lamp in a forgotten courtyard. You miss the sound of a brass worker's hammer ringing out in the morning air. You miss the smell of freshly toasted sesame seeds drifting from a hidden momo shop.
            </p>
            
            <figure className="content-figure">
              <img src="/pashupatinath.jpg" alt="A quiet courtyard in Kathmandu" />
              <figcaption>Look for the details hidden in plain sight.</figcaption>
            </figure>
            
            <h3>The Art of Getting Lost</h3>
            <p>
              We believe the best way to explore is to put away the map and let the city lead you. The narrow alleyways (gullies) of Ason and Patan were designed to confuse invading armies, but today, they are perfect for losing yourself in the rhythm of local life.
            </p>
            
            <p>
              Our guides are not here to lecture you on dates and dynasties. They are here to introduce you to the people who make this city pulse. To show you where to find the best juju dhau (King Curd) in Bhaktapur, or how to spin a prayer wheel correctly at Boudhanath.
            </p>
            
            <div className="callout-box">
              <span className="callout-icon">🌿</span>
              <h4>A Gentle Reminder</h4>
              <p>Remember that you are walking through people's living rooms. A courtyard (baha) might look like a public square, but it is a communal home. Walk softly, ask before you photograph, and always smile.</p>
            </div>
            
            <h3>Beyond the Dust and Noise</h3>
            <p>
              Yes, Kathmandu can be overwhelming. The traffic, the dust, the constant hum of life. But step through a low wooden doorway, and you might find yourself in a 14th-century vihara, entirely silent except for the cooing of pigeons.
            </p>
            
            <p>
              That is the magic of the valley. It hides its best secrets from those in a hurry. Join us, slow down, and find your kind of place.
            </p>
            
            <div className="article-actions">
              <Link to="/experience" className="button button-primary">Start your slow journey</Link>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
