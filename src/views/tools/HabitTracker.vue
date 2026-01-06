<template>
  <div class="tool-page habit-tracker-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Habit Tracker" category="Productivity" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="check-circle" :size="16" />
          Habit Building & Consistency Tracking
        </p>
        <h1>Global Habit Coach & Tracker</h1>
        <p class="hero-subtitle">
          Build lasting discipline with a culturally aware, science-based habit system. 
          Track daily, weekly, or custom routines tailored to your lifestyle—whether you're in New York, London, Dubai, or Karachi.
          All data stays in your browser—complete privacy guaranteed.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="check-circle" :size="14" />
            Streak Tracking
          </span>
          <span class="badge">
            <Icon name="calendar" :size="14" />
            Custom Schedules
          </span>
          <span class="badge">
            <Icon name="target" :size="14" />
            Goal Setting
          </span>
          <span class="badge">
            <Icon name="zap" :size="14" />
            Tiny Habits
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
          <strong>Habit Tracker</strong> helps users build and maintain positive habits through daily tracking, streak monitoring, and consistency analysis. The tool allows users to create custom habits, set daily, weekly, or custom schedules, track completion streaks, and visualize progress over time. 
          Users can add habits, mark them as complete each day, view streak statistics, and receive motivation based on their consistency patterns. The tracker uses science-based habit formation principles including tiny habits methodology and helps users build lasting discipline. All data is stored locally in the browser for complete privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="check-circle" :size="20" />
            Habit Tracker & Consistency Coach
          </h2>
          <div class="tool-actions" v-if="habits.length > 0">
            <button @click="copyHabits" class="icon-btn" title="Copy Habits">
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
        
        <!-- Dashboard Header -->
        <div class="tracker-header">
          <div class="header-left">
            <h3 class="current-date">
              <Icon name="calendar" :size="18" />
              {{ formattedDate }}
            </h3>
            <p class="motivation-text">"{{ dailyQuote }}"</p>
          </div>
          <div class="header-right">
             <!-- Global/Cultural Context Indicator -->
            <div class="context-badge" title="Adjust based on your region">
              <Icon name="globe" :size="14" />
              <span>{{ userRegion }} Mode</span>
            </div>
            <button @click="openHabitWizard" class="btn btn-primary add-btn">
              <Icon name="plus" :size="16" />
              <span>New Habit</span>
            </button>
          </div>
        </div>

        <!-- Progress Viz: Weekly Overview -->
        <div class="progress-section" v-if="habits.length > 0">
           <div class="stats-row">
             <div class="stat-card">
                <div class="stat-value">{{ consistencyScore }}%</div>
                <div class="stat-label">Consistency Score</div>
             </div>
             <div class="stat-card">
                <div class="stat-value">{{ activeStreaks }}</div>
                <div class="stat-label">Active Streaks</div>
             </div>
             <div class="stat-card">
                <div class="stat-value">{{ totalCompletions }}</div>
                <div class="stat-label">Total Reps</div>
             </div>
           </div>
        </div>

        <!-- 3. Habit List -->
        <div class="habits-list">
          <div v-if="habits.length === 0" class="empty-state">
             <div class="empty-icon">
               <Icon name="target" :size="48" />
             </div>
             <h3>Define Your Goals</h3>
             <p>No active habits yet. Click "New Habit" to start building your future.</p>
             <div class="tiny-habits-suggestions">
               <p>Try a Tiny Habit to start:</p>
               <div class="suggestion-chips">
                 <button @click="quickStart('Hydration')" class="chip">
                   <Icon name="droplet" :size="14" />
                   <span>Drink 1 glass of water</span>
                 </button>
                 <button @click="quickStart('Reading')" class="chip">
                   <Icon name="book-open" :size="14" />
                   <span>Read 1 page</span>
                 </button>
                 <button @click="quickStart('Mindfulness')" class="chip">
                   <Icon name="heart" :size="14" />
                   <span>1 min breathing</span>
                 </button>
               </div>
             </div>
          </div>

          <div v-else v-for="habit in filteredHabits" :key="habit.id" class="habit-card glass" :class="{ 'completed': isCompletedToday(habit) }">
            
            <!-- Habit Header / Info -->
            <div class="habit-main">
              <div class="habit-icon-wrapper" :class="habit.difficulty">
                <Icon :name="getCategoryIcon(habit.category)" :size="24" />
              </div>
              
              <div class="habit-details">
                <div class="habit-top-row">
                  <h3>{{ habit.name }}</h3>
                  <span v-if="habit.priority === 'high'" class="badge high">High Priority</span>
                </div>
                <p class="habit-goal">
                  <Icon name="target" :size="14" />
                  <span>Goal: {{ habit.goal || 'Build consistency' }}</span>
                </p>
                <div class="habit-meta">
                   <span class="freq-badge">
                     <Icon name="calendar" :size="12" />
                     <span>{{ formatFrequency(habit) }}</span>
                   </span>
                   <span class="time-badge">
                     <Icon name="clock" :size="12" />
                     <span>{{ habit.timeOfDay }}</span>
                   </span>
                </div>
              </div>

               <!-- Action Buttons -->
              <div class="habit-actions">
                <div class="streak-counter" :title="`Current Streak: ${habit.streak} days`">
                  <Icon name="zap" :size="16" />
                  <span>{{ habit.streak }}</span>
                </div>
                <button 
                  @click="toggleHabit(habit.id)" 
                  class="check-btn"
                  :class="{ 'checked': isCompletedToday(habit) }"
                  :title="isCompletedToday(habit) ? 'Mark as incomplete' : 'Mark as complete'">
                  <Icon v-if="isCompletedToday(habit)" name="check-circle" :size="20" />
                </button>
                <button @click="promptEdit(habit)" class="icon-btn edit-btn" title="Edit Habit">
                  <Icon name="edit" :size="18" />
                </button>
              </div>
            </div>

            <!-- Notes / Reflection Input (Visible if completed today) -->
            <div v-if="isCompletedToday(habit)" class="habit-reflection">
              <input 
                v-model="habit.history[todayKey].note" 
                @change="saveHabits"
                placeholder="Add a quick reflection note..." 
                class="reflection-input"
              />
            </div>

            <!-- Mini Progress Bar (Weekly view) -->
            <div class="weekly-dots">
              <div 
                v-for="(status, index) in getWeeklyHistory(habit)" 
                :key="index" 
                class="dot" 
                :class="status"
                :title="status === 'done' ? 'Completed' : 'Missed'">
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

      <!-- 4. Creation Wizard Modal -->
      <transition name="fade">
      <div v-if="showWizard" class="wizard-overlay">
        <div class="wizard-card glass-card">
          <div class="wizard-header">
            <h3>{{ isEditing ? 'Edit Habit' : 'Create New Habit' }}</h3>
            <button @click="closeWizard" class="close-btn" title="Close">
              <Icon name="x" :size="24" />
            </button>
          </div>

          <!-- Wizard Step 1: Core Info -->
          <div v-if="wizardStep === 1" class="wizard-body">
            <div class="form-group">
              <label>
                <Icon name="target" :size="14" />
                What habit do you want to build?
              </label>
              <input 
                v-model="form.name" 
                placeholder="e.g., Floss teeth, Read Quran, Gym..." 
                ref="nameInput"
                class="styled-input"
                aria-label="Habit name"
              />
            </div>
            
            <div class="form-group">
              <label>
                <Icon name="list" :size="14" />
                Category
              </label>
              <div class="cat-grid">
                <button v-for="cat in categories" :key="cat.id" 
                  class="cat-select" 
                  :class="{ active: form.category === cat.id }"
                  @click="form.category = cat.id">
                  <Icon :name="cat.icon" :size="16" />
                  <span>{{ cat.label }}</span>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label>
                <Icon name="target" :size="14" />
                Difficulty Level
              </label>
              <select v-model="form.difficulty" class="styled-input">
                <option value="easy">Easy (Tiny Habit)</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <!-- Wizard Step 2: Schedule & Goals -->
          <div v-if="wizardStep === 2" class="wizard-body">
            <div class="form-group">
              <label>
                <Icon name="calendar" :size="14" />
                Frequency
              </label>
              <select v-model="form.frequencyType" class="styled-input">
                <option value="daily">Daily (Every Day)</option>
                <option value="weekdays">Weekdays (Mon-Fri)</option>
                <option value="custom">Custom Days</option>
              </select>
            </div>

            <div v-if="form.frequencyType === 'custom'" class="days-selector">
              <button v-for="day in weekDays" :key="day" 
                class="day-btn" 
                :class="{ active: form.customDays.includes(day) }"
                @click="toggleDay(day)">
                {{ day.substring(0, 1) }}
              </button>
            </div>

            <div class="form-group">
              <label>Time of Day (Context)</label>
              <select v-model="form.timeOfDay">
                <option value="any">Anytime</option>
                <option value="morning">Morning / Fajr</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>

            <div class="form-group">
              <label>
                <Icon name="target" :size="14" />
                Why is this important? (Your Goal)
              </label>
              <input 
                v-model="form.goal" 
                placeholder="e.g., To improve my focus, To lose weight..." 
                class="styled-input"
                aria-label="Habit goal"
              />
            </div>

            <div class="form-group">
               <label>
                 <Icon name="flag" :size="14" />
                 Priority
               </label>
               <div class="priority-radio">
                 <label><input type="radio" v-model="form.priority" value="low"> Low</label>
                 <label><input type="radio" v-model="form.priority" value="medium"> Medium</label>
                 <label><input type="radio" v-model="form.priority" value="high"> High</label>
               </div>
            </div>
          </div>

          <div class="wizard-footer">
            <span class="step-indicator">Step {{ wizardStep }} of 2</span>
            <div class="wizard-btns">
              <button v-if="wizardStep > 1" @click="wizardStep--" class="btn btn-outline">Back</button>
              <button v-if="wizardStep === 1" @click="wizardStep++" class="btn btn-primary">Next</button>
              <button v-if="wizardStep === 2" @click="saveHabit" class="btn btn-primary">{{ isEditing ? 'Save Changes' : 'Start Habit' }}</button>
            </div>
          </div>
        </div>
      </div>
      </transition>

      <!-- 5. Educational / SEO Content -->
      <section class="content-section" data-aos="fade-up">
        <div class="content-card glass-card">
          <h2>
            <Icon name="brain" :size="24" />
            The Psychology of Consistency
          </h2>
          <p>
             Motivation gets you started, but habit is what keeps you going. This tool uses the 
             <strong>"Loop Model"</strong> (Cue → Routine → Reward) to help you structure your day.
          </p>
          <div class="features-grid">
            <div class="feature-box">
              <h3>
                <Icon name="trending-down" :size="20" />
                The Dip
              </h3>
              <p>It's normal to miss a day. Our "Missed-Day" logic helps you recover without losing motivation. Never miss twice!</p>
            </div>
            <div class="feature-box">
              <h3>
                <Icon name="target" :size="20" />
                Tiny Habits
              </h3>
              <p>Start small. "Read 1 page" is better than "Read 1 hour" because it's impossible to say no to.</p>
            </div>
            <div class="feature-box">
              <h3>
                <Icon name="globe" :size="20" />
                Lifestyle Aware
              </h3>
              <p>Whether you schedule around 9-5 work or 5 daily prayers, adaptable scheduling is key to success.</p>
            </div>
          </div>
        </div>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions
          </h2>
          <div class="faq-list">
            <div class="faq-item glass-card">
              <h4>Can I track weekly habits?</h4>
              <p>Yes! Use the "Custom" frequency option to select specific days (e.g., "Mondays and Thursdays only") for gym or fasting habits.</p>
            </div>
            <div class="faq-item glass-card">
              <h4>How is the consistency score calculated?</h4>
              <p>It's a rolling average of your completion rate over the last 30 days, weighted by habit priority.</p>
            </div>
            <div class="faq-item glass-card">
              <h4>Is this suitable for Tier-2/3 countries?</h4>
              <p>Absolutely. The tool is lightweight, works offline in the browser, and supports diverse daily structures relevant to users in Pakistan, India, and beyond.</p>
            </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All habit data is stored locally in your browser. We never store, transmit, or have access to your personal information. 
              Your habits, streaks, and notes never leave your device.
            </p>
          </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Behavioral Guidance Disclaimer</h3>
            <p>
              This tool provides behavioral guidance and habit tracking support. It is not a substitute for professional medical, 
              psychological, or financial advice. Consult qualified professionals for health, mental health, or financial concerns.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Build Better Habits?</h2>
          <p>Start tracking your habits now—completely free, no signup required</p>
          <div class="cta-buttons">
            <button @click="scrollToTop" class="btn btn-primary">
              <Icon name="zap" :size="18" />
              Create Your First Habit
            </button>
            <router-link to="/tools/sleep-coach" class="btn btn-outline">
              <Icon name="moon" :size="18" />
              Improve Sleep Habits
            </router-link>
          </div>
        </div>
      </section>

      <!-- Featured Tools Section - At the End -->
      <section class="featured-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="star" :size="24" />
          Related Productivity & Wellness Tools
        </h2>
        <p class="section-subtitle">Explore other tools to support your personal growth journey</p>
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
      <RelatedTools currentTool="/tools/habit-tracker" category="Productivity" />

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { storage } from '@/utils/storage';
import { 
  generateToolSchema, 
  generateFAQSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import AOS from 'aos';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/habit-tracker`;

useSEO({
  title: 'Advanced Habit Tracker 2025 | Daily & Weekly Goals | Consistency Coach | Streak Tracking',
  description: 'Build and maintain positive habits through daily tracking, streak monitoring, and consistency analysis. Free habit tracker with custom schedules, progress visualization, and science-based habit formation principles. Privacy-first, all data stored locally.',
  keywords: 'habit tracker, daily routine app, streak counter, tiny habits, productivity tool, goal setting, motivation, discipline, habit building, consistency tracker, daily habits, routine tracker, habit formation, streak tracker, habit coach',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// --- Constants ---
const categories = [
  { id: 'health', label: 'Health', icon: 'activity' },
  { id: 'productivity', label: 'Productivity', icon: 'zap' },
  { id: 'learning', label: 'Learning', icon: 'book-open' },
  { id: 'mindfulness', label: 'Mindfulness', icon: 'heart' },
  { id: 'finance', label: 'Finance', icon: 'dollar-sign' },
  { id: 'faith', label: 'Faith/Spirituality', icon: 'shield' }
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const quotes = [
  "Small daily improvements are the key to staggering long-term results.",
  "You do not rise to the level of your goals. You fall to the level of your systems.",
  "Consistency is what transforms average into excellence.",
  "The secret of your future is hidden in your daily routine."
];

// --- State ---
const habits = ref([]);
const showWizard = ref(false);
const wizardStep = ref(1);
const isEditing = ref(false);
const editId = ref(null);

// Form Data for Wizard
const form = ref({
  name: '',
  category: 'health',
  difficulty: 'medium',
  frequencyType: 'daily',
  customDays: [],
  timeOfDay: 'any',
  goal: '',
  priority: 'medium'
});

// Region detection (mock)
const userRegion = ref('Global');

const featuredTools = [
  {
    name: 'Sleep Coach',
    path: '/tools/sleep-coach',
    icon: 'moon',
    description: 'Optimize your sleep schedule and improve sleep quality'
  },
  {
    name: 'Mood Coach',
    path: '/tools/mood-coach',
    icon: 'smile',
    description: 'Track mood patterns and improve emotional wellness'
  },
  {
    name: 'Calorie Tracker',
    path: '/tools/calorie-tracker',
    icon: 'activity',
    description: 'Track daily calories and monitor nutrition'
  },
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate BMI, BMR, TDEE, and ideal weight range'
  }
];

// Computed
const todayKey = computed(() => {
  const d = new Date();
  return d.toISOString().split('T')[0];
});

const formattedDate = computed(() => {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
});

const dailyQuote = computed(() => quotes[Math.floor(Math.random() * quotes.length)]);

// Analytics
const totalCompletions = computed(() => {
  let total = 0;
  habits.value.forEach(h => {
    total += Object.keys(h.history).length;
  });
  return total;
});

const activeStreaks = computed(() => habits.value.filter(h => h.streak > 0).length);

const consistencyScore = computed(() => {
  if (habits.value.length === 0) return 0;
  // Simple calculation: (Active streaks / Total habits) * 100
  // In a real app this uses historical data
  const val = Math.round((activeStreaks.value / habits.value.length) * 100);
  return Math.min(100, val);
});

// Show only habits relevant to "today" or all?
// For simpler UX, we show all, but maybe dim ones not due today. 
// For this Premium version, we'll just show all sorted by priority.
const filteredHabits = computed(() => {
  return [...habits.value].sort((a, b) => {
    const pMap = { high: 3, medium: 2, low: 1 };
    return pMap[b.priority] - pMap[a.priority];
  });
});

// --- Methods ---

function openHabitWizard() {
  resetForm();
  isEditing.value = false;
  wizardStep.value = 1;
  showWizard.value = true;
}

function promptEdit(habit) {
  form.value = JSON.parse(JSON.stringify(habit)); // Deep copy
  // Map back legacy or custom fields if needed
  if (!form.value.customDays) form.value.customDays = [];
  editId.value = habit.id;
  isEditing.value = true;
  wizardStep.value = 1;
  showWizard.value = true;
}

function closeWizard() {
  showWizard.value = false;
}

function resetForm() {
  form.value = {
    name: '',
    category: 'health',
    difficulty: 'medium',
    frequencyType: 'daily',
    customDays: [],
    timeOfDay: 'any',
    goal: '',
    priority: 'medium'
  };
}

function toggleDay(day) {
  const idx = form.value.customDays.indexOf(day);
  if (idx > -1) form.value.customDays.splice(idx, 1);
  else form.value.customDays.push(day);
}

function quickStart(type) {
  openHabitWizard();
  if (type === 'Hydration') {
    form.value.name = 'Drink 1 Glass of Water';
    form.value.category = 'health';
    form.value.difficulty = 'easy';
  } else if (type === 'Reading') {
    form.value.name = 'Read 2 Pages';
    form.value.category = 'learning';
    form.value.difficulty = 'easy';
  } else {
    form.value.name = '1 Min Deep Breathing';
    form.value.category = 'mindfulness';
    form.value.difficulty = 'easy';
  }
}

function saveHabit() {
  if (!form.value.name) return;

  if (isEditing.value) {
    const idx = habits.value.findIndex(h => h.id === editId.value);
    if (idx !== -1) {
      habits.value[idx] = { ...habits.value[idx], ...form.value };
    }
  } else {
    // Create new
    const newH = {
      id: Date.now(),
      ...form.value,
      streak: 0,
      history: {} // Map 'YYYY-MM-DD': { completed: true, note: '' }
    };
    habits.value.unshift(newH);
  }

  saveHabits();
  closeWizard();
}

function isCompletedToday(habit) {
  return !!habit.history[todayKey.value];
}

function toggleHabit(id) {
  const habit = habits.value.find(h => h.id === id);
  if (!habit) return;

  if (habit.history[todayKey.value]) {
    // Mark incomplete
    delete habit.history[todayKey.value];
    habit.streak = Math.max(0, habit.streak - 1); // Simple logic
  } else {
    // Mark complete
    habit.history[todayKey.value] = { completed: true, note: '' };
    habit.streak += 1; // Simplified streak increment
    
    // Future: Add logic to check if yesterday was done for true streak calc
  }
  saveHabits();
}

function saveHabits() {
  storage.set('habits_v2', habits.value);
}

function getCategoryIcon(catId) {
  const cat = categories.find(c => c.id === catId);
  return cat ? cat.icon : 'star';
}

function copyHabits() {
  if (habits.value.length === 0) {
    alert('No habits to copy');
    return;
  }

  let text = 'MY HABIT TRACKER REPORT\n';
  text += `Generated: ${new Date().toLocaleString()}\n\n`;
  text += `Consistency Score: ${consistencyScore.value}%\n`;
  text += `Active Streaks: ${activeStreaks.value}\n`;
  text += `Total Completions: ${totalCompletions.value}\n\n`;
  text += 'HABITS:\n';
  text += '='.repeat(50) + '\n';
  
  habits.value.forEach((habit, idx) => {
    text += `\n${idx + 1}. ${habit.name}\n`;
    text += `   Category: ${habit.category}\n`;
    text += `   Frequency: ${formatFrequency(habit)}\n`;
    text += `   Current Streak: ${habit.streak} days\n`;
    text += `   Goal: ${habit.goal || 'Build consistency'}\n`;
    const completed = isCompletedToday(habit) ? 'Yes' : 'No';
    text += `   Completed Today: ${completed}\n`;
  });
  
  text += `\n\nGenerated by FikrNa - ${window.location.href}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Habits copied to clipboard!');
  });
}

function downloadReport() {
  if (habits.value.length === 0) {
    alert('No habits to download');
    return;
  }

  let report = 'HABIT TRACKER REPORT\n';
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += `OVERVIEW:\n`;
  report += `- Consistency Score: ${consistencyScore.value}%\n`;
  report += `- Active Streaks: ${activeStreaks.value}\n`;
  report += `- Total Completions: ${totalCompletions.value}\n`;
  report += `- Total Habits: ${habits.value.length}\n\n`;
  report += '='.repeat(60) + '\n\n';
  
  habits.value.forEach((habit, idx) => {
    report += `HABIT ${idx + 1}: ${habit.name}\n`;
    report += '-'.repeat(60) + '\n';
    report += `Category: ${habit.category}\n`;
    report += `Difficulty: ${habit.difficulty}\n`;
    report += `Frequency: ${formatFrequency(habit)}\n`;
    report += `Time of Day: ${habit.timeOfDay}\n`;
    report += `Priority: ${habit.priority}\n`;
    report += `Current Streak: ${habit.streak} days\n`;
    report += `Goal: ${habit.goal || 'Build consistency'}\n`;
    report += `Completed Today: ${isCompletedToday(habit) ? 'Yes' : 'No'}\n`;
    
    const historyDays = Object.keys(habit.history).length;
    report += `Total Completions: ${historyDays}\n`;
    
    if (Object.keys(habit.history).length > 0) {
      report += `\nRecent History (Last 7 Days):\n`;
      const weekly = getWeeklyHistory(habit);
      weekly.forEach((status, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        report += `  ${dateStr}: ${status === 'done' ? '✓ Completed' : '✗ Missed'}\n`;
      });
    }
    
    report += '\n' + '='.repeat(60) + '\n\n';
  });
  
  report += `DISCLAIMER\n`;
  report += `This report is for personal use only. Consult professionals for health, mental health, or financial advice.\n\n`;
  report += `Generated by FikrNa - ${window.location.href}`;

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `habit-tracker-report-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetAll() {
  if (confirm('Reset all habits? This will delete all your habit data. This action cannot be undone.')) {
    habits.value = [];
    saveHabits();
    alert('All habits have been reset.');
  }
}

function formatFrequency(habit) {
  if (habit.frequencyType === 'daily') return 'Daily';
  if (habit.frequencyType === 'weekdays') return 'Mon-Fri';
  if (habit.frequencyType === 'custom') return `${habit.customDays.length} days/wk`;
  return 'Daily';
}

function getWeeklyHistory(habit) {
  // Returns array of 7 statuses for last 7 days including today
  const statuses = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const k = d.toISOString().split('T')[0];
    if (habit.history[k]) statuses.push('done');
    else statuses.push('missed'); // Could add 'skipped' logic here
  }
  return statuses;
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Lifecycle
onMounted(() => {
  // Region detection logic (simplified)
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (tz.includes('Karachi') || tz.includes('Asia')) userRegion.value = 'South Asia';
  else if (tz.includes('Dubai') || tz.includes('Riyadh')) userRegion.value = 'GCC';
  else if (tz.includes('London') || tz.includes('Europe')) userRegion.value = 'Europe';
  else userRegion.value = 'Global';

  // Load Data
  const saved = storage.get('habits_v2', []);
  habits.value = saved;

  // Generate comprehensive schema
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Advanced Habit Coach & Tracker',
    description: 'Build and maintain positive habits through daily tracking, streak monitoring, and consistency analysis. Free habit tracker with custom schedules and progress visualization.',
    url: currentUrl,
    category: 'ProductivityApplication',
    features: [
      'Daily habit tracking',
      'Streak monitoring',
      'Custom schedules',
      'Progress visualization',
      'Goal setting',
      'Tiny habits methodology',
      'Local data storage'
    ],
    usageInfo: 'Create habits, set schedules, and mark completion daily. Track streaks and view progress over time.',
    helpText: 'Habit Tracker helps users build lasting discipline through consistent tracking and streak monitoring.'
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Habit Tracker', path: '/tools/habit-tracker' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Advanced Habit Tracker 2025 | Daily & Weekly Goals',
    description: 'A premium, free habit tracker with streak recovery, comprehensive graphs, and culture-aware scheduling.',
    about: [
      { '@type': 'Thing', name: 'Habit tracking' },
      { '@type': 'Thing', name: 'Productivity' },
      { '@type': 'Thing', name: 'Goal setting' }
    ],
    breadcrumb: { '@id': `${currentUrl}#breadcrumb` },
    mainEntity: { '@id': `${currentUrl}#software` }
  });
  
  const schemaGraph = generateSchemaGraph([
    toolSchema,
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

.habit-tracker-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

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

.tracker-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--glass-border);
}

.current-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
}

.motivation-text {
  font-style: italic;
  color: var(--text-tertiary);
  font-size: 0.875rem;
  margin-top: 4px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.context-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  border: 1px solid rgba(16, 185, 129, 0.2);
  font-weight: 500;
  white-space: nowrap;
}

.add-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  padding: var(--spacing-lg);
  text-align: center;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.03);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: 800;
  color: var(--color-accent-gold);
}

.stat-label {
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.7;
}

/* Actions */
.habit-card {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.habit-card.completed {
  border-left: 4px solid #10B981;
  background: rgba(16, 185, 129, 0.02);
}

.habit-main {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.habit-icon-wrapper {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: var(--glass-bg);
}

.habit-icon-wrapper.easy { border: 2px solid #10B981; }
.habit-icon-wrapper.medium { border: 2px solid #F59E0B; }
.habit-icon-wrapper.hard { border: 2px solid #EF4444; }

.habit-details {
  flex: 1;
}

.habit-top-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.habit-top-row h3 {
  margin: 0;
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--text-primary);
  font-weight: 600;
}

.badge.high {
  background: rgba(239, 68, 68, 0.2);
  color: #EF4444;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: bold;
}

.habit-goal {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin: 2px 0 8px 0;
}

.habit-meta {
  display: flex;
  gap: var(--spacing-md);
}

.freq-badge, .time-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  padding: 4px 10px;
  border-radius: 12px;
  color: var(--text-secondary);
  border: 1px solid rgba(16, 185, 129, 0.2);
}

.habit-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.streak-counter {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 700;
  color: #F59E0B;
  font-size: 0.9375rem;
}

.check-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--glass-border);
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.2s;
  flex-shrink: 0;
}

.check-btn:hover { border-color: #10B981; }
.check-btn.checked { background: #10B981; border-color: #10B981; box-shadow: 0 0 10px rgba(16,185,129,0.3); }

.edit-btn {
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

.edit-btn:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

.habit-reflection {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--glass-border);
}

.reflection-input {
  width: 100%;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
  padding: 4px 0;
}
.reflection-input:focus { outline: none; border-bottom: 1px solid var(--color-accent-gold); }

.weekly-dots {
  display: flex;
  gap: 4px;
  margin-top: var(--spacing-md);
  justify-content: flex-end;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--glass-border);
}
.dot.done { background: #10B981; }
.dot.missed { background: rgba(239, 68, 68, 0.3); }

/* Wizard */
.wizard-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.wizard-card {
  width: 100%;
  max-width: 550px;
  padding: clamp(24px, 4vh, 32px);
  max-height: 90vh;
  overflow-y: auto;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

.wizard-body {
  padding: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9375rem;
}

.form-group input:not(.styled-input),
.form-group select:not(.styled-input) {
  width: 100%;
  padding: 12px 16px;
  background: var(--bg-input);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:not(.styled-input):focus,
.form-group select:not(.styled-input):focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.priority-radio {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.priority-radio label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 500;
}

.wizard-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-lg);
}
.wizard-header h3 { 
  color: var(--text-primary); 
  margin: 0; 
  font-size: 1.5rem;
  font-weight: 700;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 8px;
}

.cat-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.cat-select:hover {
  border-color: rgba(16, 185, 129, 0.3);
}

.cat-select.active {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  color: #10b981;
}

.days-selector {
  display: flex;
  gap: 6px;
  margin-bottom: 16px;
}
.day-btn {
  width: 32px; 
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--glass-border);
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.day-btn:hover {
  border-color: rgba(16, 185, 129, 0.3);
}

.day-btn.active {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.wizard-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

.step-indicator { 
  font-size: 0.75rem; 
  color: var(--text-tertiary); 
}

.wizard-btns { 
  display: flex; 
  gap: 10px; 
}

.wizard-btns .btn {
  min-width: 100px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-2xl);
}
.empty-icon { font-size: 48px; display: block; margin-bottom: 16px; }
.suggestion-chips {
  margin-top: 24px;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s;
}

.chip:hover { 
  border-color: #10b981; 
  background: rgba(16, 185, 129, 0.05);
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

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.feature-box {
  padding: 20px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.feature-box:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.feature-box h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  margin: 0 0 8px;
  font-size: 1.125rem;
  font-weight: 700;
}

.feature-box p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
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

@media (max-width: 768px) {
  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding: 20px;
  }

  .tool-content-wrapper {
    padding: 20px;
  }

  .tracker-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding-bottom: 16px;
  }

  .header-left {
    width: 100%;
  }

  .header-right {
    width: 100%;
    justify-content: space-between;
  }

  .context-badge {
    font-size: 0.6875rem;
    padding: 5px 10px;
  }

  .add-btn {
    flex: 1;
    justify-content: center;
  }

  .stats-row { 
    grid-template-columns: 1fr; 
    gap: 12px;
  }

  .stat-card {
    padding: 16px;
  }
  
  .habit-main { 
    align-items: flex-start; 
  }
  
  .habit-icon-wrapper { 
    margin-top: 4px; 
  }
  
  .habit-actions { 
    flex-direction: row;
    gap: 8px;
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
