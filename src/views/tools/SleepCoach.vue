<template>
  <div class="tool-page sleep-coach-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Sleep Coach" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="moon" :size="16" />
          Sleep Optimization & Quality Analysis
        </p>
        <h1>Free Sleep Coach & Sleep Quality Analyzer</h1>
        <p class="hero-subtitle">
          Improve your sleep quality, calculate your ideal bedtime based on 90-minute sleep cycles, and wake up refreshed every morning. 
          Get personalized sleep recommendations based on science-backed sleep research and circadian rhythm optimization. 
          All analysis happens in your browser—your privacy is guaranteed.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="moon" :size="14" />
            Sleep Cycle Calculator
          </span>
          <span class="badge">
            <Icon name="activity" :size="14" />
            Quality Assessment
          </span>
          <span class="badge">
            <Icon name="zap" :size="14" />
            Personalized Tips
          </span>
          <span class="badge">
            <Icon name="target" :size="14" />
            Science-Backed
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
          <strong>Sleep Coach</strong> helps users improve sleep quality by calculating ideal bedtimes based on 90-minute sleep cycles, assessing sleep quality, and providing personalized sleep recommendations. The tool calculates optimal wake times and bedtimes to align with natural sleep cycles, evaluates sleep quality based on user input (hours slept, time to fall asleep, wake-ups, feeling upon waking), and provides science-backed recommendations for better sleep. 
          Users enter their desired wake time to receive optimal bedtime suggestions, complete a sleep quality assessment, and receive personalized tips for improving sleep hygiene, circadian rhythm optimization, and overall sleep health. All analysis happens instantly in the browser for privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="moon" :size="20" />
            Sleep Coach & Quality Analyzer
          </h2>
          <div class="tool-actions" v-if="bedtimes.length > 0 || sleepScore !== null">
            <button @click="copyResults" class="icon-btn" title="Copy Results">
              <Icon name="copy" :size="18" />
            </button>
            <button @click="downloadReport" class="icon-btn" title="Download Report">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetAll" class="icon-btn" title="Reset All">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
          
        <!-- Sleep Calculator Section -->
        <section class="calculator-section">
            <h3>
              <Icon name="clock" :size="18" />
              Calculate Your Ideal Sleep Schedule
            </h3>
          <p class="section-intro">
              Sleep cycles last about 90 minutes. Waking up between cycles helps you feel more refreshed than waking mid-cycle. 
              Enter your wake-up time, and we'll calculate the best times to fall asleep based on complete sleep cycles.
          </p>
          
          <div class="sleep-calculator">
            <div class="form-group">
                <label>
                  <Icon name="sunrise" :size="14" />
                  When do you need to wake up?
                </label>
                <input 
                  type="time" 
                  v-model="wakeTime" 
                  class="styled-input"
                  aria-label="Wake up time"
                />
            </div>
              <button 
                @click="calculateBedtimes" 
                class="btn btn-primary btn-large"
                aria-label="Calculate bedtimes"
              >
                <Icon name="zap" :size="20" />
                <span>Calculate Best Bedtimes</span>
              </button>
            
              <div v-if="bedtimes.length > 0" class="bedtimes-results">
                <h4>
                  <Icon name="moon" :size="18" />
                  Your Ideal Bedtimes
                </h4>
              <p class="sleep-note">Choose one of these times to fall asleep. Each allows for complete 90-minute sleep cycles:</p>
              <div class="bedtimes-grid">
                  <div 
                    v-for="(time, idx) in bedtimes" 
                    :key="idx" 
                    class="bedtime-option" 
                    :class="{ recommended: idx === 2 }"
                  >
                  <div class="bedtime-value">{{ time }}</div>
                  <div class="bedtime-label">
                      <Icon 
                        v-if="idx === 2" 
                        name="star" 
                        :size="14" 
                        style="margin-right: 4px; color: #10b981;"
                      />
                      {{ getBedtimeLabel(idx) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Sleep Assessment Section -->
        <section class="assessment-section">
            <h3>
              <Icon name="activity" :size="18" />
              Assess Your Sleep Quality
            </h3>
            <p class="section-intro">Answer these questions to get a personalized sleep quality score and actionable recommendations.</p>
          
          <div class="assessment-form">
            <div class="form-group">
                <label>
                  <Icon name="clock" :size="14" />
                  How many hours do you typically sleep per night?
                </label>
                <input 
                  type="number" 
                  v-model.number="assessment.hours" 
                  min="3" 
                  max="12" 
                  step="0.5" 
                  placeholder="e.g., 7.5"
                  class="styled-input"
                  aria-label="Hours of sleep per night"
                />
            </div>
            
            <div class="form-group">
                <label>
                  <Icon name="moon" :size="14" />
                  How long does it take you to fall asleep?
                </label>
                <select v-model="assessment.fallAsleep" class="styled-input" aria-label="Time to fall asleep">
                <option value="5">Less than 5 minutes (may indicate sleep debt)</option>
                <option value="10">5-15 minutes (ideal)</option>
                <option value="20">15-30 minutes (acceptable)</option>
                <option value="40">30+ minutes (difficulty falling asleep)</option>
              </select>
            </div>

            <div class="form-group">
                <label>
                  <Icon name="alert-circle" :size="14" />
                  How many times do you wake up during the night?
                </label>
                <select v-model.number="assessment.wakeUps" class="styled-input" aria-label="Number of night wakings">
                <option :value="0">Never</option>
                <option :value="1">1-2 times</option>
                <option :value="2">3-4 times</option>
                <option :value="3">5+ times</option>
              </select>
            </div>

            <div class="form-group">
                <label>
                  <Icon name="smile" :size="14" />
                  How do you feel when you wake up?
                </label>
                <select v-model="assessment.feeling" class="styled-input" aria-label="Morning feeling">
                <option value="great">Refreshed and energetic</option>
                <option value="good">Generally rested</option>
                <option value="fair">Somewhat tired</option>
                <option value="poor">Extremely tired</option>
              </select>
            </div>

            <div class="form-group">
                <label>
                  <Icon name="alert-circle" :size="14" />
                  Select any sleep issues you experience:
                </label>
              <div class="checkbox-grid">
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.insomnia" />
                    <span>Trouble falling asleep</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.waking" />
                    <span>Waking during night</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.earlyWake" />
                    <span>Waking too early</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.snoring" />
                    <span>Snoring</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.restless" />
                    <span>Restless legs</span>
                  </label>
                  <label class="checkbox-item">
                    <input type="checkbox" v-model="issues.nightmares" />
                    <span>Frequent nightmares</span>
                  </label>
              </div>
            </div>

              <button 
                @click="assessSleep" 
                class="btn btn-primary btn-large"
                aria-label="Analyze sleep quality"
              >
                <Icon name="zap" :size="20" />
                <span>Analyze My Sleep Quality</span>
              </button>
          </div>

            <div v-if="sleepScore !== null" class="sleep-results">
              <h4>
                <Icon name="bar-chart" :size="18" />
                Your Sleep Quality Score
              </h4>
            <div class="score-display">
              <div class="score-circle" :class="getScoreClass()">
                <div class="score-value">{{ sleepScore }}</div>
                <div class="score-label">/ 100</div>
              </div>
              <div class="score-interpretation">
                  <h5>{{ getScoreLabel() }}</h5>
                <p>{{ getScoreDescription() }}</p>
              </div>
            </div>

            <div class="recommendations-section">
                <h4>
                  <Icon name="list" :size="18" />
                  Personalized Recommendations for You
                </h4>
              <div class="recommendations-list">
                  <div 
                    v-for="(rec, idx) in recommendations" 
                    :key="idx" 
                    class="recommendation-card"
                  >
                    <div class="rec-icon-wrapper">
                      <Icon :name="rec.icon" :size="24" />
                    </div>
                  <div class="rec-content">
                      <h5>{{ rec.title }}</h5>
                    <p>{{ rec.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
                <button @click="shareResults" class="btn btn-outline">
                  <Icon name="share-2" :size="18" />
                  <span>Share Results</span>
                </button>
                <button @click="downloadReport" class="btn btn-outline">
                  <Icon name="download" :size="18" />
                  <span>Download Sleep Report</span>
                </button>
            </div>
          </div>
        </section>
        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        
        <!-- How It Works -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Why Quality Sleep Matters More Than You Think
          </h2>
          <p>
            Sleep isn't just rest—it's when your body repairs itself, your brain consolidates memories, and your immune system strengthens. 
            Poor sleep affects everything from your mood and focus to your weight and long-term health. Yet many people sacrifice sleep without 
            realizing the consequences.
          </p>
          <p>
            Adults need 7-9 hours of quality sleep per night. Not 5 hours, not 6 hours—7 to 9. During sleep, your brain clears out toxins, 
            your muscles repair, your hormones balance, and your mind processes the day's events. Skip this crucial time, and you're essentially 
            running your body on a deficit.
          </p>
          <p>
            Our free sleep coach helps you optimize your sleep schedule using circadian rhythm science. We calculate ideal bedtimes based on 
            90-minute sleep cycles, so you wake up feeling refreshed rather than groggy. Plus, we analyze your sleep quality and provide 
            actionable recommendations to help you sleep better tonight.
          </p>

          <h3>Understanding Sleep Cycles: The Science</h3>
          <p>
            Your sleep isn't uniform throughout the night. It progresses through distinct stages in approximately 90-minute cycles:
          </p>
          <div class="sleep-stages">
            <div class="stage-item">
              <h4>Stage 1: Light Sleep (5-10 minutes)</h4>
              <p>Transition from wakefulness. Easily awakened, muscle activity slows. Your eyes move slowly and muscle activity decreases.</p>
            </div>
            <div class="stage-item">
              <h4>Stage 2: True Sleep (10-25 minutes)</h4>
              <p>Eye movement stops, brain waves slow, body temperature drops. This is where you spend about 50% of your total sleep time.</p>
            </div>
            <div class="stage-item">
              <h4>Stage 3-4: Deep Sleep (20-40 minutes)</h4>
              <p>Extremely slow brain waves (delta waves). This is when physical repair happens—tissue growth, muscle repair, immune strengthening. 
              Being awakened during deep sleep makes you feel groggy and disoriented.</p>
            </div>
            <div class="stage-item">
              <h4>REM Sleep (10-60 minutes)</h4>
              <p>Rapid Eye Movement sleep. Dreams occur here. Your brain is active, processing emotions and memories. REM periods get longer as 
              the night progresses, with the longest REM period occurring just before natural awakening.</p>
            </div>
          </div>
          <p>
            You cycle through these stages 4-6 times per night. Waking up at the end of a cycle (after REM) feels natural and refreshed. 
            Waking up during deep sleep feels terrible. That's why our calculator helps you time your wake-up to match your natural cycles.
          </p>
        </article>

        <!-- Use Cases -->
        <article class="content-card">
          <h2>
            <Icon name="users" :size="24" />
            Who Needs a Sleep Coach?
          </h2>
          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="briefcase" :size="24" />
              <h4>Busy Professionals</h4>
              <p>Maximize productivity and mental clarity with optimized sleep. Wake up sharp for important meetings and complex decisions.</p>
        </div>
            <div class="use-case-item">
              <Icon name="book-open" :size="24" />
              <h4>Students & Learners</h4>
              <p>Improve memory consolidation and learning retention. Sleep is when your brain transfers information from short-term to long-term memory.</p>
            </div>
            <div class="use-case-item">
              <Icon name="activity" :size="24" />
              <h4>Athletes & Fitness Enthusiasts</h4>
              <p>Enhance muscle recovery and performance. Quality sleep boosts testosterone, growth hormone, and physical recovery.</p>
            </div>
            <div class="use-case-item">
              <Icon name="moon" :size="24" />
              <h4>Insomnia Sufferers</h4>
              <p>Build healthy sleep habits with science-backed strategies. Break the cycle of poor sleep with structured routines.</p>
            </div>
          </div>
        </article>

        <!-- Tips & Best Practices -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Practical Sleep Improvement Tips
          </h2>
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="thermometer" :size="20" />
              <div>
                <h4>Optimize Bedroom Temperature</h4>
              <p>Keep your bedroom cool—between 60-67°F (15-19°C). Your body temperature naturally drops during sleep, and a cool room facilitates this process.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="moon" :size="20" />
              <div>
                <h4>Make It Dark</h4>
              <p>Use blackout curtains or a sleep mask. Even small amounts of light can disrupt melatonin production. Cover LED lights from electronics.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="smartphone" :size="20" />
              <div>
                <h4>No Screens 1 Hour Before Bed</h4>
              <p>Blue light from phones/tablets suppresses melatonin. Use blue light filters after sunset, or better yet, read a physical book instead.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="coffee" :size="20" />
              <div>
                <h4>Cut Caffeine After 2 PM</h4>
              <p>Caffeine has a half-life of 5-6 hours. That afternoon coffee at 3 PM? Half of it is still in your system at 9 PM, disrupting sleep onset.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="x-circle" :size="20" />
              <div>
                <h4>Limit Alcohol</h4>
              <p>Alcohol might make you drowsy, but it disrupts sleep cycles and prevents deep, restorative sleep. You wake up more during the night.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="clock" :size="20" />
              <div>
                <h4>Consistent Sleep Schedule</h4>
              <p>Go to bed and wake up at the same time every day—yes, even weekends. This trains your circadian rhythm and makes falling asleep easier.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="activity" :size="20" />
              <div>
                <h4>Exercise, But Not Late</h4>
              <p>Regular exercise improves sleep quality significantly. However, avoid intense workouts within 3 hours of bedtime—they raise body temperature and cortisol.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="heart" :size="20" />
              <div>
                <h4>Create a Wind-Down Routine</h4>
              <p>Spend 30-60 minutes before bed doing calming activities: reading, light stretching, journaling, or meditation. This signals your body that sleep is approaching.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="home" :size="20" />
              <div>
                <h4>Use Your Bed Only for Sleep</h4>
              <p>Don't work, eat, or watch TV in bed. Train your brain to associate your bed exclusively with sleep. This strengthens the sleep association.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="sun" :size="20" />
              <div>
                <h4>Get Morning Sunlight</h4>
              <p>Expose yourself to bright light (preferably natural sunlight) within 30 minutes of waking. This resets your circadian rhythm and improves nighttime sleep quality.</p>
            </div>
          </div>
        </div>
        </article>

      <!-- FAQs -->
        <div class="faq-container">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions About Sleep
          </h2>
          <div class="faq-list">
        <div class="faq-item glass-card">
              <h4>How many hours of sleep do I really need?</h4>
          <p>Most adults need 7-9 hours per night. Teenagers need 8-10 hours. However, individual needs vary based on genetics, activity level, and age. If you wake up without an alarm feeling refreshed, you're probably getting enough. If you rely on coffee to function or feel drowsy during the day, you likely need more sleep.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Is it better to get 6 hours of sleep or wake up mid-cycle for 7.5 hours?</h4>
          <p>Always choose completing full sleep cycles over raw hours. Waking during deep sleep (mid-cycle) causes sleep inertia—that groggy, disoriented feeling that can last hours. It's better to sleep 6 hours (4 complete cycles) and wake naturally than sleep 7 hours but wake during deep sleep. That said, 7.5 hours (5 cycles) is ideal for most adults.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Can I catch up on sleep over the weekend?</h4>
          <p>Short answer: partially, but not ideal. Sleeping in on weekends can help reduce sleep debt slightly, but it also disrupts your circadian rhythm, making Monday morning even harder. Consistent sleep schedules work better long-term. If you must catch up, limit extra weekend sleep to 1-2 hours max beyond your normal wake time.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>What should I do if I can't fall asleep after 20 minutes?</h4>
          <p>Get out of bed. Don't lie there frustrated—this creates a negative association with your bed. Go to another room, do something boring in dim light (read a dull book, not your phone), and return to bed only when you feel sleepy. This is called stimulus control therapy and is highly effective for chronic insomnia.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Are naps good or bad for nighttime sleep?</h4>
          <p>It depends. Short naps (20-30 minutes) before 3 PM can boost alertness without affecting nighttime sleep. However, long naps (60+ minutes) or late afternoon naps can make falling asleep at night difficult. If you have insomnia, avoid naps entirely to build sleep pressure for bedtime.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Does exercise really improve sleep?</h4>
          <p>Absolutely! Regular exercise is one of the most effective sleep aids. It increases deep sleep duration, helps you fall asleep faster, and improves overall sleep quality. Just avoid intense exercise within 3 hours of bedtime, as it raises body temperature and cortisol, which can interfere with sleep onset.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Should I use sleeping pills?</h4>
          <p>Only as a last resort and under medical supervision. Most sleep medications don't produce true, restorative sleep—they sedate you. They're also habit-forming. Try all behavioral strategies first: consistent schedule, dark environment, cool temperature, no screens, no caffeine after 2 PM, etc. If problems persist for 3+ weeks, consult a sleep specialist.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>What's the 4-7-8 breathing technique for sleep?</h4>
          <p>It's a powerful relaxation method: Inhale through your nose for 4 counts, hold your breath for 7 counts, exhale through your mouth for 8 counts. Repeat 4 times. This activates your parasympathetic nervous system (rest-and-digest), lowering heart rate and promoting relaxation. Many people fall asleep before completing the fourth cycle.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>How do I stop my mind from racing at bedtime?</h4>
          <p>Try the "worry journal" technique: 1-2 hours before bed, spend 10 minutes writing down everything on your mind—tomorrow's tasks, worries, ideas. Close the journal. Your brain can now stop reminding you because it's documented. Also try the 4-7-8 breathing technique or progressive muscle relaxation. If thoughts persist, get out of bed and do something non-stimulating until drowsy.</p>
        </div>

        <div class="faq-item glass-card">
              <h4>Is this sleep coach tool a medical diagnosis?</h4>
          <p>No. This tool provides general sleep education and recommendations based on common sleep science principles. It's not a substitute for medical advice. If you have chronic insomnia (3+ nights per week for 3+ months), loud snoring with breathing pauses (possible sleep apnea), or extreme daytime sleepiness, consult a doctor or sleep specialist immediately.</p>
        </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All sleep analysis happens directly in your web browser. We never store, transmit, or have access to your personal sleep data. 
              Your assessment results and recommendations never leave your device.
          </p>
          </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Medical Disclaimer</h3>
            <p>
              This sleep coach provides general sleep education and recommendations based on common sleep science principles. It is not a substitute 
              for professional medical advice, diagnosis, or treatment. If you have chronic sleep problems, consult a healthcare provider or sleep specialist.
            </p>
        </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Start Sleeping Better Tonight?</h2>
          <p>Calculate your ideal bedtime and assess your sleep quality now—completely free, no signup required</p>
          <div class="cta-buttons">
            <button @click="scrollToTop" class="btn btn-primary">
              <Icon name="zap" :size="18" />
              Calculate My Sleep Schedule
            </button>
            <router-link to="/tools/habit-tracker" class="btn btn-outline">
              <Icon name="check-circle" :size="18" />
              Build Sleep Habits
            </router-link>
          </div>
        </div>

      </section>

      <!-- Featured Tools Section - At the End -->
      <section class="featured-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="star" :size="24" />
          Related Health & Wellness Tools
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
      <RelatedTools currentTool="/tools/sleep-coach" category="Health" />

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
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/sleep-coach`;

useSEO({
  title: 'Free Sleep Coach Online 2025 | Sleep Quality Calculator & Bedtime Optimizer | Sleep Cycle Calculator',
  description: 'Improve sleep quality by calculating ideal bedtimes based on 90-minute sleep cycles, assessing sleep quality, and receiving personalized sleep recommendations. Science-backed sleep coach with circadian rhythm optimization. Instant results, privacy-first.',
  keywords: 'sleep coach, sleep calculator, sleep quality, improve sleep, bedtime calculator, sleep cycles, insomnia help, better sleep, sleep schedule optimizer, circadian rhythm, sleep cycle calculator, sleep quality analyzer, sleep optimization, sleep hygiene, sleep recommendations',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const wakeTime = ref('07:00');
const bedtimes = ref([]);

const assessment = ref({
  hours: 7,
  fallAsleep: '10',
  wakeUps: 1,
  feeling: 'good'
});

const issues = ref({
  insomnia: false,
  waking: false,
  earlyWake: false,
  snoring: false,
  restless: false,
  nightmares: false
});

const sleepScore = ref(null);
const recommendations = ref([]);

const featuredTools = [
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build healthy sleep habits and track your progress'
  },
  {
    name: 'Mood Coach',
    path: '/tools/mood-coach',
    icon: 'smile',
    description: 'Track mood patterns and improve emotional wellness'
  },
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate BMI, BMR, TDEE, and ideal weight range'
  },
  {
    name: 'Calorie Tracker',
    path: '/tools/calorie-tracker',
    icon: 'activity',
    description: 'Track daily calories and monitor nutrition'
  }
];

// Methods
function getBedtimeLabel(idx) {
  const labels = [
    '4.5 hrs (3 cycles)',
    '6 hrs (4 cycles)',
    '7.5 hrs (5 cycles) Recommended',
    '9 hrs (6 cycles)',
    '10.5 hrs (7 cycles)'
  ];
  return labels[idx] || '';
}

function calculateBedtimes() {
  const [hours, minutes] = wakeTime.value.split(':').map(Number);
  const wakeDate = new Date();
  wakeDate.setHours(hours, minutes, 0, 0);
  
  bedtimes.value = [];
  
  // Calculate bedtimes for 3, 4, 5, 6, and 7 sleep cycles (each 90 mins)
  [3, 4, 5, 6, 7].forEach(cycles => {
    const sleepTime = new Date(wakeDate.getTime() - (cycles * 90 * 60 * 1000) - (14 * 60 * 1000)); // 14 mins to fall asleep
    bedtimes.value.push(sleepTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
  });

  // Scroll to results
  setTimeout(() => {
    document.querySelector('.bedtimes-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function assessSleep() {
  let score = 100;
  recommendations.value = [];
  
  // Hours scoring
  if (assessment.value.hours < 6) {
    score -= 30;
    recommendations.value.push({
      icon: 'clock',
      title: 'Increase Sleep Duration',
      description: `You're getting ${assessment.value.hours} hours, well below the recommended 7-9. Gradually add 15 minutes per week until reaching 7+ hours. Sleep debt significantly impacts health, mood, and cognition.`
    });
  } else if (assessment.value.hours > 10) {
    score -= 15;
    recommendations.value.push({
      icon: 'alert-circle',
      title: 'Consult a Doctor',
      description: 'Consistently sleeping 10+ hours may indicate underlying health issues like depression, thyroid problems, or sleep disorders. Schedule a checkup to rule out medical causes.'
    });
  } else if (assessment.value.hours >= 7 && assessment.value.hours <= 9) {
    score += 10;
  }
  
  // Fall asleep time
  const fallAsleepTime = parseInt(assessment.value.fallAsleep);
  if (fallAsleepTime > 30) {
    score -= 20;
    recommendations.value.push({
      icon: 'heart',
      title: 'Improve Sleep Onset',
      description: 'Try the 4-7-8 breathing technique, ensure your room is dark and cool, avoid screens 1 hour before bed, and consider a consistent wind-down routine like reading or light stretching.'
    });
  } else if (fallAsleepTime < 5) {
    score -= 10;
    recommendations.value.push({
      icon: 'moon',
      title: 'You May Have Sleep Debt',
      description: 'Falling asleep extremely quickly (<5 mins) often indicates sleep deprivation. Your body is crashing from exhaustion rather than transitioning normally. Try going to bed 30-60 minutes earlier.'
    });
  }
  
  // Wake-ups
  if (assessment.value.wakeUps >= 2) {
    score -= 15;
    recommendations.value.push({
      icon: 'alert-circle',
      title: 'Reduce Night Wakings',
      description: 'Limit fluids 2 hours before bed, keep your room completely dark (blackout curtains), use white noise to mask sounds, and avoid alcohol which fragments sleep.'
    });
  }
  
  // Feeling
  if (assessment.value.feeling === 'poor') {
    score -= 20;
    recommendations.value.push({
      icon: 'sun',
      title: 'Wake Up Timing',
      description: 'You might be waking mid-sleep-cycle. Use our sleep calculator above to align your wake time with natural 90-minute cycles. Also get bright light (ideally sunlight) within 30 minutes of waking.'
    });
  } else if (assessment.value.feeling === 'fair') {
    score -= 10;
  }
  
  // Issues
  const issueCount = Object.values(issues.value).filter(Boolean).length;
  score -= issueCount * 5;
  
  if (issues.value.insomnia) {
    recommendations.value.push({
      icon: 'home',
      title: 'Combat Insomnia',
      description: 'Use stimulus control: only use bed for sleep, get out of bed if not asleep within 20 minutes, maintain consistent sleep/wake times even on weekends. Consider cognitive behavioral therapy for insomnia (CBT-I).'
    });
  }
  
  if (issues.value.snoring) {
    recommendations.value.push({
      icon: 'alert-circle',
      title: 'Address Snoring',
      description: 'Sleep on your side not your back, maintain healthy weight, avoid alcohol before bed, and elevate your head slightly. If snoring is loud with breathing pauses, see a doctor immediately—you may have sleep apnea.'
    });
  }
  
  if (issues.value.restless) {
    recommendations.value.push({
      icon: 'activity',
      title: 'Manage Restless Legs',
      description: 'Check iron and magnesium levels (deficiency can cause this), avoid caffeine, do leg stretches before bed, and try warm baths. If severe, consult a doctor about possible RLS syndrome.'
    });
  }
  
  // General recommendations
  if (score < 80) {
    recommendations.value.push({
      icon: 'calendar',
      title: 'Establish Consistent Schedule',
      description: 'Go to bed and wake up at the same time every single day, including weekends. This is the single most powerful sleep habit. Your circadian rhythm thrives on consistency.'
    });
    
    recommendations.value.push({
      icon: 'thermometer',
      title: 'Optimize Sleep Environment',
      description: 'Keep bedroom 60-67°F (15-19°C), pitch black (use blackout curtains or sleep mask), and quiet (earplugs or white noise). Your bedroom should feel like a cave—cool, dark, and quiet.'
    });
  }
  
  sleepScore.value = Math.max(0, Math.min(100, Math.round(score)));

  // Scroll to results
  setTimeout(() => {
    document.querySelector('.sleep-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function getScoreClass() {
  if (sleepScore.value >= 80) return 'excellent';
  if (sleepScore.value >= 60) return 'good';
  if (sleepScore.value >= 40) return 'fair';
  return 'poor';
}

function getScoreLabel() {
  if (sleepScore.value >= 80) return 'Excellent Sleep Quality';
  if (sleepScore.value >= 60) return 'Good Sleep Quality';
  if (sleepScore.value >= 40) return 'Fair Sleep Quality - Room for Improvement';
  return 'Poor Sleep Quality - Action Needed';
}

function getScoreDescription() {
  if (sleepScore.value >= 80) return 'You have healthy sleep habits! Keep maintaining your current routine.';
  if (sleepScore.value >= 60) return 'Your sleep is decent but could be better with some adjustments.';
  if (sleepScore.value >= 40) return 'Your sleep quality needs improvement. Follow the recommendations below.';
  return 'Your sleep is significantly impaired. Consider consulting a sleep specialist if problems persist.';
}

function copyResults() {
  let text = 'Sleep Coach Results\n\n';
  
  if (bedtimes.value.length > 0) {
    text += `Ideal Bedtimes (Wake up at ${wakeTime.value}):\n`;
    bedtimes.value.forEach((time, idx) => {
      text += `- ${time} (${getBedtimeLabel(idx)})\n`;
    });
    text += '\n';
  }
  
  if (sleepScore.value !== null) {
    text += `Sleep Quality Score: ${sleepScore.value}/100\n`;
    text += `Rating: ${getScoreLabel()}\n`;
    text += `${getScoreDescription()}\n\n`;
    if (recommendations.value.length > 0) {
      text += 'Recommendations:\n';
      recommendations.value.forEach((rec, i) => {
        text += `${i + 1}. ${rec.title}\n   ${rec.description}\n\n`;
      });
    }
  }
  
  text += `\nGenerated by FikrNa - ${window.location.href}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard!');
  });
}

function shareResults() {
  const text = `My Sleep Quality Score: ${sleepScore.value}/100 - ${getScoreLabel()}\n\nGet your sleep score at ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title: 'My Sleep Quality Results', text });
  } else {
    navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard!');
    });
  }
}

function downloadReport() {
  let report = `SLEEP QUALITY REPORT\n`;
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  
  if (bedtimes.value.length > 0) {
    report += `IDEAL BEDTIMES (Wake up at ${wakeTime.value}):\n`;
    bedtimes.value.forEach((time, idx) => {
      report += `${idx + 1}. ${time} - ${getBedtimeLabel(idx)}\n`;
    });
    report += '\n';
  }
  
  if (sleepScore.value !== null) {
    report += `SLEEP QUALITY ASSESSMENT\n`;
    report += `Score: ${sleepScore.value}/100\n`;
    report += `Rating: ${getScoreLabel()}\n`;
    report += `Description: ${getScoreDescription()}\n\n`;
    report += `ASSESSMENT DETAILS:\n`;
    report += `- Sleep Hours: ${assessment.value.hours} hours\n`;
    report += `- Time to Fall Asleep: ${assessment.value.fallAsleep} minutes\n`;
    report += `- Night Wakings: ${assessment.value.wakeUps}\n`;
    report += `- Morning Feeling: ${assessment.value.feeling}\n\n`;
    report += `RECOMMENDATIONS:\n`;
    recommendations.value.forEach((r, i) => {
      report += `${i + 1}. ${r.title}\n   ${r.description}\n\n`;
    });
  }
  
  report += `\nDISCLAIMER\n`;
  report += `This report is for informational purposes only. Consult a healthcare provider for medical advice.\n\n`;
  report += `Generated by FikrNa - ${window.location.href}`;

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `sleep-report-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetAll() {
  if (confirm('Reset all sleep calculations and assessment?')) {
    wakeTime.value = '07:00';
    bedtimes.value = [];
    assessment.value.hours = 7;
    assessment.value.fallAsleep = '10';
    assessment.value.wakeUps = 1;
    assessment.value.feeling = 'good';
    Object.keys(issues.value).forEach(key => {
      issues.value[key] = false;
    });
    sleepScore.value = null;
    recommendations.value = [];
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQs
const faqs = [
  { 
    question: 'How many hours of sleep do I really need?', 
    answer: 'Most adults need 7-9 hours per night. Teenagers need 8-10 hours. However, individual needs vary based on genetics, activity level, and age. If you wake up without an alarm feeling refreshed, you\'re probably getting enough.' 
  },
  { 
    question: 'Is it better to get 6 hours of sleep or wake up mid-cycle for 7.5 hours?', 
    answer: 'Always choose completing full sleep cycles over raw hours. Waking during deep sleep (mid-cycle) causes sleep inertia—that groggy, disoriented feeling that can last hours. It\'s better to sleep 6 hours (4 complete cycles) and wake naturally than sleep 7 hours but wake during deep sleep.' 
  },
  { 
    question: 'Can I catch up on sleep over the weekend?', 
    answer: 'Partially, but not ideal. Sleeping in on weekends can help reduce sleep debt slightly, but it also disrupts your circadian rhythm, making Monday morning even harder. Consistent sleep schedules work better long-term.' 
  },
  { 
    question: 'What should I do if I can\'t fall asleep after 20 minutes?', 
    answer: 'Get out of bed. Don\'t lie there frustrated—this creates a negative association with your bed. Go to another room, do something boring in dim light (read a dull book, not your phone), and return to bed only when you feel sleepy.' 
  },
  { 
    question: 'Are naps good or bad for nighttime sleep?', 
    answer: 'It depends. Short naps (20-30 minutes) before 3 PM can boost alertness without affecting nighttime sleep. However, long naps (60+ minutes) or late afternoon naps can make falling asleep at night difficult.' 
  },
  { 
    question: 'Does exercise really improve sleep?', 
    answer: 'Absolutely! Regular exercise is one of the most effective sleep aids. It increases deep sleep duration, helps you fall asleep faster, and improves overall sleep quality. Just avoid intense exercise within 3 hours of bedtime.' 
  },
  { 
    question: 'Should I use sleeping pills?', 
    answer: 'Only as a last resort and under medical supervision. Most sleep medications don\'t produce true, restorative sleep—they sedate you. They\'re also habit-forming. Try all behavioral strategies first.' 
  },
  { 
    question: 'What\'s the 4-7-8 breathing technique for sleep?', 
    answer: 'It\'s a powerful relaxation method: Inhale through your nose for 4 counts, hold your breath for 7 counts, exhale through your mouth for 8 counts. Repeat 4 times. This activates your parasympathetic nervous system, lowering heart rate and promoting relaxation.' 
  },
  { 
    question: 'How do I stop my mind from racing at bedtime?', 
    answer: 'Try the "worry journal" technique: 1-2 hours before bed, spend 10 minutes writing down everything on your mind—tomorrow\'s tasks, worries, ideas. Close the journal. Your brain can now stop reminding you because it\'s documented.' 
  },
  { 
    question: 'Is this sleep coach tool a medical diagnosis?', 
    answer: 'No. This tool provides general sleep education and recommendations based on common sleep science principles. It\'s not a substitute for medical advice. If you have chronic insomnia, loud snoring with breathing pauses, or extreme daytime sleepiness, consult a doctor or sleep specialist immediately.' 
  }
];

// Lifecycle
onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Sleep Coach - Sleep Quality Analyzer & Bedtime Calculator',
    description: 'Calculate ideal bedtimes based on 90-minute sleep cycles, assess sleep quality, and get personalized sleep recommendations. Science-backed sleep optimization with circadian rhythm alignment.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      'Sleep cycle calculator (90-minute cycles)',
      'Ideal bedtime calculation',
      'Sleep quality assessment',
      'Personalized sleep recommendations',
      'Circadian rhythm optimization',
      'Sleep hygiene tips',
      'Wake time optimization'
    ],
    usageInfo: 'Enter desired wake time to calculate optimal bedtimes. Complete sleep quality assessment to receive personalized recommendations.',
    helpText: 'Sleep Coach helps users improve sleep quality through science-backed bedtime optimization and personalized sleep recommendations.'
  });
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Sleep Coach', path: '/tools/sleep-coach' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Sleep Coach Online 2025 | Sleep Quality Calculator & Bedtime Optimizer',
    description: 'Calculate ideal bedtimes based on 90-minute sleep cycles, assess your sleep quality, and get personalized sleep recommendations.',
    about: [
      { '@type': 'Thing', name: 'Sleep optimization' },
      { '@type': 'Thing', name: 'Sleep quality' },
      { '@type': 'Thing', name: 'Circadian rhythm' }
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

.sleep-coach-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: clamp(40px, 6vh, 60px);
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

.tool-content-wrapper {
  padding: 32px;
}

.calculator-section,
.assessment-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--glass-border);
}

.assessment-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.calculator-section h3,
.assessment-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 12px;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 700;
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.7;
  font-size: 0.9375rem;
}

.sleep-calculator,
.assessment-form {
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
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

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
}

.btn-large {
  width: 100%;
  padding: 16px;
  font-size: 1.0625rem;
  justify-content: center;
  margin: 24px 0;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
}

.checkbox-item:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.checkbox-item input {
  cursor: pointer;
}

.checkbox-item span {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

/* Bedtimes Results */
.bedtimes-results {
  margin-top: 32px;
  padding: 32px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
}

.bedtimes-results h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 1.25rem;
  font-weight: 700;
}

.sleep-note {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 24px;
  font-size: 0.9375rem;
}

.bedtimes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.bedtime-option {
  text-align: center;
  padding: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.bedtime-option:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.bedtime-option.recommended {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05));
  border: 2px solid #10b981;
}

.bedtime-value {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 800;
  color: #10b981;
  margin-bottom: 8px;
  line-height: 1;
}

.bedtime-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

/* Sleep Results */
.sleep-results {
  margin-top: 32px;
  padding: 32px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
}

.sleep-results h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 700;
}

.score-display {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.score-circle {
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid;
  position: relative;
}

.score-circle.excellent {
  border-color: #10b981;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.1), transparent);
}

.score-circle.good {
  border-color: #14b8a6;
  background: radial-gradient(circle, rgba(20, 184, 166, 0.1), transparent);
}

.score-circle.fair {
  border-color: #fbbf24;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.1), transparent);
}

.score-circle.poor {
  border-color: #ef4444;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.1), transparent);
}

.score-value {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  color: var(--text-primary);
}

.score-label {
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.score-interpretation {
  flex: 1;
}

.score-interpretation h5 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
}

.score-interpretation p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.7;
}

.recommendations-section {
  margin-top: 32px;
}

.recommendations-section h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: 700;
}

.recommendations-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recommendation-card {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.recommendation-card:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.rec-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
}

.rec-icon-wrapper svg {
  color: #10b981;
}

.rec-content h5 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.rec-content p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
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

.sleep-stages {
  margin: 24px 0;
}

.stage-item {
  padding: 20px;
  margin-bottom: 16px;
  background: rgba(16, 185, 129, 0.05);
  border-left: 4px solid #10b981;
  border-radius: var(--radius-md);
}

.stage-item h4 {
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.stage-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
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
  text-align: center;
  transition: all 0.2s;
}

.use-case-item:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
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
  line-height: 1.7;
  color: var(--text-secondary);
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
  background: rgba(255, 255, 255, 0.02);
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

/* Responsive */
@media (max-width: 768px) {
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .tool-content-wrapper {
    padding: 24px;
  }

  .score-display {
    flex-direction: column;
    text-align: center;
  }
  
  .bedtimes-grid {
    grid-template-columns: 1fr;
  }
  
  .checkbox-grid {
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
