<template>
  <div class="tool-page age-calculator-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Age Calculator" category="Utility" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">📅 Precise Age & Date Calculator</p>
        <h1>Calculate Your Exact Age, Date Differences For Free</h1>
        <p class="hero-subtitle">
          Discover your precise age in years, months, days, and hours. Calculate date differences, 
          find your zodiac sign, countdown to your next birthday, and plan for retirement. 
          All calculations happen instantly in your browser—your privacy is guaranteed.
        </p>
        <div class="hero-badges">
          <span class="badge">🎯 Exact Calculation</span>
          <span class="badge">♑ Zodiac Sign</span>
          <span class="badge">🎂 Birthday Countdown</span>
          <span class="badge">📊 Life Milestones</span>
          <span class="badge">🏖️ Retirement Planning</span>
        </div>
      </section>

      <!-- AI-Readable Summary Box -->
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What This Tool Does
        </h3>
        <p class="summary-text">
          <strong>Age Calculator</strong> calculates exact age in years, months, days, hours, and minutes from a birth date. The tool provides detailed age breakdowns, calculates date differences between two dates, identifies zodiac signs, counts down to next birthday, calculates retirement dates based on country-specific retirement ages, and provides life milestone calculations. 
          Users enter a birth date (and optionally a target date) to receive precise age calculations, zodiac sign information, birthday countdown, and retirement planning dates. The calculator helps users track age milestones, plan for retirement, and understand time-related metrics. All calculations happen instantly in the browser for privacy.
        </p>
      </div>

      <!-- Main Calculator Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        
        <!-- Tabs -->
        <div class="tool-tabs">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="tab-btn" 
            :class="{ active: currentTab === tab.id }"
            @click="currentTab = tab.id"
          >
            <Icon :name="tab.icon" :size="18" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          
          <!-- AGE CALCULATOR -->
          <div v-if="currentTab === 'age'" class="calc-form">
            <div class="form-grid">
              <div class="form-group full-width">
                <label>
                  <Icon name="calendar" :size="16" />
                  Date of Birth
                </label>
                <input 
                  type="date" 
                  v-model="form.dob" 
                  :max="today" 
                  class="styled-input"
                  required
                >
                <small class="hint">Select your birth date</small>
              </div>
              <div class="form-group full-width">
                <label>
                  <Icon name="target" :size="16" />
                  Calculate Age At (Optional)
                </label>
                <input 
                  type="date" 
                  v-model="form.targetDate" 
                  :min="form.dob || undefined"
                  class="styled-input"
                >
                <small class="hint">Leave empty to calculate age today. Useful for calculating age on a specific past or future date.</small>
              </div>
              <div class="form-group" v-if="form.country">
                <label>
                  <Icon name="globe" :size="16" />
                  Country (Optional)
                </label>
                <select v-model="form.country" class="styled-input">
                  <option value="">Select Country</option>
                  <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
                </select>
                <small class="hint">For retirement age calculations</small>
              </div>
            </div>
          </div>

          <!-- DATE DIFFERENCE -->
          <div v-if="currentTab === 'diff'" class="calc-form">
            <div class="form-grid">
              <div class="form-group">
                <label>
                  <Icon name="arrow-left" :size="16" />
                  Start Date
                </label>
                <input type="date" v-model="form.diffStart" class="styled-input" required>
              </div>
              <div class="form-group">
                <label>
                  <Icon name="arrow-right" :size="16" />
                  End Date
                </label>
                <input type="date" v-model="form.diffEnd" class="styled-input" required>
              </div>
            </div>
            <div class="info-box">
              <Icon name="info" :size="18" />
              <p>Calculate the exact duration between any two dates. Useful for project timelines, work tenure, or relationship anniversaries.</p>
            </div>
          </div>

          <!-- RETIREMENT -->
          <div v-if="currentTab === 'retirement'" class="calc-form">
            <div class="form-grid">
              <div class="form-group">
                <label>
                  <Icon name="calendar" :size="16" />
                  Date of Birth
                </label>
                <input type="date" v-model="form.dob" :max="today" class="styled-input" required>
              </div>
              <div class="form-group">
                <label>
                  <Icon name="globe" :size="16" />
                  Country
                </label>
                <select v-model="form.country" class="styled-input">
                  <option value="">Select Country</option>
                  <option v-for="c in countries" :key="c.code" :value="c.code">{{ c.name }}</option>
                </select>
              </div>
              <div class="form-group" v-if="!form.country || !getRetirementAge(form.country)">
                <label>
                  <Icon name="target" :size="16" />
                  Retirement Age
                </label>
                <input 
                  type="number" 
                  v-model.number="form.retirementAge" 
                  placeholder="60" 
                  class="styled-input" 
                  min="1" 
                  max="120"
                >
                <small class="hint">Default: 60 years (or country-specific if selected)</small>
              </div>
            </div>
            <div v-if="form.country && getRetirementAge(form.country)" class="info-box success">
              <Icon name="check-circle" :size="18" />
              <p>
                <strong>Retirement age for {{ getCountryName(form.country) }}:</strong> 
                {{ getRetirementAge(form.country) }} years ({{ getRetirementAge(form.country, true) }})
              </p>
            </div>
          </div>

          <!-- Action -->
          <div class="calc-actions">
            <button @click="calculate" class="btn btn-primary btn-large">
              <Icon name="zap" :size="20" />
              <span>Calculate Results</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <transition name="slide-up">
        <div v-if="results" class="results-section" id="results-area">
          
          <!-- Age Results -->
          <div v-if="currentTab === 'age'" class="results-grid">
            <div class="result-card highlight-card">
              <h3>Your Exact Age</h3>
              <div class="big-number">
                {{ results.age.years }} <span class="unit">Years</span>
              </div>
              <div class="detail-row">
                <span>{{ results.age.months }} Months</span>
                <span>{{ results.age.days }} Days</span>
              </div>
              <div class="detail-row secondary">
                <span>{{ results.age.hours }} Hours</span>
                <span>{{ results.age.minutes }} Minutes</span>
              </div>
            </div>

            <div class="result-card">
              <h3>
                <Icon name="bar-chart" :size="18" />
                Life in Numbers
              </h3>
              <ul class="stats-list">
                <li>
                  <span class="label">Total Months</span>
                  <span class="value">{{ formatNumber(results.age.totalMonths) }}</span>
                </li>
                <li>
                  <span class="label">Total Weeks</span>
                  <span class="value">{{ formatNumber(results.age.totalWeeks) }}</span>
                </li>
                <li>
                  <span class="label">Total Days</span>
                  <span class="value">{{ formatNumber(results.age.totalDays) }}</span>
                </li>
                <li>
                  <span class="label">Total Hours</span>
                  <span class="value">{{ formatNumber(results.age.totalHours) }}</span>
                </li>
                <li>
                  <span class="label">Total Minutes</span>
                  <span class="value">{{ formatNumber(results.age.totalMinutes) }}</span>
                </li>
                <li>
                  <span class="label">Total Seconds</span>
                  <span class="value">{{ formatNumber(results.age.totalSeconds) }}</span>
                </li>
              </ul>
            </div>

            <div class="result-card">
              <h3>
                <Icon name="gift" :size="18" />
                Next Birthday
              </h3>
              <div class="countdown">
                <div class="countdown-item">
                  <span class="val">{{ results.nextBirthday.months }}</span>
                  <span class="lbl">Months</span>
                </div>
                <div class="countdown-item">
                  <span class="val">{{ results.nextBirthday.days }}</span>
                  <span class="lbl">Days</span>
                </div>
                <div class="countdown-item">
                  <span class="val">{{ results.nextBirthday.hours }}</span>
                  <span class="lbl">Hours</span>
                </div>
              </div>
              <p class="next-bday-date">
                <Icon name="calendar" :size="14" />
                {{ results.nextBirthday.dateStr }}
              </p>
              <p class="day-of-week">
                <Icon name="clock" :size="14" />
                Born on a {{ results.dayOfWeek }}
              </p>
            </div>

            <div class="result-card">
              <h3>
                <Icon name="star" :size="18" />
                Zodiac Sign
              </h3>
              <div class="zodiac-display">
                <div class="zodiac-icon">{{ results.zodiac.icon }}</div>
                <div class="zodiac-info">
                  <strong>{{ results.zodiac.sign }}</strong>
                  <span class="zodiac-dates">{{ results.zodiac.dates }}</span>
                </div>
              </div>
              <p class="zodiac-desc">{{ results.zodiac.description }}</p>
            </div>

            <div class="result-card">
              <h3>
                <Icon name="check-circle" :size="18" />
                Leap Year Status
              </h3>
              <div class="leap-year-info">
                <Icon :name="results.isLeapYear ? 'check-circle' : 'x-circle'" :size="24" />
                <div>
                  <strong>{{ results.isLeapYear ? 'Born in a Leap Year' : 'Not a Leap Year' }}</strong>
                  <p>{{ results.leapYearExplanation }}</p>
                </div>
              </div>
            </div>

            <div class="result-card" v-if="results.milestones && results.milestones.length > 0">
              <h3>
                <Icon name="flag" :size="18" />
                Life Milestones
              </h3>
              <ul class="milestones-list">
                <li v-for="(milestone, idx) in results.milestones" :key="idx">
                  <Icon name="star" :size="14" />
                  <div>
                    <strong>{{ milestone.label }}</strong>
                    <span class="milestone-date">{{ milestone.date }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <div class="result-card" v-if="form.country">
              <h3>
                <Icon name="globe" :size="18" />
                Legal Information
              </h3>
              <ul class="legal-info">
                <li v-if="results.legalAge">
                  <Icon name="shield" :size="16" />
                  <div>
                    <strong>Legal Adult Age:</strong> {{ results.legalAge.age }} years
                    <span class="legal-note">{{ results.legalAge.note }}</span>
                  </div>
                </li>
                <li v-if="results.retirementInfo">
                  <Icon name="briefcase" :size="16" />
                  <div>
                    <strong>Retirement Age:</strong> {{ results.retirementInfo.age }} years
                    <span class="legal-note">{{ results.retirementInfo.note }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- Date Diff Results -->
          <div v-if="currentTab === 'diff'" class="results-single">
            <h3>Time Between Dates</h3>
            <div class="diff-result">
              <div class="diff-main">
                {{ results.diff.years }} Years, {{ results.diff.months }} Months, {{ results.diff.days }} Days
              </div>
              <div class="diff-details">
                <div class="diff-stat">
                  <span class="label">Total Days</span>
                  <span class="value">{{ formatNumber(results.diff.totalDays) }}</span>
                </div>
                <div class="diff-stat">
                  <span class="label">Total Weeks</span>
                  <span class="value">{{ formatNumber(results.diff.totalWeeks) }}</span>
                </div>
                <div class="diff-stat">
                  <span class="label">Total Hours</span>
                  <span class="value">{{ formatNumber(results.diff.totalHours) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Retirement Results -->
          <div v-if="currentTab === 'retirement'" class="results-single">
            <h3>Retirement Countdown</h3>
            <div class="retirement-grid">
              <div class="retire-stat">
                <Icon name="clock" :size="24" />
                <span class="label">Time Remaining</span>
                <span class="value">{{ results.retirement.yearsLeft }} Years</span>
                <span class="sub-value">{{ results.retirement.monthsLeft }} Months</span>
              </div>
              <div class="retire-stat">
                <Icon name="calendar" :size="24" />
                <span class="label">Retirement Date</span>
                <span class="value">{{ results.retirement.dateStr }}</span>
                <span class="sub-value">{{ results.retirement.dayOfWeek }}</span>
              </div>
              <div class="retire-stat">
                <Icon name="trending-up" :size="24" />
                <span class="label">Days Left</span>
                <span class="value">{{ formatNumber(results.retirement.daysLeft) }}</span>
                <span class="sub-value">{{ formatNumber(results.retirement.weeksLeft) }} Weeks</span>
              </div>
            </div>
          </div>

          <div class="result-actions">
            <button class="btn btn-outline" @click="downloadSummary">
              <Icon name="download" :size="18" />
              <span>Download Summary</span>
            </button>
            <button class="btn btn-outline" @click="shareResults">
              <Icon name="share-2" :size="18" />
              <span>Share Result</span>
            </button>
          </div>

        </div>
      </transition>

      <!-- Content & SEO Section -->
      <section class="content-section" data-aos="fade-up">
        
        <article class="seo-article">
          <h2>What is an Age Calculator and Why Do You Need One?</h2>
          <p>
            An age calculator is a tool that determines your exact age in various time units—years, months, days, hours, minutes, and seconds. 
            While knowing your age in years is straightforward, calculating precise age becomes complex when you need accuracy down to the day, 
            especially when accounting for leap years, varying month lengths, and time zones.
          </p>
          <p>
            The <strong>FikrNa Age Calculator</strong> handles all these complexities automatically. Every calculation happens directly in your web browser, 
            ensuring your personal information never leaves your device. Whether you're filling out official documents, planning retirement, 
            tracking milestones, or simply curious about your life in numbers, this tool provides instant, accurate results.
          </p>

          <h3>Common Use Cases for Age Calculation</h3>
          <p>
            Understanding your exact age serves many practical purposes:
          </p>
          <ul class="feature-list">
            <li>
              <strong>Official Documentation:</strong> Visa applications, insurance policies, and government forms often require your age calculated 
              to the exact day. Medical records, especially for children, rely on precise age in months or weeks for accurate growth tracking and 
              medication dosages.
            </li>
            <li>
              <strong>Financial Planning:</strong> Retirement planning requires knowing exactly how many working years remain. Loan applications, 
              investment strategies, and pension calculations all depend on accurate age data. Our retirement calculator helps you visualize your 
              career timeline and set realistic savings goals.
            </li>
            <li>
              <strong>Life Milestones:</strong> Celebrate meaningful dates like your 10,000th day alive, relationship anniversaries, or the exact 
              duration of a project. Understanding your age in different units helps you appreciate the passage of time and plan for future milestones.
            </li>
            <li>
              <strong>Date Differences:</strong> Calculate the exact duration between two dates for work tenure, project timelines, or historical 
              events. This is especially useful for employment records, contract periods, or tracking how long you've lived in a particular location.
            </li>
          </ul>

          <h3>Understanding Zodiac Signs and Astrology</h3>
          <p>
            Your birth date determines your Sun Sign in Western Astrology. While zodiac signs are cultural and not scientific, many people find 
            them interesting for personal reflection. Our tool automatically identifies your sign based on your birth date:
          </p>
          <div class="zodiac-grid">
            <div class="z-item">♈ <strong>Aries:</strong> March 21 - April 19</div>
            <div class="z-item">♉ <strong>Taurus:</strong> April 20 - May 20</div>
            <div class="z-item">♊ <strong>Gemini:</strong> May 21 - June 20</div>
            <div class="z-item">♋ <strong>Cancer:</strong> June 21 - July 22</div>
            <div class="z-item">♌ <strong>Leo:</strong> July 23 - August 22</div>
            <div class="z-item">♍ <strong>Virgo:</strong> August 23 - September 22</div>
            <div class="z-item">♎ <strong>Libra:</strong> September 23 - October 22</div>
            <div class="z-item">♏ <strong>Scorpio:</strong> October 23 - November 21</div>
            <div class="z-item">♐ <strong>Sagittarius:</strong> November 22 - December 21</div>
            <div class="z-item">♑ <strong>Capricorn:</strong> December 22 - January 19</div>
            <div class="z-item">♒ <strong>Aquarius:</strong> January 20 - February 18</div>
            <div class="z-item">♓ <strong>Pisces:</strong> February 19 - March 20</div>
          </div>

          <h3>How Age Calculation Works: The Math Behind It</h3>
          <p>
            Our calculator follows the standard Gregorian calendar, which is used by most countries worldwide. Here's how we handle the complexities:
          </p>
          <ul>
            <li>
              <strong>Leap Years:</strong> Every four years (with exceptions for century years not divisible by 400), an extra day is added to February, 
              making it 29 days instead of 28. Our calculator accounts for all leap years in your lifespan, ensuring the total day count is precise.
            </li>
            <li>
              <strong>Month Variations:</strong> Months have different lengths—28, 29, 30, or 31 days. When calculating age, we adjust the day count 
              accordingly when borrowing from months. For example, if you were born on January 31 and today is March 1, we correctly account for 
              February's 28 or 29 days.
            </li>
            <li>
              <strong>Date Differences:</strong> When calculating the gap between two arbitrary dates, we count inclusively, meaning both the start 
              and end dates are included in the calculation. This ensures accuracy for work tenure, contract periods, and other duration measurements.
            </li>
            <li>
              <strong>Time Zones:</strong> While our calculator uses your local browser time, for official purposes, you may need to account for 
              time zone differences. Always verify with official sources for legal or medical documentation.
            </li>
          </ul>

          <h3>Retirement Planning by Country</h3>
          <p>
            Retirement age varies significantly by country and can depend on factors like gender, profession, and years of service. 
            Here are some common retirement ages:
          </p>
          <ul>
            <li><strong>Pakistan:</strong> Typically 60 years for government employees, with variations for private sector</li>
            <li><strong>India:</strong> Generally 58-60 years, varying by organization</li>
            <li><strong>United States:</strong> Full retirement age ranges from 66 to 67, depending on birth year</li>
            <li><strong>United Kingdom:</strong> Currently 66, gradually increasing to 67</li>
            <li><strong>European Union:</strong> Varies by country, typically 65-67 years</li>
            <li><strong>Gulf Countries:</strong> Often 60 years, with variations by nationality and employer</li>
          </ul>
          <p>
            Our retirement calculator allows you to select your country for automatic retirement age detection, or you can manually set a custom 
            retirement age. This helps you visualize your career timeline and plan financially for your future.
          </p>

          <h3>Legal Adult Age by Country</h3>
          <p>
            The legal age of majority—when a person is considered an adult—varies globally:
          </p>
          <ul>
            <li><strong>18 years:</strong> Most countries including Pakistan, India, USA, UK, Canada, Australia, and most of Europe</li>
            <li><strong>21 years:</strong> Some jurisdictions in the United States for certain activities</li>
            <li><strong>19 years:</strong> Some Canadian provinces and South Korea</li>
            <li><strong>20 years:</strong> Japan and Taiwan</li>
          </ul>
          <p>
            When you select a country in our calculator, we display the relevant legal information for that region. This is for informational 
            purposes only and should not be considered legal advice.
          </p>

          <h3>Related Tools and Resources</h3>
          <p>
            If you found this age calculator helpful, you might also be interested in our other tools:
          </p>
          <ul>
            <li>
              <router-link to="/tools/salary-tax-calculator" class="inline-link">Salary Tax Calculator</router-link> — 
              Calculate your take-home salary after taxes, useful for retirement planning
            </li>
            <li>
              <router-link to="/tools/loan-calculator" class="inline-link">Loan Calculator</router-link> — 
              Plan your finances and understand loan payments over time
            </li>
            <li>
              <router-link to="/tools/bmi-calculator" class="inline-link">BMI Calculator</router-link> — 
              Track your health metrics alongside your age
            </li>
            <li>
              <router-link to="/tools/habit-tracker" class="inline-link">Habit Tracker</router-link> — 
              Build positive habits as you track your life milestones
            </li>
          </ul>
        </article>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>Frequently Asked Questions</h2>
          <div class="faq-list">
            <div class="faq-item glass-card" v-for="(faq, i) in faqs" :key="i">
              <h4>{{ faq.question }}</h4>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="disclaimer-box">
          <Icon name="alert-circle" :size="24" />
          <div>
            <h3>Important Disclaimer</h3>
            <p>
              This age calculator is provided for informational and educational purposes only. While we strive for accuracy, 
              results should not be used as the sole basis for legal, medical, or financial decisions. Retirement ages and legal 
              adult ages vary by jurisdiction and may change over time. Always consult with qualified professionals for official 
              documentation, legal matters, or financial planning. Your birth date and personal information are never stored or 
              transmitted—all calculations happen locally in your browser.
            </p>
          </div>
        </div>

      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/age-calculator" category="Utility" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import AOS from 'aos';
import { 
  generateToolSchema, 
  generateFAQSchema,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/age-calculator`;

useSEO({
  title: 'Free Age Calculator Online 2025 | Exact Age, Date Difference, Zodiac & Retirement Planner',
  description: 'Calculate exact age in years, months, days, and hours. Features include birthday countdown, zodiac sign finder, date difference calculator, retirement planning with country-specific retirement ages, and life milestones. Free, accurate, and completely private. Instant results.',
  keywords: 'age calculator, exact age calculator, birthday countdown, zodiac sign calculator, date difference calculator, retirement age calculator, calculate age online, how old am I, age in days, life milestones calculator, retirement planner, time duration calculator, age in months, age in hours, zodiac calculator, retirement date calculator',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const today = new Date().toISOString().split('T')[0];
const currentTab = ref('age');
const tabs = [
  { id: 'age', label: 'Age Calculator', icon: 'calendar' },
  { id: 'diff', label: 'Date Difference', icon: 'arrow-left-right' },
  { id: 'retirement', label: 'Retirement', icon: 'briefcase' }
];

const form = reactive({
  dob: '',
  targetDate: '',
  diffStart: '',
  diffEnd: today,
  retirementAge: 60,
  country: ''
});

const results = ref(null);

// Country data with retirement ages and legal adult ages
const countries = [
  { code: 'PK', name: 'Pakistan', retirementAge: 60, legalAge: 18, retirementNote: 'Government employees' },
  { code: 'IN', name: 'India', retirementAge: 60, legalAge: 18, retirementNote: 'Varies by organization' },
  { code: 'US', name: 'United States', retirementAge: 67, legalAge: 18, retirementNote: 'Full retirement age (varies by birth year)' },
  { code: 'GB', name: 'United Kingdom', retirementAge: 66, legalAge: 18, retirementNote: 'Gradually increasing to 67' },
  { code: 'CA', name: 'Canada', retirementAge: 65, legalAge: 18, retirementNote: 'Varies by province' },
  { code: 'AU', name: 'Australia', retirementAge: 67, legalAge: 18, retirementNote: 'Gradually increasing' },
  { code: 'DE', name: 'Germany', retirementAge: 67, legalAge: 18, retirementNote: 'Gradually increasing' },
  { code: 'FR', name: 'France', retirementAge: 62, legalAge: 18, retirementNote: 'Full pension at 67' },
  { code: 'AE', name: 'United Arab Emirates', retirementAge: 60, legalAge: 18, retirementNote: 'Varies by nationality' },
  { code: 'SA', name: 'Saudi Arabia', retirementAge: 60, legalAge: 18, retirementNote: 'Varies by employer' },
  { code: 'JP', name: 'Japan', retirementAge: 65, legalAge: 20, retirementNote: 'Gradually increasing' }
];

// Methods
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function getRetirementAge(countryCode, returnNote = false) {
  const country = countries.find(c => c.code === countryCode);
  if (!country) return null;
  return returnNote ? country.retirementNote : country.retirementAge;
}

function getCountryName(countryCode) {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.name : '';
}

function getLegalAge(countryCode) {
  const country = countries.find(c => c.code === countryCode);
  return country ? country.legalAge : null;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function getDayOfWeek(date) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
}

function getZodiacSign(day, month) {
  const zodiac = [
    { sign: 'Capricorn', icon: '♑', start: [1, 1], end: [1, 19], dates: 'Dec 22 - Jan 19', description: 'Ambitious, disciplined, practical' },
    { sign: 'Aquarius', icon: '♒', start: [1, 20], end: [2, 18], dates: 'Jan 20 - Feb 18', description: 'Independent, innovative, humanitarian' },
    { sign: 'Pisces', icon: '♓', start: [2, 19], end: [3, 20], dates: 'Feb 19 - Mar 20', description: 'Compassionate, intuitive, artistic' },
    { sign: 'Aries', icon: '♈', start: [3, 21], end: [4, 19], dates: 'Mar 21 - Apr 19', description: 'Courageous, energetic, confident' },
    { sign: 'Taurus', icon: '♉', start: [4, 20], end: [5, 20], dates: 'Apr 20 - May 20', description: 'Reliable, patient, determined' },
    { sign: 'Gemini', icon: '♊', start: [5, 21], end: [6, 20], dates: 'May 21 - Jun 20', description: 'Adaptable, curious, expressive' },
    { sign: 'Cancer', icon: '♋', start: [6, 21], end: [7, 22], dates: 'Jun 21 - Jul 22', description: 'Nurturing, emotional, intuitive' },
    { sign: 'Leo', icon: '♌', start: [7, 23], end: [8, 22], dates: 'Jul 23 - Aug 22', description: 'Confident, creative, generous' },
    { sign: 'Virgo', icon: '♍', start: [8, 23], end: [9, 22], dates: 'Aug 23 - Sep 22', description: 'Analytical, practical, detail-oriented' },
    { sign: 'Libra', icon: '♎', start: [9, 23], end: [10, 22], dates: 'Sep 23 - Oct 22', description: 'Diplomatic, balanced, harmonious' },
    { sign: 'Scorpio', icon: '♏', start: [10, 23], end: [11, 21], dates: 'Oct 23 - Nov 21', description: 'Intense, passionate, resourceful' },
    { sign: 'Sagittarius', icon: '♐', start: [11, 22], end: [12, 21], dates: 'Nov 22 - Dec 21', description: 'Adventurous, optimistic, philosophical' },
    { sign: 'Capricorn', icon: '♑', start: [12, 22], end: [12, 31], dates: 'Dec 22 - Jan 19', description: 'Ambitious, disciplined, practical' }
  ];

  for (const z of zodiac) {
    if (
      (month === z.start[0] && day >= z.start[1]) ||
      (month === z.end[0] && day <= z.end[1])
    ) {
      return z;
    }
  }
  return { sign: 'Unknown', icon: '🌟', dates: '', description: '' };
}

function getMilestones(dob, target) {
  const milestones = [
    { age: 18, label: 'Legal Adult (18 years)' },
    { age: 21, label: 'Coming of Age (21 years)' },
    { age: 25, label: 'Quarter Century (25 years)' },
    { age: 30, label: 'Thirty Years Old' },
    { age: 40, label: 'Forty Years Old' },
    { age: 50, label: 'Half Century (50 years)' },
    { age: 60, label: 'Sixty Years Old' },
    { age: 70, label: 'Seventy Years Old' },
    { age: 80, label: 'Eighty Years Old' },
    { age: 90, label: 'Ninety Years Old' },
    { age: 100, label: 'Century (100 years)' }
  ];

  const currentAge = target.getFullYear() - dob.getFullYear();
  const upcoming = milestones.filter(m => m.age > currentAge).slice(0, 5);
  
  return upcoming.map(m => {
    const milestoneDate = new Date(dob);
    milestoneDate.setFullYear(dob.getFullYear() + m.age);
    return {
      label: m.label,
      date: milestoneDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };
  });
}

function calculate() {
  results.value = null;

  if (currentTab.value === 'age') {
    if (!form.dob) {
      alert('Please enter your date of birth');
      return;
    }
    
    const dob = new Date(form.dob + 'T00:00:00');
    const target = form.targetDate ? new Date(form.targetDate + 'T00:00:00') : new Date();
    
    if (target < dob) {
      alert('Target date cannot be before date of birth');
      return;
    }

    // Core age calculation
    let years = target.getFullYear() - dob.getFullYear();
    let months = target.getMonth() - dob.getMonth();
    let days = target.getDate() - dob.getDate();
    let hours = target.getHours() - dob.getHours();
    let minutes = target.getMinutes() - dob.getMinutes();

    if (minutes < 0) {
      hours--;
      minutes += 60;
    }
    if (hours < 0) {
      days--;
      hours += 24;
    }
    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Totals
    const diffTime = target - dob;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffTime / (1000 * 60));
    const totalSeconds = Math.floor(diffTime / 1000);

    // Next Birthday
    const nextBday = new Date(target);
    nextBday.setMonth(dob.getMonth());
    nextBday.setDate(dob.getDate());
    nextBday.setHours(0, 0, 0, 0);
    
    if (nextBday <= target) {
      nextBday.setFullYear(nextBday.getFullYear() + 1);
    }
    
    const nextDiff = nextBday - target;
    const nextDaysTotal = Math.ceil(nextDiff / (1000 * 60 * 60 * 24));
    const nbMonths = Math.floor(nextDaysTotal / 30.44);
    const nbDays = nextDaysTotal % 30;
    const nbHours = Math.floor((nextDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    // Zodiac
    const zodiac = getZodiacSign(dob.getDate(), dob.getMonth() + 1);

    // Leap Year
    const isLeap = isLeapYear(dob.getFullYear());
    const leapExplanation = isLeap 
      ? `You were born in ${dob.getFullYear()}, which was a leap year (366 days).`
      : `You were born in ${dob.getFullYear()}, which was not a leap year (365 days).`;

    // Day of Week
    const dayOfWeek = getDayOfWeek(dob);

    // Milestones
    const milestones = getMilestones(dob, target);

    // Legal Info
    let legalAge = null;
    let retirementInfo = null;
    if (form.country) {
      const legal = getLegalAge(form.country);
      if (legal) {
        legalAge = {
          age: legal,
          note: `Legal adult age in ${getCountryName(form.country)}`
        };
      }
      const retireAge = getRetirementAge(form.country);
      if (retireAge) {
        const retireDate = new Date(dob);
        retireDate.setFullYear(dob.getFullYear() + retireAge);
        retirementInfo = {
          age: retireAge,
          note: getRetirementAge(form.country, true)
        };
      }
    }

    results.value = {
      age: {
        years, months, days, hours, minutes,
        totalMonths: years * 12 + months,
        totalWeeks: Math.floor(totalDays / 7),
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds
      },
      nextBirthday: {
        months: nbMonths,
        days: nbDays,
        hours: nbHours,
        dateStr: nextBday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      },
      zodiac,
      isLeapYear: isLeap,
      leapYearExplanation: leapExplanation,
      dayOfWeek,
      milestones,
      legalAge,
      retirementInfo
    };
  } 
  else if (currentTab.value === 'diff') {
    if (!form.diffStart || !form.diffEnd) {
      alert('Please enter both start and end dates');
      return;
    }
    
    const d1 = new Date(form.diffStart + 'T00:00:00');
    const d2 = new Date(form.diffEnd + 'T00:00:00');
    
    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;
    
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = end - start;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffTime / (1000 * 60 * 60));

    results.value = {
      diff: { years, months, days, totalDays, totalWeeks, totalHours }
    };
  }
  else if (currentTab.value === 'retirement') {
    if (!form.dob) {
      alert('Please enter your date of birth');
      return;
    }
    
    const dob = new Date(form.dob + 'T00:00:00');
    const retireAge = form.country && getRetirementAge(form.country) 
      ? getRetirementAge(form.country) 
      : (form.retirementAge || 60);
    
    const retireDate = new Date(dob);
    retireDate.setFullYear(dob.getFullYear() + retireAge);
    
    const now = new Date();
    
    if (retireDate <= now) {
      alert('You have already reached or passed this retirement age!');
      return;
    }
    
    let yearsLeft = retireDate.getFullYear() - now.getFullYear();
    let monthsLeft = retireDate.getMonth() - now.getMonth();
    let daysLeft = retireDate.getDate() - now.getDate();

    if (daysLeft < 0) {
      monthsLeft--;
      daysLeft += new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    }
    if (monthsLeft < 0) {
      yearsLeft--;
      monthsLeft += 12;
    }

    const totalDiff = Math.ceil((retireDate - now) / (1000 * 60 * 60 * 24));
    const weeksLeft = Math.floor(totalDiff / 7);

    results.value = {
      retirement: {
        dateStr: retireDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        dayOfWeek: getDayOfWeek(retireDate),
        yearsLeft,
        monthsLeft,
        daysLeft: totalDiff,
        weeksLeft
      }
    };
  }

  // Scroll to results
  setTimeout(() => {
    document.getElementById('results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function downloadSummary() {
  if (!results.value) return;
  
  let content = 'Age Calculation Summary\n';
  content += '=====================\n\n';
  
  if (currentTab.value === 'age') {
    content += `Date of Birth: ${form.dob}\n`;
    content += `Age: ${results.value.age.years} years, ${results.value.age.months} months, ${results.value.age.days} days\n`;
    content += `Total Days: ${formatNumber(results.value.age.totalDays)}\n`;
    content += `Zodiac Sign: ${results.value.zodiac.sign} ${results.value.zodiac.icon}\n`;
    content += `Next Birthday: ${results.value.nextBirthday.dateStr}\n`;
  }
  
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'age-calculation-summary.txt';
  a.click();
  URL.revokeObjectURL(url);
}

function shareResults() {
  if (navigator.share) {
    navigator.share({
      title: 'My Age Calculation',
      text: `I calculated my age using FikrNa's Age Calculator!`,
      url: window.location.href
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
    });
  }
}

// FAQs
const faqs = [
  { 
    question: 'How accurate is this age calculator?', 
    answer: 'Our calculator is highly accurate, accounting for leap years, varying month lengths, and precise time calculations. All calculations follow the standard Gregorian calendar used worldwide. For official documentation, always verify with authoritative sources.' 
  },
  { 
    question: 'Does the calculator handle leap years correctly?', 
    answer: 'Yes. The calculator accounts for all leap years (years divisible by 4, except century years not divisible by 400). This ensures your total day count is precise, including the extra day in February during leap years.' 
  },
  { 
    question: 'Can I calculate my age on a specific past or future date?', 
    answer: 'Absolutely. Use the "Calculate Age At" field to enter any date. This is useful for determining your age on a specific historical date, future planning, or filling out forms that require your age on a particular date.' 
  },
  { 
    question: 'How does the zodiac sign calculation work?', 
    answer: 'The zodiac sign is determined by your birth date using Western Astrology dates. Each sign corresponds to a specific date range. Note that zodiac signs are cultural and not scientific—they\'re provided for entertainment and personal interest.' 
  },
  { 
    question: 'Is my birth date stored or sent to a server?', 
    answer: 'No. All calculations happen directly in your web browser. Your birth date and personal information never leave your device. We don\'t store, transmit, or have access to any of your data. Your privacy is completely protected.' 
  },
  { 
    question: 'Can I use this for calculating a baby\'s age in weeks or months?', 
    answer: 'Yes. The calculator provides age in multiple units including total weeks and months, which is especially helpful for tracking infant development milestones, pediatric care, and growth monitoring.' 
  },
  { 
    question: 'How is the retirement age determined for different countries?', 
    answer: 'When you select a country, we use the standard retirement age for that region. These ages can vary by gender, profession, and may change over time. Our calculator provides general information—always verify with official sources for your specific situation.' 
  },
  { 
    question: 'What are life milestones and why are they shown?', 
    answer: 'Life milestones are significant age markers like 18 (legal adult), 21, 25, 50, etc. We show upcoming milestones to help you plan and celebrate meaningful moments. These are cultural markers and may vary in significance by region.' 
  },
  { 
    question: 'Can I calculate the difference between any two dates?', 
    answer: 'Yes. Use the "Date Difference" tab to calculate the exact duration between any two dates. This is useful for work tenure, project timelines, contract periods, or tracking how long you\'ve lived somewhere.' 
  },
  { 
    question: 'Why does the calculator show hours and minutes?', 
    answer: 'For precise age calculations, especially for newborns or when exact timing matters, hours and minutes provide additional accuracy. This can be useful for medical records, legal documentation, or simply satisfying curiosity about your exact age.' 
  }
];

// Lifecycle
onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Age Calculator - Exact Age, Date Difference & Retirement Planner',
    description: 'Calculate exact age in years, months, days, and hours. Features include birthday countdown, zodiac sign finder, date difference calculator, and retirement planning with country-specific retirement ages.',
    url: currentUrl,
    category: 'UtilityApplication',
    features: [
      'Exact age calculation',
      'Date difference calculator',
      'Zodiac sign finder',
      'Birthday countdown',
      'Retirement date calculation',
      'Life milestones',
      'Country-specific retirement ages'
    ],
    usageInfo: 'Enter birth date to calculate exact age, zodiac sign, and birthday countdown. Use date difference calculator or retirement planner for additional features.',
    helpText: 'Age Calculator helps users track age milestones, plan for retirement, and understand time-related metrics.'
  });
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Age Calculator', path: '/tools/age-calculator' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Age Calculator Online 2025 | Exact Age, Date Difference, Zodiac & Retirement',
    description: 'Calculate exact age in years, months, days, and hours. Features include birthday countdown, zodiac sign finder, and retirement planning.',
    about: [
      { '@type': 'Thing', name: 'Age calculation' },
      { '@type': 'Thing', name: 'Date calculation' },
      { '@type': 'Thing', name: 'Time calculation' }
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
.age-calculator-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
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
  margin-bottom: clamp(40px, 6vh, 60px);
}

.eyebrow {
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.hero-section h1 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  margin-bottom: 20px;
  color: var(--text-primary);
  font-weight: 800;
  line-height: 1.2;
}

.hero-subtitle {
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 24px;
  font-size: clamp(1rem, 1.2vw, 1.125rem);
  line-height: 1.7;
}

.hero-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.badge {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Tool Interface */
.tool-interface {
  max-width: 900px;
  margin: 0 auto clamp(40px, 6vh, 60px);
  padding: 0;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.tool-tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid var(--glass-border);
}

.tab-btn {
  flex: 1;
  padding: 16px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.9375rem;
}

.tab-btn:hover {
  background: rgba(16, 185, 129, 0.05);
}

.tab-btn.active {
  color: #10b981;
  border-bottom-color: #10b981;
  background: rgba(16, 185, 129, 0.08);
}

.tab-content {
  padding: clamp(24px, 4vh, 36px);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.hint {
  display: block;
  margin-top: 6px;
  color: var(--text-tertiary);
  font-size: 0.8125rem;
  line-height: 1.5;
}

.info-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-md);
  margin-top: 20px;
}

.info-box.success {
  background: rgba(16, 185, 129, 0.08);
}

.info-box svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.info-box p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.calc-actions {
  text-align: center;
  margin-top: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.btn-large {
  padding: 16px 32px;
  font-size: 1.0625rem;
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
}

/* Results */
.results-section {
  max-width: 1000px;
  margin: 0 auto clamp(40px, 6vh, 60px);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.result-card {
  padding: 24px;
  border-radius: var(--radius-lg);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  transition: all 0.3s;
}

.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.highlight-card {
  grid-column: 1 / -1;
  text-align: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05));
  border: 2px solid rgba(16, 185, 129, 0.3);
}

.result-card h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-size: 1.125rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.big-number {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: #10b981;
  line-height: 1;
  margin: 16px 0;
}

.unit {
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  color: var(--text-secondary);
  font-weight: 600;
}

.detail-row {
  font-size: 1.125rem;
  color: var(--text-primary);
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 12px;
  font-weight: 600;
}

.detail-row.secondary {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 8px;
}

.stats-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.stats-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
}

.stats-list li:last-child {
  border-bottom: none;
}

.stats-list .label {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.stats-list .value {
  color: var(--text-primary);
  font-weight: 700;
  font-size: 1.0625rem;
}

.countdown {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.countdown-item {
  flex: 1;
  background: rgba(16, 185, 129, 0.1);
  padding: 16px;
  border-radius: var(--radius-md);
  text-align: center;
}

.countdown-item .val {
  display: block;
  font-size: 1.75rem;
  font-weight: 800;
  color: #10b981;
  line-height: 1;
}

.countdown-item .lbl {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.next-bday-date,
.day-of-week {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.zodiac-display {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
}

.zodiac-icon {
  font-size: 3rem;
  line-height: 1;
}

.zodiac-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.zodiac-info strong {
  font-size: 1.25rem;
  color: var(--text-primary);
}

.zodiac-dates {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.zodiac-desc {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.leap-year-info {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.leap-year-info svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.leap-year-info strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.leap-year-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.milestones-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.milestones-list li {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
}

.milestones-list li:last-child {
  border-bottom: none;
}

.milestones-list svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.milestones-list strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.milestone-date {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.legal-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.legal-info li {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
}

.legal-info li:last-child {
  border-bottom: none;
}

.legal-info svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.legal-info strong {
  display: block;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.legal-note {
  display: block;
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-top: 2px;
}

.results-single {
  padding: 32px;
  text-align: center;
  margin-bottom: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.results-single h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 24px;
}

.diff-result {
  margin-top: 24px;
}

.diff-main {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 800;
  color: #10b981;
  margin-bottom: 24px;
}

.diff-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.diff-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.diff-stat .label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.diff-stat .value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.retirement-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.retire-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 24px;
  background: rgba(16, 185, 129, 0.05);
  border-radius: var(--radius-md);
}

.retire-stat svg {
  color: #10b981;
  margin-bottom: 12px;
}

.retire-stat .label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.retire-stat .value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.retire-stat .sub-value {
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.result-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
}

/* Content SEO */
.content-section {
  max-width: 900px;
  margin: clamp(60px, 8vh, 80px) auto 0;
}

.seo-article {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  padding: clamp(32px, 5vh, 48px);
  border-radius: var(--radius-xl);
  margin-bottom: 40px;
}

.seo-article h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 800;
  line-height: 1.3;
}

.seo-article h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--text-primary);
  margin-top: 32px;
  margin-bottom: 12px;
  font-weight: 700;
}

.seo-article p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 1rem;
}

.seo-article ul {
  padding-left: 24px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

.seo-article li {
  margin-bottom: 12px;
}

.feature-list li {
  margin-bottom: 16px;
}

.zodiac-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin: 24px 0;
}

.z-item {
  background: rgba(16, 185, 129, 0.05);
  padding: 12px;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  color: var(--text-secondary);
  border: 1px solid rgba(16, 185, 129, 0.1);
}

.z-item strong {
  color: var(--text-primary);
}

.inline-link {
  color: #10b981;
  text-decoration: none;
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.inline-link:hover {
  border-bottom-color: #10b981;
}

.faq-container {
  margin-top: 48px;
}

.faq-container h2 {
  text-align: center;
  margin-bottom: 32px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  font-weight: 800;
}

.faq-list {
  display: grid;
  gap: 16px;
}

.faq-item {
  padding: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.faq-item h4 {
  color: #10b981;
  margin-bottom: 12px;
  font-size: 1.125rem;
  font-weight: 700;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

.disclaimer-box {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: rgba(239, 68, 68, 0.05);
  border: 2px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-lg);
  margin-top: 40px;
}

.disclaimer-box svg {
  color: #ef4444;
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-box h3 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.disclaimer-box p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
}

/* Transitions */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive */
@media (max-width: 768px) {
  .age-calculator-page {
    padding: clamp(60px, 10vh, 80px) 0 clamp(40px, 6vh, 60px);
  }

  .tool-tabs {
    flex-direction: column;
  }

  .tab-btn {
    border-bottom: 1px solid var(--glass-border);
    border-left: 3px solid transparent;
  }

  .tab-btn.active {
    border-left-color: #10b981;
    border-bottom-color: var(--glass-border);
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .highlight-card {
    grid-column: 1;
  }

  .big-number {
    font-size: 2.5rem;
  }

  .detail-row {
    flex-direction: column;
    gap: 8px;
  }

  .retirement-grid {
    grid-template-columns: 1fr;
  }

  .diff-details {
    grid-template-columns: 1fr;
  }

  .result-actions {
    flex-direction: column;
  }

  .btn-outline {
    width: 100%;
    justify-content: center;
  }

  .zodiac-grid {
    grid-template-columns: 1fr;
  }
}
</style>
