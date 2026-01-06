<template>
  <div class="home-premium">
    <!-- Animated Background -->
    <div class="bg-canvas" aria-hidden="true">
      <div class="mesh-gradient"></div>
      <div class="floating-orb orb-purple"></div>
      <div class="floating-orb orb-blue"></div>
      <div class="floating-orb orb-pink"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- Hero Section -->
    <section class="hero-section" aria-labelledby="main-heading">
      <div class="container">
        <div class="hero-content">
          <!-- Badge -->
          <div class="hero-badge" data-aos="fade-down">
            <span class="pulse-dot"></span>
            <span>100% Free • No Signup • Privacy-First</span>
        </div>
        
          <!-- Main Heading -->
          <h1 id="main-heading" class="hero-title" data-aos="fade-up" data-aos-delay="100">
            Free Online Tools & Calculators for <span class="gradient-text">Everyday Life</span>
        </h1>
        
          <!-- Subtitle -->
          <p class="hero-description" data-aos="fade-up" data-aos-delay="200">
            Solve daily problems with powerful, easy-to-use tools. Calculate calories, track habits, 
            check salaries, plan trips, and more — all free, instant, and designed for real-world use.
          </p>

          <!-- Features List -->
          <ul class="hero-features" data-aos="fade-up" data-aos-delay="300">
            <li>
              <Icon name="check-circle" :size="20" />
              <span>Works on any device — mobile, tablet, desktop</span>
            </li>
            <li>
              <Icon name="zap" :size="20" />
              <span>Instant results with simple, clear inputs</span>
            </li>
            <li>
              <Icon name="shield" :size="20" />
              <span>100% private — all calculations happen in your browser</span>
            </li>
          </ul>

          <!-- CTA Buttons -->
          <div class="hero-cta" data-aos="fade-up" data-aos-delay="400">
            <a href="#explore-tools" class="btn btn-primary btn-lg">
              Explore All Tools
              <Icon name="arrow-right" :size="18" />
            </a>
            <a href="#how-it-works" class="btn btn-outline btn-lg">
              How It Works
            </a>
        </div>

          <!-- Trust Badges -->
          <div class="trust-badges" data-aos="fade-up" data-aos-delay="500">
            <div class="badge-item">
              <Icon name="users" :size="16" />
              <span>Trusted by thousands</span>
            </div>
            <div class="badge-item">
              <Icon name="globe" :size="16" />
              <span>Available worldwide</span>
            </div>
            <div class="badge-item">
              <Icon name="smartphone" :size="16" />
              <span>Mobile optimized</span>
            </div>
          </div>
        </div>

        <!-- Search Panel -->
        <aside class="search-panel glass-card" data-aos="fade-left" data-aos-delay="200">
          <div class="category-chips">
            <button
              v-for="cat in categories"
              :key="cat"
              @click="activeCategory = cat"
              :class="['chip', { active: activeCategory === cat }]"
              type="button"
            >
              {{ cat }}
            </button>
          </div>

          <div class="search-results">
            <p class="results-count">
              <strong>{{ filteredTools.length }}</strong> of <strong>{{ tools.length }}</strong> tools
            </p>
          </div>

          <div class="popular-tools">
            <h3 class="popular-title">Popular Right Now</h3>
            <div class="popular-grid">
              <router-link to="/tools/calorie-tracker" class="popular-link">
                <Icon name="activity" :size="16" />
                Calorie Tracker
              </router-link>
              <router-link to="/tools/salary-tax-calculator" class="popular-link">
                <Icon name="dollar-sign" :size="16" />
                Salary Calculator
              </router-link>
              <router-link to="/tools/bmi-calculator" class="popular-link">
                <Icon name="heart" :size="16" />
                BMI Calculator
              </router-link>
              <router-link to="/tools/password-strength-checker" class="popular-link">
                <Icon name="lock" :size="16" />
                Password Checker
              </router-link>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- What You Can Do Section -->
    <section class="capabilities-section" aria-labelledby="capabilities-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="capabilities-heading" class="section-title">What You Can Do with FikrNa</h2>
          <p class="section-description">
            Practical tools organized by category. Each tool is designed to solve a specific problem quickly.
             </p>
           </div>
           
        <div class="capabilities-grid">
          <div class="capability-card" data-aos="fade-up" data-aos-delay="100">
            <div class="card-icon health">
              <Icon name="heart" :size="28" />
                    </div>
            <h3 class="card-title">Health & Fitness</h3>
            <p class="card-desc">Track calories, calculate BMI, plan meals, monitor sleep, and manage habits.</p>
            <ul class="card-list">
              <li>Calorie tracker with Pakistani foods</li>
              <li>BMI & body composition calculator</li>
              <li>Sleep quality coach</li>
              <li>Habit & mood tracking</li>
            </ul>
                 </div>

          <div class="capability-card" data-aos="fade-up" data-aos-delay="200">
            <div class="card-icon finance">
              <Icon name="dollar-sign" :size="28" />
                    </div>
            <h3 class="card-title">Finance & Money</h3>
            <p class="card-desc">Calculate salaries, taxes, EMI payments, and plan your budget effectively.</p>
            <ul class="card-list">
              <li>Pakistan salary & tax calculator</li>
              <li>EMI & loan calculator</li>
              <li>Budget planning tools</li>
              <li>Currency & finance helpers</li>
            </ul>
                 </div>

          <div class="capability-card" data-aos="fade-up" data-aos-delay="300">
            <div class="card-icon productivity">
              <Icon name="edit" :size="28" />
                    </div>
            <h3 class="card-title">Writing & Productivity</h3>
            <p class="card-desc">Check readability, analyze text, generate passwords, and improve your writing.</p>
            <ul class="card-list">
              <li>Readability score analyzer</li>
              <li>Password strength checker</li>
              <li>Text & content tools</li>
              <li>Productivity calculators</li>
            </ul>
                 </div>

          <div class="capability-card" data-aos="fade-up" data-aos-delay="400">
            <div class="card-icon lifestyle">
              <Icon name="calendar" :size="28" />
              </div>
            <h3 class="card-title">Travel & Lifestyle</h3>
            <p class="card-desc">Plan trips, calculate ages, track habits, and organize your daily life.</p>
            <ul class="card-list">
              <li>Trip planning & packing lists</li>
              <li>Age & date calculators</li>
              <li>Habit & routine trackers</li>
              <li>Lifestyle management tools</li>
            </ul>
           </div>
        </div>
      </div>
    </section>

    <!-- What is FikrNa Section (AI/LLM Optimized) -->
    <section class="about-section" aria-labelledby="about-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="about-heading" class="section-title">What is FikrNa?</h2>
          <p class="section-description">
            FikrNa is a free online platform providing practical calculators and tools for everyday problem-solving. 
            All tools work instantly in your browser with no downloads, signups, or data collection required.
          </p>
        </div>

        <!-- AI-Readable Summary Box -->
        <div class="ai-summary-box glass-card" data-aos="fade-up" data-aos-delay="50">
          <h3 class="summary-title">
            <Icon name="info" :size="20" />
            What This Website Does
          </h3>
          <p class="summary-text">
            <strong>FikrNa</strong> is a collection of free online calculators and tools designed to solve common daily problems. 
            The platform offers tools for health calculations (BMI, calorie tracking, meal planning), financial planning (salary tax calculator, EMI calculator, loan calculator), 
            productivity tasks (password strength checker, readability analyzer, habit tracker), and travel planning (trip planner with itineraries). 
            All tools are 100% free, require no registration, process data entirely in the user's browser for privacy, and work on any device (mobile, tablet, desktop). 
            Results are instant with clear explanations and visualizations.
          </p>
        </div>

        <div class="about-intro-card glass-card" data-aos="fade-up" data-aos-delay="100">
          <div class="intro-icon">
            <Icon name="zap" :size="32" />
          </div>
          <p class="intro-text">
            Whether you need to <strong>track calories</strong>, calculate your <strong>salary after taxes</strong>, 
            check <strong>password strength</strong>, or <strong>plan a trip</strong> — FikrNa offers simple, 
            mobile-friendly tools that work instantly in your browser.
          </p>
        </div>

        <div class="about-features-grid">
          <div class="about-feature-card glass-card special" data-aos="fade-up" data-aos-delay="150">
            <div class="feature-icon why">
              <Icon name="check-circle" :size="28" />
            </div>
            <h3 class="feature-title">Why use FikrNa?</h3>
            <p class="feature-desc">
              Most online tools are cluttered with ads, require signups, or don't work well on mobile. 
              FikrNa is different — designed with <strong>clarity, speed, and privacy</strong> in mind.
            </p>
            <ul class="feature-benefits">
              <li><Icon name="x" :size="16" /> No accounts to create</li>
              <li><Icon name="x" :size="16" /> No data collection</li>
              <li><Icon name="x" :size="16" /> No complex interfaces</li>
              <li><Icon name="check" :size="16" /> Just instant results</li>
            </ul>
          </div>

          <div class="about-feature-card glass-card" data-aos="fade-up" data-aos-delay="200">
            <div class="feature-icon how">
              <Icon name="code" :size="28" />
            </div>
            <h3 class="feature-title">How does it work?</h3>
            <p class="feature-desc">
              All calculations happen <strong>directly in your browser</strong> using modern web technologies. 
              Your data never leaves your device, ensuring complete privacy.
            </p>
            <ul class="feature-benefits">
              <li><Icon name="shield" :size="16" /> 100% client-side processing</li>
              <li><Icon name="smartphone" :size="16" /> Mobile-first design</li>
              <li><Icon name="zap" :size="16" /> Lightning fast results</li>
              <li><Icon name="globe" :size="16" /> Works on all devices</li>
            </ul>
          </div>

          <div class="about-feature-card glass-card special" data-aos="fade-up" data-aos-delay="250">
            <div class="feature-icon special">
              <Icon name="globe" :size="28" />
            </div>
            <h3 class="feature-title">Built for Everyone, Worldwide</h3>
            <p class="feature-desc">
              FikrNa works for users across the globe, with special features for different regions including Pakistan:
            </p>
            <ul class="feature-benefits">
              <li><Icon name="globe" :size="16" /> Available worldwide in any country</li>
              <li><Icon name="dollar-sign" :size="16" /> Multi-currency support (USD, PKR, EUR, etc.)</li>
              <li><Icon name="map" :size="16" /> Region-specific calculations (Pakistan FBR taxes & more)</li>
              <li><Icon name="heart" :size="16" /> International & local food databases</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Who It's For Section -->
    <section class="audience-section" aria-labelledby="audience-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="audience-heading" class="section-title">Who Uses FikrNa?</h2>
          <p class="section-description">
            FikrNa is designed for anyone who needs quick, reliable answers to everyday questions.
          </p>
        </div>

        <div class="audience-grid">
          <article class="audience-card" data-aos="fade-up" data-aos-delay="100">
            <div class="audience-icon">
              <Icon name="book" :size="32" />
             </div>
            <h3 class="audience-title">Students & Learners</h3>
            <p class="audience-desc">
              Calculate grades, track study habits, check readability of essays, and use various educational tools 
              for academic success.
            </p>
          </article>

          <article class="audience-card" data-aos="fade-up" data-aos-delay="200">
            <div class="audience-icon">
              <Icon name="briefcase" :size="32" />
             </div>
            <h3 class="audience-title">Working Professionals</h3>
            <p class="audience-desc">
              Calculate take-home salary after taxes, plan budgets, check EMI payments, and manage work-life balance 
              with productivity tools.
            </p>
          </article>

          <article class="audience-card" data-aos="fade-up" data-aos-delay="300">
            <div class="audience-icon">
              <Icon name="home" :size="32" />
           </div>
            <h3 class="audience-title">Families & Parents</h3>
            <p class="audience-desc">
              Track family health metrics, plan meals with calorie counters, manage household budgets, and organize 
              daily routines efficiently.
            </p>
          </article>

          <article class="audience-card" data-aos="fade-up" data-aos-delay="400">
            <div class="audience-icon">
              <Icon name="map" :size="32" />
            </div>
            <h3 class="audience-title">Travelers & Explorers</h3>
            <p class="audience-desc">
              Plan trips with packing lists, calculate travel dates, convert currencies, and stay organized while 
              exploring new places.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section" id="how-it-works" aria-labelledby="how-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="how-heading" class="section-title">How FikrNa Works</h2>
          <p class="section-description">
            Using FikrNa is simple. No downloads, no signups — just instant results.
          </p>
        </div>

        <ol class="steps-list">
          <li class="step-item" data-aos="fade-right" data-aos-delay="100">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Choose Your Tool</h3>
              <p class="step-desc">
                Browse our collection of calculators and tools, or use the search bar to find exactly what you need. 
                Each tool is clearly labeled with its purpose.
              </p>
            </div>
          </li>

          <li class="step-item" data-aos="fade-right" data-aos-delay="200">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Enter Your Information</h3>
              <p class="step-desc">
                Fill in the required fields with your data. We keep forms minimal and only ask for what's necessary 
                to calculate accurate results.
              </p>
            </div>
          </li>

          <li class="step-item" data-aos="fade-right" data-aos-delay="300">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Get Instant Results</h3>
              <p class="step-desc">
                See your results immediately, with clear explanations and actionable insights. Share, download, or 
                save your results for future reference.
              </p>
            </div>
          </li>
        </ol>

        <div class="cta-box glass-card" data-aos="fade-up" data-aos-delay="400">
          <h3 class="cta-title">Ready to get started?</h3>
          <p class="cta-desc">No account needed. Start using any tool right now.</p>
          <a href="#explore-tools" class="btn btn-primary btn-lg">
            Browse All Tools
            <Icon name="arrow-right" :size="18" />
          </a>
         </div>
      </div>
    </section>

    <!-- Trust & Reliability Section -->
    <section class="trust-section" aria-labelledby="trust-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="trust-heading" class="section-title">Trust & Reliability</h2>
          <p class="section-description">
            FikrNa is built with transparency, accuracy, and user privacy as top priorities.
          </p>
        </div>

        <div class="trust-grid">
          <div class="trust-card" data-aos="fade-up" data-aos-delay="100">
            <div class="trust-icon">
              <Icon name="shield" :size="28" />
            </div>
            <h3 class="trust-title">Privacy-First Design</h3>
            <p class="trust-desc">
              All calculations happen in your browser. We don't store, track, or sell your data. No cookies, 
              no analytics, no third-party scripts collecting information.
            </p>
          </div>

          <div class="trust-card" data-aos="fade-up" data-aos-delay="200">
            <div class="trust-icon">
              <Icon name="check-circle" :size="28" />
            </div>
            <h3 class="trust-title">Accurate Calculations</h3>
            <p class="trust-desc">
              Our tools use industry-standard formulas and verified data sources. Health tools use WHO guidelines, 
              financial calculators follow Pakistan FBR rules, and all formulas are transparent.
            </p>
          </div>

          <div class="trust-card" data-aos="fade-up" data-aos-delay="300">
            <div class="trust-icon">
              <Icon name="smartphone" :size="28" />
            </div>
            <h3 class="trust-title">Mobile-First Approach</h3>
            <p class="trust-desc">
              Every tool is designed for mobile devices first, then enhanced for tablets and desktops. Responsive 
              layouts, touch-friendly controls, and fast loading times on all connections.
            </p>
          </div>

          <div class="trust-card" data-aos="fade-up" data-aos-delay="400">
            <div class="trust-icon">
              <Icon name="zap" :size="28" />
            </div>
            <h3 class="trust-title">Fast & Lightweight</h3>
            <p class="trust-desc">
              No bloated frameworks, no unnecessary features. FikrNa loads quickly even on slow connections and 
              provides instant results without page refreshes.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- All Tools Section (Bento Grid) -->
    <section id="explore-tools" class="tools-section" aria-labelledby="tools-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="tools-heading" class="section-title">Explore All Tools</h2>
          <p class="section-description">
            Browse our complete collection of free calculators and tools. Click any tool to start using it.
          </p>
        </div>

        <div class="tools-bento">
           <ToolCard 
            v-for="tool in filteredTools"
            :key="tool.path"
            :tool="tool"
            :class="toolCardClass(tool)"
            data-aos="zoom-in"
            data-aos-duration="600"
          />
        </div>

        <div v-if="filteredTools.length === 0" class="no-results" data-aos="fade-up">
          <Icon name="search" :size="48" />
          <h3>No tools found</h3>
          <p>Try a different search term or browse all categories.</p>
          <button @click="searchQuery = ''; activeCategory = 'All'" class="btn btn-secondary">
            Show All Tools
          </button>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" aria-labelledby="faq-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="faq-heading" class="section-title">Frequently Asked Questions</h2>
          <p class="section-description">
            Common questions about FikrNa, our tools, and how everything works.
          </p>
        </div>

        <dl class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            data-aos="fade-up"
            :data-aos-delay="index * 50"
          >
            <dt>
              <button
                @click="toggleFAQ(index)"
                :aria-expanded="faq.open"
                class="faq-question"
                type="button"
              >
                <span>{{ faq.question }}</span>
                <Icon :name="faq.open ? 'chevron-up' : 'chevron-down'" :size="20" />
              </button>
            </dt>
            <dd v-show="faq.open" class="faq-answer">
              {{ faq.answer }}
            </dd>
             </div>
        </dl>
             </div>
    </section>

    <!-- Latest Blog Section -->
    <section class="blog-section" aria-labelledby="blog-heading">
      <div class="container">
        <div class="section-header" data-aos="fade-up">
          <h2 id="blog-heading" class="section-title">Latest from Our Blog</h2>
          <p class="section-description">
            Expert guides, tips, and insights to help you make the most of our tools and improve your daily life.
          </p>
           </div>

        <div class="blog-preview-grid">
          <article 
            v-for="post in latestBlogPosts" 
            :key="post.id"
            class="blog-preview-card glass-card"
            data-aos="fade-up"
            :data-aos-delay="getBlogDelay(post.id) * 100"
          >
            <router-link :to="`/blog/${post.slug}`" class="blog-preview-link">
              <div class="blog-preview-image">
                <img v-if="post.featuredImage" :src="post.featuredImage" :alt="post.imageAlt || post.title" class="blog-preview-img-real" />
                <div v-else class="blog-image-placeholder">
                  <Icon name="file-text" :size="40" />
                </div>
                <div class="blog-preview-category">{{ post.category }}</div>
              </div>
              
              <div class="blog-preview-content">
                <div class="blog-preview-meta">
                  <span class="blog-preview-date">
                    <Icon name="calendar" :size="12" />
                    {{ formatBlogDate(post.publishDate) }}
                  </span>
                  <span class="blog-preview-read-time">
                    <Icon name="clock" :size="12" />
                    {{ post.readTime }}
                  </span>
                </div>
                
                <h3 class="blog-preview-title">{{ post.title }}</h3>
                <p class="blog-preview-excerpt">{{ post.excerpt }}</p>
                
                <div class="blog-preview-footer">
                  <span class="read-more-text">
                    Read Article
                    <Icon name="arrow-right" :size="14" />
                  </span>
                </div>
              </div>
            </router-link>
          </article>
        </div>

        <div class="blog-cta" data-aos="fade-up">
          <router-link to="/blog" class="btn btn-outline btn-lg">
            View All Articles
            <Icon name="arrow-right" :size="18" />
          </router-link>
         </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="final-cta-section" aria-labelledby="cta-heading">
      <div class="container">
        <div class="final-cta glass-card" data-aos="zoom-in">
          <h2 id="cta-heading" class="cta-title">Start Using FikrNa Today</h2>
          <p class="cta-desc">
            Join thousands of users who trust FikrNa for daily problem-solving. No signup required — 
            all tools are free and ready to use right now.
          </p>
          <div class="cta-buttons">
            <a href="#explore-tools" class="btn btn-primary btn-lg">
              Browse All Tools
              <Icon name="arrow-right" :size="18" />
            </a>
            <router-link to="/about" class="btn btn-outline btn-lg">
              Learn More About Us
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ToolCard from '@/components/ToolCard.vue';
import Icon from '@/components/Icon.vue';
import { useSEO } from '@/composables/useSEO';
import { getLatestPosts } from '@/data/blogPosts';
import { 
  generateOrganizationSchema, 
  generateWebSiteSchema, 
  generateWebPageSchema, 
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateHowToSchema,
  generateFAQSchema,
  generateSchemaGraph
} from '@/utils/structuredData';
import AOS from 'aos';

// Tools Data
const tools = ref([
  { name: 'Calorie Tracker', path: '/tools/calorie-tracker', icon: 'activity', description: 'Track daily calories, macros, and nutrition with Pakistani and international foods.', category: 'Health', featured: true },
  { name: 'Meal Planner', path: '/tools/meal-planner', icon: 'calendar', description: 'Plan weekly meals with balanced nutrition and calorie goals.', category: 'Health', featured: true },
  { name: 'BMI Calculator', path: '/tools/bmi-calculator', icon: 'heart', description: 'Calculate Body Mass Index and get health recommendations.', category: 'Health' },
  { name: 'Sleep Coach', path: '/tools/sleep-coach', icon: 'moon', description: 'Improve sleep quality with personalized tips and tracking.', category: 'Health' },
  { name: 'Habit Tracker', path: '/tools/habit-tracker', icon: 'check-circle', description: 'Build positive habits and track daily progress.', category: 'Lifestyle' },
  { name: 'Salary Calculator', path: '/tools/salary-tax-calculator', icon: 'dollar-sign', description: 'Calculate Pakistan salary, taxes, and take-home pay.', category: 'Finance', featured: true },
  { name: 'Loan Calculator', path: '/tools/loan-calculator', icon: 'trending-up', description: 'Calculate EMI, loan payments, and interest rates.', category: 'Finance' },
  { name: 'Password Checker', path: '/tools/password-strength-checker', icon: 'lock', description: 'Check password strength and get security recommendations.', category: 'Security' },
  { name: 'Readability Tool', path: '/tools/readability-tool', icon: 'edit', description: 'Analyze text readability and improve writing clarity.', category: 'Writing' },
  { name: 'Trip Planner', path: '/tools/trip-planner', icon: 'map', description: 'Plan trips with packing lists and itinerary management.', category: 'Travel' },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: 'calendar', description: 'Calculate exact age, days lived, and upcoming milestones.', category: 'Lifestyle' },
  { name: 'Mood Coach', path: '/tools/mood-coach', icon: 'smile', description: 'Track mood patterns and get emotional wellness tips.', category: 'Health' },
  { name: 'Symptom Checker', path: '/tools/symptom-checker', icon: 'alert-circle', description: 'Check symptoms and get preliminary health guidance.', category: 'Health' },
  { name: 'Skincare Coach', path: '/tools/skincare-coach', icon: 'sun', description: 'Get personalized skincare routines and product recommendations.', category: 'Health' }
]);

// Search & Filter State
const searchQuery = ref('');
const activeCategory = ref('All');

// Computed Categories
const categories = computed(() => {
  const cats = ['All', ...new Set(tools.value.map(t => t.category))];
  return cats;
});

// Filtered Tools
const filteredTools = computed(() => {
  let result = tools.value;

  // Filter by category
  if (activeCategory.value !== 'All') {
    result = result.filter(t => t.category === activeCategory.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(t =>
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.category.toLowerCase().includes(query)
    );
  }

  return result;
});

// Latest Blog Posts
const latestBlogPosts = ref(getLatestPosts(3));

// Format blog date
function formatBlogDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Get delay for blog animations
function getBlogDelay(postId) {
  return latestBlogPosts.value.findIndex(p => p.id === postId);
}

// Tool Card Classes (Bento Layout)
function toolCardClass(tool) {
  // Only apply special classes when no filters are active
  if (searchQuery.value || activeCategory.value !== 'All') {
    return '';
  }
  
  if (tool.featured) {
    return 'bento-large';
  }
  return '';
}

// FAQ Data
const faqs = ref([
  { 
    question: 'Are FikrNa tools really free?',
    answer: 'Yes, all FikrNa tools are 100% free to use. There are no hidden fees, premium tiers, or subscriptions. We believe essential calculators and tools should be accessible to everyone.',
    open: false 
  },
  { 
    question: 'Do I need to create an account to use FikrNa?',
    answer: 'No account is required. All tools work immediately without signup, registration, or providing any personal information. Just visit a tool page and start using it.',
    open: false 
  },
  { 
    question: 'Is my data private and secure on FikrNa?',
    answer: 'Absolutely. All calculations happen locally in your web browser. Your data never leaves your device, and we don\'t track, store, or collect any user information. FikrNa is completely privacy-first.',
    open: false
  },
  {
    question: 'Do FikrNa tools work on mobile phones?',
    answer: 'Yes! Every tool is designed mobile-first, meaning it works perfectly on smartphones, tablets, and desktops. The interface adapts to your screen size for the best experience.',
    open: false
  },
  {
    question: 'How accurate are the calculators and tools?',
    answer: 'FikrNa uses industry-standard formulas and verified data sources. Health tools follow WHO guidelines, financial calculators use Pakistan FBR tax rates, and nutrition data comes from USDA databases. While we strive for accuracy, results are for informational purposes and shouldn\'t replace professional advice.',
    open: false
  },
  {
    question: 'Can I use FikrNa tools in Pakistan?',
    answer: 'Yes! FikrNa is designed with Pakistani users in mind. We include Pakistan-specific features like PKR salary calculations, FBR tax rates, local food databases (biryani, nihari, haleem), and culturally relevant examples.',
    open: false
  },
  {
    question: 'Can I share my results from FikrNa tools?',
    answer: 'Many tools include share and download features. You can save results as images, PDFs, or CSV files, and share them via social media or messaging apps.',
    open: false
  },
  {
    question: 'What makes FikrNa different from other calculator websites?',
    answer: 'FikrNa focuses on clarity, speed, and privacy. Unlike ad-heavy sites with cluttered interfaces, FikrNa tools are clean, mobile-friendly, and respect your privacy. No popups, no tracking, just helpful tools that work.',
    open: false 
  }
]);

function toggleFAQ(index) {
  faqs.value[index].open = !faqs.value[index].open;
}

// URL Query Sync
const route = useRoute();
const router = useRouter();

function applyRouteQuery() {
  if (route.query.q) searchQuery.value = route.query.q;
  if (route.query.cat) activeCategory.value = route.query.cat;
}

watch([searchQuery, activeCategory], () => {
  const scrollY = window.scrollY;
  const query = {};
  if (searchQuery.value) query.q = searchQuery.value;
  if (activeCategory.value !== 'All') query.cat = activeCategory.value;
  
  router.replace({ query }).catch(() => {});
  
  // Restore scroll position immediately
  requestAnimationFrame(() => {
    window.scrollTo(0, scrollY);
  });
}, { throttle: 300 });

onMounted(() => {
  applyRouteQuery();
  
  // Initialize AOS
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: false,
    mirror: false,
    offset: 50,
    disable: false
  });
  
  // Refresh AOS to detect all elements
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});

onMounted(() => {
  applyRouteQuery();
  
  // Initialize AOS
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: false,
    mirror: false,
    offset: 50,
    disable: false
  });
  
  // Refresh AOS to detect all elements
  setTimeout(() => {
    AOS.refresh();
  }, 100);
});

// SEO Setup with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = `${baseUrl}/`;

// Generate comprehensive schema graph for AI/LLM search optimization
const organizationSchema = generateOrganizationSchema({ baseUrl });
const websiteSchema = generateWebSiteSchema({ baseUrl });
const webpageSchema = generateWebPageSchema({
  baseUrl,
  url: currentUrl,
  name: 'FikrNa — Free Online Tools & Calculators for Everyday Life',
  description: 'Free online tools and calculators for health, finance, writing, travel, and daily planning. Fast, mobile-friendly, and privacy-first — no signup needed.',
  about: [
    { '@type': 'Thing', name: 'Online calculators' },
    { '@type': 'Thing', name: 'Health tools' },
    { '@type': 'Thing', name: 'Finance calculators' },
    { '@type': 'Thing', name: 'Productivity tools' },
    { '@type': 'Thing', name: 'Travel planning tools' },
    { '@type': 'Thing', name: 'Writing tools' }
  ],
  breadcrumb: { '@id': `${currentUrl}#breadcrumb` }
});
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', path: '/' }
], baseUrl);
const itemListSchema = generateItemListSchema(tools.value.map(t => ({
  name: t.name,
  path: t.path,
  description: t.description
})), {
  baseUrl,
  name: 'FikrNa Tools Collection',
  description: 'Complete collection of free online calculators and tools for everyday problem-solving'
});
const howToSchema = generateHowToSchema({
  name: 'How to Use FikrNa Tools',
  description: 'Step-by-step guide to using FikrNa calculators and tools for instant results',
  steps: [
    {
      name: 'Browse or Search for a Tool',
      text: 'Use the search bar or browse categories to find the calculator or tool you need. FikrNa offers tools for health, finance, writing, travel, and productivity.',
      url: currentUrl
    },
    {
      name: 'Enter Your Information',
      text: 'Fill in the required fields with your data. All tools have simple, user-friendly forms designed for quick input.',
      url: currentUrl
    },
    {
      name: 'Get Instant Results',
      text: 'View your results immediately with clear explanations, visualizations, and actionable insights. No registration or waiting required.',
      url: currentUrl
    }
  ]
});
const faqSchema = generateFAQSchema(faqs.value.map(faq => ({
  question: faq.question,
  answer: faq.answer
})));

const schemaGraph = generateSchemaGraph([
  organizationSchema,
  websiteSchema,
  webpageSchema,
  breadcrumbSchema,
  itemListSchema,
  howToSchema,
  faqSchema
]);

useSEO({
  title: 'FikrNa — Free Online Tools & Calculators for Everyday Life | Health, Finance, Travel & More',
  description: 'FikrNa provides free online tools and calculators for everyday problems: BMI calculator, calorie tracker, salary tax calculator, loan EMI calculator, password checker, readability analyzer, trip planner, habit tracker, and more. 100% free, private, instant results—no signup required. Available worldwide.',
  keywords: 'free online tools, online calculators, BMI calculator, salary tax calculator, EMI calculator, calorie tracker, password strength checker, readability analyzer, trip planner, habit tracker, free calculators, health calculators, finance tools, productivity tools, travel planning, writing tools, privacy-first tools',
  canonical: currentUrl,
  jsonLd: schemaGraph
});
</script>

<style scoped>
/* ===================================
   PREMIUM HOME PAGE STYLES
   =================================== */

.home-premium {
  position: relative;
  overflow-x: hidden;
  background: var(--bg-app);
}

/* Background Canvas */
.bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.mesh-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 70%);
  animation: meshShift 20s ease-in-out infinite alternate;
}

@keyframes meshShift {
  0% { transform: translateY(0) scale(1); }
  100% { transform: translateY(-20px) scale(1.05); }
}

.floating-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.4;
  animation: float 15s ease-in-out infinite;
}

.orb-purple {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-blue {
  width: 350px;
  height: 350px;
  background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%);
  bottom: -150px;
  left: -150px;
  animation-delay: 5s;
}

.orb-pink {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 10s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
}

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  position: relative;
  z-index: 1;
}

/* Glass Card */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}

/* Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ===================================
   HERO SECTION
   =================================== */

.hero-section {
  padding: clamp(60px, 10vh, 120px) 0 clamp(80px, 12vh, 140px);
  position: relative;
}

.hero-content {
  max-width: 100%;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #10b981;
  margin-bottom: 24px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

.hero-title {
  font-size: clamp(1.875rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-family: var(--font-heading);
}

.hero-description {
  font-size: clamp(1rem, 1.1vw, 1.125rem);
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 auto 32px;
  max-width: 720px;
}

.hero-features {
  list-style: none;
  margin: 0 auto 32px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  max-width: 600px;
}

.hero-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1rem;
  color: var(--text-secondary);
}

.hero-features svg {
  color: #10b981;
  flex-shrink: 0;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  font-family: var(--font-body);
}

.btn-primary {
  background: var(--primary);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-primary:hover {
  background: var(--primary-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.4);
}

.btn-outline {
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--border-strong);
}

.btn-outline:hover {
  border-color: #10b981;
  color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.btn-lg {
  padding: 14px 28px;
  font-size: 1.0625rem;
}

.btn-secondary {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-subtle);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.trust-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-tertiary);
}

.badge-item svg {
  color: #8b5cf6;
}

/* Search Panel */
.search-panel {
  position: sticky;
  top: 24px;
  padding: 32px;
  margin-top: 40px;
  overflow: visible;
}

.panel-header {
  display: flex;
  align-items: start;
  gap: 16px;
  margin-bottom: 24px;
}

.panel-icon {
  color: #10b981;
  flex-shrink: 0;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 4px;
}

.panel-subtitle {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  margin: 0;
}

.search-input-wrapper {
  position: relative;
  margin-bottom: 16px;
  overflow: visible;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #10b981;
  opacity: 0.9;
  pointer-events: none;
  z-index: 10;
  width: 20px;
  height: 20px;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  font-size: 1rem;
  border: 2px solid var(--border-subtle);
  border-radius: var(--radius-md);
  background: var(--bg-input);
  color: var(--text-primary);
  transition: all 0.3s ease;
  font-family: var(--font-body);
  position: relative;
  z-index: 1;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.category-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.chip {
  padding: 6px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  background: var(--bg-hover);
  border: 1px solid var(--border-subtle);
  border-radius: 100px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.chip:hover {
  border-color: #10b981;
  color: #10b981;
}

.chip.active {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-color: #10b981;
}

.search-results {
  margin-bottom: 24px;
}

.results-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.popular-tools {
  margin-bottom: 24px;
}

.popular-title {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-tertiary);
  margin: 0 0 12px;
}

.popular-grid {
  display: grid;
  gap: 8px;
}

.popular-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--bg-hover);
  border-radius: var(--radius-sm);
  text-decoration: none;
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.popular-link:hover {
  background: rgba(79, 70, 229, 0.1);
  color: var(--primary);
  transform: translateX(4px);
}

.popular-link svg {
  color: var(--primary);
  flex-shrink: 0;
}

/* ===================================
   SECTION HEADERS
   =================================== */

.section-header {
  text-align: center;
  max-width: 720px;
  margin: 0 auto 64px;
}

.section-title {
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 16px;
  font-family: var(--font-heading);
}

.section-description {
  font-size: clamp(1.0625rem, 1.2vw, 1.1875rem);
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* ===================================
   CAPABILITIES SECTION
   =================================== */

.capabilities-section {
  padding: clamp(05px, 6vh, 05px) 0;
  position: relative;
}

.capabilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.capability-card {
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.capability-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.card-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.card-icon.health {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.2) 100%);
  color: #ef4444;
}

.card-icon.finance {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(34, 197, 94, 0.2) 100%);
  color: #22c55e;
}

.card-icon.productivity {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.2) 100%);
  color: #6366f1;
}

.card-icon.lifestyle {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.2) 100%);
  color: #a855f7;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.card-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 20px;
}

.card-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-list li {
  font-size: 0.9375rem;
  color: var(--text-secondary);
  padding-left: 20px;
  position: relative;
}

.card-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #8b5cf6;
  font-weight: 600;
}

/* ===================================
   ABOUT SECTION
   =================================== */

.about-section {
  padding: clamp(60px, 10vh, 100px) 0;
  background: var(--bg-hover);
}

.ai-summary-box {
  padding: 32px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(20, 184, 166, 0.05) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
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

.about-intro-card {
  max-width: 900px;
  margin: 0 auto 48px;
  padding: 32px 40px;
  display: flex;
  align-items: center;
  gap: 24px;
  border: 2px solid rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.about-intro-card:hover {
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(16, 185, 129, 0.1);
}

.intro-icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-radius: var(--radius-md);
  color: #10b981;
}

.intro-text {
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

.intro-text strong {
  color: var(--text-primary);
  font-weight: 600;
}

.about-features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  max-width: 1100px;
  margin: 0 auto;
}

.about-feature-card {
  padding: 32px 28px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.about-feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.about-feature-card.special {
  border: 2px solid rgba(16, 185, 129, 0.2);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.03) 0%, transparent 100%);
}

.feature-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  margin-bottom: 20px;
}

.feature-icon.why {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(16, 185, 129, 0.2) 100%);
  color: #10b981;
}

.feature-icon.how {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.2) 100%);
  color: #0ea5e9;
}

.feature-icon.special {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.2) 100%);
  color: #a855f7;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.feature-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 20px;
}

.feature-desc strong {
  color: var(--text-primary);
  font-weight: 600;
}

.feature-benefits {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.feature-benefits li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.feature-benefits li svg {
  flex-shrink: 0;
  color: #10b981;
}

.feature-benefits li:has(svg[name="x"]) svg {
  color: #ef4444;
}

/* ===================================
   AUDIENCE SECTION
   =================================== */

.audience-section {
  padding: clamp(60px, 10vh, 100px) 0;
}

.audience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.audience-card {
  padding: 32px 24px;
  text-align: center;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.audience-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.audience-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-radius: 50%;
  color: #10b981;
}

.audience-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.audience-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* ===================================
   HOW IT WORKS SECTION
   =================================== */

.how-it-works-section {
  padding: clamp(60px, 10vh, 100px) 0;
  background: var(--bg-hover);
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0 auto 64px;
  max-width: 800px;
  counter-reset: step;
}

.step-item {
  display: flex;
  gap: 24px;
  margin-bottom: 40px;
  position: relative;
}

.step-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 27px;
  top: 64px;
  bottom: -40px;
  width: 2px;
  background: linear-gradient(180deg, #10b981 0%, transparent 100%);
}

.step-number {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  font-size: 1.5rem;
  font-weight: 800;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.step-content {
  flex: 1;
  padding-top: 8px;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.step-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

.cta-box {
  padding: 48px 40px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.cta-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 24px;
}

/* ===================================
   TRUST SECTION
   =================================== */

.trust-section {
  padding: clamp(60px, 10vh, 100px) 0;
}

.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}

.trust-card {
  padding: 32px 24px;
  text-align: center;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

.trust-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: rgba(16, 185, 129, 0.3);
}

.trust-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
  border-radius: var(--radius-md);
  color: var(--primary);
}

.trust-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.trust-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0;
}

/* ===================================
   TOOLS SECTION (BENTO GRID)
   =================================== */

.tools-section {
  padding: clamp(60px, 10vh, 100px) 0;
  background: var(--bg-hover);
}

.tools-bento {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  grid-auto-rows: 1fr;
}

.bento-large {
  grid-column: span 1;
  grid-row: span 1;
}

.no-results {
  text-align: center;
  padding: 80px 24px;
  color: var(--text-secondary);
}

.no-results svg {
  color: var(--text-tertiary);
  margin-bottom: 24px;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.no-results p {
  font-size: 1rem;
  margin: 0 0 24px;
}

/* ===================================
   FAQ SECTION
   =================================== */

.faq-section {
  padding: clamp(60px, 10vh, 100px) 0;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
  padding: 0;
}

.faq-item {
  margin-bottom: 16px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(139, 92, 246, 0.2);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px;
  background: transparent;
  border: none;
  font-size: 1.0625rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
}

.faq-question:hover {
  color: #10b981;
}

.faq-question svg {
  flex-shrink: 0;
  color: #10b981;
}

.faq-answer {
  padding: 0 24px 20px;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ===================================
   BLOG SECTION
   =================================== */

.blog-section {
  padding: clamp(60px, 8vh, 80px) 0;
  background: var(--bg-primary);
}

.blog-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 48px;
}

.blog-preview-card {
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--glass-border);
}

.blog-preview-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
}

.blog-preview-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.blog-preview-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%);
}

.blog-preview-img-real {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-preview-card:hover .blog-preview-img-real {
  transform: scale(1.05);
}

.blog-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(16, 185, 129, 0.3);
}

.blog-preview-category {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.blog-preview-content {
  padding: 24px;
}

.blog-preview-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.blog-preview-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.blog-preview-meta svg {
  color: #10b981;
}

.blog-preview-title {
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  font-weight: 700;
  line-height: 1.3;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.blog-preview-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px;
  font-size: 0.9375rem;
}

.blog-preview-footer {
  padding-top: 16px;
  border-top: 1px solid var(--glass-border);
}

.read-more-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
  transition: gap 0.3s;
}

.blog-preview-card:hover .read-more-text {
  gap: 10px;
}

.read-more-text svg {
  transition: transform 0.3s;
}

.blog-preview-card:hover .read-more-text svg {
  transform: translateX(4px);
}

.blog-cta {
  text-align: center;
  margin-top: 48px;
}

/* ===================================
   FINAL CTA SECTION
   =================================== */

.final-cta-section {
  padding: clamp(60px, 10vh, 100px) 0 clamp(80px, 12vh, 120px);
}

.final-cta {
  padding: 64px 48px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.final-cta .cta-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.final-cta .cta-desc {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 32px;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

/* ===================================
   RESPONSIVE DESIGN
   =================================== */

@media (max-width: 1100px) {
  .tools-bento {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .bento-large {
    grid-column: span 1;
  }

  .capabilities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .hero-content,
  .search-panel {
    max-width: 100%;
  }

  .search-panel {
    margin-top: 60px;
    position: relative;
    top: 0;
  }

  .capabilities-grid,
  .audience-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    gap: 16px;
  }

  .step-item::after {
    display: none;
  }

  .final-cta {
    padding: 48px 32px;
  }
}

@media (max-width: 768px) {
  .tools-bento {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 640px) {
  .hero-cta {
    flex-direction: column;
    width: 100%;
  }

  .hero-cta .btn {
    width: 100%;
  }

  .trust-badges {
    flex-direction: column;
    align-items: start;
  }

  .search-panel {
    padding: 24px;
  }

  .panel-header {
    flex-direction: column;
    gap: 12px;
  }

  .tools-bento {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    width: 100%;
  }

  .cta-buttons .btn {
    width: 100%;
  }
}

/* ===================================
   ACCESSIBILITY & REDUCED MOTION
   =================================== */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ===================================
   DARK MODE SUPPORT
   =================================== */

@media (prefers-color-scheme: dark) {
  :root {
    --bg-app: #0f172a;
    --bg-card: #1e293b;
    --bg-input: #1e293b;
    --bg-hover: #334155;

    --text-primary: #f1f5f9;
    --text-secondary: #cbd5e1;
    --text-tertiary: #64748b;

    --border-subtle: #334155;
    --border-strong: #475569;

    --glass-bg: rgba(30, 41, 59, 0.8);
    --glass-border: rgba(255, 255, 255, 0.05);

    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
  }

  .floating-orb {
    opacity: 0.2;
  }

  .mesh-gradient {
    opacity: 0.6;
  }

  .grid-overlay {
    opacity: 0.3;
  }

  .blog-preview-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
