import '../styles/longform.css';

export default function NewsletterSection() {
  return (
    <section className="newsletter-section">
      <div className="page-shell">
        <div className="newsletter-box">
          <div className="newsletter-text">
            <h2>Get the <em>local route</em> in your inbox.</h2>
            <p>Once a month, we share a new story, a hidden courtyard, or a quiet momo spot. No spam, just slow travel.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing! Keep an eye on your inbox."); }}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit" className="button button-primary">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
}
