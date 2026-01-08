<template>
  <div class="about-page">
    <div class="container container-sm text-center hero-block" data-aos="fade-up">
      <div class="hero-icon-wrapper">
        <Icon name="info" :size="48" class="hero-icon" />
      </div>
      <h1>About FikrNa</h1>
      <p class="hero-desc">
        Revolutionizing how you use AI tools—completely free, private, and in your browser.
      </p>
    </div>

    <!-- AI-Readable Summary Box -->
    <div class="container">
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What FikrNa Is
        </h3>
        <p class="summary-text">
          <strong>FikrNa</strong> is a privacy-first platform providing free online tools and calculators for everyday problem-solving. Founded in Faisalabad, Punjab, Pakistan, FikrNa operates on a zero-data collection principle—all tools run entirely in the user's browser using client-side processing technology. 
          The platform offers tools across multiple categories: health (calorie tracker, BMI calculator, meal planner, sleep coach, mood coach, skincare coach, symptom checker), finance (salary tax calculator, loan calculator), productivity (habit tracker, trip planner), and utilities (age calculator, password checker, readability tool). All tools are 100% free, require no registration, process data locally on the user's device, and never transmit information to servers. FikrNa is designed for global users with special features for different regions including Pakistan.
        </p>
      </div>
    </div>

    <div class="container">
      <!-- Bento Grid Layout -->
      <div class="bento-grid">
        
        <!-- 1. Core Mission -->
        <div class="bento-card card-premium mission-card" data-aos="fade-up">
          <Icon name="shield" :size="32" class="card-icon" />
          <h2>Privacy First</h2>
          <p>
            In an era of data harvesting, we stand apart. Every tool on FikrNa runs <strong>100% in your browser</strong>. 
            Your photos, health data, and passwords never leave your device. No servers, no tracking, just utility.
          </p>
        </div>

        <!-- 2. Technology -->
        <div class="bento-card card-premium tech-card" data-aos="fade-up" data-aos-delay="100">
          <Icon name="cpu" :size="32" class="card-icon" />
          <h2>Cutting-Edge Tech</h2>
          <p>
            Powered by WebAssembly & Transformers.js, bringing server-grade AI directly to your client. 
            Fast, offline-capable*, and secure.
          </p>
        </div>

        <!-- 3. Free Forever -->
        <div class="bento-card card-premium free-card" data-aos="fade-up" data-aos-delay="200">
          <Icon name="gift" :size="32" class="card-icon" />
          <h2>100% Free</h2>
          <p>
            No paywalls. No premium tiers. Just helpful tools accessible to everyone, everywhere.
          </p>
        </div>

        <!-- 4. Global Reach -->
        <div class="bento-card card-premium global-card" data-aos="fade-up" data-aos-delay="100">
          <div class="card-header">
             <Icon name="globe" :size="32" class="card-icon" />
             <h3>From Pakistan to the World</h3>
          </div>
          <p>
            Born in Faisalabad, Punjab, designed for the global community. We bridge the gap between complex AI and everyday users.
          </p>
        </div>

        <!-- 5. Tool Ecosystem -->
        <div class="bento-card card-premium ecosystem-card" data-aos="fade-up" data-aos-delay="200">
          <div class="card-header">
             <Icon name="grid" :size="32" class="card-icon" />
             <h3>Our Ecosystem</h3>
          </div>
          <ul class="tool-list">
            <li><Icon name="check" :size="16" /> <strong>Health:</strong> Calorie Tracker, Sleep & Mood Coach</li>
            <li><Icon name="check" :size="16" /> <strong>Utility:</strong> Finance, Security, & Text Tools</li>
            <li><Icon name="check" :size="16" /> <strong>Productivity:</strong> Habit Tracking & Planning</li>
          </ul>
        </div>

        <!-- 6. Community -->
        <div class="bento-card card-premium community-card glass" data-aos="fade-up" data-aos-delay="300">
          <Icon name="users" :size="32" class="card-icon" />
          <h2>Join the Movement</h2>
          <p>
            Be part of a community that refuses to compromise on privacy. Use technology that respects you.
          </p>
          <router-link to="/" class="btn btn-primary mt-4">
            Explore Tools <Icon name="arrow-right" :size="18" />
          </router-link>
        </div>

        <!-- Popular Tools Section -->
        <div class="bento-card card-premium tools-card" data-aos="fade-up" data-aos-delay="400">
          <div class="card-header">
            <Icon name="grid" :size="32" class="card-icon" />
            <h3>Popular Tools</h3>
          </div>
          <p>Explore our most popular free tools and calculators:</p>
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
            <router-link to="/tools/password-strength-checker" class="tool-link">
              <Icon name="lock" :size="16" />
              Password Checker
            </router-link>
            <router-link to="/tools/trip-planner" class="tool-link">
              <Icon name="map" :size="16" />
              Trip Planner
            </router-link>
          </div>
          <router-link to="/" class="btn btn-outline mt-4">
            View All Tools <Icon name="arrow-right" :size="16" />
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO';
import { 
  generateOrganizationSchema,
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
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/about`;

useSEO({
  title: 'About FikrNa - Privacy-First Free Online Tools Platform | Built in Pakistan for the World',
  description: 'FikrNa is a privacy-first platform providing free online tools and calculators for everyday problem-solving. Founded in Faisalabad, Pakistan, all tools run entirely in your browser with zero data collection. Health, finance, productivity, and utility tools—100% free, no registration required, complete privacy guaranteed.',
  keywords: 'about FikrNa, privacy-first tools, free online calculators, client-side processing, Faisalabad tech, privacy-focused platform, free tools Pakistan, zero data collection, browser-based tools, privacy-first AI tools',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const organizationSchema = generateOrganizationSchema({ baseUrl });
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'About FikrNa - The Privacy-First AI Platform',
  description: 'FikrNa brings powerful, free AI tools to your browser without compromising privacy. No servers, no tracking. Built in Pakistan for the world.',
    about: [
      { '@type': 'Thing', name: 'Privacy-first technology' },
      { '@type': 'Thing', name: 'Free online tools' },
      { '@type': 'Thing', name: 'Client-side processing' }
    ],
    breadcrumb: { '@id': `${currentUrl}#breadcrumb` }
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' }
  ], baseUrl);
  
  const schemaGraph = generateSchemaGraph([
    organizationSchema,
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

.about-page {
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
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.25rem;
  color: var(--text-secondary);
}

.accent-dot { color: var(--primary); }

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.bento-card {
  display: flex; flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.3s ease;
}

.bento-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
  border-color: var(--primary-light);
}

.card-icon {
  margin-bottom: 20px;
  color: var(--primary);
  background: var(--bg-hover);
  padding: 8px;
  border-radius: 12px;
  width: 48px; height: 48px;
}

.bento-card h2, .bento-card h3 { margin-bottom: 12px; font-size: 1.5rem; }
.bento-card p { color: var(--text-secondary); line-height: 1.6; font-size: 1rem; margin-bottom: 0; }

/* Grid Spanning */
.mission-card { grid-column: span 2; }
.community-card { grid-column: span 3; display: flex; align-items: center; text-align: center; justify-content: center; background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-hover) 100%); }
.community-card p { max-width: 600px; margin-bottom: 20px; }

/* Ecosystem List */
.ecosystem-card { grid-column: span 2; }
.tool-list {
  list-style: none; padding: 0; margin-top: 10px;
  display: grid; grid-template-columns: 1fr 1fr; gap: 15px;
}
.tool-list li {
  display: flex; align-items: center; gap: 10px;
  color: var(--text-secondary); font-size: 0.95rem;
}
.tool-list li strong { color: var(--text-primary); }

.mt-4 { margin-top: 24px; }

.tools-card { grid-column: span 2; }

.tools-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin: 20px 0;
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
  transition: all 0.2s ease;
}

.tool-link:hover {
  background: var(--primary-light);
  border-color: var(--primary);
  color: var(--primary);
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 1024px) {
  .bento-grid { grid-template-columns: 1fr 1fr; }
  .mission-card, .ecosystem-card { grid-column: span 2; }
  .community-card { grid-column: span 2; }
}

@media (max-width: 768px) {
  .bento-grid { grid-template-columns: 1fr; }
  .mission-card, .ecosystem-card, .community-card { grid-column: span 1; }
}
</style>
