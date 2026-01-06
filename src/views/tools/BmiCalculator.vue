<template>
  <div class="tool-page bmi-calculator-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="BMI Calculator" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="heart" :size="16" />
          Complete Health Analysis
        </p>
        <h1>BMI Calculator & Comprehensive Health Metrics</h1>
        <p class="hero-subtitle">
          Calculate your Body Mass Index (BMI), Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), 
          ideal weight range, and advanced health metrics. Get personalized insights based on your age, gender, 
          height, weight, and activity level. All calculations happen instantly in your browser—your privacy is guaranteed.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="target" :size="14" />
            BMI Calculation
          </span>
          <span class="badge">
            <Icon name="zap" :size="14" />
            BMR & TDEE
          </span>
          <span class="badge">
            <Icon name="trending-up" :size="14" />
            Ideal Weight Range
          </span>
          <span class="badge">
            <Icon name="bar-chart" :size="14" />
            Advanced Metrics
          </span>
        </div>
      </section>

      <!-- AI-Readable Summary Box -->
      <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
        <h3 class="summary-title">
          <Icon name="info" :size="20" />
          What This Tool Does
        </h3>
        <p class="summary-text">
          <strong>BMI Calculator</strong> calculates Body Mass Index (BMI), Basal Metabolic Rate (BMR), and Total Daily Energy Expenditure (TDEE) based on your height, weight, age, gender, and activity level. 
          The tool provides your ideal weight range, calorie goals for weight loss or gain, and advanced health metrics including body fat percentage, lean mass, and waist-to-height ratio. 
          This calculator helps users understand their body composition and determine appropriate calorie intake for their fitness goals. All calculations use standard medical formulas (Mifflin-St Jeor for BMR, WHO/CDC BMI categories) and happen instantly in your browser for privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="activity" :size="20" />
            Health Metrics Calculator
          </h2>
          <div class="tool-actions" v-if="results">
            <button @click="copyResults" class="icon-btn" title="Copy Results">
              <Icon name="copy" :size="18" />
            </button>
            <button @click="downloadResults" class="icon-btn" title="Download Report">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetCalculator" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="calculator-grid">
          
          <!-- Input Panel -->
          <div class="input-panel">
            <div class="toggle-group">
              <button 
                @click="unit = 'metric'" 
                class="toggle-btn" 
                :class="{ active: unit === 'metric' }"
                aria-label="Metric units"
              >
                <Icon name="target" :size="14" />
                Metric (cm/kg)
              </button>
              <button 
                @click="unit = 'imperial'" 
                class="toggle-btn" 
                :class="{ active: unit === 'imperial' }"
                aria-label="Imperial units"
              >
                <Icon name="target" :size="14" />
                Imperial (ft/lbs)
              </button>
            </div>

            <div class="form-grid-compact">
              <div class="form-group">
                <label>
                  <Icon name="user" :size="14" />
                  Gender
                </label>
                <select v-model="form.gender" class="styled-input" aria-label="Gender">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="form-group">
                <label>
                  <Icon name="calendar" :size="14" />
                  Age
                </label>
                <input 
                  type="number" 
                  v-model.number="form.age" 
                  class="styled-input" 
                  placeholder="25"
                  min="1"
                  max="120"
                  aria-label="Age in years"
                >
              </div>
            </div>

            <div class="form-group" v-if="unit === 'metric'">
              <label>
                <Icon name="trending-up" :size="14" />
                Height (cm)
              </label>
              <input 
                type="number" 
                v-model.number="form.heightCm" 
                class="styled-input" 
                placeholder="175"
                min="50"
                max="250"
                aria-label="Height in centimeters"
              >
            </div>
            <div class="form-grid-compact" v-else>
              <div class="form-group">
                <label>Feet</label>
                <input 
                  type="number" 
                  v-model.number="form.heightFt" 
                  class="styled-input" 
                  placeholder="5"
                  min="2"
                  max="8"
                  aria-label="Height in feet"
                >
              </div>
              <div class="form-group">
                <label>Inches</label>
                <input 
                  type="number" 
                  v-model.number="form.heightIn" 
                  class="styled-input" 
                  placeholder="9"
                  min="0"
                  max="11"
                  aria-label="Height in inches"
                >
              </div>
            </div>

            <div class="form-group">
              <label>
                <Icon name="activity" :size="14" />
                Weight ({{ unit === 'metric' ? 'kg' : 'lbs' }})
              </label>
              <input 
                type="number" 
                v-model.number="form.weight" 
                class="styled-input" 
                :placeholder="unit === 'metric' ? '70' : '150'"
                min="1"
                max="500"
                step="0.1"
                aria-label="Weight"
              >
            </div>

            <div class="form-group">
              <label>
                <Icon name="zap" :size="14" />
                Activity Level
              </label>
              <select v-model="form.activity" class="styled-input" aria-label="Activity level for TDEE calculation">
                <option value="1.2">Sedentary (Little/no exercise)</option>
                <option value="1.375">Lightly Active (1-3 days/week)</option>
                <option value="1.55">Moderately Active (3-5 days/week)</option>
                <option value="1.725">Very Active (6-7 days/week)</option>
                <option value="1.9">Super Active (Physical job)</option>
              </select>
              <small class="hint">Used to calculate your Total Daily Energy Expenditure (TDEE)</small>
            </div>

            <div class="form-group" v-if="showAdvanced">
              <label>
                <Icon name="target" :size="14" />
                Waist Circumference (cm) - Optional
              </label>
              <input 
                type="number" 
                v-model.number="form.waist" 
                class="styled-input" 
                placeholder="80"
                min="30"
                max="200"
                step="0.1"
                aria-label="Waist circumference"
              >
              <small class="hint">For waist-to-height ratio calculation</small>
            </div>

            <button 
              @click="calculate" 
              class="btn btn-primary btn-large"
              :disabled="!canCalculate"
              aria-label="Calculate health metrics"
            >
              <Icon name="zap" :size="20" />
              <span>Calculate Health Metrics</span>
            </button>

            <button 
              @click="showAdvanced = !showAdvanced" 
              class="btn btn-outline btn-small"
            >
              <Icon :name="showAdvanced ? 'chevron-down' : 'chevron-down'" :size="16" />
              <span>{{ showAdvanced ? 'Hide' : 'Show' }} Advanced Options</span>
            </button>
          </div>

          <!-- Results Panel -->
          <div class="result-panel" v-if="results">
            
            <!-- BMI Score Card -->
            <div class="score-card" :class="results.categoryClass">
              <div class="score-header">
                <span class="score-label">Your BMI Score</span>
                <span class="score-val">{{ results.bmi }}</span>
              </div>
              <div class="score-bar-container">
                <div class="score-bar">
                  <div class="score-indicator" :style="{ left: results.indicatorPos + '%' }"></div>
                </div>
                <div class="bar-labels">
                  <span>Under</span>
                  <span>Normal</span>
                  <span>Over</span>
                  <span>Obese</span>
                </div>
              </div>
              <div class="score-category">
                Category: <strong>{{ results.category }}</strong>
              </div>
              <p class="category-description">{{ results.categoryDesc }}</p>
            </div>

            <!-- Core Metrics Grid -->
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-header">
                  <Icon name="target" :size="18" />
                  <span class="m-label">Ideal Weight Range</span>
                </div>
                <span class="m-val">{{ results.idealWeight }}</span>
                <small class="metric-hint">Healthy BMI range (18.5-24.9)</small>
              </div>
              <div class="metric-item">
                <div class="metric-header">
                  <Icon name="zap" :size="18" />
                  <span class="m-label">BMR</span>
                </div>
                <span class="m-val">{{ formatNumber(results.bmr) }} <small>kcal/day</small></span>
                <small class="metric-hint">Basal Metabolic Rate (at rest)</small>
              </div>
              <div class="metric-item highlight">
                <div class="metric-header">
                  <Icon name="trending-up" :size="18" />
                  <span class="m-label">TDEE</span>
                </div>
                <span class="m-val">{{ formatNumber(results.tdee) }} <small>kcal/day</small></span>
                <small class="metric-hint">Total Daily Energy Expenditure</small>
              </div>
            </div>

            <!-- Advanced Metrics -->
            <div class="advanced-metrics" v-if="results.advanced">
              <h4>
                <Icon name="bar-chart" :size="18" />
                Advanced Health Metrics
              </h4>
              <div class="metrics-grid">
                <div class="metric-item" v-if="results.advanced.whr">
                  <span class="m-label">Waist-to-Height Ratio</span>
                  <span class="m-val">{{ results.advanced.whr }}</span>
                </div>
                <div class="metric-item" v-if="results.advanced.bodyFat">
                  <span class="m-label">Estimated Body Fat %</span>
                  <span class="m-val">{{ results.advanced.bodyFat }}%</span>
                </div>
                <div class="metric-item" v-if="results.advanced.leanMass">
                  <span class="m-label">Lean Body Mass</span>
                  <span class="m-val">{{ results.advanced.leanMass }}</span>
                </div>
              </div>
            </div>

            <!-- Calorie Goals -->
            <div class="calorie-goals" v-if="results.tdee">
              <h4>
                <Icon name="target" :size="18" />
                Calorie Goals
              </h4>
              <div class="goals-grid">
                <div class="goal-item loss">
                  <span class="goal-label">Weight Loss</span>
                  <span class="goal-value">{{ formatNumber(results.calorieGoals.loss) }} kcal/day</span>
                  <small>500 cal deficit</small>
                </div>
                <div class="goal-item maintenance">
                  <span class="goal-label">Maintenance</span>
                  <span class="goal-value">{{ formatNumber(results.calorieGoals.maintenance) }} kcal/day</span>
                  <small>Current TDEE</small>
                </div>
                <div class="goal-item gain">
                  <span class="goal-label">Weight Gain</span>
                  <span class="goal-value">{{ formatNumber(results.calorieGoals.gain) }} kcal/day</span>
                  <small>500 cal surplus</small>
                </div>
              </div>
            </div>

            <div class="disclaimer-box">
              <Icon name="alert-circle" :size="18" />
              <p>
                <strong>Important:</strong> These calculations are estimates based on standard formulas. 
                BMI doesn't account for muscle mass, bone density, or body composition. 
                Consult a healthcare professional for personalized medical advice.
            </p>
            </div>
          </div>

          <!-- Empty State -->
          <div class="result-panel empty-state" v-else>
            <Icon name="heart" :size="48" />
            <h3>Enter Your Details</h3>
            <p>Fill in your height, weight, age, and activity level to see your comprehensive health analysis.</p>
          </div>

        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        
        <!-- How It Works -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            How BMI and Health Metrics Work
          </h2>
          <p>
            Understanding your health metrics is the first step toward making informed decisions about your wellness. 
            Our calculator uses scientifically validated formulas to provide you with accurate, personalized health insights.
            Once you know your BMI, consider using our <router-link to="/tools/calorie-tracker" class="inline-link">Calorie Tracker</router-link> to 
            monitor your daily nutrition, or try our <router-link to="/tools/meal-planner" class="inline-link">Meal Planner</router-link> to 
            create a balanced diet plan aligned with your health goals.
          </p>

          <h3>What is Body Mass Index (BMI)?</h3>
          <p>
            Body Mass Index is a screening tool that estimates body fat based on your height and weight. 
            It's calculated using the formula: <strong>BMI = weight (kg) / height (m)²</strong> or 
            <strong>BMI = (weight (lbs) × 703) / height (inches)²</strong>.
          </p>
          <p>
            While BMI doesn't distinguish between muscle and fat, it's a globally recognized standard used by 
            healthcare professionals to identify weight categories that may lead to health issues. The World Health 
            Organization (WHO) classifies BMI into four categories:
          </p>
          <ul class="feature-list">
            <li><strong>Underweight:</strong> BMI below 18.5 - May indicate nutritional deficiencies or health conditions</li>
            <li><strong>Normal Weight:</strong> BMI 18.5-24.9 - Generally associated with good health</li>
            <li><strong>Overweight:</strong> BMI 25-29.9 - May increase risk of health problems</li>
            <li><strong>Obese:</strong> BMI 30 or higher - Significantly increased health risks</li>
          </ul>

          <h3>Understanding BMR (Basal Metabolic Rate)</h3>
          <p>
            Your Basal Metabolic Rate is the number of calories your body burns at complete rest—just to maintain 
            basic functions like breathing, circulation, and cell production. We calculate BMR using the 
            <strong>Mifflin-St Jeor equation</strong>, which is considered the most accurate formula:
          </p>
          <ul>
            <li><strong>Men:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) + 5</li>
            <li><strong>Women:</strong> BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age) - 161</li>
          </ul>
          <p>
            Your BMR accounts for approximately 60-75% of your total daily calorie burn. Factors that affect BMR include 
            age, gender, body composition, genetics, and hormonal factors.
          </p>

          <h3>What is TDEE (Total Daily Energy Expenditure)?</h3>
          <p>
            TDEE represents your total daily calorie burn, including BMR plus all physical activity. It's calculated by 
            multiplying your BMR by an activity factor:
          </p>
          <ul>
            <li><strong>Sedentary (1.2):</strong> Little or no exercise, desk job</li>
            <li><strong>Lightly Active (1.375):</strong> Light exercise 1-3 days per week</li>
            <li><strong>Moderately Active (1.55):</strong> Moderate exercise 3-5 days per week</li>
            <li><strong>Very Active (1.725):</strong> Hard exercise 6-7 days per week</li>
            <li><strong>Super Active (1.9):</strong> Physical job or very hard exercise daily</li>
          </ul>
          <p>
            Knowing your TDEE is crucial for weight management. To lose weight, consume fewer calories than your TDEE. 
            To gain weight, consume more. A safe deficit or surplus is typically 300-500 calories per day.
          </p>

          <h3>Ideal Weight Range</h3>
          <p>
            The ideal weight range is calculated by reversing the BMI formula for a healthy BMI range (18.5-24.9). 
            This gives you a target weight range that's associated with optimal health outcomes. However, remember that 
            individual factors like muscle mass, bone density, and body composition can affect what's truly ideal for you.
          </p>

          <h3>Advanced Health Metrics</h3>
          <p>
            When you provide additional measurements like waist circumference, we can calculate advanced metrics:
          </p>
          <ul>
            <li>
              <strong>Waist-to-Height Ratio (WHtR):</strong> A better predictor of health risks than BMI alone. 
              A ratio below 0.5 is generally considered healthy.
            </li>
            <li>
              <strong>Estimated Body Fat Percentage:</strong> Calculated using age, gender, BMI, and other factors. 
              This provides insight into body composition.
            </li>
            <li>
              <strong>Lean Body Mass:</strong> The weight of everything in your body except fat, including muscle, 
              bones, organs, and water.
            </li>
          </ul>
        </article>

        <!-- Use Cases -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            Common Use Cases
          </h2>
          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="heart" :size="24" />
              <h4>Weight Management Planning</h4>
              <p>Use your TDEE to create a personalized calorie plan for weight loss or muscle gain. Understanding your maintenance calories helps you set realistic goals.</p>
          </div>
            <div class="use-case-item">
              <Icon name="activity" :size="24" />
              <h4>Fitness Goal Setting</h4>
              <p>Athletes and fitness enthusiasts use BMR and TDEE to optimize nutrition for performance and recovery.</p>
            </div>
            <div class="use-case-item">
              <Icon name="trending-up" :size="24" />
              <h4>Health Risk Assessment</h4>
              <p>BMI and waist-to-height ratio help identify potential health risks and guide conversations with healthcare providers.</p>
            </div>
            <div class="use-case-item">
              <Icon name="bar-chart" :size="24" />
              <h4>Progress Tracking</h4>
              <p>Recalculate your metrics regularly as you lose or gain weight to track your health journey accurately.</p>
            </div>
          </div>
        </article>

        <!-- Tips & Best Practices -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Tips & Best Practices
          </h2>
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Measure Accurately</h4>
                <p>For best results, measure your height and weight in the morning, before eating, and on a hard, flat surface. Use a reliable scale and measure height without shoes.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Be Honest About Activity Level</h4>
                <p>Accurately assess your activity level. Overestimating can lead to consuming too many calories, while underestimating may slow your progress.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Recalculate Regularly</h4>
                <p>As your weight changes, recalculate your metrics. Your TDEE decreases as you lose weight, so you may need to adjust your calorie intake.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Consider Body Composition</h4>
                <p>If you're muscular or athletic, BMI may overestimate body fat. Consider additional measurements like body fat percentage or waist circumference.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Consult Professionals</h4>
                <p>For significant weight changes or health concerns, consult with a registered dietitian, nutritionist, or healthcare provider for personalized guidance.</p>
              </div>
            </div>
          </div>
        </article>
        
        <!-- FAQs -->
         <div class="faq-container">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions
          </h2>
          <div class="faq-list">
            <div class="faq-item glass-card" v-for="(faq, i) in faqs" :key="i">
              <h4>{{ faq.question }}</h4>
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All calculations happen directly in your web browser. We never store, transmit, or have access to 
              your personal health data. Your information stays completely private on your device.
            </p>
          </div>
          <div class="trust-card">
            <Icon name="check-circle" :size="32" />
            <h3>Medical Disclaimer</h3>
            <p>
              This calculator provides estimates for informational purposes only. It is not a substitute for 
              professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare 
              providers for personalized health guidance.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Track Your Health Journey?</h2>
          <p>Use our other health tools to create a comprehensive wellness plan</p>
          <div class="cta-buttons">
            <router-link to="/tools/calorie-tracker" class="btn btn-primary">
              <Icon name="activity" :size="18" />
              Try Calorie Tracker
            </router-link>
            <router-link to="/tools/meal-planner" class="btn btn-outline">
              <Icon name="calendar" :size="18" />
              Plan Your Meals
            </router-link>
          </div>
        </div>

      </section>

      <!-- Featured Tools Section - At the End -->
      <section class="featured-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="star" :size="24" />
          Related Health & Fitness Tools
        </h2>
        <p class="section-subtitle">Explore other tools to support your health and wellness journey</p>
        <div class="featured-tools-grid">
          <router-link 
            v-for="tool in featuredTools" 
            :key="tool.path"
            :to="tool.path"
            class="featured-tool-card"
          >
            <div class="tool-icon-wrapper">
              <Icon :name="tool.icon" :size="32" />
            </div>
            <h3>{{ tool.name }}</h3>
            <p>{{ tool.description }}</p>
            <span class="tool-link">
              Try Now
              <Icon name="arrow-right" :size="16" />
            </span>
          </router-link>
        </div>
      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/bmi-calculator" category="Health" />

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
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/bmi-calculator`;

// Google Discover optimization - Published date (tool was launched/updated)
const publishedDate = '2024-01-15T00:00:00+00:00'; // Tool launch date
const modifiedDate = new Date().toISOString(); // Current date as modified date

useSEO({
  title: 'Free BMI Calculator Online 2025 | BMR, TDEE & Ideal Weight Range Calculator | Health Metrics',
  description: 'Calculate BMI (Body Mass Index), BMR (Basal Metabolic Rate), TDEE (Total Daily Energy Expenditure), ideal weight range, and body composition metrics. Free health calculator with calorie goals for weight loss, maintenance, or gain. Instant results, privacy-first, no signup required.',
  keywords: 'bmi calculator, bmr calculator, tdee calculator, ideal weight calculator, body mass index calculator, basal metabolic rate calculator, total daily energy expenditure calculator, calorie calculator, health metrics calculator, weight management calculator, body fat calculator, ideal weight range, calorie goals calculator, health assessment tool',
  canonical: currentUrl,
  ogType: 'article', // Google Discover prefers article type
  articlePublishedTime: publishedDate,
  articleModifiedTime: modifiedDate,
  articleAuthor: 'FikrNa',
  articleSection: 'Health Tools',
  articleTags: ['BMI Calculator', 'Health', 'Fitness', 'Weight Management', 'Nutrition', 'BMR', 'TDEE'],
  ogImage: '/og-bmi-calculator.jpg', // Should be 1200x675px for Google Discover
  jsonLd: null // Will be set in onMounted after reactive data is available
});

// State
const unit = ref('metric');
const results = ref(null);
const showAdvanced = ref(false);
const calculationHistory = ref([]);

const form = reactive({
  gender: 'male',
  age: '',
  heightCm: '',
  heightFt: '',
  heightIn: '',
  weight: '',
  activity: '1.2',
  waist: ''
});

// Computed
const canCalculate = computed(() => {
  if (!form.age || !form.weight) return false;
  if (unit.value === 'metric') {
    return form.heightCm > 0;
  } else {
    return (form.heightFt > 0 || form.heightIn > 0);
  }
});

const featuredTools = [
  {
    name: 'Calorie Tracker',
    path: '/tools/calorie-tracker',
    icon: 'activity',
    description: 'Track daily calories and macros with Pakistani and international foods'
  },
  {
    name: 'Meal Planner',
    path: '/tools/meal-planner',
    icon: 'calendar',
    description: 'Plan balanced weekly meals based on your calorie goals'
  },
  {
    name: 'Sleep Coach',
    path: '/tools/sleep-coach',
    icon: 'moon',
    description: 'Improve sleep quality with personalized tips and tracking'
  },
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build healthy habits and track your wellness journey'
  }
];

// Methods
function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

function calculate() {
  if (!canCalculate.value) {
    alert('Please fill in all required fields');
    return;
  }
  
  let weightKg = parseFloat(form.weight);
  let heightTotalCm = 0;

  // Convert to metric
  if (unit.value === 'imperial') {
    weightKg = form.weight * 0.453592;
    const totalInches = (form.heightFt || 0) * 12 + (form.heightIn || 0);
    heightTotalCm = totalInches * 2.54;
  } else {
    heightTotalCm = parseFloat(form.heightCm);
  }

  if (heightTotalCm <= 0 || weightKg <= 0) return;

  const heightM = heightTotalCm / 100;
  const age = parseInt(form.age);

  // BMI Calculation
  const bmi = weightKg / (heightM * heightM);
  
  // BMI Category
  let category = '';
  let catClass = '';
  let indicatorPos = 0;
  let categoryDesc = '';

  if (bmi < 18.5) {
    category = 'Underweight';
    catClass = 'cat-under';
    indicatorPos = 10;
    categoryDesc = 'Consider consulting a healthcare provider to ensure adequate nutrition.';
  } else if (bmi < 25) {
    category = 'Normal Weight';
    catClass = 'cat-normal';
    indicatorPos = 37;
    categoryDesc = 'Maintain your current healthy lifestyle and regular physical activity.';
  } else if (bmi < 30) {
    category = 'Overweight';
    catClass = 'cat-over';
    indicatorPos = 62;
    categoryDesc = 'Consider gradual weight loss through diet and exercise. Consult a healthcare provider.';
  } else {
    category = 'Obese';
    catClass = 'cat-obese';
    indicatorPos = 90;
    categoryDesc = 'Consult with healthcare professionals for a personalized weight management plan.';
  }

  // BMR (Mifflin-St Jeor)
  let bmr = (10 * weightKg) + (6.25 * heightTotalCm) - (5 * age);
  if (form.gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // TDEE
  const activityMultiplier = parseFloat(form.activity);
  const tdee = bmr * activityMultiplier;

  // Ideal Weight Range
  const minW = 18.5 * (heightM * heightM);
  const maxW = 24.9 * (heightM * heightM);
  
  let idealWStr = '';
  if (unit.value === 'metric') {
    idealWStr = `${minW.toFixed(1)} - ${maxW.toFixed(1)} kg`;
  } else {
    idealWStr = `${(minW * 2.20462).toFixed(1)} - ${(maxW * 2.20462).toFixed(1)} lbs`;
  }

  // Advanced Metrics
  let advanced = null;
  if (form.waist && form.waist > 0) {
    const whr = (form.waist / heightTotalCm).toFixed(2);
    const whrStatus = whr < 0.5 ? 'Healthy' : 'At Risk';
    
    // Body Fat Estimation (Deurenberg formula)
    const bodyFat = (1.20 * bmi) + (0.23 * age) - (10.8 * (form.gender === 'male' ? 1 : 0)) - 5.4;
    const bodyFatPercent = Math.max(0, Math.min(100, bodyFat.toFixed(1)));
    
    // Lean Body Mass
    const bodyFatKg = (weightKg * bodyFatPercent) / 100;
    const leanMass = weightKg - bodyFatKg;
    const leanMassStr = unit.value === 'metric' 
      ? `${leanMass.toFixed(1)} kg`
      : `${(leanMass * 2.20462).toFixed(1)} lbs`;

    advanced = {
      whr: `${whr} (${whrStatus})`,
      bodyFat: bodyFatPercent,
      leanMass: leanMassStr
    };
  }

  // Calorie Goals
  const calorieGoals = {
    loss: Math.round(tdee - 500),
    maintenance: Math.round(tdee),
    gain: Math.round(tdee + 500)
  };

  results.value = {
    bmi: bmi.toFixed(1),
    category,
    categoryClass: catClass,
    indicatorPos,
    categoryDesc,
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    idealWeight: idealWStr,
    advanced,
    calorieGoals
  };

  // Add to history
  calculationHistory.value.unshift({
    ...results.value,
    timestamp: new Date().toISOString(),
    formData: { ...form }
  });
  if (calculationHistory.value.length > 10) {
    calculationHistory.value.pop();
  }

  // Scroll to results
  setTimeout(() => {
    document.querySelector('.result-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function copyResults() {
  if (!results.value) return;
  
  const text = `BMI Calculator Results\n\n` +
    `BMI: ${results.value.bmi} (${results.value.category})\n` +
    `BMR: ${formatNumber(results.value.bmr)} kcal/day\n` +
    `TDEE: ${formatNumber(results.value.tdee)} kcal/day\n` +
    `Ideal Weight: ${results.value.idealWeight}\n\n` +
    `Calculated on FikrNa - ${window.location.href}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard!');
  });
}

function downloadResults() {
  if (!results.value) return;
  
  const content = `BMI & Health Metrics Report\n` +
    `Generated: ${new Date().toLocaleString()}\n\n` +
    `PERSONAL INFORMATION\n` +
    `Gender: ${form.gender === 'male' ? 'Male' : 'Female'}\n` +
    `Age: ${form.age} years\n` +
    `Height: ${unit.value === 'metric' ? form.heightCm + ' cm' : form.heightFt + ' ft ' + form.heightIn + ' in'}\n` +
    `Weight: ${form.weight} ${unit.value === 'metric' ? 'kg' : 'lbs'}\n` +
    `Activity Level: ${form.activity === '1.2' ? 'Sedentary' : form.activity === '1.375' ? 'Lightly Active' : form.activity === '1.55' ? 'Moderately Active' : form.activity === '1.725' ? 'Very Active' : 'Super Active'}\n\n` +
    `RESULTS\n` +
    `BMI: ${results.value.bmi} (${results.value.category})\n` +
    `BMR: ${formatNumber(results.value.bmr)} kcal/day\n` +
    `TDEE: ${formatNumber(results.value.tdee)} kcal/day\n` +
    `Ideal Weight Range: ${results.value.idealWeight}\n\n` +
    `CALORIE GOALS\n` +
    `Weight Loss: ${formatNumber(results.value.calorieGoals.loss)} kcal/day\n` +
    `Maintenance: ${formatNumber(results.value.calorieGoals.maintenance)} kcal/day\n` +
    `Weight Gain: ${formatNumber(results.value.calorieGoals.gain)} kcal/day\n\n` +
    `DISCLAIMER\n` +
    `These calculations are estimates for informational purposes only. Consult a healthcare professional for personalized medical advice.\n\n` +
    `Generated by FikrNa - ${window.location.href}`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bmi-report-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function resetCalculator() {
  if (confirm('Reset all inputs and results?')) {
    form.gender = 'male';
    form.age = '';
    form.heightCm = '';
    form.heightFt = '';
    form.heightIn = '';
    form.weight = '';
    form.activity = '1.2';
    form.waist = '';
    results.value = null;
    showAdvanced.value = false;
  }
}

// FAQs
const faqs = [
  { 
    question: 'How accurate is this BMI calculator?', 
    answer: 'Our calculator uses the standard WHO formula, which is the same method used by healthcare professionals worldwide. However, BMI doesn\'t distinguish between muscle and fat, so athletes or very muscular individuals might have high BMIs despite low body fat percentages. For a complete health picture, consider additional metrics like waist circumference or body fat percentage.' 
  },
  { 
    question: 'What should I do if my BMI is in the overweight or obese category?', 
    answer: 'If your BMI indicates overweight or obesity, consider consulting with a healthcare provider or registered dietitian. They can help you create a safe, personalized weight management plan. Small, sustainable changes to diet and increased physical activity are typically recommended. Focus on gradual progress rather than rapid weight loss.' 
  },
  { 
    question: 'How often should I recalculate my TDEE?', 
    answer: 'Recalculate your TDEE whenever your weight changes significantly (5-10 pounds) or when your activity level changes. As you lose weight, your TDEE decreases, so you may need to adjust your calorie intake to continue making progress. Many people recalculate monthly or when they hit a plateau.' 
  },
  { 
    question: 'Is BMI accurate for everyone?', 
    answer: 'BMI is a useful screening tool for most adults, but it has limitations. It may overestimate body fat in muscular individuals and underestimate it in older adults who have lost muscle mass. For children, teens, pregnant women, and certain ethnic groups, BMI interpretation may differ. Always consider BMI alongside other health indicators.' 
  },
  { 
    question: 'What\'s the difference between BMR and TDEE?', 
    answer: 'BMR (Basal Metabolic Rate) is the calories you burn at complete rest—just to stay alive. TDEE (Total Daily Energy Expenditure) includes BMR plus all your daily activities. TDEE is the number you need to know for weight management: eat less than TDEE to lose weight, eat more to gain weight.' 
  },
  { 
    question: 'Can I use this calculator for children?', 
    answer: 'This calculator is designed for adults (18+ years). BMI interpretation for children and teens requires age and sex-specific percentile charts. If you need to calculate BMI for a child, consult with a pediatrician who can provide age-appropriate interpretation.' 
  },
  { 
    question: 'What is a healthy waist-to-height ratio?', 
    answer: 'A waist-to-height ratio below 0.5 is generally considered healthy and is often a better predictor of health risks than BMI alone. This means your waist circumference should be less than half your height. For example, if you\'re 170 cm tall, your waist should be less than 85 cm.' 
  },
  { 
    question: 'How do I use my TDEE for weight loss?', 
    answer: 'To lose weight safely, aim for a calorie deficit of 300-500 calories below your TDEE. This typically results in losing 0.5-1 pound per week. Extreme deficits can be unhealthy and unsustainable. Combine calorie reduction with regular exercise for best results, and consult a healthcare provider for significant weight loss goals.' 
  }
];

// Lifecycle
onMounted(() => {
  const toolSchema = generateToolSchema({
    name: 'BMI Calculator - BMR, TDEE & Health Metrics',
    description: 'Calculate BMI, BMR, TDEE, ideal weight range, and advanced health metrics. Free, accurate calculator with personalized calorie goals.',
    url: window.location.href
  });
  
  const faqSchema = generateFAQSchema(faqs);
  
  injectStructuredData([toolSchema, faqSchema]);
});
</script>

<style scoped>
.bmi-calculator-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: clamp(40px, 6vh, 60px);
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

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  display: inline-flex;
  align-items: center;
  gap: 6px;
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
  max-width: 1200px;
  margin: 0 auto clamp(40px, 6vh, 60px);
  padding: 0;
  overflow: hidden;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.tool-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--glass-border);
}

.tool-header h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 700;
}

.tool-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  background: transparent;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.icon-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

.calculator-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  padding: 32px;
}

.input-panel h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-primary);
  font-size: 1.25rem;
}

.toggle-group {
  display: flex;
  margin-bottom: 24px;
  background: rgba(0, 0, 0, 0.02);
  padding: 4px;
  border-radius: var(--radius-md);
  gap: 4px;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  padding: 12px;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: 0.9375rem;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
}

.form-grid-compact {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 600;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  border-radius: var(--radius-md);
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
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-large {
  width: 100%;
  padding: 16px;
  font-size: 1.0625rem;
  justify-content: center;
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

.btn-small {
  padding: 10px 16px;
  font-size: 0.9375rem;
  width: 100%;
  margin-top: 12px;
  justify-content: center;
}

/* Results Panel */
.result-panel {
  padding: 0;
}

.score-card {
  text-align: center;
  padding: 32px;
  border-radius: var(--radius-lg);
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 2px solid transparent;
  transition: all 0.3s;
}

.cat-under { 
  border-color: #60a5fa; 
  background: rgba(96, 165, 250, 0.05);
}
.cat-normal { 
  border-color: #10b981; 
  background: rgba(16, 185, 129, 0.1);
}
.cat-over { 
  border-color: #fbbf24; 
  background: rgba(251, 191, 36, 0.05);
}
.cat-obese { 
  border-color: #ef4444; 
  background: rgba(239, 68, 68, 0.05);
}

.score-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.score-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
}

.score-val {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
}

.score-bar-container {
  margin: 20px 0;
  position: relative;
}

.score-bar {
  height: 16px;
  background: linear-gradient(90deg, #60a5fa 25%, #10b981 25% 50%, #fbbf24 50% 75%, #ef4444 75%);
  border-radius: 12px;
  position: relative;
}

.score-indicator {
  position: absolute;
  top: -8px;
  width: 6px;
  height: 32px;
  background: white;
  border: 2px solid var(--text-primary);
  border-radius: 4px;
  transform: translateX(-50%);
  transition: left 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.bar-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-top: 8px;
}

.score-category {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-top: 16px;
  font-weight: 600;
}

.category-description {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin-top: 12px;
  line-height: 1.6;
}

.metrics-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
}

.metric-item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  transition: all 0.2s;
}

.metric-item:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.metric-item.highlight {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.metric-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.metric-header svg {
  color: #10b981;
}

.m-label {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  font-weight: 600;
}

.m-val {
  color: var(--text-primary);
  font-weight: 800;
  font-size: 1.5rem;
  margin-bottom: 4px;
}

.m-val small {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-tertiary);
}

.metric-hint {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.advanced-metrics {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--glass-border);
}

.advanced-metrics h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--text-primary);
  font-size: 1.125rem;
}

.calorie-goals {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--glass-border);
}

.calorie-goals h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  color: var(--text-primary);
  font-size: 1.125rem;
}

.goals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.goal-item {
  padding: 16px;
  border-radius: var(--radius-md);
  text-align: center;
  border: 1px solid var(--glass-border);
}

.goal-item.loss {
  background: rgba(239, 68, 68, 0.05);
  border-color: rgba(239, 68, 68, 0.2);
}

.goal-item.maintenance {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.goal-item.gain {
  background: rgba(251, 191, 36, 0.05);
  border-color: rgba(251, 191, 36, 0.2);
}

.goal-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  font-weight: 600;
}

.goal-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.goal-item small {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

.disclaimer-box {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: var(--radius-md);
  margin-top: 24px;
}

.disclaimer-box svg {
  color: #ef4444;
  flex-shrink: 0;
  margin-top: 2px;
}

.disclaimer-box p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 32px;
  opacity: 0.7;
}

.empty-state svg {
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.empty-state h3 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
}

/* Featured Tools */
.featured-tools-section {
  max-width: 1200px;
  margin: clamp(60px, 8vh, 80px) auto clamp(40px, 6vh, 60px);
  padding: clamp(40px, 6vh, 60px) 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.featured-tools-section h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: 12px;
  font-weight: 800;
}

.section-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 40px;
  font-size: 1rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.featured-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

.featured-tool-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.featured-tool-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.tool-icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.tool-icon-wrapper svg {
  color: #10b981;
}

.featured-tool-card h3 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
}

.featured-tool-card p {
  color: var(--text-secondary);
  margin: 0 0 16px;
  font-size: 0.9375rem;
  line-height: 1.6;
  flex: 1;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9375rem;
  margin-top: auto;
}

/* Content Sections */
.content-section {
  max-width: 900px;
  margin: 0 auto;
}

.content-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  padding: clamp(32px, 5vh, 48px);
  border-radius: var(--radius-xl);
  margin-bottom: 32px;
}

.content-card h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-top: 0;
  margin-bottom: 20px;
  font-weight: 800;
}

.content-card h3 {
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  color: var(--text-primary);
  margin-top: 32px;
  margin-bottom: 12px;
  font-weight: 700;
}

.content-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
  font-size: 1rem;
}

.content-card .inline-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  padding: 2px 0;
}

.content-card .inline-link:hover {
  color: var(--primary-hover);
  border-bottom-color: var(--primary);
}

.feature-list {
  padding-left: 24px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

.feature-list li {
  margin-bottom: 12px;
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.use-case-item {
  padding: 24px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
}

.use-case-item svg {
  color: #10b981;
  margin-bottom: 12px;
}

.use-case-item h4 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.use-case-item p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.tips-list {
  display: grid;
  gap: 20px;
  margin-top: 24px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(16, 185, 129, 0.05);
  border-left: 4px solid #10b981;
  border-radius: var(--radius-md);
}

.tip-item svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-item h4 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.tip-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
}

.faq-container {
  margin-top: 48px;
}

.faq-container h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: 32px;
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

.trust-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.trust-card {
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  text-align: center;
}

.trust-card svg {
  color: #10b981;
  margin-bottom: 16px;
}

.trust-card h3 {
  color: var(--text-primary);
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
}

.trust-card p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
}

.cta-section {
  text-align: center;
  padding: 48px 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05));
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-xl);
  margin-top: 48px;
}

.cta-section h2 {
  color: var(--text-primary);
  margin: 0 0 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
}

.cta-section > p {
  color: var(--text-secondary);
  margin: 0 0 24px;
  font-size: 1rem;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

/* Responsive */
@media (max-width: 768px) {
  .calculator-grid {
    grid-template-columns: 1fr;
    padding: 24px;
    gap: 24px;
  }

  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .form-grid-compact {
    grid-template-columns: 1fr;
  }

  .goals-grid {
    grid-template-columns: 1fr;
  }

  .use-cases-grid {
    grid-template-columns: 1fr;
  }

  .trust-section {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-buttons .btn {
    width: 100%;
    justify-content: center;
  }

  .featured-tools-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .featured-tools-section {
    padding: 32px 16px;
    margin: 40px auto 32px;
  }

  .section-subtitle {
    margin-bottom: 32px;
    padding: 0 16px;
  }
}
</style>
