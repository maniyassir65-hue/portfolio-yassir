import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />

      {/* Footer minimaliste Neo */}
      <footer style={{ padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            © 2024 Andrew Scott. All rights reserved. (Neuorphism Demo)
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" className="neo-icon-btn" style={{ width: '40px', height: '40px' }}>𝕏</a>
            <a href="#" className="neo-icon-btn" style={{ width: '40px', height: '40px' }}>in</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
