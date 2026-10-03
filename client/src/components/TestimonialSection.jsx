import '../styles/longform.css';

export default function TestimonialSection() {
  const testimonials = [
    {
      quote: "The best way to know Kathmandu is to get lost in its alleys. Every dead end holds a shrine or a story.",
      author: "Prakash T.",
      role: "Local Guide"
    },
    {
      quote: "Forget the main roads. Follow the smell of toasted sesame and incense, and you'll find the real city.",
      author: "Sunita M.",
      role: "Shop Owner"
    },
    {
      quote: "It's a noisy city, but if you look closely, there is quietness in every courtyard.",
      author: "Rajan S.",
      role: "Photographer"
    }
  ];

  return (
    <section className="testimonial-section">
      <div className="page-shell">
        <div className="testimonial-content">
          <p className="eyebrow">Local Voices</p>
          <h2>Hear from the <em>city itself.</em></h2>
          <div className="testimonial-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <span className="quote-mark">“</span>
                <p className="quote-text">{t.quote}</p>
                <div className="quote-author">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
