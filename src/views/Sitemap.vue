<template>
  <div class="legal-page">
    <div class="container">
      <div class="legal-header">
        <h1>Sitemap</h1>
        <p class="subtitle">Browse all pages and tools available on FikrNa</p>
      </div>

      <div class="legal-content">
        <!-- Main Pages Section -->
        <section>
          <h2>Main Pages</h2>
          <div class="link-grid">
            <router-link to="/" class="sitemap-link">
              <Icon name="home" :size="18" />
              <span>Home</span>
            </router-link>
            <router-link to="/about" class="sitemap-link">
              <Icon name="info" :size="18" />
              <span>About Us</span>
            </router-link>
            <router-link to="/contact" class="sitemap-link">
              <Icon name="mail" :size="18" />
              <span>Contact</span>
            </router-link>
            <router-link to="/sitemap" class="sitemap-link">
              <Icon name="map" :size="18" />
              <span>Sitemap</span>
            </router-link>
          </div>
        </section>

        <!-- Health Tools Section -->
        <section>
          <h2>Health & Wellness Tools</h2>
          <p class="section-desc">
            Free health calculators and wellness tools to help you track calories, plan meals, improve sleep, 
            and monitor your wellbeing.
          </p>
          <div class="link-grid">
            <router-link to="/tools/calorie-tracker" class="sitemap-link">
              <Icon name="activity" :size="18" />
              <div class="link-content">
                <span class="link-title">Calorie Tracker</span>
                <span class="link-desc">Track daily calories and nutrition</span>
              </div>
            </router-link>
            <router-link to="/tools/bmi-calculator" class="sitemap-link">
              <Icon name="heart" :size="18" />
              <div class="link-content">
                <span class="link-title">BMI Calculator</span>
                <span class="link-desc">Calculate Body Mass Index</span>
              </div>
            </router-link>
            <router-link to="/tools/meal-planner" class="sitemap-link">
              <Icon name="calendar" :size="18" />
              <div class="link-content">
                <span class="link-title">Meal Planner</span>
                <span class="link-desc">Plan balanced weekly meals</span>
              </div>
            </router-link>
            <router-link to="/tools/sleep-coach" class="sitemap-link">
              <Icon name="moon" :size="18" />
              <div class="link-content">
                <span class="link-title">Sleep Coach</span>
                <span class="link-desc">Improve sleep quality</span>
              </div>
            </router-link>
            <router-link to="/tools/mood-coach" class="sitemap-link">
              <Icon name="smile" :size="18" />
              <div class="link-content">
                <span class="link-title">Mood Coach</span>
                <span class="link-desc">Track mental wellness</span>
              </div>
            </router-link>
            <router-link to="/tools/skincare-coach" class="sitemap-link">
              <Icon name="sun" :size="18" />
              <div class="link-content">
                <span class="link-title">Skincare Coach</span>
                <span class="link-desc">Personalized skincare routines</span>
              </div>
            </router-link>
            <router-link to="/tools/symptom-checker" class="sitemap-link">
              <Icon name="alert-circle" :size="18" />
              <div class="link-content">
                <span class="link-title">Symptom Checker</span>
                <span class="link-desc">Check health symptoms</span>
              </div>
            </router-link>
          </div>
        </section>

        <!-- Finance Tools Section -->
        <section>
          <h2>Finance & Utility Tools</h2>
          <p class="section-desc">
            Calculate salary taxes, loan EMIs, age, and more with our accurate financial and utility calculators.
          </p>
          <div class="link-grid">
            <router-link to="/tools/salary-tax-calculator" class="sitemap-link">
              <Icon name="dollar-sign" :size="18" />
              <div class="link-content">
                <span class="link-title">Salary Tax Calculator</span>
                <span class="link-desc">Calculate Pakistan FBR taxes</span>
              </div>
            </router-link>
            <router-link to="/tools/loan-calculator" class="sitemap-link">
              <Icon name="trending-up" :size="18" />
              <div class="link-content">
                <span class="link-title">Loan Calculator</span>
                <span class="link-desc">Calculate EMI and interest</span>
              </div>
            </router-link>
            <router-link to="/tools/age-calculator" class="sitemap-link">
              <Icon name="calendar" :size="18" />
              <div class="link-content">
                <span class="link-title">Age Calculator</span>
                <span class="link-desc">Calculate exact age</span>
              </div>
            </router-link>
            <router-link to="/tools/password-strength-checker" class="sitemap-link">
              <Icon name="lock" :size="18" />
              <div class="link-content">
                <span class="link-title">Password Checker</span>
                <span class="link-desc">Test password strength</span>
              </div>
            </router-link>
        </div>
        </section>

        <!-- Lifestyle Tools Section -->
        <section>
          <h2>Lifestyle & Productivity Tools</h2>
          <p class="section-desc">
            Build better habits, plan trips, analyze text readability, and boost your daily productivity.
          </p>
          <div class="link-grid">
            <router-link to="/tools/habit-tracker" class="sitemap-link">
              <Icon name="check-circle" :size="18" />
              <div class="link-content">
                <span class="link-title">Habit Tracker</span>
                <span class="link-desc">Build positive habits</span>
              </div>
            </router-link>
            <router-link to="/tools/trip-planner" class="sitemap-link">
              <Icon name="map" :size="18" />
              <div class="link-content">
                <span class="link-title">Trip Planner</span>
                <span class="link-desc">Plan travel itineraries</span>
              </div>
            </router-link>
            <router-link to="/tools/readability-analyzer" class="sitemap-link">
              <Icon name="edit" :size="18" />
              <div class="link-content">
                <span class="link-title">Readability Tool</span>
                <span class="link-desc">Analyze text readability</span>
              </div>
            </router-link>
        </div>
        </section>

        <!-- Legal Pages Section -->
        <section>
          <h2>Legal & Information</h2>
          <p class="section-desc">
            Important legal information, terms, and policies governing your use of FikrNa.
          </p>
          <div class="link-grid">
            <router-link to="/privacy-policy" class="sitemap-link">
              <Icon name="shield" :size="18" />
              <div class="link-content">
                <span class="link-title">Privacy Policy</span>
                <span class="link-desc">How we protect your data</span>
              </div>
            </router-link>
            <router-link to="/terms-of-service" class="sitemap-link">
              <Icon name="file-text" :size="18" />
              <div class="link-content">
                <span class="link-title">Terms of Service</span>
                <span class="link-desc">User agreement & conditions</span>
              </div>
            </router-link>
            <router-link to="/disclaimer" class="sitemap-link">
              <Icon name="alert-circle" :size="18" />
              <div class="link-content">
                <span class="link-title">Disclaimer</span>
                <span class="link-desc">Important disclaimers</span>
              </div>
            </router-link>
        </div>
        </section>

        <!-- Stats Box -->
        <div class="stats-box">
          <div class="stat-item">
            <Icon name="zap" :size="28" />
            <div>
              <div class="stat-number">14</div>
              <div class="stat-label">Free Tools</div>
            </div>
          </div>
          <div class="stat-item">
            <Icon name="shield" :size="28" />
            <div>
              <div class="stat-number">100%</div>
              <div class="stat-label">Privacy Guaranteed</div>
            </div>
          </div>
          <div class="stat-item">
            <Icon name="globe" :size="28" />
            <div>
              <div class="stat-number">Global</div>
              <div class="stat-label">Available Worldwide</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO';
import { 
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import { onMounted } from 'vue';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/sitemap`;

useSEO({
  title: 'Sitemap - FikrNa | Browse All Tools & Pages | Complete Website Navigation',
  description: 'Complete sitemap of FikrNa. Browse all 14 free tools including health calculators (BMI, calorie tracker, meal planner, sleep coach, mood coach, skincare coach, symptom checker), finance tools (salary calculator, loan calculator), productivity tools (habit tracker, trip planner), and utility tools (age calculator, password checker, readability tool). Find every page on our website.',
  keywords: 'sitemap, all tools, tool list, FikrNa pages, website map, navigation, FikrNa tools, complete tool list, website structure, site navigation',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// Tool list for schema
const allTools = [
  { name: 'Calorie Tracker', path: '/tools/calorie-tracker', description: 'Track daily calories and nutrition' },
  { name: 'BMI Calculator', path: '/tools/bmi-calculator', description: 'Calculate Body Mass Index and health metrics' },
  { name: 'Meal Planner', path: '/tools/meal-planner', description: 'Plan weekly meals with recipes' },
  { name: 'Sleep Coach', path: '/tools/sleep-coach', description: 'Improve sleep quality' },
  { name: 'Mood Coach', path: '/tools/mood-coach', description: 'Track mental wellness' },
  { name: 'Skincare Coach', path: '/tools/skincare-coach', description: 'Personalized skincare routines' },
  { name: 'Symptom Checker', path: '/tools/symptom-checker', description: 'Check symptoms and get health guidance' },
  { name: 'Salary Calculator', path: '/tools/salary-tax-calculator', description: 'Calculate salary, taxes, and take-home pay' },
  { name: 'Loan Calculator', path: '/tools/loan-calculator', description: 'Calculate EMI and loan payments' },
  { name: 'Habit Tracker', path: '/tools/habit-tracker', description: 'Build positive habits' },
  { name: 'Trip Planner', path: '/tools/trip-planner', description: 'Plan trips with itineraries' },
  { name: 'Age Calculator', path: '/tools/age-calculator', description: 'Calculate exact age and milestones' },
  { name: 'Password Checker', path: '/tools/password-strength-checker', description: 'Check password strength and security' },
  { name: 'Readability Tool', path: '/tools/readability-tool', description: 'Analyze text readability' }
];

onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Sitemap - FikrNa | Browse All Tools & Pages',
    description: 'Complete sitemap of FikrNa. Browse all 14 free tools including health calculators, finance tools, and lifestyle utilities.',
    about: [
      { '@type': 'Thing', name: 'Website navigation' },
      { '@type': 'Thing', name: 'Tool directory' }
    ],
    breadcrumb: { '@id': `${currentUrl}#breadcrumb` }
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Sitemap', path: '/sitemap' }
  ], baseUrl);
  
  const itemListSchema = generateItemListSchema(allTools, {
    baseUrl,
    name: 'FikrNa Tools Directory',
    description: 'Complete list of all free tools available on FikrNa'
  });
  
  const schemaGraph = generateSchemaGraph([
    webpageSchema,
    breadcrumbSchema,
    itemListSchema
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
.legal-page {
  min-height: 100vh;
  padding: clamp(100px, 15vh, 140px) 0 clamp(60px, 10vh, 80px);
  background: var(--bg-app);
}

.legal-header {
  text-align: center;
  margin-bottom: clamp(48px, 8vh, 64px);
}

.legal-header h1 {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 16px;
  font-family: var(--font-heading);
}

.subtitle {
  font-size: 1.125rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.legal-content {
  max-width: 1000px;
  margin: 0 auto;
}

.legal-content section {
  margin-bottom: clamp(40px, 6vh, 56px);
  padding: clamp(28px, 4vh, 36px);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.legal-content section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
}

.legal-content h2 {
  font-size: clamp(1.375rem, 2vw, 1.625rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.legal-content h2::before {
  content: '';
  width: 4px;
  height: 24px;
  background: linear-gradient(180deg, #10b981, #14b8a6);
  border-radius: 4px;
}

.section-desc {
  font-size: 0.9375rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.sitemap-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  color: var(--text-primary);
}

.sitemap-link:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateX(4px);
}

.sitemap-link svg {
  color: #10b981;
  flex-shrink: 0;
}

.link-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.link-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
}

.link-desc {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
}

/* Stats Box */
.stats-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, transparent 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-xl);
  margin-top: 48px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-item svg {
  color: #10b981;
  flex-shrink: 0;
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

/* Responsive */
@media (max-width: 768px) {
  .legal-page {
    padding: clamp(80px, 12vh, 100px) 0 clamp(40px, 6vh, 60px);
}

  .legal-content section {
    padding: 24px 20px;
  }

  .link-grid {
    grid-template-columns: 1fr;
  }

  .stats-box {
    grid-template-columns: 1fr;
    padding: 24px;
    text-align: center;
  }

  .stat-item {
    justify-content: center;
  }
}
</style>
