<template>
  <div class="contact-page">
    <div class="container-sm text-center hero-block" data-aos="fade-up">
      <div class="hero-icon-wrapper">
        <Icon name="mail" :size="48" class="hero-icon" />
      </div>
      <h1>Get in Touch</h1>
      <p class="hero-desc">
        We'd love to hear from you. Questions, feedback, or collaborations—we're here to help.
      </p>
    </div>

    <!-- AI-Readable Summary Box -->
    <div class="container">
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          Contact FikrNa
        </h3>
        <p class="summary-text">
          <strong>FikrNa</strong> welcomes inquiries, feedback, support requests, and collaboration opportunities. Users can contact FikrNa via email (siteosia@gmail.com), WhatsApp (+92 343 5219710), or visit the office in Tandlianwala, Faisalabad, Punjab, Pakistan. 
          The contact page provides a contact form for sending messages, displays contact information including email, phone, and physical address, and offers support hours (Monday-Friday, 9am-6pm PKT). Typical email response time is 24 hours. For quick help, users can check FAQ sections on individual tool pages.
        </p>
      </div>
    </div>

    <div class="container">
      <div class="contact-grid">
        
        <!-- Contact Info Side -->
        <div class="info-column" data-aos="fade-right">
          
          <div class="info-card card-premium">
            <div class="icon-box"><Icon name="mail" :size="24" /></div>
            <div>
              <h3>Email Us</h3>
              <a href="mailto:siteosia@gmail.com" class="contact-link">siteosia@gmail.com</a>
              <p class="sub-text">Typical response time: 24h</p>
            </div>
          </div>

          <div class="info-card card-premium">
            <div class="icon-box"><Icon name="message-circle" :size="24" /></div>
            <div>
              <h3>WhatsApp Support</h3>
              <a href="https://wa.me/923435219710" target="_blank" rel="noopener" class="contact-link">+92 343 5219710</a>
              <p class="sub-text">Mon-Fri, 9am - 6pm PKT</p>
            </div>
          </div>

          <div class="info-card card-premium">
            <div class="icon-box"><Icon name="map-pin" :size="24" /></div>
            <div>
              <h3>Visit Us</h3>
              <p class="address-text">
                37150, Tandlianwala<br>
                Faisalabad, Punjab, Pakistan
              </p>
            </div>
          </div>

          <div class="card-premium glass help-card">
            <h3><Icon name="help-circle" :size="20" /> Need Quick Help?</h3>
            <p>Check our FAQ section on tool pages for instant answers to common questions.</p>
          </div>

          <!-- Popular Tools -->
          <div class="card-premium tools-card">
            <h3><Icon name="grid" :size="20" /> Popular Tools</h3>
            <p>While you're here, explore our free tools:</p>
            <div class="tools-grid">
              <router-link to="/tools/bmi-calculator" class="tool-link">
                <Icon name="heart" :size="16" />
                BMI Calculator
              </router-link>
              <router-link to="/tools/calorie-tracker" class="tool-link">
                <Icon name="activity" :size="16" />
                Calorie Tracker
              </router-link>
              <router-link to="/tools/salary-tax-calculator" class="tool-link">
                <Icon name="dollar-sign" :size="16" />
                Salary Calculator
              </router-link>
              <router-link to="/tools/meal-planner" class="tool-link">
                <Icon name="calendar" :size="16" />
                Meal Planner
              </router-link>
            </div>
            <router-link to="/" class="btn btn-outline mt-3" style="width: 100%; justify-content: center;">
              View All Tools <Icon name="arrow-right" :size="16" />
            </router-link>
          </div>

        </div>

        <!-- Form Side -->
        <div class="form-column" data-aos="fade-left">
          <div class="card-premium form-card">
            <h2>Send a Message</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              
              <div class="form-group">
                <label for="name">Name</label>
                <div class="input-with-icon">
                  <Icon name="user" :size="18" class="input-icon" />
                  <input type="text" id="name" v-model="form.name" required placeholder="Your full name">
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email Address</label>
                <div class="input-with-icon">
                  <Icon name="at-sign" :size="18" class="input-icon" />
                  <input type="email" id="email" v-model="form.email" required placeholder="you@example.com">
                </div>
              </div>

              <div class="form-group">
                <label for="subject">Subject</label>
                <div class="input-with-icon">
                  <Icon name="tag" :size="18" class="input-icon" />
                  <input type="text" id="subject" v-model="form.subject" required placeholder="What is this regarding?">
                </div>
              </div>

              <div class="form-group">
                <label for="message">Message</label>
                <textarea id="message" v-model="form.message" required rows="5" placeholder="Tell us more..."></textarea>
              </div>

              <button type="submit" class="btn btn-primary submit-btn">
                Send Message <Icon name="send" :size="18" />
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import { onMounted } from 'vue';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/contact`;

useSEO({
  title: 'Contact FikrNa - Get in Touch | Support, Feedback & Inquiries | Faisalabad, Pakistan',
  description: 'Contact FikrNa for support, feedback, inquiries, or collaborations. Email (siteosia@gmail.com), WhatsApp (+92 343 5219710), or visit us in Tandlianwala, Faisalabad, Punjab, Pakistan. Support hours: Monday-Friday, 9am-6pm PKT. Typical response time: 24 hours.',
  keywords: 'contact FikrNa, FikrNa support, FikrNa feedback, contact Faisalabad, FikrNa email, FikrNa WhatsApp, FikrNa address, FikrNa contact form, support FikrNa, get in touch FikrNa',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Contact Us - FikrNa | Get in Touch',
  description: 'Contact FikrNa for support, feedback, or inquiries. Email, WhatsApp, or visit us in Faisalabad, Pakistan.',
    about: [
      { '@type': 'Thing', name: 'Contact information' },
      { '@type': 'Thing', name: 'Customer support' }
    ],
    breadcrumb: { '@id': `${currentUrl}#breadcrumb` }
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' }
  ], baseUrl);
  
  const schemaGraph = generateSchemaGraph([
    webpageSchema,
    breadcrumbSchema
  ]);
  
  injectStructuredData(schemaGraph);
  
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50
  });
});

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

function handleSubmit() {
  const { name, email, subject, message } = form.value;
  const mailtoLink = `mailto:siteosia@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailtoLink;
}
</script>

<style scoped>
/* AI Summary Box */
.ai-summary-box {
  padding: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
}

.summary-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.summary-title svg {
  color: #10b981;
}

.summary-text {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: var(--text-primary);
  margin: 0;
}

.summary-text strong {
  color: #10b981;
  font-weight: 700;
}

.contact-page {
  padding: var(--spacing-2xl) 0;
  min-height: 100vh;
}

.hero-block {
  margin-bottom: var(--spacing-2xl);
  display: flex; flex-direction: column; align-items: center;
}

.hero-icon-wrapper {
  width: 80px; height: 80px;
  background: var(--bg-card);
  border-radius: 24px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  box-shadow: var(--shadow-lg);
  margin-bottom: 24px;
}

.hero-desc {
  max-width: 500px;
  margin: 0 auto;
  font-size: 1.1rem;
  color: var(--text-secondary);
}

/* Grid Layout */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  max-width: 1100px;
  margin: 0 auto;
}

/* Info Column */
.info-column {
  display: flex; flex-direction: column; gap: 20px;
}

.info-card {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 24px;
}

.icon-box {
  width: 48px; height: 48px;
  background: var(--bg-hover);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--primary);
  flex-shrink: 0;
}

.info-card h3 { font-size: 1.1rem; margin-bottom: 4px; color: var(--text-primary); }
.contact-link { font-size: 1.1rem; color: var(--primary); text-decoration: none; font-weight: 500; }
.contact-link:hover { text-decoration: underline; }
.sub-text { font-size: 0.85rem; color: var(--text-tertiary); margin: 0; }
.address-text { color: var(--text-secondary); line-height: 1.5; margin: 0; }

.help-card h3 { display: flex; align-items: center; gap: 8px; font-size: 1rem; color: var(--accent-warning); }
.help-card p { font-size: 0.9rem; color: var(--text-secondary); margin: 0; }

.tools-card h3 { display: flex; align-items: center; gap: 8px; font-size: 1rem; color: var(--text-primary); margin-bottom: 12px; }
.tools-card p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 16px; }

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-hover);
  border: 1px solid var(--border-subtle);
  border-radius: 10px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.tool-link:hover {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateX(4px);
}

.mt-3 { margin-top: 16px; }

/* Form Column */
.form-card { padding: 40px; }
.form-card h2 { margin-bottom: 30px; }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; color: var(--text-secondary); }

.input-with-icon { position: relative; }
.input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-tertiary); pointer-events: none; }
.input-with-icon input { padding-left: 45px; }

textarea { resize: vertical; min-height: 120px; }

.submit-btn { width: 100%; justify-content: center; margin-top: 10px; }

/* Responsive */
@media (max-width: 850px) {
  .contact-grid { grid-template-columns: 1fr; }
  .form-column { order: -1; } /* Form first on mobile */
}
</style>
