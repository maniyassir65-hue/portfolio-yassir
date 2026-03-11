// import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }) {
    try {
      const publicRole = await strapi.query('plugin::users-permissions.role').findOne({
        where: { type: 'public' },
      });

      if (publicRole) {
        // Read-only APIs
        const apisReadOnly = ['global', 'project', 'faq', 'testimonial'];
        // Read+write APIs (needed for seeding)
        const apisReadWrite = ['skill', 'process'];
        const readActions = ['find', 'findOne'];
        const writeActions = ['find', 'findOne', 'create', 'delete'];

        const grantIfMissing = async (actionStr: string) => {
          const existing = await strapi.query('plugin::users-permissions.permission').findOne({
            where: { action: actionStr, role: publicRole.id },
          });
          if (!existing) {
            await strapi.query('plugin::users-permissions.permission').create({
              data: { action: actionStr, role: publicRole.id },
            });
            strapi.log.info(`Granted: ${actionStr}`);
          }
        };

        for (const api of apisReadOnly) {
          for (const action of readActions) await grantIfMissing(`api::${api}.${api}.${action}`);
        }
        for (const api of apisReadWrite) {
          for (const action of writeActions) await grantIfMissing(`api::${api}.${api}.${action}`);
        }
      }

      // Seed the 4 exactly requested FAQs if the collection is empty
      const existingFaqs = await strapi.documents('api::faq.faq').findMany();
      if (existingFaqs.length === 0) {
        const faqs = [
          {
            question: "How do you integrate with existing technical teams or legacy systems?",
            answer: "I am comfortable working as a solo technical partner or integrating seamlessly with your in-house engineering team. For legacy systems, I specialize in gradual modernization—building robust APIs to connect old databases with modern, scalable frontends without disrupting your current daily operations."
          },
          {
            question: "What is your typical development and delivery workflow?",
            answer: "I follow a strict engineering process: Architecture & Scoping first, followed by iterative agile development. I provide regular updates, dedicated staging environments for your team to test, and ensure the entire codebase is heavily documented before the final production deployment."
          },
          {
            question: "Do you provide post-launch maintenance and infrastructure support?",
            answer: "Absolutely. Launching is only the first step. I offer ongoing retainer contracts for server monitoring, database scaling, security patch updates, and new feature integrations to ensure your software handles growth seamlessly."
          },
          {
            question: "How do you structure pricing for your engineering services?",
            answer: "I focus on value and ROI, not just hours. Depending on your scope, I offer fixed-price milestones for clear, defined projects, or a monthly technical partnership retainer for ongoing development and CTO-level advisory. Let's book a call to discuss your specific technical bottlenecks."
          }
        ];

        for (const faq of faqs) {
          await strapi.documents('api::faq.faq').create({
            data: {
              ...faq,
              publishedAt: new Date(),
            },
            status: 'published'
          });
        }
        strapi.log.info('Seeded 4 FAQs successfully!');
      }

    } catch (e) {
      strapi.log.error('Failed to set public permissions automatically or seed FAQs', e);
    }
  },
};
