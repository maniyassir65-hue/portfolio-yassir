import React from 'react';

export default function Hero() {
    return (
        <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>

                {/* Left Formulaire Neo */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="neo-pressed" style={{ display: 'inline-flex', padding: '10px 20px', borderRadius: '50px', width: 'fit-content' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)' }}>● Available for freelance</span>
                    </div>

                    <h1 className="heading">
                        Hi! I'm <br />
                        <span style={{ color: 'var(--text-secondary)' }}>Andrew Scott</span><br />
                        a Digital Designer
                    </h1>

                    <p className="subheading">
                        Turning your ideas into pixel-perfect realities. I specialize in Neomorphic dark mode interfaces built entirely with React.
                    </p>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="#projects" className="neo-btn">See my work</a>
                        <a href="#contact" className="neo-icon-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </a>
                    </div>
                </div>

                {/* Right - Profil Neo */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* Avatar Base - Neo Box */}
                    <div className="neo-box" style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div className="neo-pressed" style={{ width: '320px', height: '320px', borderRadius: '40px', padding: '10px' }}>
                            <img
                                src="assets/profile.png"
                                alt="Profile"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }}
                            />
                        </div>
                    </div>

                    {/* Floating widget */}
                    <div className="neo-box" style={{ position: 'absolute', bottom: '-20px', left: '20px', padding: '20px', borderRadius: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div className="neo-icon-btn" style={{ width: '40px', height: '40px' }}>
                            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>+95%</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>Client ROI</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Guaranteed</span>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
