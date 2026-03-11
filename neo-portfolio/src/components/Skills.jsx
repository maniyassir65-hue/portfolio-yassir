import React from 'react';

const skills = [
    { name: 'React & Vite', desc: 'Modern web frameworks', percent: 90 },
    { name: 'Figma', desc: 'UI/UX interface design', percent: 95 },
    { name: 'Neomorphism', desc: 'Advanced CSS styling', percent: 85 },
];

export default function Skills() {
    return (
        <section className="section" id="skills">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px' }}>

                {/* Left Side */}
                <div>
                    <h2 className="heading" style={{ fontSize: '3rem' }}>
                        Creative<br />
                        <span className="text-accent">Toolbox</span>
                    </h2>
                    <p className="subheading" style={{ maxWidth: '300px' }}>
                        My arsenal of digital tools to build cutting edge digital solutions.
                    </p>
                    <div className="neo-pressed" style={{
                        marginTop: '40px',
                        padding: '30px',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ fontSize: '4rem', fontWeight: 800, margin: 0, color: 'var(--accent)' }}>95+</h3>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Satisfaction Rate</span>
                    </div>
                </div>

                {/* Right Side: Skill bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', justifyContent: 'center' }}>
                    {skills.map((s, idx) => (
                        <div key={idx} className="neo-box" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700 }}>{s.name}</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{s.desc}</p>
                                </div>
                                <div className="neo-icon-btn" style={{ fontWeight: 800, color: 'var(--accent)' }}>
                                    {s.percent}%
                                </div>
                            </div>

                            {/* Progress track */}
                            <div className="neo-pressed" style={{ height: '16px', borderRadius: '10px', padding: '4px' }}>
                                <div className="neo-box" style={{
                                    height: '100%',
                                    width: `${s.percent}%`,
                                    borderRadius: '6px',
                                    background: 'var(--accent)',
                                    boxShadow: '0 0 10px rgba(200, 255, 0, 0.5)'
                                }}></div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
