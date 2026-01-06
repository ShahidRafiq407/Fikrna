<template>
  <div class="tool-page loan-calculator-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Loan Calculator" category="Finance" />
      
      <!-- 1. Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">💸 Smart Borrowing</p>
        <h1>Advanced Loan & EMI Calculator</h1>
        <p class="hero-subtitle">
          Calculate your monthly EMI, total interest payable, and view a complete amortization schedule 
          for home loans, car loans, or personal finance.
        </p>
        <div class="hero-badges">
          <span class="badge">📅 Monthly EMI</span>
          <span class="badge">📉 Amortization Schedule</span>
          <span class="badge">📊 Interest vs Principal</span>
          <span class="badge">💾 Save & Print</span>
        </div>
      </section>

      <!-- AI-Readable Summary Box -->
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What This Tool Does
        </h3>
        <p class="summary-text">
          <strong>Loan Calculator</strong> calculates monthly EMI (Equated Monthly Installment), total interest payable, and generates a complete amortization schedule for loans including home loans, car loans, and personal loans. 
          Users enter loan amount, interest rate, and tenure to receive detailed calculations showing monthly payments, principal and interest breakdown, remaining balance, and total interest over the loan period. The calculator helps borrowers understand loan costs, compare different loan options, plan repayments, and make informed borrowing decisions. All calculations use standard loan formulas and happen instantly in the browser for privacy.
        </p>
      </div>

      <!-- 2. Main Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="calculator-grid">
          
          <!-- Input Side -->
          <div class="input-panel">
            <h3>Loan Details</h3>
            
            <div class="form-group">
              <label>Loan Amount</label>
              <div class="input-wrapper">
                <span class="currency">$</span>
                <input type="number" v-model.number="form.amount" class="styled-input big-input" placeholder="100000">
              </div>
            </div>

            <div class="form-group">
              <label>Interest Rate (% p.a)</label>
              <input type="number" v-model.number="form.rate" class="styled-input" placeholder="5.5" step="0.1">
            </div>

            <div class="form-group">
              <label>Loan Tenure</label>
              <div class="tenure-group">
                <input type="number" v-model.number="form.tenure" class="styled-input" placeholder="5">
                <select v-model="form.tenureType" class="styled-select">
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            
            <button id="calculate-emi-btn" @click="calculateROI" class="btn btn-primary btn-large">
              Calculate EMI
            </button>
          </div>

          <!-- Result Side -->
          <div class="result-panel glass" v-if="results">
            <div class="emi-display">
              <span class="emi-label">Monthly Payment (EMI)</span>
              <span class="emi-value">{{ formatMoney(results.emi) }}</span>
            </div>

            <div class="summary-breakdown">
              <div class="summary-item">
                <span class="dot p-dot"></span>
                <span>Principal: {{ formatMoney(results.principal) }}</span>
              </div>
              <div class="summary-item">
                <span class="dot i-dot"></span>
                <span>Total Interest: {{ formatMoney(results.totalInterest) }}</span>
              </div>
              <div class="divider"></div>
              <div class="summary-item highlight">
                <strong>Total Payable: {{ formatMoney(results.totalPayable) }}</strong>
              </div>
            </div>

            <!-- Visualization Bar -->
            <div class="viz-bar-container">
              <div class="viz-bar">
                <div class="viz-segment p-segment" :style="{ width: results.principalPercent + '%' }"></div>
                <div class="viz-segment i-segment" :style="{ width: results.interestPercent + '%' }"></div>
              </div>
              <div class="viz-legend">
                <span>{{ results.principalPercent }}% Principal</span>
                <span>{{ results.interestPercent }}% Interest</span>
              </div>
            </div>

            <button class="btn btn-outline small-btn" @click="showSchedule = !showSchedule">
              {{ showSchedule ? 'Hide' : 'View' }} Amortization Schedule
            </button>

          </div>

          <!-- Empty State -->
          <div class="result-panel empty-state" v-else>
            <div class="empty-icon">🏠</div>
            <p>Enter loan amount, interest rate, and tenure to check your EMI.</p>
          </div>

        </div>
      </div>

      <!-- 3. Amortization Schedule -->
      <transition name="slide-up">
        <section v-if="results && showSchedule" class="schedule-section glass-card" id="schedule-area">
          <div class="schedule-header">
            <h3>📅 Amortization Schedule (Yearly)</h3>
            <button class="btn btn-secondary small-btn" @click="printSchedule">🖨️ Print</button>
          </div>
          <div class="table-container">
            <table class="schedule-table">
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Principal Paid</th>
                  <th>Interest Paid</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="year in results.schedule" :key="year.year">
                  <td>{{ year.year }}</td>
                  <td>{{ formatMoney(year.principalPaid) }}</td>
                  <td>{{ formatMoney(year.interestPaid) }}</td>
                  <td>{{ formatMoney(year.balance) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </transition>

      <!-- 4. SEO Content -->
      <section class="content-section" data-aos="fade-up">
        <article class="seo-article">
          <h2>Using the Loan EMI Calculator</h2>
          <p>
            Planning to buy a home, a car, or taking a personal loan? 
            The <strong>Equated Monthly Installment (EMI)</strong> is likely your most important monthly commitment. 
            Our free calculator helps you visualize how much of your hard-earned money goes toward paying off the debt (principal) verses the cost of borrowing (interest).
          </p>

          <h3>How is EMI Calculated?</h3>
          <p>
            We use the standard formula used by most banks:
            <br>
            <code>E = P x r x (1+r)^n / ((1+r)^n - 1)</code>
            <br>
            Where <strong>E</strong> is EMI, <strong>P</strong> is Principal Loan Amount, <strong>r</strong> is monthly interest rate, and <strong>n</strong> is loan tenure in months.
          </p>

          <h3>Why check the Amortization Schedule?</h3>
          <p>
            An amortization schedule reveals a shocking truth about long-term loans: in the early years, the majority of your payment goes toward <strong>Interest</strong>, not Principal. 
            Viewing this table helps you plan prepayments to save huge amounts on interest costs over the life of the loan.
          </p>

        </article>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>Loan & EMI FAQs</h2>
          <div class="faq-list">
            <div class="faq-item glass-card" v-for="(faq, i) in faqs" :key="i">
              <h4>{{ faq.question }}</h4>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/loan-calculator" category="Finance" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { 
  generateToolSchema, 
  generateFAQSchema,
  injectStructuredData 
} from '@/utils/structuredData';
import AOS from 'aos';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/loan-calculator`;

useSEO({
  title: 'Loan & EMI Calculator 2025 | Amortization Schedule Generator | Home, Car & Personal Loans',
  description: 'Calculate monthly EMI (Equated Monthly Installment) for home loans, car loans, and personal loans. View detailed amortization schedule, total interest payable, principal and interest breakdown. Free financial calculator with instant results. Privacy-first.',
  keywords: 'emi calculator, loan calculator, home loan calculator, car loan emi, amortization schedule, mortgage calculator, personal loan calculator, loan interest calculator, loan payment calculator, emi calculator online, loan amortization, loan schedule generator',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// --- State ---
const results = ref(null);
const showSchedule = ref(false);

const form = reactive({
  amount: '',
  rate: '',
  tenure: '',
  tenureType: 'years'
});

// --- Methods ---
function calculateROI() {
  if (!form.amount || !form.rate || !form.tenure) return;

  const P = form.amount;
  const annualRate = form.rate;
  const monthlyRate = annualRate / 12 / 100;
  
  let months = form.tenure;
  if(form.tenureType === 'years') months = form.tenure * 12;

  // EMI Formula
  const emi = (P * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  
  const totalPayable = emi * months;
  const totalInterest = totalPayable - P;

  // Percents
  const pPercent = ((P / totalPayable) * 100).toFixed(1);
  const iPercent = ((totalInterest / totalPayable) * 100).toFixed(1);

  // Schedule Generation (Yearly Summary)
  const schedule = [];
  let balance = P;
  let yearP = 0;
  let yearI = 0;
  
  for (let m = 1; m <= months; m++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    balance -= principalForMonth;
    if (balance < 0) balance = 0;

    yearP += principalForMonth;
    yearI += interestForMonth;

    if (m % 12 === 0 || m === months) {
      schedule.push({
        year: Math.ceil(m / 12),
        principalPaid: yearP,
        interestPaid: yearI,
        balance: balance
      });
      yearP = 0;
      yearI = 0;
    }
  }

  results.value = {
    emi: emi,
    principal: P,
    totalInterest: totalInterest,
    totalPayable: totalPayable,
    principalPercent: pPercent,
    interestPercent: iPercent,
    schedule: schedule
  };
  
  showSchedule.value = true;
  
  setTimeout(() => {
    document.getElementById('schedule-area')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

function formatMoney(num) {
  return parseInt(num).toLocaleString('en-US', { style: 'currency', currency: 'USD' }).replace('$', '');
}

function printSchedule() {
  window.print();
}

const faqs = [
  { question: "Does this work for mortgages?", answer: "Yes, this standard amortization calculator works for fixed-rate mortgages, car loans, and personal loans." },
  { question: "How can I reduce my total interest?", answer: "Consider increasing your monthly EMI, making a prepayment, or choosing a shorter loan tenure to drastically reduce interest costs." },
  { question: "Is the interest rate monthly or yearly?", answer: "Please enter the Annual Interest Rate (e.g., 5.5%). The calculator automatically converts it to a monthly rate for computation." }
];

// --- Lifecycle ---
onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Loan EMI Calculator',
    description: 'Calculate monthly EMI (Equated Monthly Installment) for home, car, and personal loans. View detailed amortization schedule and total interest payable.',
    url: currentUrl,
    category: 'FinanceApplication',
    features: [
      'EMI calculation',
      'Amortization schedule generation',
      'Principal and interest breakdown',
      'Total interest calculation',
      'Multiple loan types support',
      'Loan comparison tools'
    ],
    usageInfo: 'Enter loan amount, interest rate, and tenure. Receive monthly EMI, total interest, and complete amortization schedule.',
    helpText: 'Loan Calculator helps borrowers understand loan costs and make informed borrowing decisions.'
  });
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Loan Calculator', path: '/tools/loan-calculator' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Loan & EMI Calculator 2025 | Amortization Schedule Generator',
    description: 'Calculate monthly EMI for home, car, and personal loans. View detailed amortization schedule.',
    about: [
      { '@type': 'Thing', name: 'Loan calculation' },
      { '@type': 'Thing', name: 'EMI calculator' },
      { '@type': 'Thing', name: 'Financial planning' }
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
.loan-calculator-page {
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

.eyebrow {
  color: #8B5CF6;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero-section h1 {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-4xl));
  margin: 10px 0;
  color: var(--color-text-primary);
}

.hero-subtitle {
  color: var(--color-text-secondary);
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
  background: rgba(139, 92, 246, 0.1);
  color: #8B5CF6;
  border: 1px solid rgba(139, 92, 246, 0.3);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
}

/* Interface */
.tool-interface {
  max-width: 900px;
  margin: 0 auto 40px;
  padding: var(--spacing-xl);
}

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

@media (max-width: 768px) {
  .calculator-grid { grid-template-columns: 1fr; }
}

.input-panel h3 { margin-top: 0; color: var(--color-text-primary); }

.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 600; font-size: 0.9rem; }

.input-wrapper { position: relative; }
.currency { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-weight: bold; color: var(--color-text-secondary); }

.styled-input {
  width: 100%;
  padding: 12px 12px 12px 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--color-text-primary);
  border-radius: var(--radius-md);
  font-size: 1rem;
}

.big-input { padding-left: 25px; font-size: 1.2rem; font-weight: bold; }

.tenure-group { display: flex; gap: 10px; }
.styled-select { padding: 12px; background: var(--glass-bg); border: 1px solid var(--glass-border); color: var(--color-text-primary); border-radius: var(--radius-md); }

.btn-large {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  background: #8B5CF6;
  color: white;
  border: none;
  border-radius: var(--radius-md);
  margin-top: 10px;
  transition: transform 0.2s;
}
.btn-large:hover { transform: translateY(-2px); background: #7C3AED; }

/* Result Panel */
.result-panel {
  display: flex;
  flex-direction: column;
}

.emi-display {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid #8B5CF6;
  padding: 20px;
  border-radius: var(--radius-md);
  text-align: center;
  margin-bottom: 20px;
}

.emi-label { display: block; font-size: 0.9rem; margin-bottom: 5px; color: var(--color-text-secondary); }
.emi-value { display: block; font-size: 2.5rem; font-weight: 800; color: #8B5CF6; }

.summary-breakdown {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  color: var(--color-text-secondary);
}

.summary-item.highlight {
  color: var(--color-text-primary);
  font-size: 1.1rem;
  margin-top: 10px;
}

.dot { width: 10px; height: 10px; border-radius: 50%; }
.p-dot { background: #10B981; }
.i-dot { background: #EF4444; }

.divider { height: 1px; background: var(--glass-border); margin: 10px 0; }

.viz-bar-container { margin-bottom: 20px; }
.viz-bar { height: 12px; display: flex; border-radius: 6px; overflow: hidden; margin-bottom: 5px; }
.p-segment { background: #10B981; }
.i-segment { background: #EF4444; }
.viz-legend { display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--color-text-tertiary); }

.small-btn { font-size: 0.9rem; padding: 8px 16px; width: auto; align-self: center; }

.empty-state { align-items: center; justify-content: center; text-align: center; opacity: 0.6; }
.empty-icon { font-size: 3rem; margin-bottom: 15px; }

/* Schedule */
.schedule-section {
  max-width: 900px;
  margin: 0 auto 40px;
  padding: 20px;
}
.schedule-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.schedule-header h3 { margin: 0; color: #8B5CF6; }

.table-container { overflow-x: auto; }
.schedule-table { width: 100%; border-collapse: collapse; min-width: 500px; }
.schedule-table th, .schedule-table td { padding: 12px; text-align: left; border-bottom: 1px solid var(--glass-border); }
.schedule-table th { color: var(--color-text-secondary); font-size: 0.9rem; }
.schedule-table td { color: var(--color-text-primary); }

/* Content SEO */
.content-section {
  max-width: 800px;
  margin: 0 auto;
}

.seo-article {
  background: var(--glass-bg);
  padding: 30px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--glass-border);
  margin-bottom: 40px;
}

.seo-article h2 { color: #8B5CF6; margin-top: 0; }
.seo-article h3 { margin-top: 25px; color: var(--color-text-primary); }
.seo-article p, code { color: var(--color-text-secondary); line-height: 1.6; }
code { background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; display: inline-block; }

.faq-list { display: grid; gap: 15px; }
.faq-item { padding: 20px; }
.faq-item h4 { color: #8B5CF6; margin-bottom: 10px; }
</style>
