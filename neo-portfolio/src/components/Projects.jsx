import React from 'react';

const projectData = [
    { id: 1, title: 'SilverLynx Tech', cat: 'Web Design', date: '5/31/24', img: 'assets/project-mobile.png' },
    { id: 2, title: 'Evergreen Solutions', cat: 'E-commerce', date: '8/8/24', img: 'assets/project-ecommerce.png' },
    { id: 3, title: 'EchoStream', cat: 'UI/UX App', date: '6/20/24', img: 'assets/project-mobile.png' },
    { id: 4, title: 'PulseTech Inc', cat: 'Web Dev', date: '7/13/24', img: 'assets/project-ecommerce.png' },
];

export default function Projects() {
    return (
        <section className="section" id="projects">
            <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '40px' }}>

                {/* Left Side: Header */}
                <div style={{ paddingRight: '40px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                    <h2 className="heading" style={{ fontSize: '3rem' }}>
                        Featured<br />
                        <span className="text-accent">Projects</span>
                    </h2>
                    <p className="subheading" style={{ maxWidth: '300px' }}>
                        I blend creativity with technical expertise to build pixel-perfect digital experiences.
                    </p>
                    <a href="#contact" className="neo-btn" style={{ marginTop: '20px' }}>
                        Start a project
                    </a>
                </div>

                {/* Right Side: Project Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                    {projectData.map((p) => (
                        <div key={p.id} className="neo-box" style={{ overflow: 'hidden', padding: '20px' }}>

                            <div className="neo-pressed" style={{
                                height: '180px',
                                borderRadius: 'var(--radius-sm)',
                                overflow: 'hidden',
                                padding: '4px'
                            }}>
                                <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                            </div>

                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{p.cat}</span>
                                    <h3 style={{ fontSize: '1.2rem', marginTop: '6px' }}>{p.title}</h3>
                                </div>
                                <div className="neo-pressed" style={{ padding: '6px 12px', fontSize: '0.8rem', borderRadius: '20px' }}>
                                    {p.date}
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
