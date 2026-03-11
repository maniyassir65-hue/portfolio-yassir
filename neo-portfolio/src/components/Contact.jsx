import React from 'react';

export default function Contact() {
    return (
        <section className="section" id="contact" style={{ paddingBottom: '150px' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px' }}>

                {/* Left Side */}
                <div>
                    <h2 className="heading" style={{ fontSize: '3rem' }}>
                        Let's get in<br />
                        <span className="text-accent">Touch</span>
                    </h2>
                    <p className="subheading" style={{ maxWidth: '300px' }}>
                        Hit me up if you're looking for a fast, reliable web-designer who can bring your vision to life.
                    </p>
                    <a href="mailto:hello@andrew.design" className="neo-box" style={{
                        display: 'inline-flex',
                        padding: '20px 30px',
                        alignItems: 'center',
                        gap: '15px',
                        marginTop: '20px',
                        fontSize: '1.1rem',
                        fontWeight: '600'
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        hello@andrew.design
                    </a>
                </div>

                {/* Right Side: Contact Form Neo */}
                <div className="neo-box" style={{ padding: '50px' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '30px' }} onSubmit={(e) => e.preventDefault()}>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Name</label>
                                <input type="text" placeholder="John Doe" className="neo-pressed" style={{
                                    padding: '20px',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-family)',
                                    fontSize: '1rem',
                                    borderRadius: 'var(--radius-sm)'
                                }} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Email</label>
                                <input type="email" placeholder="john@example.com" className="neo-pressed" style={{
                                    padding: '20px',
                                    border: 'none',
                                    outline: 'none',
                                    color: 'var(--text-primary)',
                                    fontFamily: 'var(--font-family)',
                                    fontSize: '1rem',
                                    borderRadius: 'var(--radius-sm)'
                                }} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Message</label>
                            <textarea placeholder="Tell me about your project..." className="neo-pressed" rows="5" style={{
                                padding: '20px',
                                border: 'none',
                                outline: 'none',
                                color: 'var(--text-primary)',
                                fontFamily: 'var(--font-family)',
                                fontSize: '1rem',
                                borderRadius: 'var(--radius-sm)',
                                resize: 'none'
                            }}></textarea>
                        </div>

                        <button type="submit" className="neo-btn neo-btn--accent" style={{ alignSelf: 'flex-start', padding: '16px 40px', fontSize: '1.1rem' }}>
                            Send Message
                        </button>

                    </form>
                </div>

            </div>
        </section>
    );
}
