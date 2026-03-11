// script.js - CMS Integration & Interactivity

const STRAPI_URL = 'http://localhost:1337'; // Change this when deploying the backend

/**
 * Helper to fetch data from Strapi
 */
async function fetchFromCMS(endpoint) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/${endpoint}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`[Content Not Available yet] Failed to fetch from ${endpoint}:`, error);
    return null;
  }
}

/**
 * Returns full image URL provided by Strapi
 */
function getImageUrl(mediaObj) {
  if (!mediaObj) return 'assets/placeholder-image.png';
  const url = mediaObj.url || (mediaObj.data && mediaObj.data.attributes && mediaObj.data.attributes.url);
  if (!url) return 'assets/placeholder-image.png';
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

/**
 * Initialize Portfolio CMS Data
 */
async function initCMS() {
  // 1. Fetch globals
  const globalData = await fetchFromCMS('global?populate=*');
  if (globalData && globalData.data) {
    populateGlobalData(globalData.data);
  }

  // 2. Fetch Projects
  if (document.querySelector('.projects-grid')) {
    const projectsData = await fetchFromCMS('projects?populate=*');
    if (projectsData && projectsData.data && projectsData.data.length > 0) renderProjects(projectsData.data);
  }

  // 3. Fetch Toolbox/Skills
  if (document.querySelector('.toolbox-grid')) {
    const skillsData = await fetchFromCMS('skills?populate=*');
    if (skillsData && skillsData.data && skillsData.data.length > 0) renderSkills(skillsData.data);
  }

  // 4. Fetch Process
  if (document.querySelector('.process-grid')) {
    const processData = await fetchFromCMS('processes?populate=*');
    if (processData && processData.data && processData.data.length > 0) renderProcess(processData.data);
  }

  // 5. Fetch FAQs (Contact Page)
  if (document.querySelector('.faq-list')) {
    const faqData = await fetchFromCMS('faqs?populate=*');
    if (faqData && faqData.data && faqData.data.length > 0) renderFAQs(faqData.data);
  }

  // 6. Fetch Products (Developer Tools)
  if (document.querySelector('#products-container')) {
    const productsData = await fetchFromCMS('products?populate=*');
    if (productsData && productsData.data && productsData.data.length > 0) {
      renderProducts(productsData.data);
    } else {
      // Fallback if empty
      document.querySelector('#products-container').innerHTML = `<p style="color: #666; text-align: center; padding: 40px;">No infra-products found in CMS. Add them in Strapi to see them here.</p>`;
    }
  }

  // 7. Wire up project detail modal
  initProjectModal();
}

/**
 * Replace text nodes globally for personal info
 */
function populateGlobalData(global) {
  // Use Yassir Mani's info as fallback/defaults
  const fullName = global?.fullName || 'Yassir Mani';
  const jobTitle = global?.jobTitle || 'Software Engineer';
  const email = global?.contactEmail || 'maniyassir65@gmail.com';

  // ===== Profile Picture from CMS =====
  const profilePicUrl = getImageUrl(global?.profilePicture);
  if (profilePicUrl && profilePicUrl !== 'assets/placeholder-image.png') {
    document.querySelectorAll('.cms-profile-img').forEach(img => {
      img.src = profilePicUrl;
    });
  }

  // Update name
  document.querySelectorAll('.hero__tag--outline, .hero__name, .contact-profile-card__name').forEach(el => {
    if (el.textContent.includes('Andrew') || el.textContent.includes('Yassir') || el.textContent.trim() === 'Andrew Scott') {
      el.textContent = fullName;
    }
  });

  // Update emails
  document.querySelectorAll('[href^="mailto:"]').forEach(el => {
    el.href = `mailto:${email}`;
    if (el.classList.contains('contact-profile-card__email') || el.classList.contains('footer-email-link')) {
      el.textContent = email;
    }
  });

  document.querySelectorAll('.navbar__email').forEach(el => {
    el.textContent = `Email: ${email}`;
  });

  // Update job titles
  document.querySelectorAll('.hero__role, .contact-profile-card__role, .hero__tag').forEach(el => {
    if (el.textContent.includes('Web-designer') || el.textContent.includes('Digital Designer') || el.textContent.includes('Software Engineer') || el.textContent.includes('Full-Stack Developer')) {
      el.textContent = jobTitle;
    }
    // Removed global.bio overwrite to preserve the high-impact engineering text in HTML
  });

  // Ensure hero description and button match the new tone
  const heroDesc = document.querySelector('.hero__desc');
  if (heroDesc && (!global || !global.bio)) {
    heroDesc.textContent = "I build scalable software, data-driven applications, and complex web systems that solve real business problems and automate processes.";
  }

  const heroBtn = document.querySelector('.hero[style*="margin-top: 48px"] .btn');
  if (heroBtn && (heroBtn.textContent.includes('See what i can do') || heroBtn.textContent.includes('View my systems'))) {
    heroBtn.innerHTML = `View my systems <span class="btn__icon">↗</span>`;
  }
}

/**
 * Render Projects Grid
 */
function renderProjects(projects) {
  const grid = document.querySelector('.projects-grid');
  if (!grid) return;

  grid.innerHTML = ''; // Clear hardcoded fallback

  // Store projects for the modal to access
  window._portfolioProjects = projects;

  projects.forEach((p, idx) => {
    const imgUrl = getImageUrl(p.thumbnail);

    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <div class="project-meta">
        <span class="project-category">{ ${p.category || 'Project'} }</span>
      </div>
      <h3>${p.title}</h3>
      <p class="project-services">${p.description || ''}</p>
      ${imgUrl ? `<img src="${imgUrl}" alt="${p.title}" class="project-image" style="margin-top: 24px;">` : ''}
      <div class="project-card-footer">
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener" class="btn-view-details" onclick="event.stopPropagation()">Live ↗</a>` : '<span></span>'}
        <button class="btn-view-details" data-project-idx="${idx}" onclick="openProjectDetail(${idx}); event.stopPropagation();">Voir le détail ↗</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Simple Markdown to HTML parser
 */
function parseMarkdown(md) {
  if (!md) return '';
  return md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^\s*[\-\*]\s+(.*)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

/**
 * Open project detail side panel
 */
function openProjectDetail(idx) {
  const p = (window._portfolioProjects || [])[idx];
  if (!p) return;

  const overlay = document.getElementById('projectOverlay');
  const panel = document.getElementById('projectPanel');
  if (!overlay || !panel) return;

  const imgUrl = getImageUrl(p.thumbnail);

  document.getElementById('panelImg').src = imgUrl || '';
  document.getElementById('panelImg').style.display = imgUrl ? 'block' : 'none';
  document.getElementById('panelCat').textContent = p.category || '';
  document.getElementById('panelTitle').textContent = p.title || '';
  document.getElementById('panelSubtitle').textContent = p.description || '';

  // Render Markdown to HTML
  document.getElementById('panelBody').innerHTML = p.detailedDescription
    ? parseMarkdown(p.detailedDescription)
    : '<p style="color:#888;">Aucun détail disponible pour ce projet.</p>';

  const linkEl = document.getElementById('panelLink');
  if (p.link) {
    linkEl.href = p.link;
    linkEl.style.display = 'inline-flex';
  } else {
    linkEl.style.display = 'none';
  }

  overlay.classList.add('is-open');
  panel.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

/**
 * Initialise project modal close handlers (called once on page load)
 */
function initProjectModal() {
  const overlay = document.getElementById('projectOverlay');
  const panel = document.getElementById('projectPanel');
  const closeBtn = document.getElementById('projectPanelClose');
  if (!overlay || !panel) return;

  function closePanel() {
    overlay.classList.remove('is-open');
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  closeBtn && closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });
}

/**
 * Render Tech Stack / Toolbox Grid
 */
function renderSkills(skills) {
  const grid = document.querySelector('.toolbox-grid');
  if (!grid) return;

  // Update the section heading
  const heading = document.querySelector('.toolbox .section-header h2');
  if (heading) heading.innerHTML = 'My Tech<br>Stack';
  const subLabel = document.querySelector('.toolbox .section-header .project-category');
  if (subLabel) subLabel.textContent = '{03} — Tech Stack';

  grid.innerHTML = '';

  // Icon colors per category
  const palette = [
    { bg: '#E0F9E0', color: '#1A8C1A' },
    { bg: '#E0EEFF', color: '#1A4FE4' },
    { bg: '#FFF3E0', color: '#C05A00' },
  ];

  skills.forEach((s, idx) => {
    const { bg, color } = palette[idx % palette.length];

    const initials = (s.name || '').substring(0, 2).toUpperCase();

    // --- Professional Override Logic ---
    let displayName = s.name;
    let displayCat = s.category || 'CATEGORY';
    let displayTech = s.technologies;

    if (s.name.includes('Backend') || s.category?.includes('Backend')) {
      displayCat = 'BACKEND & LOGIC';
      displayName = 'Core Systems & APIs';
      displayTech = 'Python, Laravel 11, Node.js, Java';
    } else if (s.name.includes('Frontend') || s.category?.includes('Frontend')) {
      displayCat = 'FRONTEND & MOBILE';
      displayName = 'Client-Side & Cross-Platform';
      displayTech = 'React.js, TypeScript, TailwindCSS, Flutter (Dart)';
    } else if (s.name.includes('Database') || s.category?.includes('Database')) {
      displayCat = 'DATABASE, DATA & DEVOPS';
      displayName = 'Infrastructure & Automation';
      displayTech = 'PostgreSQL, MongoDB, Redis, Docker, BeautifulSoup/Selenium';
    }

    const techs = (displayTech || '').split(',').map(t => t.trim()).filter(Boolean);
    const techPills = techs.map(t =>
      `<span style="display:inline-block; background:rgba(0,0,0,0.06); padding:4px 10px; border-radius:100px; font-size:0.8rem; font-weight:500; margin:4px 4px 0 0; color:#333;">${t}</span>`
    ).join('');

    const card = document.createElement('div');
    card.className = 'tool-card';
    // Compact: padding 24px, gap 24px
    card.style.cssText = 'background:var(--bg-white); padding:24px; border-radius:var(--radius-lg); display:flex; gap:24px; align-items:flex-start;';

    card.innerHTML = `
      <div style="background:${bg}; color:${color}; width:48px; height:48px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:1.1rem; font-weight:800; flex-shrink:0;">${initials}</div>
      <div style="flex:1;">
        <p style="color:var(--text-light); font-size:0.8rem; font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">${displayCat}</p>
        <h3 style="font-size:1.25rem; font-weight:600; margin-bottom:12px; color:#000;">${displayName}</h3>
        <div style="display:flex; flex-wrap:wrap;">${techPills}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/**
 * Render Process Steps
 */
function renderProcess(processes) {
  const grid = document.querySelector('.process-grid');
  if (!grid) return;

  grid.innerHTML = '';

  processes.forEach((p, idx) => {
    const attr = p;
    const numPad = (idx + 1).toString().padStart(2, '0');

    const card = document.createElement('div');
    card.className = 'process-card';
    // Compact: padding 24px
    card.style.cssText = 'background:var(--bg-card); padding:24px; border-radius:var(--radius-lg); position:relative;';

    card.innerHTML = `
            <div class="process-number" style="color:rgba(255,255,255,0.2); font-size:1.5rem; margin-bottom:16px;">/${attr.stepNumber || numPad}</div>
            <div class="pill process-badge" style="background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); margin-bottom:24px;">${attr.badgeName}</div>
            <h3 style="font-size:1.25rem; font-weight:500; margin-bottom:16px; line-height:1.4;">${attr.title}</h3>
            ${attr.descriptionListItem ? `<ul style="color:var(--text-light); font-size:0.95rem; margin-bottom:24px; padding-left:16px; list-style-type:circle;">
                <li><strong style="color:white;">Activity:</strong> ${attr.descriptionListItem}</li>
            </ul>` : ''}
            <div class="process-time" style="color:var(--lime); font-family:monospace;">/${attr.timeframe}/</div>
        `;
    grid.appendChild(card);
  });
}

/**
 * Render FAQs
 */
function renderFAQs(faqs) {
  const list = document.querySelector('.faq-list');
  if (!list) return;

  list.innerHTML = '';

  faqs.forEach((f, idx) => {
    const attr = f;
    const numPad = (idx + 1).toString().padStart(2, '0');

    const item = document.createElement('div');
    item.className = 'faq-item';
    // Add minimal CSS toggle directly mapped to the Framer styling 
    item.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:8px;">
                <div class="faq-question">
                    <span class="faq-number">${numPad}/</span> ${attr.question}
                </div>
                <div class="faq-answer" style="display:none; color:#666; font-size:1.1rem; line-height:1.6; margin-top:8px; padding-left:45px;">
                    ${attr.answer}
                </div>
            </div>
            <div class="faq-icon">+</div>
        `;

    item.addEventListener('click', () => {
      const answer = item.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      if (answer.style.display === 'none') {
        answer.style.display = 'block';
        icon.textContent = '-';
      } else {
        answer.style.display = 'none';
        icon.textContent = '+';
      }
    });

    list.appendChild(item);
  });
}
/**
 * Render Products (SaaS Boilerplates / Developer Tools)
 */
function renderProducts(products) {
  const container = document.querySelector('#products-container');
  if (!container) return;

  container.innerHTML = ''; // Clear fallback

  products.forEach(p => {
    const imgUrl = getImageUrl(p.thumbnail);
    const buyLink = p.buyLink || '#';
    const category = p.category || 'Tool';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.style.cssText = `background:#0D0D0D; border-radius:32px; overflow:hidden; display:flex; flex-direction:column; border:1px solid rgba(255,255,255,0.05); transition: transform 0.3s ease; margin-bottom: 24px;`;

    card.innerHTML = `
      <div class="product-visual" style="position:relative; padding:60px; display:flex; align-items:center; justify-content:center; background: radial-gradient(circle at center, #1A1A1A 0%, #000 100%);">
        <img src="${imgUrl}" alt="${p.title}" style="width:100%; max-width:800px; border-radius:12px; box-shadow: 0 40px 80px rgba(0,0,0,0.5);">
        <div style="position:absolute; top:40px; left:40px; background:var(--lime); color:#000; padding:8px 16px; border-radius:100px; font-weight:700; font-size:0.9rem; letter-spacing:1px; text-transform:uppercase;">${category}</div>
      </div>
      <div class="product-info" style="padding:48px; border-top:1px solid rgba(255,255,255,0.05);">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; gap:32px; flex-wrap:wrap;">
          <div style="flex:1; min-width:300px;">
            <h3 style="font-size: 2rem; font-weight:600; color:white; margin-bottom:16px;">${p.title}</h3>
            <p style="color:#888; font-size:1.1rem; line-height:1.6; max-width:550px;">
              ${p.description}
            </p>
          </div>
          <div style="flex-shrink:0;">
            <a href="${buyLink}" target="_blank" class="btn btn--lime" style="padding: 16px 32px; font-weight:700;">
               Buy the Starter Kit
              <span class="btn__icon" style="background:#000; color:var(--lime);">↗</span>
            </a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

/**
 * Contact Form Submission with FormSubmit
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const btn = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Change button state
    const originalBtnText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    statusEl.style.display = 'none';

    try {
      const formData = new FormData(form);
      const response = await fetch('https://formsubmit.co/ajax/maniyassir65@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();

      if (response.ok && result.success === "true") {
        statusEl.textContent = "Message sent successfully! I'll get back to you soon.";
        statusEl.style.color = '#1A8C1A'; // Green
        statusEl.style.display = 'block';
        form.reset();
      } else {
        throw new Error(result.message || 'Error sending message');
      }
    } catch (err) {
      statusEl.textContent = "Oops! Something went wrong. Please try emailing me directly at maniyassir65@gmail.com.";
      statusEl.style.color = '#C05A00'; // Orange/Red
      statusEl.style.display = 'block';
      console.error(err);
    } finally {
      btn.textContent = originalBtnText;
      btn.disabled = false;
    }
  });
}

// Start Fetching and Initialization on load
document.addEventListener('DOMContentLoaded', () => {
  initCMS();
  initContactForm();
});
