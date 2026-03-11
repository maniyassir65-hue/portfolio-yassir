const STRAPI_URL = 'http://localhost:1337';

const skillsToUpdate = [
    {
        id: 1,
        data: {
            category: 'BACKEND & LOGIC',
            name: 'Core Systems & APIs',
            technologies: 'Python, Laravel 11, Node.js, Java'
        }
    },
    {
        id: 2,
        data: {
            category: 'FRONTEND & MOBILE',
            name: 'Client-Side & Cross-Platform',
            technologies: 'React.js, TypeScript, TailwindCSS, Flutter (Dart)'
        }
    },
    {
        id: 3,
        data: {
            category: 'DATABASE, DATA & DEVOPS',
            name: 'Infrastructure & Automation',
            technologies: 'PostgreSQL, MongoDB, Redis, Docker, BeautifulSoup/Selenium'
        }
    }
];

async function updateSkills() {
    console.log('--- Updating Tech Stack to Professional Engineering Profile ---');
    for (const skill of skillsToUpdate) {
        try {
            const response = await fetch(`${STRAPI_URL}/api/skills/${skill.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: skill.data })
            });
            if (response.ok) {
                console.log(`✅ Updated: ${skill.data.name}`);
            } else {
                const errData = await response.json();
                console.error(`❌ Error updating ${skill.data.name}:`, errData);
            }
        } catch (error) {
            console.error(`❌ Error updating ${skill.data.name}:`, error.message);
        }
    }
    console.log('--- Done ---');
}

updateSkills();
