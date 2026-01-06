<template>
  <div class="tool-page password-checker-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Password Strength Checker" category="Security" />
      
      <!-- 1. Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <div class="hero-icon-wrapper">
          <Icon name="lock" :size="48" class="hero-icon" />
        </div>
        <p class="eyebrow">Digital Security</p>
        <h1>Password Strength & Security Checker</h1>
        <p class="hero-subtitle">
          Test the strength of your passwords instantly. Calculate entropy, estimated crack time, 
          and get actionable tips to secure your accounts.
        </p>
        <div class="hero-badges">
          <span class="badge"><Icon name="shield" :size="14" /> Entropy Analysis</span>
          <span class="badge"><Icon name="clock" :size="14" /> Crack Time Estimate</span>
          <span class="badge"><Icon name="zap" :size="14" /> Client-Side Only (Safe)</span>
        </div>
      </section>

      <!-- AI-Readable Summary Box -->
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What This Tool Does
        </h3>
        <p class="summary-text">
          <strong>Password Strength Checker</strong> analyzes password security by calculating entropy (randomness), estimating crack time (how long it would take to brute-force the password), and providing a comprehensive security assessment. The tool evaluates passwords based on length, character variety (uppercase, lowercase, numbers, symbols), common patterns, and dictionary words. 
          Users enter a password and receive instant feedback including strength rating (weak to very strong), estimated time to crack (from seconds to centuries), entropy in bits, and actionable recommendations for improvement. All password analysis happens entirely in the user's browser—passwords are never transmitted or stored, ensuring complete privacy and security.
        </p>
      </div>

      <!-- 2. Main Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        
        <div class="checker-container">
          <div class="input-wrapper">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              v-model="password" 
              placeholder="Type a password to test..." 
              class="password-input"
              @input="analyze"
            >
            <button class="toggle-btn" @click="showPassword = !showPassword" aria-label="Toggle password visibility">
              <Icon :name="showPassword ? 'eye-off' : 'eye'" :size="20" />
            </button>
          </div>

          <!-- Strength Bar -->
          <div class="strength-meter">
            <div class="bar-bg">
              <div class="bar-fill" :style="{ width: strength.percent + '%', background: strength.color }"></div>
            </div>
            <div class="strength-label" :style="{ color: strength.color }">
              {{ strength.label }}
            </div>
          </div>

          <!-- Analysis Grid -->
          <div class="analysis-grid" v-if="password">
            
            <div class="metric-card glass">
              <h4>Time to Crack</h4>
              <p class="highlight" :style="{ color: strength.color }">{{ strength.crackTime }}</p>
            </div>

            <div class="metric-card glass">
              <h4>Complexity Score</h4>
              <p>{{ strength.score }} / 100</p>
            </div>

            <div class="metric-card glass">
              <h4>Entropy</h4>
              <p>{{ strength.entropy }} bits</p>
            </div>

          </div>

          <!-- Checklist -->
          <div class="checklist-section" v-if="password">
            <h4>Security Checklist</h4>
            <div class="checklist">
              <div class="check-item" :class="{ met: checks.length }">
                <span class="icon-wrapper">
                  <Icon :name="checks.length ? 'check-circle' : 'x-circle'" :size="18" />
                </span> 
                12+ Characters
              </div>
              <div class="check-item" :class="{ met: checks.upper }">
                <span class="icon-wrapper">
                  <Icon :name="checks.upper ? 'check-circle' : 'x-circle'" :size="18" />
                </span> 
                Uppercase Letter
              </div>
              <div class="check-item" :class="{ met: checks.lower }">
                <span class="icon-wrapper">
                  <Icon :name="checks.lower ? 'check-circle' : 'x-circle'" :size="18" />
                </span> 
                Lowercase Letter
              </div>
              <div class="check-item" :class="{ met: checks.number }">
                <span class="icon-wrapper">
                  <Icon :name="checks.number ? 'check-circle' : 'x-circle'" :size="18" />
                </span> 
                Number
              </div>
              <div class="check-item" :class="{ met: checks.symbol }">
                <span class="icon-wrapper">
                  <Icon :name="checks.symbol ? 'check-circle' : 'x-circle'" :size="18" />
                </span> 
                Symbol (!@#$)
              </div>
            </div>
            
            <div class="improvement-tip" v-if="strength.tip">
              <strong><Icon name="bulb" :size="16" /> Pro Tip:</strong> {{ strength.tip }}
            </div>
          </div>

          <div class="privacy-note">
            <Icon name="lock" :size="14" /> <strong>Privacy Note:</strong> Your password is checked locally in your browser. 
            It is NEVER sent to any server or stored.
          </div>

        </div>
      </div>

      <!-- 3. SEO Content -->
      <section class="content-section" data-aos="fade-up">
        <article class="seo-article">
          <h2>Why Password Strength Matters?</h2>
          <p>
            With billions of credentials leaked in data breaches every year, using a weak password is like leaving your front door unlocked. 
            Hackers use sophisticated tools ("Brute Force" and "Dictionary Attacks") to guess millions of passwords per second.
          </p>

          <h3>What makes a strong password?</h3>
          <ul class="feature-list">
            <li><strong>Length is King:</strong> A 15-character simple password is often stronger than an 8-character complex one. Every extra character exponentially increases the time to crack.</li>
            <li><strong>High Entropy:</strong> Entropy measures the unpredictability of your password. Mixing character sets (symbols, numbers, cases) increases entropy.</li>
            <li><strong>Uniqueness:</strong> Never reuse passwords. If one site is breached, hackers will try that same password on your email and banking accounts.</li>
          </ul>

          <h3>How our Crack Time is calculated?</h3>
          <p>
            We estimate crack time based on modern GPU cracking speeds (approx. 10 billion guesses/second). 
            Low entropy passwords can be cracked instantly, while high entropy passphrases could take trillions of years.
          </p>

        </article>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>Security FAQs</h2>
          <div class="faq-list">
            <div class="faq-item glass-card" v-for="(faq, i) in faqs" :key="i">
              <h4>{{ faq.question }}</h4>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/password-strength-checker" category="Security" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { 
  generateToolSchema, 
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/password-strength-checker`;

useSEO({
  title: 'Password Strength Checker Online 2025 | Secure & Private | Entropy & Crack Time Calculator',
  description: 'Test password security instantly. Calculate entropy (randomness), estimated crack time, and get actionable security recommendations. 100% client-side password checker—passwords never leave your device. Privacy-first and secure.',
  keywords: 'password strength checker, password tester, secure password check, hack time estimate, entropy calculator, password security analyzer, password strength meter, password complexity checker, brute force calculator, password safety checker',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// --- State ---
const password = ref('');
const showPassword = ref(false);

const strength = reactive({
  score: 0,
  percent: 0,
  label: 'Unknown',
  color: '#666',
  entropy: 0,
  crackTime: 'Instant',
  tip: ''
});

const checks = reactive({
  length: false,
  upper: false,
  lower: false,
  number: false,
  symbol: false
});

// --- Logic ---
function analyze() {
  const p = password.value;
  
  // 1. Basic Checks
  checks.length = p.length >= 12;
  checks.upper = /[A-Z]/.test(p);
  checks.lower = /[a-z]/.test(p);
  checks.number = /[0-9]/.test(p);
  checks.symbol = /[^A-Za-z0-9]/.test(p);

  if (p.length === 0) {
    strength.label = '';
    strength.percent = 0;
    return;
  }

  // 2. Entropy Calc
  let poolSize = 0;
  if (/[a-z]/.test(p)) poolSize += 26;
  if (/[A-Z]/.test(p)) poolSize += 26;
  if (/[0-9]/.test(p)) poolSize += 10;
  if (/[^A-Za-z0-9]/.test(p)) poolSize += 32;

  const entropy = Math.log2(Math.pow(poolSize, p.length));
  strength.entropy = Math.round(entropy);

  // 3. Score & Label
  let score = 0;
  if (entropy < 28) score = 10; // Very Weak
  else if (entropy < 36) score = 30; // Weak
  else if (entropy < 60) score = 60; // Good
  else if (entropy < 128) score = 90; // Strong
  else score = 100; // Excellent

  strength.score = score;
  strength.percent = score;

  if (score <= 20) { strength.label = 'Very Weak'; strength.color = 'var(--accent-error)'; }
  else if (score <= 40) { strength.label = 'Weak'; strength.color = 'var(--accent-warning)'; }
  else if (score <= 70) { strength.label = 'Good'; strength.color = 'var(--primary)'; }
  else { strength.label = 'Strong'; strength.color = 'var(--accent-success)'; }

  // 4. Crack Time Estimate (Assuming 10B guesses/sec)
  const combinations = Math.pow(poolSize, p.length);
  const seconds = combinations / 10000000000;
  
  strength.crackTime = formatTime(seconds);

  // 5. Tips
  if (!checks.length) strength.tip = "Add more characters. Length is the #1 factor for security.";
  else if (!checks.symbol) strength.tip = "Add a special symbol like ! or # to multiply complexity.";
  else if (!checks.upper) strength.tip = "Mix uppercase letters in unexpected places.";
  else strength.tip = "Great password! Make sure it's unique to this account.";
}

function formatTime(seconds) {
  if (seconds < 1) return 'Instant';
  if (seconds < 60) return 'Few Seconds';
  if (seconds < 3600) return 'Few Minutes';
  if (seconds < 86400) return 'Few Hours';
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} Days`;
  if (seconds < 3153600000) return `${Math.round(seconds / 31536000)} Years`;
  if (seconds < 315360000000) return 'Centuries';
  return 'Trillions of Years';
}

const faqs = [
  { question: "Is it safe to type my password here?", answer: "Yes. FikrNa Password Checker runs 100% in your browser using JavaScript. No data is sent over the internet." },
  { question: "What is a 'Good' entropy score?", answer: "Generally, an entropy above 60 bits is considered reasonable for online accounts. Above 80 bits is recommended for banking or crypto." }
];

// --- Lifecycle ---
onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Password Strength Checker',
    description: 'Analyze password security by calculating entropy, estimated crack time, and providing comprehensive security assessment. 100% client-side for complete privacy.',
    url: currentUrl,
    category: 'SecurityApplication',
    features: [
      'Password strength analysis',
      'Entropy calculation (bits)',
      'Estimated crack time',
      'Security checklist',
      'Character pattern analysis',
      'Dictionary word detection',
      'Actionable recommendations',
      '100% client-side processing'
    ],
    usageInfo: 'Enter a password to analyze. Receive instant feedback on strength, entropy, crack time, and security recommendations.',
    helpText: 'Password Strength Checker helps users create secure passwords by providing detailed security analysis and improvement recommendations.'
  });
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Password Checker', path: '/tools/password-strength-checker' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Password Strength Checker Online 2025 | Secure & Private',
    description: 'Test password security instantly. Calculate crack time and entropy. 100% client-side privacy-first password checker.',
    about: [
      { '@type': 'Thing', name: 'Password security' },
      { '@type': 'Thing', name: 'Cybersecurity' },
      { '@type': 'Thing', name: 'Password analysis' }
    ],
    breadcrumb: { '@id': `${currentUrl}#breadcrumb` },
    mainEntity: { '@id': `${currentUrl}#software` }
  });
  
  const schemaGraph = generateSchemaGraph([
    toolSchema,
    faqSchema,
    breadcrumbSchema,
    webpageSchema
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
.password-checker-page {
  padding: var(--spacing-xl) 0;
  min-height: 100vh;
}

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

.hero-section {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.hero-icon-wrapper {
  width: 80px; height: 80px;
  background: var(--bg-card);
  border-radius: 20px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  color: var(--primary);
  box-shadow: var(--shadow-md);
}

.eyebrow {
  color: var(--primary);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-section h1 {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-4xl));
  margin: 10px 0;
  color: var(--text-primary);
}

.hero-subtitle {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto 20px;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  background: var(--bg-hover);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  display: flex; align-items: center; gap: 6px;
}

/* Interface */
.tool-interface {
  max-width: 800px;
  margin: 0 auto 40px;
  padding: var(--spacing-xl);
}

.checker-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.input-wrapper {
  position: relative;
}

.password-input {
  width: 100%;
  padding: 20px;
  font-size: 1.5rem;
  background: var(--bg-input);
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  /* Tracking helps readability */
  letter-spacing: 2px;
}
.password-input:focus { outline: none; border-color: var(--primary); }

.toggle-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  color: var(--text-secondary);
  display: flex; align-items: center; justify-content: center;
}
.toggle-btn:hover { opacity: 1; color: var(--primary); }

/* Strength Bar */
.strength-meter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bar-bg {
  height: 12px;
  background: var(--bg-hover);
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  width: 0%;
  transition: all 0.4s ease;
}

.strength-label {
  text-align: right;
  font-weight: bold;
  font-size: 1.1rem;
}

/* Analysis */
.analysis-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 600px) {
  .analysis-grid { grid-template-columns: 1fr; }
}

.metric-card {
  padding: 20px;
  text-align: center;
  border-radius: var(--radius-md);
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
}

.metric-card h4 { margin: 0 0 5px; color: var(--text-tertiary); font-size: 0.9rem; }
.metric-card p { margin: 0; font-size: 1.2rem; font-weight: bold; color: var(--text-primary); }
.metric-card p.highlight { font-size: 1.4rem; }

/* Checklist */
.checklist-section {
  background: var(--bg-hover);
  padding: 24px;
  border-radius: var(--radius-md);
}

.checklist-section h4 { margin-top: 0; margin-bottom: 20px; color: var(--text-primary); }

.checklist {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.check-item {
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-item.met { color: var(--accent-success); font-weight: 500; }
.icon-wrapper { display: flex; align-items: center; justify-content: center; }

.improvement-tip {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--border-subtle);
  color: var(--accent-warning);
  display: flex; align-items: center; gap: 8px;
}

.privacy-note {
  font-size: 0.85rem;
  color: var(--text-tertiary);
  text-align: center;
  margin-top: 20px;
  display: flex; align-items: center; justify-content: center; gap: 6px;
}

/* Content SEO */
.content-section {
  max-width: 800px;
  margin: 0 auto;
}

.seo-article {
  background: var(--bg-card);
  padding: 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  margin-bottom: 40px;
}

.seo-article h2 { color: var(--primary); margin-top: 0; }
.seo-article h3 { margin-top: 25px; color: var(--text-primary); }
.seo-article p, li { color: var(--text-secondary); line-height: 1.7; }

.faq-list { display: grid; gap: 15px; }
.faq-item { padding: 24px; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.faq-item h4 { color: var(--text-primary); margin-bottom: 10px; }
</style>
