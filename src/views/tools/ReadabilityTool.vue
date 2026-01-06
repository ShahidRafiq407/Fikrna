<template>
  <div class="tool-page readability-analyzer-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Readability Analyzer" category="Content" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="book-open" :size="16" />
          Writing & Content Analysis
        </p>
        <h1>Free Text Readability Checker & Analysis Tool</h1>
        <p class="hero-subtitle">
          Analyze your text's readability, clarity, and complexity with industry-standard metrics. 
          Get Flesch-Kincaid scores, reading grade levels, and actionable suggestions to improve your writing. 
          Perfect for writers, students, content creators, and professionals who want to communicate clearly.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="book-open" :size="14" />
            Flesch-Kincaid Score
          </span>
          <span class="badge">
            <Icon name="clock" :size="14" />
            Reading Time
          </span>
          <span class="badge">
            <Icon name="bar-chart" :size="14" />
            Word Statistics
          </span>
          <span class="badge">
            <Icon name="target" :size="14" />
            Improvement Suggestions
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
          <strong>Readability Checker</strong> analyzes text readability using industry-standard metrics including Flesch-Kincaid Reading Ease, Flesch-Kincaid Grade Level, and other readability formulas. The tool evaluates text complexity, sentence structure, word length, and vocabulary difficulty to provide readability scores and reading grade levels. 
          Users paste or type text to receive comprehensive analysis including readability scores, word count, sentence count, average words per sentence, reading time estimates, and actionable suggestions for improving clarity. The tool helps writers, students, content creators, and professionals ensure their writing is accessible and appropriate for their target audience. All analysis happens instantly in the browser for privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="book-open" :size="20" />
            Text Readability Analyzer
          </h2>
          <div class="tool-actions" v-if="stats">
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
          
          <!-- Input Section -->
          <div class="input-section">
            <div class="input-header">
              <label>
                <Icon name="edit" :size="18" />
                Paste or Type Your Text
              </label>
              <div class="input-actions">
                <button @click="clearText" class="text-btn" v-if="text">
                  <Icon name="x" :size="14" />
                  Clear
                </button>
              </div>
            </div>
            <textarea 
              v-model="text" 
              placeholder="Paste your text here to analyze readability, complexity, and clarity. This tool works with articles, essays, blog posts, emails, and any written content..." 
              class="styled-textarea"
              spellcheck="true"
              @input="autoAnalyze"
              rows="12"
              aria-label="Text input for readability analysis"
            ></textarea>
            <div class="input-footer">
              <span class="char-count">
                <Icon name="file-text" :size="14" />
                {{ text.length }} characters, {{ wordCount }} words
              </span>
              <button 
                @click="analyze" 
                class="btn btn-primary" 
                :disabled="!text.trim()"
              >
                <Icon name="search" :size="18" />
                Analyze Readability
              </button>
            </div>
          </div>

          <!-- Results Section -->
          <div v-if="stats" class="results-section">
            
            <!-- Main Score Card -->
            <div class="score-card" :class="getScoreClass(stats.readabilityScore)">
              <div class="score-header">
                <h3>
                  <Icon name="target" :size="20" />
                  Readability Score
                </h3>
                <div class="score-badge" :class="getScoreBadgeClass(stats.readabilityScore)">
                  {{ stats.gradeLabel }}
                </div>
              </div>
              <div class="score-display">
                <div class="big-score">{{ stats.readabilityScore }}</div>
                <div class="score-scale">/ 100</div>
              </div>
              <div class="score-details">
                <p class="grade-info">
                  <Icon name="book-open" :size="16" />
                  Approximate Grade Level: {{ stats.grade }}
                </p>
                <p class="score-description">{{ getScoreDescription(stats.readabilityScore) }}</p>
              </div>
            </div>

            <!-- Metrics Grid -->
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="file-text" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.words }}</div>
                  <div class="metric-label">Total Words</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="message-square" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.sentences }}</div>
                  <div class="metric-label">Sentences</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="clock" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.readTime }}</div>
                  <div class="metric-label">Reading Time</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="alert-circle" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.complexWords }}</div>
                  <div class="metric-label">Complex Words</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="trending-up" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.avgSentenceLength }}</div>
                  <div class="metric-label">Avg Sentence Length</div>
                </div>
              </div>
              
              <div class="metric-card">
                <div class="metric-icon">
                  <Icon name="bar-chart" :size="24" />
                </div>
                <div class="metric-content">
                  <div class="metric-value">{{ stats.lexicalDensity }}%</div>
                  <div class="metric-label">Lexical Density</div>
                </div>
              </div>
            </div>

            <!-- Additional Metrics -->
            <div class="additional-metrics">
              <div class="metric-row">
                <span class="metric-name">Average Syllables per Word:</span>
                <span class="metric-value-small">{{ stats.avgSyllablesPerWord }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-name">Words per Sentence:</span>
                <span class="metric-value-small">{{ stats.avgWordsPerSentence }}</span>
              </div>
              <div class="metric-row">
                <span class="metric-name">Complex Words Ratio:</span>
                <span class="metric-value-small">{{ stats.complexWordsRatio }}%</span>
              </div>
            </div>

            <!-- Suggestions Section -->
            <div class="suggestions-box">
              <h4>
                <Icon name="edit-2" :size="18" />
                Writing Insights & Suggestions
              </h4>
              <div class="suggestions-list">
                <div 
                  v-for="(suggestion, index) in getSuggestions()" 
                  :key="index"
                  class="suggestion-item"
                  :class="suggestion.type"
                >
                  <Icon 
                    :name="suggestion.type === 'warning' ? 'alert-triangle' : suggestion.type === 'good' ? 'check-circle' : 'info'" 
                    :size="18" 
                  />
                  <div>
                    <strong>{{ suggestion.title }}</strong>
                    <p>{{ suggestion.message }}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- Empty State -->
          <div v-else class="empty-state-results">
            <div class="empty-icon-wrapper">
              <Icon name="bar-chart-2" :size="64" />
            </div>
            <h3>Ready to Analyze Your Text</h3>
            <p>Paste or type your text above and click "Analyze Readability" to get instant insights about your writing's clarity, complexity, and readability score.</p>
          </div>

        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        
        <!-- How It Works -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            How Text Readability Analysis Works
          </h2>
          <p>
            Readability analysis measures how easy or difficult it is for readers to understand your text. 
            This tool uses the <strong>Flesch-Kincaid Readability Test</strong>, one of the most widely used 
            readability formulas in the world. Developed by Rudolf Flesch and J. Peter Kincaid, this formula 
            has been used by government agencies, educational institutions, and publishers for decades.
          </p>
          
          <h3>The Flesch-Kincaid Formula</h3>
          <p>
            The Flesch Reading Ease score is calculated using two key factors:
          </p>
          
          <div class="features-grid">
            <div class="feature-box">
              <h4>
                <Icon name="file-text" :size="20" />
                Average Sentence Length
              </h4>
              <p>
                Longer sentences require more cognitive effort to process. The formula considers the average 
                number of words per sentence in your text. Shorter sentences (15-20 words) generally score higher 
                for readability.
              </p>
            </div>
            
            <div class="feature-box">
              <h4>
                <Icon name="activity" :size="20" />
                Average Syllables per Word
              </h4>
              <p>
                Words with more syllables are harder to read and understand. The formula analyzes the average 
                number of syllables per word. Simple words with fewer syllables contribute to better readability scores.
              </p>
            </div>
          </div>

          <p>
            The formula produces a score from 0 to 100, where higher scores indicate easier-to-read text. 
            A score of 60-70 is considered "standard" reading level (8th-9th grade), which is ideal for 
            most general audiences and web content.
          </p>

          <h3>Understanding Grade Levels</h3>
          <p>
            The Flesch-Kincaid Grade Level formula converts the readability score into an approximate U.S. 
            school grade level. For example, a score of 8.0 means the text is understandable by an average 
            8th-grade student. This helps you ensure your content matches your target audience's reading level.
          </p>
        </article>

        <!-- Why Readability Matters -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            Why Text Readability Matters
          </h2>
          <p>
            In today's information-saturated world, clear and accessible writing is essential. Whether you're 
            writing a blog post, business proposal, academic paper, or marketing copy, readability directly 
            impacts how effectively you communicate your message.
          </p>

          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="users" :size="24" />
              <h4>Reach a Wider Audience</h4>
              <p>
                Clear, readable content is accessible to more people, including those with different education 
                levels, non-native speakers, and readers with learning disabilities. This expands your potential audience.
              </p>
            </div>
            
            <div class="use-case-item">
              <Icon name="trending-up" :size="24" />
              <h4>Improve User Engagement</h4>
              <p>
                Readable content keeps readers engaged longer. When text is too complex, readers become frustrated 
                and may abandon your content, reducing engagement and conversion rates.
              </p>
            </div>
            
            <div class="use-case-item">
              <Icon name="globe" :size="24" />
              <h4>SEO Benefits</h4>
              <p>
                Search engines favor content that provides value to users. Readable content typically has better 
                user engagement metrics, which can positively impact your search engine rankings.
              </p>
            </div>
            
            <div class="use-case-item">
              <Icon name="briefcase" :size="24" />
              <h4>Professional Communication</h4>
              <p>
                In business and professional settings, clear writing demonstrates competence and respect for your 
                audience. Complex, hard-to-read text can create misunderstandings and reduce effectiveness.
              </p>
            </div>
            
            <div class="use-case-item">
              <Icon name="book-open" :size="24" />
              <h4>Educational Content</h4>
              <p>
                For educational materials, matching readability to your students' level ensures better comprehension 
                and learning outcomes. Content that's too complex or too simple hinders education.
              </p>
            </div>
            
            <div class="use-case-item">
              <Icon name="zap" :size="24" />
              <h4>Faster Comprehension</h4>
              <p>
                Readable text is processed more quickly by readers' brains. This means your audience can understand 
                and act on your message faster, improving efficiency in professional and educational contexts.
              </p>
            </div>
          </div>
        </article>

        <!-- Use Cases -->
        <article class="content-card">
          <h2>
            <Icon name="users" :size="24" />
            Who Uses Readability Analysis?
          </h2>
          
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="edit" :size="20" />
              <div>
                <h4>Content Writers & Bloggers</h4>
                <p>
                  Bloggers and content creators use readability analysis to ensure their articles are accessible 
                  to their target audience. A readability score helps them adjust their writing style to match 
                  their readers' expectations, whether they're writing for general audiences or specialized niches.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="briefcase" :size="20" />
              <div>
                <h4>Marketing Professionals</h4>
                <p>
                  Marketers analyze readability to optimize copy for websites, emails, advertisements, and social 
                  media. Readable marketing content is more persuasive because it's easier to understand and act upon.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="book-open" :size="20" />
              <div>
                <h4>Students & Academics</h4>
                <p>
                  Students use readability tools to improve their essays and papers. Academics and researchers 
                  ensure their writing is appropriately complex for their intended audience while maintaining clarity.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="users" :size="20" />
              <div>
                <h4>Educators & Teachers</h4>
                <p>
                  Teachers analyze reading materials to ensure they match their students' reading levels. This 
                  helps create appropriate assignments and ensures students can successfully comprehend the material.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="globe" :size="20" />
              <div>
                <h4>Technical Writers</h4>
                <p>
                  Technical writers balance the need for precision with readability. They use readability analysis 
                  to ensure documentation and manuals are accessible to users while maintaining technical accuracy.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="target" :size="20" />
              <div>
                <h4>Legal & Compliance Writers</h4>
                <p>
                  While legal documents require specific terminology, readability analysis helps identify areas where 
                  plain language can improve understanding without losing legal precision. This improves accessibility 
                  and reduces misunderstandings.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- Tips & Best Practices -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Tips to Improve Your Readability Score
          </h2>
          
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="file-text" :size="20" />
              <div>
                <h4>Keep Sentences Short and Focused</h4>
                <p>
                  Aim for an average sentence length of 15-20 words. Break long sentences into shorter, more 
                  digestible chunks. One idea per sentence is ideal. If you find yourself using multiple commas 
                  or semicolons, consider splitting the sentence.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="activity" :size="20" />
              <div>
                <h4>Use Simple, Common Words</h4>
                <p>
                  Replace complex words with simpler alternatives when possible. For example, use "use" instead 
                  of "utilize," "help" instead of "facilitate," and "start" instead of "commence." This doesn't 
                  mean dumbing down your content—it means choosing the most direct way to express your ideas.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="list" :size="20" />
              <div>
                <h4>Break Up Long Paragraphs</h4>
                <p>
                  Long paragraphs are intimidating and hard to scan. Keep paragraphs to 3-5 sentences, especially 
                  in web content. Use white space strategically to create visual breathing room and improve readability.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="target" :size="20" />
              <div>
                <h4>Use Active Voice</h4>
                <p>
                  Active voice ("The team completed the project") is clearer and more direct than passive voice 
                  ("The project was completed by the team"). Active voice typically uses fewer words and is easier 
                  to understand.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="edit" :size="20" />
              <div>
                <h4>Vary Sentence Structure</h4>
                <p>
                  While keeping sentences relatively short, vary their structure to maintain reader interest. Mix 
                  simple, compound, and complex sentences, but avoid over-complicating your writing.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Target Your Audience</h4>
                <p>
                  Different audiences require different readability levels. General web content works best at 60-70 
                  (8th-9th grade). Academic papers may be appropriately more complex. Know your audience and adjust 
                  accordingly.
                </p>
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
            <div class="faq-item">
              <h4>What is the Flesch-Kincaid Readability Test?</h4>
              <p>
                The Flesch-Kincaid Readability Test is a formula that calculates how easy or difficult text is to 
                read. It produces two scores: the Flesch Reading Ease (0-100, where higher is easier) and the 
                Flesch-Kincaid Grade Level (which indicates the U.S. school grade level needed to understand the text).
              </p>
            </div>
            
            <div class="faq-item">
              <h4>What is a good readability score?</h4>
              <p>
                For general web content and most audiences, a score of 60-70 (8th-9th grade level) is ideal. This 
                level is accessible to the widest audience while maintaining sophistication. Scores above 70 are 
                very easy to read, while scores below 50 may be too difficult for general audiences.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>How do you count sentences?</h4>
              <p>
                We count sentences based on standard sentence-ending punctuation: periods (.), exclamation marks (!), 
                and question marks (?). Each of these punctuation marks signals the end of a complete thought or sentence.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>What counts as a "complex word"?</h4>
              <p>
                In readability analysis, a complex word is typically defined as a word with three or more syllables. 
                These words require more cognitive effort to process and can slow down reading comprehension.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Is a higher score always better?</h4>
              <p>
                Not always. While higher scores (easier reading) are better for general audiences, academic papers, 
                technical documentation, and specialized content may appropriately have lower scores. The key is 
                matching your readability level to your audience's needs and expectations.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Can I use this tool for non-English text?</h4>
              <p>
                This tool is specifically designed for English text. The Flesch-Kincaid formula is based on English 
                language patterns, syllable counting, and sentence structure. Results for non-English text may not 
                be accurate.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>How accurate is the reading time calculation?</h4>
              <p>
                Reading time is calculated based on an average reading speed of 200 words per minute, which is 
                typical for adults reading at a comfortable pace. Actual reading time varies based on the reader's 
                speed, text complexity, and level of engagement.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>What is lexical density?</h4>
              <p>
                Lexical density is the percentage of unique words in your text. It's calculated by dividing the 
                number of unique words by the total number of words. Higher lexical density may indicate more 
                complex vocabulary, while lower density suggests more repetition and simpler word choice.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Should I aim for the lowest grade level possible?</h4>
              <p>
                Not necessarily. While very simple text (low grade levels) is easy to read, it may not be appropriate 
                for all contexts. For example, academic papers, technical documentation, and professional content 
                may appropriately target higher grade levels (12-16) to maintain precision and avoid oversimplification.
              </p>
            </div>
            
            <div class="faq-item">
              <h4>Does this tool store my text?</h4>
              <p>
                No. All analysis happens entirely in your browser. Your text is never sent to our servers, stored, 
                or accessed by anyone. This ensures complete privacy and security for your content.
              </p>
            </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All text analysis happens entirely in your browser using client-side JavaScript. We never store, 
              transmit, or have access to your text. Your content remains completely private and secure on your device.
            </p>
          </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Disclaimer</h3>
            <p>
              This tool provides readability analysis based on established formulas and algorithms. Results are 
              estimates and should be used as a guide rather than an absolute measure. Writing quality involves 
              many factors beyond readability scores, including style, tone, context, and audience fit.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Improve Your Writing?</h2>
          <p>Start analyzing your text now—completely free, no signup required</p>
          <div class="cta-buttons">
            <button @click="scrollToTop" class="btn btn-primary">
              <Icon name="arrow-right" :size="18" />
              Analyze Your Text
            </button>
            <router-link to="/tools/password-checker" class="btn btn-outline">
              <Icon name="lock" :size="18" />
              Check Password Strength
            </router-link>
          </div>
        </div>
      </section>

      <!-- Featured Tools Section - At the End -->
      <section class="featured-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="star" :size="24" />
          Related Writing & Productivity Tools
        </h2>
        <p class="section-subtitle">Explore other tools to enhance your writing and productivity</p>
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
      <RelatedTools currentTool="/tools/readability-analyzer" category="Content" />

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
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/readability-tool`;

useSEO({
  title: 'Free Text Readability Checker 2025 | Flesch-Kincaid Score Calculator | Writing Analysis Tool',
  description: 'Analyze text readability with Flesch-Kincaid scores, reading grade levels, word statistics, and improvement suggestions. Free readability checker for writers, students, content creators, and professionals. Improve writing clarity instantly. Privacy-first, instant results.',
  keywords: 'readability checker, flesch kincaid calculator, text readability analyzer, reading level calculator, writing clarity tool, grade level calculator, text analysis, readability score, writing improvement tool, content readability, readability analyzer, text complexity checker, writing assessment tool, readability metrics',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// --- State ---
const text = ref('');
const stats = ref(null);

const featuredTools = [
  {
    name: 'Password Checker',
    path: '/tools/password-checker',
    icon: 'lock',
    description: 'Check password strength and security'
  },
  {
    name: 'Salary Calculator',
    path: '/tools/salary-calculator',
    icon: 'dollar-sign',
    description: 'Calculate salary, taxes, and take-home pay'
  },
  {
    name: 'Age Calculator',
    path: '/tools/age-calculator',
    icon: 'calendar',
    description: 'Calculate exact age, date differences, and milestones'
  },
  {
    name: 'Loan Calculator',
    path: '/tools/loan-calculator',
    icon: 'briefcase',
    description: 'Calculate loan payments, interest, and amortization'
  }
];

// --- Computed ---
const wordCount = computed(() => {
  if (!text.value.trim()) return 0;
  return text.value.trim().split(/\s+/).filter(w => w.length > 0).length;
});

// --- Methods ---
function countSyllables(word) {
  word = word.toLowerCase().trim();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const syllables = word.match(/[aeiouy]{1,2}/g);
  return syllables ? syllables.length : 1;
}

function analyze() {
  if (!text.value.trim()) return;

  const content = text.value.trim();
  
  // Counts
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  // Sentences
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);
  
  // Syllables & Complex Words
  let totalSyllables = 0;
  let complexWords = 0;
  
  words.forEach(w => {
    const s = countSyllables(w);
    totalSyllables += s;
    if (s >= 3) complexWords++;
  });

  // Flesch Reading Ease
  const avgWordsPerSentence = wordCount / sentenceCount;
  const avgSyllablesPerWord = totalSyllables / wordCount;
  
  let score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
  score = Math.max(0, Math.min(100, score));

  // Grade Level
  let grade = (0.39 * avgWordsPerSentence) + (11.8 * avgSyllablesPerWord) - 15.59;
  grade = Math.max(0, grade);
  
  // Labels
  let label = 'Unknown';
  if (score >= 90) label = 'Very Easy (5th Grade)';
  else if (score >= 80) label = 'Easy (6th Grade)';
  else if (score >= 70) label = 'Fairly Easy (7th Grade)';
  else if (score >= 60) label = 'Standard (8th-9th Grade)';
  else if (score >= 50) label = 'Fairly Difficult (High School)';
  else if (score >= 30) label = 'Difficult (College)';
  else label = 'Very Difficult (Graduate)';

  // Read Time (200 wpm)
  const readMins = Math.ceil(wordCount / 200);
  const readTimeStr = readMins < 1 ? '< 1 min' : `~${readMins} min`;

  // Lexical Density
  const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
  const lexicalDensity = ((uniqueWords / wordCount) * 100).toFixed(0);

  stats.value = {
    readabilityScore: parseFloat(score.toFixed(1)),
    gradeLabel: label,
    grade: grade.toFixed(1),
    words: wordCount,
    sentences: sentenceCount,
    readTime: readTimeStr,
    complexWords: complexWords,
    avgSentenceLength: avgWordsPerSentence.toFixed(1),
    avgWordsPerSentence: avgWordsPerSentence.toFixed(1),
    avgSyllablesPerWord: (avgSyllablesPerWord).toFixed(2),
    lexicalDensity: lexicalDensity,
    complexWordsRatio: ((complexWords / wordCount) * 100).toFixed(1)
  };
}

function autoAnalyze() {
  // Optional: Auto-analyze as user types (debounced)
  // For now, manual analysis only
}

function getScoreClass(score) {
  if (score >= 70) return 'score-excellent';
  if (score >= 60) return 'score-good';
  if (score >= 50) return 'score-fair';
  if (score >= 30) return 'score-difficult';
  return 'score-very-difficult';
}

function getScoreBadgeClass(score) {
  if (score >= 70) return 'badge-green';
  if (score >= 60) return 'badge-teal';
  if (score >= 50) return 'badge-yellow';
  if (score >= 30) return 'badge-orange';
  return 'badge-red';
}

function getScoreDescription(score) {
  if (score >= 90) return 'Very easy to read. Easily understood by an average 5th-grade student.';
  if (score >= 80) return 'Easy to read. Conversational English for consumers.';
  if (score >= 70) return 'Fairly easy to read. Plain English, easily understood by 13- to 15-year-old students.';
  if (score >= 60) return 'Standard readability. Easily understood by 13- to 15-year-old students.';
  if (score >= 50) return 'Fairly difficult to read. Best understood by college students.';
  if (score >= 30) return 'Difficult to read. Best understood by university graduates.';
  return 'Very difficult to read. Best understood by university graduates.';
}

function getSuggestions() {
  if (!stats.value) return [];
  
  const suggestions = [];
  const score = stats.value.readabilityScore;
  const avgLength = parseFloat(stats.value.avgSentenceLength);
  const complexRatio = parseFloat(stats.value.complexWordsRatio);
  
  if (score < 60) {
    suggestions.push({
      type: 'warning',
      title: 'Readability Score Too Low',
      message: `Your readability score is ${score.toFixed(1)}, which may be difficult for general audiences. Consider simplifying your language and shortening sentences to improve accessibility.`
    });
  } else if (score >= 70) {
    suggestions.push({
      type: 'good',
      title: 'Good Readability Score',
      message: `Your readability score of ${score.toFixed(1)} is excellent for general audiences. Your text is accessible and easy to understand.`
    });
  }
  
  if (avgLength > 20) {
    suggestions.push({
      type: 'warning',
      title: 'Sentences Are Too Long',
      message: `Your average sentence length is ${avgLength} words. Consider breaking long sentences into shorter ones (aim for 15-20 words) to improve readability and comprehension.`
    });
  } else if (avgLength >= 15 && avgLength <= 20) {
    suggestions.push({
      type: 'good',
      title: 'Good Sentence Length',
      message: `Your average sentence length of ${avgLength} words is ideal for readability. Keep up the good work!`
    });
  } else if (avgLength < 10) {
    suggestions.push({
      type: 'info',
      title: 'Very Short Sentences',
      message: `Your average sentence length is ${avgLength} words. While very readable, you may want to vary sentence structure to maintain reader interest.`
    });
  }
  
  if (complexRatio > 15) {
    suggestions.push({
      type: 'warning',
      title: 'High Complex Word Ratio',
      message: `${complexRatio}% of your words are complex (3+ syllables). Consider replacing some complex words with simpler alternatives to improve readability.`
    });
  } else if (complexRatio < 5) {
    suggestions.push({
      type: 'info',
      title: 'Low Complex Word Usage',
      message: `Your complex word ratio is ${complexRatio}%, which is excellent for readability. Your writing is accessible to a wide audience.`
    });
  }
  
  return suggestions;
}

function clearText() {
  text.value = '';
  stats.value = null;
}

function resetAll() {
  clearText();
}

function copyResults() {
  if (!stats.value) {
    alert('No results to copy');
    return;
  }

  let text = 'READABILITY ANALYSIS REPORT\n';
  text += `Generated: ${new Date().toLocaleString()}\n\n`;
  text += `READABILITY SCORE: ${stats.value.readabilityScore}/100\n`;
  text += `Grade Level: ${stats.value.grade} (${stats.value.gradeLabel})\n\n`;
  text += `STATISTICS:\n`;
  text += `- Total Words: ${stats.value.words}\n`;
  text += `- Total Sentences: ${stats.value.sentences}\n`;
  text += `- Reading Time: ${stats.value.readTime}\n`;
  text += `- Complex Words: ${stats.value.complexWords}\n`;
  text += `- Average Sentence Length: ${stats.value.avgSentenceLength} words\n`;
  text += `- Average Syllables per Word: ${stats.value.avgSyllablesPerWord}\n`;
  text += `- Lexical Density: ${stats.value.lexicalDensity}%\n`;
  text += `- Complex Words Ratio: ${stats.value.complexWordsRatio}%\n\n`;
  text += `Generated by FikrNa - ${window.location.href}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard!');
  });
}

function downloadReport() {
  if (!stats.value) {
    alert('No results to download');
    return;
  }

  let report = 'TEXT READABILITY ANALYSIS REPORT\n';
  report += `Generated: ${new Date().toLocaleString()}\n\n`;
  report += '='.repeat(60) + '\n';
  report += 'READABILITY SCORE\n';
  report += '='.repeat(60) + '\n\n';
  report += `Score: ${stats.value.readabilityScore}/100\n`;
  report += `Grade Level: ${stats.value.grade} (${stats.value.gradeLabel})\n`;
  report += `Description: ${getScoreDescription(stats.value.readabilityScore)}\n\n`;
  
  report += '='.repeat(60) + '\n';
  report += 'TEXT STATISTICS\n';
  report += '='.repeat(60) + '\n\n';
  report += `Total Words: ${stats.value.words}\n`;
  report += `Total Sentences: ${stats.value.sentences}\n`;
  report += `Reading Time: ${stats.value.readTime} (based on 200 words per minute)\n`;
  report += `Complex Words (3+ syllables): ${stats.value.complexWords}\n`;
  report += `Average Sentence Length: ${stats.value.avgSentenceLength} words\n`;
  report += `Average Syllables per Word: ${stats.value.avgSyllablesPerWord}\n`;
  report += `Lexical Density: ${stats.value.lexicalDensity}%\n`;
  report += `Complex Words Ratio: ${stats.value.complexWordsRatio}%\n\n`;
  
  const suggestions = getSuggestions();
  if (suggestions.length > 0) {
    report += '='.repeat(60) + '\n';
    report += 'WRITING SUGGESTIONS\n';
    report += '='.repeat(60) + '\n\n';
    suggestions.forEach((s, i) => {
      report += `${i + 1}. ${s.title}\n`;
      report += `   ${s.message}\n\n`;
    });
  }
  
  report += '='.repeat(60) + '\n';
  report += `DISCLAIMER\n`;
  report += `This report is generated for informational purposes only. Readability scores are estimates based on established formulas and should be used as a guide rather than an absolute measure of writing quality.\n\n`;
  report += `Generated by FikrNa - ${window.location.href}`;

  const blob = new Blob([report], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `readability-analysis-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQs for structured data
const faqs = [
  { 
    question: "What is the Flesch-Kincaid Readability Test?", 
    answer: "The Flesch-Kincaid Readability Test is a formula that calculates how easy or difficult text is to read. It produces two scores: the Flesch Reading Ease (0-100, where higher is easier) and the Flesch-Kincaid Grade Level (which indicates the U.S. school grade level needed to understand the text)." 
  },
  { 
    question: "What is a good readability score?", 
    answer: "For general web content and most audiences, a score of 60-70 (8th-9th grade level) is ideal. This level is accessible to the widest audience while maintaining sophistication. Scores above 70 are very easy to read, while scores below 50 may be too difficult for general audiences." 
  },
  { 
    question: "How do you count sentences?", 
    answer: "We count sentences based on standard sentence-ending punctuation: periods (.), exclamation marks (!), and question marks (?). Each of these punctuation marks signals the end of a complete thought or sentence." 
  },
  { 
    question: "What counts as a 'complex word'?", 
    answer: "In readability analysis, a complex word is typically defined as a word with three or more syllables. These words require more cognitive effort to process and can slow down reading comprehension." 
  },
  { 
    question: "Is a higher score always better?", 
    answer: "Not always. While higher scores (easier reading) are better for general audiences, academic papers, technical documentation, and specialized content may appropriately have lower scores. The key is matching your readability level to your audience's needs and expectations." 
  },
  { 
    question: "Can I use this tool for non-English text?", 
    answer: "This tool is specifically designed for English text. The Flesch-Kincaid formula is based on English language patterns, syllable counting, and sentence structure. Results for non-English text may not be accurate." 
  },
  { 
    question: "How accurate is the reading time calculation?", 
    answer: "Reading time is calculated based on an average reading speed of 200 words per minute, which is typical for adults reading at a comfortable pace. Actual reading time varies based on the reader's speed, text complexity, and level of engagement." 
  },
  { 
    question: "What is lexical density?", 
    answer: "Lexical density is the percentage of unique words in your text. It's calculated by dividing the number of unique words by the total number of words. Higher lexical density may indicate more complex vocabulary, while lower density suggests more repetition and simpler word choice." 
  },
  { 
    question: "Should I aim for the lowest grade level possible?", 
    answer: "Not necessarily. While very simple text (low grade levels) is easy to read, it may not be appropriate for all contexts. For example, academic papers, technical documentation, and professional content may appropriately target higher grade levels (12-16) to maintain precision and avoid oversimplification." 
  },
  { 
    question: "Does this tool store my text?", 
    answer: "No. All analysis happens entirely in your browser. Your text is never sent to our servers, stored, or accessed by anyone. This ensures complete privacy and security for your content." 
  }
];

// --- Lifecycle ---
onMounted(() => {
  const toolSchema = generateToolSchema({
    name: 'Text Readability Analyzer',
    description: 'Analyze text readability, grade level, and writing complexity using Flesch-Kincaid formulas.',
    url: window.location.href
  });
  
  injectStructuredData([toolSchema, generateFAQSchema(faqs)]);
});
</script>

<style scoped>
.readability-tool-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

/* Hero Section */
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

/* Input Section */
.input-section {
  margin-bottom: 32px;
}

.input-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.input-header label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
}

.input-actions {
  display: flex;
  gap: 8px;
}

.text-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 0.875rem;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
}

.text-btn:hover {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.styled-textarea {
  width: 100%;
  min-height: 300px;
  padding: 20px;
  background: var(--bg-input);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 1rem;
  line-height: 1.7;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
}

.styled-textarea:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.styled-textarea::placeholder {
  color: var(--text-tertiary);
}

.input-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.char-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-tertiary);
  font-size: 0.875rem;
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
  transform: none;
}

/* Results Section */
.results-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.score-card {
  padding: 32px;
  background: rgba(16, 185, 129, 0.05);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
  text-align: center;
}

.score-card.score-excellent {
  border-color: rgba(16, 185, 129, 0.4);
  background: rgba(16, 185, 129, 0.1);
}

.score-card.score-good {
  border-color: rgba(20, 184, 166, 0.4);
  background: rgba(20, 184, 166, 0.1);
}

.score-card.score-fair {
  border-color: rgba(245, 158, 11, 0.4);
  background: rgba(245, 158, 11, 0.1);
}

.score-card.score-difficult {
  border-color: rgba(251, 146, 60, 0.4);
  background: rgba(251, 146, 60, 0.1);
}

.score-card.score-very-difficult {
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.1);
}

.score-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-primary);
  font-weight: 700;
}

.score-badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-green {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
}

.badge-teal {
  background: rgba(20, 184, 166, 0.2);
  color: #14b8a6;
}

.badge-yellow {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
}

.badge-orange {
  background: rgba(251, 146, 60, 0.2);
  color: #fb923c;
}

.badge-red {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.score-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.big-score {
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1;
  color: var(--text-primary);
}

.score-scale {
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.score-details {
  text-align: left;
  max-width: 600px;
  margin: 0 auto;
}

.grade-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  font-weight: 600;
  margin: 0 0 8px;
  font-size: 1rem;
}

.score-description {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.6;
}

/* Metrics Grid */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.metric-icon {
  color: #10b981;
  flex-shrink: 0;
}

.metric-content {
  flex: 1;
}

.metric-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.2;
  margin-bottom: 4px;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Additional Metrics */
.additional-metrics {
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
}

.metric-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--glass-border);
}

.metric-row:last-child {
  border-bottom: none;
}

.metric-name {
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.metric-value-small {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.9375rem;
}

/* Suggestions Box */
.suggestions-box {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
}

.suggestions-box h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 20px;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 700;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.suggestion-item {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border-left: 4px solid;
  border-radius: var(--radius-sm);
}

.suggestion-item.warning {
  border-left-color: #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.suggestion-item.good {
  border-left-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
}

.suggestion-item.info {
  border-left-color: #3b82f6;
  background: rgba(59, 130, 246, 0.05);
}

.suggestion-item svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.suggestion-item.warning svg {
  color: #f59e0b;
}

.suggestion-item.good svg {
  color: #10b981;
}

.suggestion-item.info svg {
  color: #3b82f6;
}

.suggestion-item strong {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 4px;
  font-size: 0.9375rem;
}

.suggestion-item p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Empty State */
.empty-state-results {
  padding: 60px 20px;
  text-align: center;
  border: 2px dashed var(--glass-border);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.01);
}

.empty-icon-wrapper {
  color: var(--text-tertiary);
  margin-bottom: 20px;
}

.empty-state-results h3 {
  color: var(--text-primary);
  margin: 0 0 12px;
  font-size: 1.25rem;
  font-weight: 700;
}

.empty-state-results p {
  color: var(--text-secondary);
  margin: 0;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.btn-outline {
  background: transparent;
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
}

.btn-outline:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: #10b981;
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

  .input-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .input-footer {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }

  .input-footer .btn {
    width: 100%;
    justify-content: center;
  }

  .metrics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .metric-card {
    flex-direction: column;
    text-align: center;
  }

  .score-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .score-display {
    flex-direction: column;
    align-items: center;
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
