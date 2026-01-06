<template>
  <div class="tool-page mood-coach-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Mood Coach" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="heart" :size="16" />
          Mental Wellness & Emotional Health
        </p>
        <h1>Professional Mood & Wellness Coach</h1>
        <p class="hero-subtitle">
          A safe, supportive space to track your emotions, understand your patterns, and receive personalized guidance for mental wellbeing. Build emotional awareness and develop healthy coping strategies through daily check-ins and evidence-based wellness practices.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="target" :size="14" />
            Daily Check-in
          </span>
          <span class="badge">
            <Icon name="activity" :size="14" />
            Mood Tracking
          </span>
          <span class="badge">
            <Icon name="trending-up" :size="14" />
            Pattern Insights
          </span>
          <span class="badge">
            <Icon name="check-circle" :size="14" />
            Wellness Guidance
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
          <strong>Mood Coach</strong> helps users track emotional wellbeing, identify mood patterns, and receive personalized wellness guidance. The tool allows daily mood check-ins, tracks emotional patterns over time, provides evidence-based coping strategies (breathing exercises, grounding techniques, gratitude journaling), and offers insights into mood triggers and patterns. 
          Users log their daily mood, energy levels, and activities to build emotional awareness and develop healthy coping mechanisms. The tool provides personalized recommendations based on tracked patterns and helps users understand their emotional wellbeing. All data is stored locally in the browser for complete privacy. Note: This tool is for self-care support and does not replace professional mental health care.
        </p>
      </div>

      <!-- Disclaimer Banner -->
      <div class="disclaimer-banner glass-card" data-aos="fade-up">
        <div class="disclaimer-header">
          <Icon name="alert-circle" :size="24" stroke-width="2" />
          <strong>Wellness Support Notice</strong>
        </div>
        <p>
          This tool is designed for emotional awareness and self-care support. It does not replace professional therapy, diagnosis, or treatment. If you are in crisis or need urgent help, please reach out to local emergency services or a trusted mental health professional immediately.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="heart" :size="20" />
            Mood Coach & Wellness Tracker
          </h2>
          <div class="tool-actions" v-if="results || moodHistory.length > 0">
            <button v-if="moodHistory.length > 0" @click="showHistory = !showHistory" class="icon-btn" :title="showHistory ? 'Hide History' : 'Show History'">
              <Icon name="calendar" :size="18" />
            </button>
            <button v-if="results" @click="downloadSummary" class="icon-btn" title="Download Summary">
              <Icon name="download" :size="18" />
            </button>
            <button v-if="results" @click="resetTool" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>
        
        <div class="mood-coach-content">
          <!-- Progress Tracker -->
          <div v-if="currentStep > 1 && currentStep < 4" class="progress-tracker">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: `${((currentStep - 1) / 2) * 100}%` }"></div>
            </div>
            <div class="progress-steps">
              <span :class="{ active: currentStep >= 1 }">Mood</span>
              <span :class="{ active: currentStep >= 2 }">Details</span>
              <span :class="{ active: currentStep >= 3 }">Context</span>
            </div>
          </div>

          <!-- Step 1: Mood Check-in -->
          <section v-if="currentStep === 1" class="step-section">
          <h2>How are you feeling right now?</h2>
          <p class="step-desc">Select the emotion that best matches your current state. This helps us provide personalized guidance.</p>
          
          <div class="mood-grid">
            <button v-for="mood in moodOptions" :key="mood.id" 
              class="mood-card" 
              :class="{ active: log.mood === mood.id }"
              @click="selectMood(mood.id)">
              <div class="mood-icon-wrapper">
                <Icon :name="mood.icon" :size="32" stroke-width="2" />
              </div>
              <span class="mood-name">{{ mood.label }}</span>
            </button>
          </div>

          <div class="navigation-btns">
            <button v-if="log.mood" @click="nextStep" class="btn btn-primary btn-large">
              Continue
              <Icon name="arrow-right" :size="18" stroke-width="2" />
            </button>
          </div>
        </section>

        <!-- Step 2: Specific Emotions & Intensity -->
        <section v-if="currentStep === 2" class="step-section">
          <h2>Let's go a bit deeper</h2>
          <p class="step-desc">Understanding the nuances of your emotions helps provide more targeted support.</p>
          
          <div class="input-group">
            <label>What specific emotions are present? (Select all that apply)</label>
            <div class="tags-grid">
              <button v-for="emotion in getEmotionsForMood(log.mood)" :key="emotion"
                class="tag-btn"
                :class="{ active: log.emotions.includes(emotion) }"
                @click="toggleEmotion(emotion)">
                {{ emotion }}
              </button>
            </div>
          </div>

          <div class="input-group">
            <label>How intense is this feeling? (1-10)</label>
            <div class="intensity-slider-container">
              <input type="range" v-model.number="log.intensity" min="1" max="10" class="intensity-slider">
              <div class="intensity-labels">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Intense</span>
              </div>
              <div class="current-intensity">{{ log.intensity }}</div>
            </div>
          </div>

          <div class="navigation-btns">
            <button @click="prevStep" class="btn btn-outline">
              <Icon name="arrow-left" :size="18" stroke-width="2" />
              Back
            </button>
            <button @click="nextStep" class="btn btn-primary">
              Continue
              <Icon name="arrow-right" :size="18" stroke-width="2" />
            </button>
          </div>
        </section>

        <!-- Step 3: Context & Lifestyle -->
        <section v-if="currentStep === 3" class="step-section">
          <h2>What's influencing you today?</h2>
          <p class="step-desc">Understanding context helps identify patterns and triggers over time.</p>
          
          <div class="input-group">
            <label>Lifestyle Factors (Select all that apply)</label>
            <div class="lifestyle-grid">
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.sleep">
                <Icon name="moon" :size="20" stroke-width="2" />
                <span>Poor Sleep</span>
              </label>
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.work">
                <Icon name="briefcase" :size="20" stroke-width="2" />
                <span>Work Pressure</span>
              </label>
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.social">
                <Icon name="users" :size="20" stroke-width="2" />
                <span>Social Interaction</span>
              </label>
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.health">
                <Icon name="thermometer" :size="20" stroke-width="2" />
                <span>Physical Health</span>
              </label>
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.weather">
                <Icon name="sun" :size="20" stroke-width="2" />
                <span>Weather</span>
              </label>
              <label class="lifestyle-item">
                <input type="checkbox" v-model="log.factors.news">
                <Icon name="globe" :size="20" stroke-width="2" />
                <span>News/Events</span>
              </label>
            </div>
          </div>

          <div class="input-group">
            <label>Where are you located? (For localized tips)</label>
            <select v-model="log.region" class="select-input">
              <option value="">Select Region</option>
              <optgroup label="Global Regions">
                <option value="Global">Global / Other</option>
                <option value="SouthAsia">South Asia (Pakistan, India, etc.)</option>
                <option value="GCC">Middle East / GCC</option>
                <option value="Europe">Europe</option>
                <option value="NorthAmerica">North America</option>
              </optgroup>
            </select>
          </div>

          <div class="input-group">
            <label>Brief Reflection (Optional)</label>
            <textarea v-model="log.note" placeholder="What's on your mind? Writing it down can help process emotions..." rows="4" class="textarea-input"></textarea>
          </div>

          <div class="navigation-btns">
            <button @click="prevStep" class="btn btn-outline">
              <Icon name="arrow-left" :size="18" stroke-width="2" />
              Back
            </button>
            <button @click="generateGuidance" class="btn btn-primary">
              Get Guidance
              <Icon name="check-circle" :size="18" stroke-width="2" />
            </button>
          </div>
        </section>

        <!-- Step 4: Personalized Guidance (Results) -->
        <section v-if="currentStep === 4 && result" class="results-section">
          <div class="results-header">
            <h2>Your Wellness Guidance</h2>
            <div class="result-actions">
              <button @click="saveMoodLog" class="btn btn-secondary">
                <Icon name="download" :size="18" stroke-width="2" />
                Save Entry
              </button>
              <button @click="resetTool" class="btn btn-text">
                <Icon name="refresh-cw" :size="18" stroke-width="2" />
                New Check-in
              </button>
            </div>
          </div>

          <!-- Crisis Resource (Conditional) -->
          <div v-if="showCrisisSupport" class="crisis-card">
            <div class="crisis-header">
              <Icon name="alert-circle" :size="28" stroke-width="2" />
              <h3>You are not alone</h3>
            </div>
            <p>It sounds like you're going through a very difficult time. While this tool offers self-care tips, sometimes we need human support.</p>
            <ul class="crisis-list">
              <li>Reach out to a trusted friend or family member</li>
              <li>Contact a local helpline or mental health professional</li>
              <li>Focus on getting through just the next hour safely</li>
              <li>If you're having thoughts of self-harm, call emergency services immediately</li>
            </ul>
          </div>

          <!-- Core Insight -->
          <div class="insight-card glass-card">
            <div class="insight-header">
              <Icon name="info" :size="24" stroke-width="2" />
              <h3>Insight for Today</h3>
            </div>
            <p>{{ result.insight }}</p>
          </div>

          <!-- Actionable Tips -->
          <div class="tips-card glass-card">
            <div class="tips-header">
              <Icon name="star" :size="24" stroke-width="2" />
              <h3>Suggested Actions</h3>
            </div>
            <div class="tips-list">
              <div v-for="(tip, idx) in result.tips" :key="idx" class="tip-item">
                <div class="tip-icon-wrapper">
                  <Icon :name="tip.icon" :size="24" stroke-width="2" />
                </div>
                <div class="tip-content">
                  <h4>{{ tip.title }}</h4>
                  <p>{{ tip.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Relief Exercises -->
          <div class="exercises-section">
            <h3 class="exercises-title">Quick Relief Exercises</h3>
            <div class="exercises-grid">
              <div class="exercise-card glass-card">
                <div class="exercise-header">
                  <Icon name="activity" :size="24" stroke-width="2" />
                  <h4>Breathing Exercise</h4>
                </div>
                <p>Box Breathing: Inhale 4s, Hold 4s, Exhale 4s, Hold 4s. Repeat 4-8 cycles.</p>
                <button @click="startBreathing" class="btn btn-secondary btn-small">
                  <Icon name="activity" :size="16" stroke-width="2" />
                  Start Guide
                </button>
              </div>
              <div class="exercise-card glass-card">
                <div class="exercise-header">
                  <Icon name="target" :size="24" stroke-width="2" />
                  <h4>Grounding Technique</h4>
                </div>
                <p>5-4-3-2-1 Technique: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.</p>
                <button @click="showGroundingGuide" class="btn btn-secondary btn-small">
                  <Icon name="info" :size="16" stroke-width="2" />
                  Learn More
                </button>
              </div>
              <div class="exercise-card glass-card">
                <div class="exercise-header">
                  <Icon name="edit" :size="24" stroke-width="2" />
                  <h4>Gratitude Journaling</h4>
                </div>
                <p>Write down 3 things that went well today, no matter how small. This shifts focus to positive experiences.</p>
                <button @click="showJournalingPrompt" class="btn btn-secondary btn-small">
                  <Icon name="edit" :size="16" stroke-width="2" />
                  Get Prompt
                </button>
              </div>
            </div>
          </div>

          <!-- Breathing Exercise Modal -->
          <div v-if="breathingActive" class="breathing-modal" @click.self="stopBreathing">
            <div class="breathing-content glass-card">
              <button @click="stopBreathing" class="close-btn">
                <Icon name="x" :size="24" stroke-width="2" />
              </button>
              <h3>Box Breathing Exercise</h3>
              <div class="breathing-circle" :class="breathingPhase">
                <div class="circle-inner">
                  <span class="breathing-text">{{ breathingText }}</span>
                  <span class="breathing-count">{{ breathingCount }}</span>
                </div>
              </div>
              <p class="breathing-instruction">{{ breathingInstruction }}</p>
              <div class="breathing-controls">
                <button @click="stopBreathing" class="btn btn-outline">Stop</button>
              </div>
            </div>
          </div>
        </section>

        <!-- Mood History & Insights -->
        <div v-if="moodHistory.length > 0 && currentStep === 1 && showHistory" class="history-section">
          <div class="history-header">
            <h2>Your Mood History</h2>
            <button @click="showHistory = !showHistory" class="btn btn-text">
              <Icon :name="showHistory ? 'chevron-down' : 'chevron-down'" :size="18" stroke-width="2" />
              {{ showHistory ? 'Hide' : 'Show' }} History
            </button>
          </div>
          
          <div class="history-content">
            <!-- Mood Pattern Chart -->
            <div class="pattern-card glass-card">
              <h3>Mood Patterns (Last 7 Days)</h3>
              <div class="pattern-chart">
                <div v-for="(entry, idx) in recentHistory" :key="idx" class="chart-bar">
                  <div class="bar-fill" :style="{ height: `${(entry.intensity / 10) * 100}%`, backgroundColor: getMoodColor(entry.mood) }"></div>
                  <span class="bar-label">{{ formatDateShort(entry.date) }}</span>
                </div>
              </div>
            </div>

            <!-- Insights -->
            <div class="insights-grid">
              <div class="insight-stat glass-card">
                <Icon name="calendar" :size="24" stroke-width="2" />
                <div class="stat-content">
                  <h4>Check-ins</h4>
                  <p class="stat-value">{{ moodHistory.length }}</p>
                </div>
              </div>
              <div class="insight-stat glass-card">
                <Icon name="trending-up" :size="24" stroke-width="2" />
                <div class="stat-content">
                  <h4>Average Intensity</h4>
                  <p class="stat-value">{{ averageIntensity.toFixed(1) }}/10</p>
                </div>
              </div>
              <div class="insight-stat glass-card">
                <Icon name="activity" :size="24" stroke-width="2" />
                <div class="stat-content">
                  <h4>Most Common Mood</h4>
                  <p class="stat-value">{{ mostCommonMood }}</p>
                </div>
              </div>
            </div>

            <!-- Recent Entries -->
            <div class="recent-entries glass-card">
              <h3>Recent Entries</h3>
              <div class="entries-list">
                <div v-for="(entry, idx) in recentHistory.slice(0, 5)" :key="idx" class="entry-item">
                  <div class="entry-date">{{ formatDate(entry.date) }}</div>
                  <div class="entry-mood">{{ getMoodLabel(entry.mood) }}</div>
                  <div class="entry-intensity">Intensity: {{ entry.intensity }}/10</div>
                  <button @click="deleteEntry(entry.id)" class="delete-btn">
                    <Icon name="x" :size="16" stroke-width="2" />
                  </button>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        <!-- How It Works -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            How This Mood Coach Works
          </h2>
          <p>
            Our Mood Coach uses a simple, evidence-based approach to help you build emotional awareness and develop healthy coping strategies. Here's how it works:
          </p>
          
          <h3>Step-by-Step Process</h3>
          <ul class="feature-list">
            <li><strong>Daily Check-in:</strong> Start by selecting your current mood from a range of emotional states. This takes just a few seconds and helps you tune into how you're feeling right now.</li>
            <li><strong>Emotional Details:</strong> Dive deeper by identifying specific emotions and rating their intensity. This helps you develop emotional vocabulary and recognize patterns over time.</li>
            <li><strong>Context & Factors:</strong> Note lifestyle factors and context that may be influencing your mood. Understanding triggers helps you make proactive changes to support your wellbeing.</li>
            <li><strong>Personalized Guidance:</strong> Receive tailored insights, actionable tips, and evidence-based exercises designed to support your specific emotional state and needs.</li>
            <li><strong>Track Progress:</strong> Review your mood history to identify patterns, trends, and improvements. This long-term view helps you understand your emotional landscape better.</li>
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
              <Icon name="briefcase" :size="24" />
              <h4>Daily Stress Management</h4>
              <p>If you experience regular stress from work, relationships, or life responsibilities, daily mood tracking helps you identify patterns and develop healthier responses.</p>
            </div>
            <div class="use-case-item">
              <Icon name="heart" :size="24" />
              <h4>Emotional Awareness Building</h4>
              <p>For those who struggle to identify or express emotions, this tool provides a structured way to practice emotional vocabulary and recognition.</p>
            </div>
            <div class="use-case-item">
              <Icon name="alert-circle" :size="24" />
              <h4>Anxiety & Worry Management</h4>
              <p>If you experience anxiety or excessive worry, tracking helps you notice triggers and patterns. The breathing exercises and grounding techniques provide immediate tools.</p>
            </div>
            <div class="use-case-item">
              <Icon name="trending-up" :size="24" />
              <h4>Mood Disorder Support</h4>
              <p>For individuals managing depression, bipolar disorder, or other mood conditions, tracking provides valuable data to share with healthcare providers.</p>
            </div>
          </div>
        </article>


        <!-- Educational Content -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Understanding Your Emotional Wellbeing
          </h2>
          <p>
            Emotional wellness isn't about being happy all the time. It's about being aware of your feelings, accepting them without judgment, and having the tools to navigate life's ups and downs with resilience. Regular mood tracking is one of the most effective ways to build this capacity.
          </p>
          
          <h3>The Science of Mood Tracking</h3>
          <p>
            Research in psychology and neuroscience shows that emotional awareness—the ability to recognize and name your feelings—is strongly linked to mental health and wellbeing. Studies have found that people who regularly track their moods:
          </p>
          <ul class="content-list">
            <li>Experience reduced symptoms of anxiety and depression</li>
            <li>Develop better emotional regulation skills</li>
            <li>Show improved relationships and communication</li>
            <li>Have greater self-compassion and acceptance</li>
            <li>Make more informed decisions about their mental health needs</li>
          </ul>

          <h3>Why Patterns Matter</h3>
          <p>
            Our emotions aren't random—they follow patterns influenced by sleep, stress, hormones, seasons, relationships, and countless other factors. When you track your mood over time, you begin to see these patterns emerge. Perhaps you notice that your mood dips every Sunday evening (Sunday scaries), or that you feel more anxious during certain times of the month, or that poor sleep consistently leads to lower mood the next day.
          </p>
          <p>
            Recognizing these patterns is powerful because it allows you to:
          </p>
          <ul class="content-list">
            <li>Anticipate difficult periods and prepare coping strategies</li>
            <li>Identify triggers and make lifestyle adjustments</li>
            <li>Recognize early warning signs of mental health concerns</li>
            <li>Celebrate positive patterns and reinforce what works</li>
            <li>Communicate more effectively with healthcare providers</li>
          </ul>

          <h3>Emotional Regulation Techniques</h3>
          <p>
            This Mood Coach includes several evidence-based techniques for managing difficult emotions:
          </p>
          
          <div class="technique-cards">
            <div class="technique-card glass-card">
              <h4>Box Breathing (4-4-4-4)</h4>
              <p>This breathing technique activates the parasympathetic nervous system, which helps calm the body's stress response. It's particularly effective for anxiety, panic, and overwhelming emotions. The structured pattern gives your mind something to focus on while your body relaxes.</p>
            </div>
            <div class="technique-card glass-card">
              <h4>5-4-3-2-1 Grounding</h4>
              <p>Grounding techniques help you reconnect with the present moment when you're feeling overwhelmed, dissociated, or stuck in anxious thoughts. By engaging your senses, you shift attention away from distressing thoughts and back to your immediate environment.</p>
            </div>
            <div class="technique-card glass-card">
              <h4>Gratitude Journaling</h4>
              <p>Research shows that regularly practicing gratitude can improve mood, reduce stress, and increase overall life satisfaction. Even on difficult days, finding small things to appreciate helps shift perspective and build resilience.</p>
            </div>
          </div>

          <h3>When to Seek Professional Help</h3>
          <p>
            While mood tracking and self-care tools are valuable, they're not a substitute for professional mental health care. Consider seeking help from a therapist, counselor, or psychiatrist if you experience:
          </p>
          <ul class="content-list warning-list">
            <li>Persistent low mood lasting more than two weeks</li>
            <li>Thoughts of self-harm or suicide</li>
            <li>Inability to function in daily life (work, relationships, self-care)</li>
            <li>Severe anxiety that interferes with daily activities</li>
            <li>Substance use to cope with emotions</li>
            <li>Significant changes in sleep, appetite, or energy levels</li>
            <li>Feeling overwhelmed and unable to cope</li>
          </ul>
          <p>
            Remember: seeking help is a sign of strength, not weakness. Mental health professionals are trained to provide support, tools, and treatment that goes beyond what self-help tools can offer.
          </p>
        </article>

        <!-- FAQs -->
        <div class="faq-container">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions
          </h2>
          <div class="faq-list">
                <div class="faq-item glass-card">
              <h4>Is my mood data private and secure?</h4>
          <p>Yes, absolutely. All data entered into this tool stays on your device (in your browser's local storage). We do not collect, store, transmit, or see any of your personal emotional entries. Your privacy is paramount, and you can clear your data at any time by clearing your browser's local storage.</p>
        </div>

            <div class="faq-item glass-card">
              <h4>How often should I check in with my mood?</h4>
          <p>There's no strict rule, but many people find value in checking in once per day, perhaps in the evening to reflect on the day, or whenever they feel a strong shift in emotion. Some users prefer morning check-ins to set intentions, while others use it multiple times per day during difficult periods. Consistency helps reveal patterns, but don't let perfect be the enemy of good—even occasional tracking provides insights.</p>
        </div>

            <div class="faq-item glass-card">
              <h4>Can this Mood Coach replace therapy or professional mental health treatment?</h4>
          <p>No. This Mood Coach is a self-help tool designed for emotional awareness, stress management, and general mental wellness support. It is not a substitute for professional therapy, psychiatric care, or medical treatment. If you are struggling significantly with your mental health, experiencing a crisis, or have symptoms of a mental health condition, please seek support from qualified mental health professionals.</p>
        </div>

            <div class="faq-item glass-card">
              <h4>What if I notice a pattern of consistently low mood?</h4>
          <p>If you notice a pattern of low mood lasting more than two weeks, or if it significantly impacts your daily life (sleep, appetite, work, relationships), it's a strong sign to consult a healthcare professional. Depression and other mood disorders are treatable conditions, and early intervention often leads to better outcomes. You don't have to carry it alone—reach out to a therapist, counselor, or your primary care physician.</p>
        </div>

            <div class="faq-item glass-card">
              <h4>How accurate are the mood insights and suggestions?</h4>
          <p>The insights and suggestions are based on general principles of emotional wellness, stress management, and evidence-based techniques. However, everyone is unique, and what works for one person may not work for another. Use the suggestions as starting points and adapt them to your needs. If certain techniques don't resonate, that's okay—explore what does work for you.</p>
        </div>

            <div class="faq-item glass-card">
              <h4>Can I use this tool if I'm already in therapy?</h4>
              <p>Absolutely. Many therapists actually encourage clients to track their moods between sessions. The data you collect can be valuable to share with your therapist, helping them understand your patterns and adjust treatment accordingly. Just be sure to discuss any self-help tools you're using with your therapist so they can provide guidance.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>What should I do if I'm having thoughts of self-harm or suicide?</h4>
              <p>If you're having thoughts of self-harm or suicide, please seek immediate help. This tool is not appropriate for crisis situations. Contact your local emergency services, a crisis hotline, or go to your nearest emergency room. You can also reach out to trusted friends, family members, or mental health professionals. Your life has value, and help is available.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How long does it take to see benefits from mood tracking?</h4>
              <p>Some benefits are immediate—simply taking a moment to check in with yourself can create a sense of awareness and calm. Pattern recognition typically emerges after 1-2 weeks of consistent tracking, while deeper insights about triggers and effective coping strategies may take a month or more. Remember, this is a practice, not a quick fix. Be patient and kind with yourself.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Can I export or download my mood history?</h4>
              <p>Yes, you can download individual check-in summaries. Your mood history is stored locally in your browser, so you can access it anytime. However, for privacy and security reasons, we don't provide cloud backup or syncing. If you clear your browser data, your history will be lost, so consider downloading important entries if you want to keep them long-term.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Is this tool suitable for children or teenagers?</h4>
              <p>While the concepts are appropriate for older children and teenagers, this tool is designed for adults. If you're a parent or guardian, consider discussing mood tracking with your child's healthcare provider or therapist first. For younger users, parental guidance and professional support are especially important when dealing with emotional challenges.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/mood-coach" category="Health" />

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
import { storage } from '@/utils/storage';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/mood-coach`;

useSEO({
  title: 'Free Mood Coach 2025 | Daily Mood Tracker & Mental Wellness Guide | Emotional Health Support',
  description: 'Track emotional wellbeing, identify mood patterns, and receive personalized wellness guidance. Professional mood tracking tool with evidence-based coping strategies, breathing exercises, and emotional awareness building. Privacy-focused, client-side processing. Note: For self-care support, not a substitute for professional mental health care.',
  keywords: 'mood tracker, mental wellness, stress relief, anxiety help, daily check-in, emotional health, mood diary, self care tool, emotional awareness, mood patterns, mood journal, emotional wellness, mental health tracker, wellbeing coach, stress management',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const currentStep = ref(1);
const log = ref({
  mood: '',
  emotions: [],
  intensity: 5,
  factors: {
    sleep: false,
    work: false,
    social: false,
    health: false,
    weather: false,
    news: false
  },
  region: '',
  note: ''
});
const result = ref(null);
const moodHistory = ref([]);
const showHistory = ref(false);
const breathingActive = ref(false);
const breathingPhase = ref('inhale');
const breathingCount = ref(4);
const breathingText = ref('Inhale');
const breathingInstruction = ref('Breathe in slowly through your nose');
let breathingInterval = null;

// Constants
const moodOptions = [
  { id: 'happy', icon: 'smile', label: 'Happy / Content' },
  { id: 'calm', icon: 'moon', label: 'Calm / Peaceful' },
  { id: 'neutral', icon: 'target', label: 'Neutral / Okay' },
  { id: 'anxious', icon: 'alert-circle', label: 'Anxious / Worried' },
  { id: 'sad', icon: 'heart', label: 'Sad / Low' },
  { id: 'angry', icon: 'zap', label: 'Angry / Frustrated' },
  { id: 'tired', icon: 'moon', label: 'Tired / Burnout' }
];

const emotionMap = {
  happy: ['Joyful', 'Excited', 'Grateful', 'Proud', 'Hopeful'],
  calm: ['Relaxed', 'Relieved', 'Safe', 'Mindful', 'Balanced'],
  neutral: ['Bored', 'Indifferent', 'Distracted', 'Numb'],
  anxious: ['Nervous', 'Overwhelmed', 'Restless', 'Fearful', 'Panic'],
  sad: ['Lonely', 'Disappointed', 'Grieving', 'Hurt', 'Hopeless'],
  angry: ['Annoyed', 'Resentful', 'Jealous', 'Irritated', 'Furious'],
  tired: ['Exhausted', 'Sleepy', 'Drained', 'Foggy', 'Unmotivated']
};

// Computed
const showCrisisSupport = computed(() => {
  return (['sad', 'anxious', 'tired'].includes(log.value.mood) && log.value.intensity > 8) || 
         log.value.emotions.includes('Hopeless') || 
         log.value.emotions.includes('Panic');
});

const recentHistory = computed(() => {
  return moodHistory.value.slice(-7).reverse();
});

const averageIntensity = computed(() => {
  if (moodHistory.value.length === 0) return 0;
  const sum = moodHistory.value.reduce((acc, entry) => acc + entry.intensity, 0);
  return sum / moodHistory.value.length;
});

const mostCommonMood = computed(() => {
  if (moodHistory.value.length === 0) return 'N/A';
  const counts = {};
  moodHistory.value.forEach(entry => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
  });
  const max = Math.max(...Object.values(counts));
  const mood = Object.keys(counts).find(key => counts[key] === max);
  return getMoodLabel(mood);
});

// Methods
function selectMood(moodId) {
  log.value.mood = moodId;
  log.value.emotions = [];
}

function getEmotionsForMood(moodId) {
  return emotionMap[moodId] || [];
}

function toggleEmotion(emotion) {
  const index = log.value.emotions.indexOf(emotion);
  if (index === -1) {
    if (log.value.emotions.length < 5) log.value.emotions.push(emotion);
  } else {
    log.value.emotions.splice(index, 1);
  }
}

function nextStep() {
  currentStep.value++;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevStep() {
  currentStep.value--;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateGuidance() {
  const intensityLevel = log.value.intensity > 7 ? 'High' : (log.value.intensity > 4 ? 'Moderate' : 'Low');
  let insight = '';
  let tips = [];
  
  // Logic based on Mood
  if (log.value.mood === 'happy') {
    insight = "It's wonderful that you're feeling good today. Moments like these build our emotional resilience. Savoring this feeling can help carry you through harder days. Consider what contributed to this positive state—recognizing these factors helps you recreate them in the future.";
    tips.push({ icon: 'edit', title: 'Gratitude Journaling', desc: 'Write down 3 specific things that contributed to your happiness today. This practice reinforces positive patterns.' });
    tips.push({ icon: 'users', title: 'Share the Joy', desc: 'Positive emotions are contagious. Connect with a friend or do a small act of kindness to amplify the feeling.' });
  } else if (log.value.mood === 'anxious') {
    insight = "Anxiety often comes from worrying about the future or feeling overwhelmed by uncertainty. Remember that feelings are temporary waves, not a permanent state. You are safe right now, in this moment. The physical sensations of anxiety—racing heart, tense muscles—are your body's natural response, and they will pass.";
    tips.push({ icon: 'activity', title: 'Box Breathing', desc: 'Reset your nervous system with 2-3 minutes of box breathing (inhale 4s, hold 4s, exhale 4s, hold 4s). This activates your body\'s relaxation response.' });
    tips.push({ icon: 'target', title: 'Grounding Technique', desc: 'Use the 5-4-3-2-1 method: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. This brings you back to the present.' });
  } else if (log.value.mood === 'sad') {
    insight = "It takes courage to sit with sadness. Be gentle with yourself today. You don't need to 'fix' this feeling immediately—just allow it to exist without judgment. Sadness is a valid emotion that often signals a need for comfort, rest, or processing. Give yourself permission to feel what you feel.";
    tips.push({ icon: 'heart', title: 'Self-Compassion', desc: 'Treat yourself with the same kindness you would offer a struggling friend. Speak to yourself gently and acknowledge that difficult feelings are part of being human.' });
    tips.push({ icon: 'activity', title: 'Light Movement', desc: 'A short gentle walk, even just 10 minutes, can help process emotions without forcing them away. Movement releases endorphins naturally.' });
  } else if (log.value.mood === 'angry') {
    insight = "Anger is often a protective emotion telling us a boundary has been crossed or a need isn't being met. It's valid energy that needs a healthy outlet. Suppressing anger often makes it worse, but expressing it destructively causes harm. The goal is to acknowledge the feeling and channel it constructively.";
    tips.push({ icon: 'activity', title: 'Active Release', desc: 'Channel the energy into a brisk walk, workout, or cleaning to physically release tension. Physical activity helps process the adrenaline surge.' });
    tips.push({ icon: 'clock', title: 'The 90-Second Rule', desc: 'Wait 90 seconds before reacting to a trigger. The chemical surge of anger often passes in that time, allowing for more thoughtful responses.' });
  } else if (log.value.mood === 'tired') {
    insight = "Your body is signaling a need for restoration. Productivity involves rest, not just activity. Pushing through burnout often prolongs it. Chronic fatigue can be a sign that you're running on empty and need to prioritize recovery. Rest is not laziness—it's essential maintenance.";
    tips.push({ icon: 'smartphone', title: 'Digital Detox', desc: 'Take a break from screens for at least an hour to let your mind decompress. Blue light and constant stimulation contribute to mental fatigue.' });
    tips.push({ icon: 'moon', title: 'Restorative Rest', desc: 'Even if you can\'t sleep, laying down with eyes closed for 15-20 minutes resets the brain. This is called "non-sleep deep rest" and is highly restorative.' });
  } else {
    insight = "Not every day has to be high or low. Neutral days are the stable ground on which we build our lives. Acceptance of neutral states is key—you don't need to force yourself to feel differently. These calm periods are valuable for processing and integration.";
    tips.push({ icon: 'target', title: 'Mindfulness Practice', desc: 'Practice simply noticing the present moment without trying to change it. This builds acceptance and reduces the pressure to always feel "good."' });
  }

  // Logic based on Lifestyle
  if (log.value.factors.sleep) {
    tips.push({ icon: 'moon', title: 'Sleep Hygiene', desc: 'Your mood is likely heavily influenced by fatigue today. Prioritize an early bedtime tonight, avoid screens before bed, and create a calming pre-sleep routine.' });
  }
  if (log.value.factors.social) {
    tips.push({ icon: 'users', title: 'Connection Check', desc: 'Social interactions can drain or recharge us. Check if you need solitude or connection right now. Both are valid needs.' });
  }

  // Regional Nuance
  if (log.value.region === 'SouthAsia' || log.value.region === 'GCC') {
    if (log.value.mood === 'anxious' || log.value.mood === 'tired') {
       tips.push({ icon: 'coffee', title: 'Mindful Ritual', desc: 'Take a mindful break with a warm drink. The ritual itself can be soothing, and the warmth has a calming effect on the nervous system.' });
    }
  }
  if (log.value.region === 'Europe') {
     if (log.value.factors.weather) {
       tips.push({ icon: 'sun', title: 'Light Exposure', desc: 'If the weather is grey, try to get outside during the brightest part of the day. Natural light helps regulate mood and circadian rhythms.' });
     }
  }

  // Limit tips to 4
  result.value = {
    insight,
    tips: tips.slice(0, 4)
  };
  
  nextStep();
}

function startBreathing() {
  breathingActive.value = true;
  breathingPhase.value = 'inhale';
  breathingCount.value = 4;
  breathingText.value = 'Inhale';
  breathingInstruction.value = 'Breathe in slowly through your nose';
  
  breathingInterval = setInterval(() => {
    if (breathingCount.value > 1) {
      breathingCount.value--;
    } else {
      // Move to next phase
      if (breathingPhase.value === 'inhale') {
        breathingPhase.value = 'hold-in';
        breathingCount.value = 4;
        breathingText.value = 'Hold';
        breathingInstruction.value = 'Hold your breath';
      } else if (breathingPhase.value === 'hold-in') {
        breathingPhase.value = 'exhale';
        breathingCount.value = 4;
        breathingText.value = 'Exhale';
        breathingInstruction.value = 'Breathe out slowly through your mouth';
      } else if (breathingPhase.value === 'exhale') {
        breathingPhase.value = 'hold-out';
        breathingCount.value = 4;
        breathingText.value = 'Hold';
        breathingInstruction.value = 'Hold your breath';
      } else {
        // Back to inhale
        breathingPhase.value = 'inhale';
        breathingCount.value = 4;
        breathingText.value = 'Inhale';
        breathingInstruction.value = 'Breathe in slowly through your nose';
      }
    }
  }, 1000);
}

function stopBreathing() {
  breathingActive.value = false;
  if (breathingInterval) {
    clearInterval(breathingInterval);
    breathingInterval = null;
  }
}

function showGroundingGuide() {
  alert('5-4-3-2-1 Grounding Technique:\n\nLook around and name:\n• 5 things you can see\n• 4 things you can touch\n• 3 things you can hear\n• 2 things you can smell\n• 1 thing you can taste\n\nThis brings your attention to the present moment.');
}

function showJournalingPrompt() {
  alert('Gratitude Journaling Prompt:\n\nWrite down 3 things that went well today, no matter how small:\n1. _________________________\n2. _________________________\n3. _________________________\n\nReflect on why these things happened and how they made you feel.');
}

function saveMoodLog() {
  const entry = {
    id: Date.now(),
    date: new Date().toISOString(),
    mood: log.value.mood,
    emotions: [...log.value.emotions],
    intensity: log.value.intensity,
    factors: { ...log.value.factors },
    region: log.value.region,
    note: log.value.note
  };
  
  moodHistory.value.push(entry);
  storage.set('moodHistory', moodHistory.value);
  
  alert('Mood entry saved successfully!');
}

function deleteEntry(id) {
  moodHistory.value = moodHistory.value.filter(entry => entry.id !== id);
  storage.set('moodHistory', moodHistory.value);
}

function resetTool() {
  currentStep.value = 1;
  log.value = {
    mood: '',
    emotions: [],
    intensity: 5,
    factors: { sleep: false, work: false, social: false, health: false, weather: false, news: false },
    region: '',
    note: ''
  };
  result.value = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateShort(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getMoodLabel(moodId) {
  const mood = moodOptions.find(m => m.id === moodId);
  return mood ? mood.label : moodId;
}

function getMoodColor(moodId) {
  const colors = {
    happy: '#10B981',
    calm: '#3B82F6',
    neutral: '#6B7280',
    anxious: '#F59E0B',
    sad: '#8B5CF6',
    angry: '#EF4444',
    tired: '#6366F1'
  };
  return colors[moodId] || '#6B7280';
}

onMounted(() => {
  // Load mood history from storage
  const saved = storage.get('moodHistory', []);
  moodHistory.value = saved;
  
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Mood Coach & Wellness Tracker',
    description: 'Track emotional wellbeing, identify mood patterns, and receive personalized wellness guidance with evidence-based coping strategies. Privacy-focused, client-side processing.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      'Daily mood tracking',
      'Mood pattern analysis',
      'Emotional awareness building',
      'Coping strategies (breathing, grounding)',
      'Gratitude journaling',
      'Wellness recommendations',
      'Local data storage'
    ],
    usageInfo: 'Log daily mood, energy levels, and activities. Track patterns over time and receive personalized wellness guidance.',
    helpText: 'Mood Coach helps users build emotional awareness and develop healthy coping mechanisms through daily tracking and evidence-based techniques.'
  });
  
  const faqSchema = generateFAQSchema([
    { question: 'Is my mood data private?', answer: 'Yes, completely. All data stays in your browser and is never transmitted to servers.' },
    { question: 'Can this replace therapy?', answer: 'No, this is a self-help tool for emotional awareness, not a substitute for professional mental health treatment.' },
    { question: 'How often should I check in?', answer: 'Many people find value in daily check-ins, but consistency is more important than frequency. Even occasional tracking provides insights.' },
    { question: 'What if I notice consistently low mood?', answer: 'If low mood lasts more than two weeks or impacts daily life, consult a healthcare professional. Early intervention leads to better outcomes.' }
  ]);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Mood Coach', path: '/tools/mood-coach' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Mood Coach 2025 | Daily Mood Tracker & Mental Wellness Guide',
    description: 'Professional mood tracking tool with personalized wellness guidance. Track emotions, identify patterns, and get evidence-based stress relief techniques.',
    about: [
      { '@type': 'Thing', name: 'Mood tracking' },
      { '@type': 'Thing', name: 'Mental wellness' },
      { '@type': 'Thing', name: 'Emotional health' }
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

.mood-coach-page {
  padding: clamp(80px, 12vh, 120px) 0 clamp(60px, 8vh, 80px);
  min-height: 100vh;
  background: var(--bg-app);
}

.container-lg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
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

/* Disclaimer Banner */
.disclaimer-banner {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg);
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3B82F6;
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-xl);
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: #3B82F6;
  font-size: var(--font-size-lg);
  font-weight: 600;
}

.disclaimer-banner p {
  font-size: var(--font-size-base);
  line-height: 1.7;
  margin: 0;
  color: var(--text-secondary);
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

.mood-coach-content {
  padding: 32px;
}

/* Progress Tracker */
.progress-tracker {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--glass-border);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--glass-border);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--spacing-md);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-accent-gold), var(--color-accent-purple));
  transition: width 0.3s ease;
  border-radius: var(--radius-full);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.progress-steps span {
  transition: color 0.3s;
}

.progress-steps span.active {
  color: var(--primary);
  font-weight: 600;
}

.progress-steps span {
  color: var(--text-tertiary);
}

/* Step Section */
.step-section {
  animation: fadeIn 0.5s ease;
}

.step-section h2 {
  color: var(--text-primary);
  text-align: center;
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-2xl);
}

.step-desc {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

/* Mood Grid */
.mood-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.mood-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg);
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  min-height: 140px;
  min-width: 120px;
}

.mood-card:hover {
  border-color: var(--color-accent-gold);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(255, 215, 0, 0.15);
}

.mood-card.active {
  background: rgba(255, 215, 0, 0.15);
  border-color: var(--color-accent-gold);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
}

.mood-icon-wrapper {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-sm);
  color: var(--color-accent-gold);
}

.mood-name {
  font-weight: 600;
  color: var(--text-primary);
  font-size: var(--font-size-base);
  text-align: center;
}

/* Input Groups */
.input-group {
  margin-bottom: var(--spacing-xl);
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
}

.select-input,
.textarea-input {
  width: 100%;
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  font-family: inherit;
  transition: border-color 0.3s;
}

.select-input:focus,
.textarea-input:focus {
  outline: none;
  border-color: var(--color-accent-gold);
}

.textarea-input {
  resize: vertical;
  min-height: 100px;
}

/* Tags Grid */
.tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tag-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  font-size: var(--font-size-base);
  min-height: 44px;
}

.tag-btn:hover {
  border-color: var(--color-accent-gold);
}

.tag-btn.active {
  background: var(--color-accent-gold);
  color: var(--color-bg-primary);
  border-color: var(--color-accent-gold);
  font-weight: 600;
}

/* Intensity Slider */
.intensity-slider-container {
  width: 100%;
  padding: 0 var(--spacing-xs);
}

.intensity-slider {
  width: 100%;
  height: 8px;
  background: var(--glass-border);
  border-radius: var(--radius-full);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  cursor: pointer;
}

.intensity-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-accent-gold);
  cursor: pointer;
  transition: transform 0.2s;
}

.intensity-slider::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}

.intensity-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--color-accent-gold);
  cursor: pointer;
  border: none;
}

.intensity-labels {
  display: flex;
  justify-content: space-between;
  margin-top: var(--spacing-sm);
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
}

.current-intensity {
  text-align: center;
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--primary);
  margin-top: var(--spacing-sm);
}

/* Lifestyle Grid */
.lifestyle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-sm);
}

.lifestyle-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color 0.2s;
  min-height: 48px;
}

.lifestyle-item:hover {
  border-color: var(--color-accent-gold);
}

.lifestyle-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.lifestyle-item span {
  font-size: var(--font-size-base);
  color: var(--text-primary);
}

/* Navigation Buttons */
.navigation-btns {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
}

.btn-large {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: var(--font-size-lg);
  min-width: 200px;
  min-height: 48px;
}

.btn-small {
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  min-height: 40px;
}

/* Results Section */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.results-header h2 {
  color: var(--text-primary);
  font-size: var(--font-size-2xl);
  margin: 0;
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

/* Crisis Card */
.crisis-card {
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid #EF4444;
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.crisis-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: #EF4444;
}

.crisis-card h3 {
  color: #EF4444;
  margin: 0;
  font-size: var(--font-size-xl);
}

.crisis-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-base);
}

.crisis-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.crisis-list li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: var(--font-size-base);
}

.crisis-list li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #EF4444;
  font-weight: bold;
}

/* Insight Card */
.insight-card {
  padding: var(--spacing-xl);
  border-left: 4px solid var(--color-accent-gold);
  margin-bottom: var(--spacing-lg);
}

.insight-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.insight-card h3 {
  color: var(--text-primary);
  margin: 0;
  font-size: var(--font-size-xl);
}

.insight-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: var(--font-size-base);
  margin: 0;
}

/* Tips Card */
.tips-card {
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.tips-card h3 {
  color: var(--text-primary);
  margin: 0;
  font-size: var(--font-size-xl);
}

.tips-list {
  display: grid;
  gap: var(--spacing-md);
}

.tip-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
}

.tip-icon-wrapper {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: var(--radius-md);
  color: var(--primary);
}

.tip-content h4 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-size: var(--font-size-lg);
}

.tip-content p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: var(--font-size-base);
}

/* Exercises Section */
.exercises-section {
  margin-top: var(--spacing-xl);
}

.exercises-title {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
}

.exercises-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.exercise-card {
  padding: var(--spacing-lg);
  text-align: left;
}

.exercise-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.exercise-card h4 {
  color: var(--text-primary);
  margin: 0;
  font-size: var(--font-size-lg);
}

.exercise-card p {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

/* Breathing Modal */
.breathing-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
}

.breathing-content {
  position: relative;
  padding: var(--spacing-2xl);
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.close-btn {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: background 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.breathing-content h3 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-xl);
  font-size: var(--font-size-xl);
}

.breathing-circle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 0 auto var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--primary);
  transition: all 1s ease;
}

.breathing-circle.inhale {
  transform: scale(1.2);
  background: rgba(16, 185, 129, 0.2);
}

.breathing-circle.hold-in {
  transform: scale(1.2);
  background: rgba(59, 130, 246, 0.2);
}

.breathing-circle.exhale {
  transform: scale(1);
  background: rgba(139, 92, 246, 0.2);
}

.breathing-circle.hold-out {
  transform: scale(1);
  background: rgba(245, 158, 11, 0.2);
}

.circle-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-sm);
}

.breathing-text {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--text-primary);
}

.breathing-count {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--text-primary);
}

.breathing-instruction {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

.breathing-controls {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

/* History Section */
.history-section {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-2xl);
  border-top: 2px solid var(--glass-border);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.history-header h2 {
  color: var(--text-primary);
  font-size: var(--font-size-2xl);
  margin: 0;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.pattern-card {
  padding: var(--spacing-xl);
}

.pattern-card h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
}

.pattern-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: var(--spacing-sm);
  height: 200px;
  padding: var(--spacing-md) 0;
}

.chart-bar {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  max-width: 80px;
}

.bar-fill {
  width: 100%;
  min-height: 10px;
  border-radius: var(--radius-sm) var(--radius-sm) 0 0;
  transition: height 0.3s ease;
}

.bar-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  text-align: center;
  writing-mode: horizontal-tb;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
}

.insight-stat {
  padding: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.insight-stat .stat-content h4 {
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  margin: 0 0 var(--spacing-xs) 0;
  font-weight: 500;
}

.stat-value {
  color: var(--text-primary);
  font-size: var(--font-size-2xl);
  font-weight: 700;
  margin: 0;
}

.recent-entries {
  padding: var(--spacing-xl);
}

.recent-entries h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-xl);
}

.entries-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.entry-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  flex-wrap: wrap;
}

.entry-date {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  min-width: 120px;
}

.entry-mood {
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
  min-width: 150px;
}

.entry-intensity {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.delete-btn {
  background: transparent;
  border: none;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: var(--spacing-xs);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  transition: all 0.2s;
  min-width: 32px;
  min-height: 32px;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #EF4444;
}

/* Content Sections */
.content-section {
  margin: var(--spacing-2xl) 0;
}

.content-card {
  padding: var(--spacing-2xl);
}

.content-card h2 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-2xl);
  text-align: center;
}

.section-intro {
  color: var(--text-secondary);
  font-size: var(--font-size-lg);
  line-height: 1.8;
  margin-bottom: var(--spacing-lg);
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.content-card h3 {
  color: var(--text-primary);
  margin-top: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-xl);
}

.content-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-base);
}

.content-list {
  list-style: none;
  padding: 0;
  margin: var(--spacing-md) 0;
}

.content-list li {
  padding: var(--spacing-sm) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  color: var(--text-secondary);
  line-height: 1.8;
  font-size: var(--font-size-base);
}

.content-list li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-accent-gold);
  font-weight: bold;
}

.warning-list li::before {
  content: '⚠';
}

/* How It Works Steps */
.how-it-works-steps {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-top: var(--spacing-lg);
}

.step-item {
  display: flex;
  gap: var(--spacing-lg);
  align-items: flex-start;
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-purple));
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: var(--bg-app);
  font-size: var(--font-size-xl);
}

.step-content h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.step-content p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: var(--font-size-base);
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.benefit-card {
  padding: var(--spacing-xl);
  text-align: center;
}

.benefit-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  border-radius: var(--radius-full);
  color: var(--primary);
}

.benefit-card h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-lg);
}

.benefit-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: var(--font-size-base);
}

/* Use Cases Grid */
.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.use-case-card {
  padding: var(--spacing-xl);
}

.use-case-card h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.use-case-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: var(--font-size-base);
}

/* Technique Cards */
.technique-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
}

.technique-card {
  padding: var(--spacing-xl);
}

.technique-card h4 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.technique-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: var(--font-size-base);
}

/* FAQ Section */
.faq-section {
  margin: var(--spacing-xl) 0;
}

.faq-section h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-2xl);
}

.faq-item {
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

.faq-item h3 {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.faq-item p {
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 0;
  font-size: var(--font-size-base);
}

/* Related Tools Section */
.related-tools-section {
  margin: var(--spacing-2xl) 0;
}

.related-tools-section h2 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-2xl);
}

.related-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

/* Animations */
@keyframes fadeIn {
  from { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: var(--spacing-xl) 0;
  }

  .tool-content {
    padding: var(--spacing-lg);
  }

  .mood-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .mood-card {
    min-height: 120px;
    padding: var(--spacing-md);
  }

  .navigation-btns {
    flex-direction: column;
    width: 100%;
  }

  .btn-large,
  .btn {
    width: 100%;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .result-actions {
    width: 100%;
  }

  .result-actions .btn {
    flex: 1;
  }

  .lifestyle-grid {
    grid-template-columns: 1fr;
  }

  .exercises-grid {
    grid-template-columns: 1fr;
  }

  .pattern-chart {
    height: 150px;
  }

  .insights-grid {
    grid-template-columns: 1fr;
  }

  .step-item {
    flex-direction: column;
    text-align: center;
  }

  .benefits-grid,
  .use-cases-grid,
  .technique-cards {
    grid-template-columns: 1fr;
  }

  .related-tools-grid {
    grid-template-columns: 1fr;
  }

  .breathing-circle {
    width: 150px;
    height: 150px;
  }
}

/* Dark Mode Adjustments - Styles handled by global CSS variables */

/* Ensure proper contrast */
.mood-card,
.tag-btn,
.lifestyle-item,
.exercise-card,
.benefit-card,
.use-case-card,
.technique-card {
  transition: all 0.3s ease;
}

.mood-card:focus,
.tag-btn:focus,
.lifestyle-item:focus {
  outline: 2px solid var(--color-accent-gold);
  outline-offset: 2px;
}
</style>