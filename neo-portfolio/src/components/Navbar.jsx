import React from 'react';

export default function Navbar() {
    return (
        <nav style={{ padding: '24px 0', position: 'sticky', top: 0, zIndex: 100 }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo Neo */}
                <div className="neo-pressed" style={{ display: 'flex', alignItems: 'center', padding: '10px 20px', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }}></div>
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>NEOSTACK</span>
                </div>

                {/* Links Neo */}
                <div className="neo-box" style={{ display: 'flex', gap: '30px', padding: '12px 30px', borderRadius: '50px' }}>
                    <a href="#projects" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Projects
                    </a>
                    <a href="#skills" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Skills
                    </a>
                    <a href="#contact" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-secondary)', transition: '0.3s' }}
                        onMouseOver={(e) => e.target.style.color = 'var(--text-primary)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
                        Contact
                    </a>
                </div>

                {/* CTA */}
                <div>
                    <a href="#contact" className="neo-btn neo-btn--accent">Get in touch</a>
                </div>
            </div>
        </nav>
    );
}
