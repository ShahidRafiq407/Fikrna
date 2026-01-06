<template>
  <div class="tool-page symptom-checker-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Symptom Checker" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="activity" :size="16" />
          Professional Health Assessment
        </p>
        <h1>Free Symptom Checker & Health Analysis Tool</h1>
        <p class="hero-subtitle">
          Get informed health insights based on your symptoms. Understand what your body might be telling you, 
          when to seek professional medical care, and how to manage common conditions at home. All analysis happens 
          privately in your browser—your health data never leaves your device.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="activity" :size="14" />
            Symptom Analysis
          </span>
          <span class="badge">
            <Icon name="heart" :size="14" />
            Personalized Insights
          </span>
          <span class="badge">
            <Icon name="shield" :size="14" />
            Privacy Protected
          </span>
          <span class="badge">
            <Icon name="globe" :size="14" />
            Region-Specific Advice
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
          <strong>Symptom Checker</strong> provides preliminary health guidance by analyzing reported symptoms and providing general information about potential conditions and recommended actions. The tool allows users to select symptoms from various categories (general, respiratory, digestive, pain, neurological, skin), specify severity and duration, and receive basic health information and guidance. 
          Users input their symptoms, severity level, duration, and lifestyle factors to receive preliminary assessments, general health information, and recommendations for when to seek professional medical care. The tool helps users understand their symptoms better and make informed decisions about seeking medical attention. All analysis happens instantly in the browser for privacy. Important: This tool is for informational purposes only and does not replace professional medical diagnosis, advice, or treatment.
        </p>
      </div>

      <!-- Critical Disclaimer -->
      <div class="disclaimer-banner glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="disclaimer-header">
          <Icon name="alert-circle" :size="20" />
          <strong>Important Medical Disclaimer</strong>
        </div>
        <p>
          This symptom checker provides general health information only and is not a substitute for professional medical advice, 
          diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns. 
          In case of emergency, call your local emergency number immediately.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="activity" :size="20" />
            Symptom Assessment
          </h2>
          <div class="tool-actions" v-if="results">
            <button @click="downloadResults" class="icon-btn" title="Download Results">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetChecker" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
          
          <!-- Step 1: Personal Information -->
          <section class="input-section">
            <h3>
              <Icon name="user" :size="18" />
              Personal Information
            </h3>
            <p class="section-intro">This helps us provide more relevant health information tailored to your profile.</p>
            
            <div class="form-grid">
              <div class="form-group">
                <label>
                  <Icon name="calendar" :size="14" />
                  Age Group
                </label>
                <select v-model="userInfo.ageGroup" class="styled-input">
                  <option value="">Select age group</option>
                  <option value="child">Child (0-12 years)</option>
                  <option value="teen">Teenager (13-19 years)</option>
                  <option value="adult">Adult (20-59 years)</option>
                  <option value="senior">Senior (60+ years)</option>
                </select>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="user" :size="14" />
                  Gender
                </label>
                <select v-model="userInfo.gender" class="styled-input">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group full-width">
                <label>
                  <Icon name="map" :size="14" />
                  Region
                </label>
                <select v-model="userInfo.region" class="styled-input">
                  <option value="">Select your region</option>
                  <optgroup label="North America">
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                  </optgroup>
                  <optgroup label="Europe">
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="Italy">Italy</option>
                    <option value="Spain">Spain</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Austria">Austria</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Norway">Norway</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Poland">Poland</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Greece">Greece</option>
                    <option value="Finland">Finland</option>
                  </optgroup>
                  <optgroup label="Middle East & GCC">
                    <option value="UAE">United Arab Emirates</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Israel">Israel</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Lebanon">Lebanon</option>
                  </optgroup>
                  <optgroup label="Asia Pacific">
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="China">China</option>
                    <option value="Japan">Japan</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Australia">Australia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </optgroup>
                  <optgroup label="Africa">
                    <option value="South Africa">South Africa</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Morocco">Morocco</option>
                  </optgroup>
                  <optgroup label="South America">
                    <option value="Brazil">Brazil</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Chile">Chile</option>
                    <option value="Colombia">Colombia</option>
                  </optgroup>
                </select>
              </div>
            </div>

            <!-- Special Conditions -->
            <div class="special-conditions">
              <label class="condition-checkbox">
                <input type="checkbox" v-model="userInfo.isPregnant">
                <Icon name="heart" :size="16" />
                <span>Currently pregnant or breastfeeding</span>
              </label>
              <label class="condition-checkbox">
                <input type="checkbox" v-model="userInfo.hasAllergies">
                <Icon name="alert-circle" :size="16" />
                <span>Have known allergies</span>
              </label>
              <label class="condition-checkbox">
                <input type="checkbox" v-model="userInfo.chronicConditions">
                <Icon name="activity" :size="16" />
                <span>Have chronic health conditions</span>
              </label>
              <label class="condition-checkbox">
                <input type="checkbox" v-model="userInfo.recentTravel">
                <Icon name="map" :size="16" />
                <span>Traveled internationally recently</span>
              </label>
            </div>
          </section>

          <!-- Step 2: Body Area Selection -->
          <section class="body-area-section">
            <h3>
              <Icon name="target" :size="18" />
              Body Areas Affected
            </h3>
            <p class="section-intro">Select the body areas where you're experiencing discomfort or symptoms.</p>
            
            <div class="body-areas-grid">
              <label 
                v-for="area in bodyAreas" 
                :key="area.name" 
                class="body-area-card"
                :class="{ active: selectedBodyAreas.includes(area.name) }"
              >
                <input type="checkbox" v-model="selectedBodyAreas" :value="area.name">
                <div class="area-content">
                  <Icon :name="area.icon" :size="24" />
                  <span class="area-name">{{ area.name }}</span>
                </div>
              </label>
            </div>
          </section>

          <!-- Step 3: Symptom Selection -->
          <section class="symptoms-section">
            <h3>
              <Icon name="list" :size="18" />
              Symptoms You're Experiencing
            </h3>
            <p class="section-intro">Select all symptoms that apply. Be as specific as possible for better insights.</p>
            
            <div class="symptom-categories">
              <div v-for="category in symptomCategories" :key="category.name" class="category-block">
                <h4>
                  <Icon :name="category.icon" :size="18" />
                  {{ category.name }}
                </h4>
                <div class="symptoms-grid">
                  <label v-for="symptom in category.symptoms" :key="symptom" class="symptom-checkbox">
                    <input type="checkbox" v-model="selectedSymptoms" :value="symptom">
                    <span>{{ symptom }}</span>
                  </label>
                </div>
              </div>
            </div>
          </section>

          <!-- Step 4: Severity & Duration -->
          <section v-if="selectedSymptoms.length > 0" class="severity-section">
            <h3>
              <Icon name="bar-chart" :size="18" />
              Severity & Duration
            </h3>
            <div class="form-grid">
              <div class="form-group">
                <label>
                  <Icon name="trending-up" :size="14" />
                  How severe are your symptoms?
                </label>
                <select v-model="severity" class="styled-input">
                  <option value="">Select severity</option>
                  <option value="mild">Mild - Noticeable but not limiting daily activities</option>
                  <option value="moderate">Moderate - Interfering with some activities</option>
                  <option value="severe">Severe - Significantly limiting daily activities</option>
                  <option value="emergency">Emergency - Unable to function normally</option>
                </select>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="clock" :size="14" />
                  How long have you had these symptoms?
                </label>
                <select v-model="duration" class="styled-input">
                  <option value="">Select duration</option>
                  <option value="hours">Less than 24 hours</option>
                  <option value="1-3days">1-3 days</option>
                  <option value="4-7days">4-7 days</option>
                  <option value="week+">More than a week</option>
                  <option value="chronic">Weeks or months</option>
                </select>
              </div>
            </div>
          </section>

          <!-- Lifestyle Factors -->
          <section v-if="selectedSymptoms.length > 0" class="lifestyle-section">
            <h3>
              <Icon name="zap" :size="18" />
              Additional Factors
            </h3>
            <div class="lifestyle-grid">
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.poorSleep">
                <Icon name="moon" :size="16" />
                <span>Poor sleep quality recently</span>
              </label>
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.stress">
                <Icon name="alert-circle" :size="16" />
                <span>High stress levels</span>
              </label>
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.poorDiet">
                <Icon name="activity" :size="16" />
                <span>Irregular or poor diet</span>
              </label>
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.dehydration">
                <Icon name="droplet" :size="16" />
                <span>Not drinking enough water</span>
              </label>
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.lackExercise">
                <Icon name="activity" :size="16" />
                <span>Lack of physical activity</span>
              </label>
              <label class="lifestyle-checkbox">
                <input type="checkbox" v-model="lifestyleFactors.smoking">
                <Icon name="alert-circle" :size="16" />
                <span>Smoking or vaping</span>
              </label>
            </div>
          </section>

          <button 
            v-if="selectedSymptoms.length > 0" 
            @click="analyzeSymptoms" 
            class="btn btn-primary btn-large"
          >
            <Icon name="search" :size="18" />
            Analyze My Symptoms
          </button>

          <!-- Results Section -->
          <section v-if="results" class="results-section">
            <div class="results-header">
              <h3>
                <Icon name="file-text" :size="20" />
                Your Health Insights
              </h3>
            </div>

            <!-- Emergency Warning -->
            <div v-if="results.isEmergency" class="emergency-alert">
              <Icon name="alert-circle" :size="32" />
              <div class="alert-content">
                <h4>Seek Immediate Medical Attention</h4>
                <p>{{ results.emergencyReason }}</p>
                <p><strong>Call emergency services or go to the nearest hospital emergency room immediately.</strong></p>
              </div>
            </div>

            <!-- Severity Indicator -->
            <div class="severity-indicator glass-card" :class="results.riskLevel">
              <div class="indicator-header">
                <Icon name="activity" :size="24" />
                <div>
                  <h4>Risk Level: {{ results.riskLevel.toUpperCase() }}</h4>
                  <p>{{ results.riskExplanation }}</p>
                </div>
              </div>
            </div>

            <!-- Possible Causes -->
            <div class="insight-card glass-card">
              <h4>
                <Icon name="search" :size="20" />
                Possible Causes
              </h4>
              <ul class="causes-list">
                <li v-for="(cause, idx) in results.possibleCauses" :key="idx">
                  <div class="cause-header">
                    <strong>{{ cause.name }}</strong>
                    <span class="likelihood-badge">{{ cause.likelihood }}</span>
                  </div>
                  <p>{{ cause.explanation }}</p>
                </li>
              </ul>
            </div>

            <!-- Common Explanations -->
            <div class="insight-card glass-card">
              <h4>
                <Icon name="info" :size="20" />
                Overview
              </h4>
              <p>{{ results.commonExplanation }}</p>
            </div>

            <!-- When to Seek Care -->
            <div class="insight-card glass-card warning-card">
              <h4>
                <Icon name="alert-circle" :size="20" />
                When to Seek Medical Care
              </h4>
              <ul class="warning-list">
                <li v-for="(sign, idx) in results.warningSignsSeek" :key="idx">
                  <Icon name="arrow-right" :size="14" />
                  {{ sign }}
                </li>
              </ul>
            </div>

            <!-- Self-Care Guidance -->
            <div class="insight-card glass-card">
              <h4>
                <Icon name="home" :size="20" />
                Self-Care & Home Management
              </h4>
              <div class="self-care-steps">
                <div v-for="(step, idx) in results.selfCare" :key="idx" class="care-step">
                  <div class="step-number">{{ idx + 1 }}</div>
                  <div class="step-content">
                    <h5>{{ step.title }}</h5>
                    <p>{{ step.advice }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Region-Specific Advice -->
            <div v-if="results.regionSpecific" class="insight-card glass-card region-card">
              <h4>
                <Icon name="map" :size="20" />
                Region-Specific Health Notes
              </h4>
              <p>{{ results.regionSpecific }}</p>
            </div>

            <!-- Personalized Insights -->
            <div v-if="results.personalizedInsights.length > 0" class="insight-card glass-card personalized-card">
              <h4>
                <Icon name="user" :size="20" />
                Personalized Insights
              </h4>
              <ul class="insights-list">
                <li v-for="(insight, idx) in results.personalizedInsights" :key="idx">
                  <Icon name="check-circle" :size="14" />
                  {{ insight }}
                </li>
              </ul>
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
            How This Symptom Checker Works
          </h2>
          <p>
            Understanding your symptoms is the first step toward better health awareness. This tool analyzes the symptoms 
            you report and provides evidence-based information about possible causes, helping you make informed decisions 
            about your health.
          </p>
          
          <p>
            Unlike generic symptom lists, our checker considers your age, gender, location, and lifestyle factors to provide 
            personalized insights. We account for region-specific health patterns—like heat-related illnesses common in Gulf 
            countries or cold-weather conditions prevalent in Europe.
          </p>

          <h3>Step-by-Step Process</h3>
          <div class="features-grid">
            <div class="feature-box">
              <Icon name="user" :size="32" />
              <h4>1. Personal Information</h4>
              <p>Provide basic demographic information and health history to personalize the analysis.</p>
            </div>
            <div class="feature-box">
              <Icon name="target" :size="32" />
              <h4>2. Select Body Areas</h4>
              <p>Identify which parts of your body are affected to narrow down possible conditions.</p>
            </div>
            <div class="feature-box">
              <Icon name="list" :size="32" />
              <h4>3. Describe Symptoms</h4>
              <p>Select all applicable symptoms from our comprehensive database to create a complete picture.</p>
            </div>
            <div class="feature-box">
              <Icon name="bar-chart" :size="32" />
              <h4>4. Severity & Duration</h4>
              <p>Indicate how severe your symptoms are and how long you've been experiencing them.</p>
            </div>
            <div class="feature-box">
              <Icon name="zap" :size="32" />
              <h4>5. Lifestyle Factors</h4>
              <p>Consider additional factors like sleep, stress, diet, and exercise that may influence your symptoms.</p>
            </div>
            <div class="feature-box">
              <Icon name="search" :size="32" />
              <h4>6. Get Insights</h4>
              <p>Receive personalized analysis with possible causes, self-care guidance, and when to seek medical care.</p>
            </div>
          </div>

          <h3>Privacy & Data Security</h3>
          <p>
            All symptom checking happens entirely in your web browser. We don't collect, store, or transmit any of your 
            health information to servers. Your privacy is fully protected, and all data stays on your device only. 
            This tool is designed to help you understand your symptoms while maintaining complete confidentiality.
          </p>
        </article>

        <!-- When to See a Doctor -->
        <article class="content-card">
          <h2>
            <Icon name="heart" :size="24" />
            When Should You See a Doctor?
          </h2>
          <p>
            While many symptoms can be managed at home, certain situations require professional medical attention. 
            Understanding when to seek care helps ensure you receive timely treatment when needed.
          </p>
          
          <div class="doctor-visit-grid">
            <div class="visit-card urgent">
              <Icon name="alert-circle" :size="28" />
              <h3>Emergency Care (Go Immediately)</h3>
              <ul>
                <li>Chest pain or pressure</li>
                <li>Difficulty breathing or shortness of breath</li>
                <li>Sudden severe headache</li>
                <li>Loss of consciousness or confusion</li>
                <li>Severe bleeding that won't stop</li>
                <li>Signs of stroke (face drooping, arm weakness, speech difficulty)</li>
                <li>Severe allergic reaction</li>
                <li>Suicidal thoughts or self-harm urges</li>
              </ul>
            </div>

            <div class="visit-card soon">
              <Icon name="clock" :size="28" />
              <h3>See Doctor Within 24-48 Hours</h3>
              <ul>
                <li>Fever above 39°C (102°F) that persists</li>
                <li>Severe pain that interferes with daily activities</li>
                <li>Persistent vomiting or diarrhea</li>
                <li>Signs of infection (swelling, redness, warmth)</li>
                <li>Symptoms that worsen instead of improve</li>
                <li>Unusual lumps or bumps</li>
                <li>Changes in vision or hearing</li>
              </ul>
            </div>

            <div class="visit-card routine">
              <Icon name="calendar" :size="28" />
              <h3>Schedule Regular Appointment</h3>
              <ul>
                <li>Mild symptoms lasting more than a week</li>
                <li>Recurring symptoms without clear cause</li>
                <li>Health concerns affecting quality of life</li>
                <li>Need for preventive care or checkups</li>
                <li>Questions about medication or treatment</li>
                <li>Managing chronic conditions</li>
                <li>Mental health concerns that persist</li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Common Conditions Guide -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Understanding Common Conditions
          </h2>
          <p>
            Familiarizing yourself with common health conditions and their typical symptoms helps you better understand 
            what might be happening with your body. However, remember that symptoms can vary widely, and proper diagnosis 
            requires professional medical evaluation.
          </p>
          
          <div class="conditions-grid">
            <div class="condition-card">
              <h4>Common Cold</h4>
              <p><strong>Typical Symptoms:</strong> Runny nose, sneezing, sore throat, mild cough, congestion</p>
              <p><strong>Duration:</strong> 7-10 days</p>
              <p><strong>Home Care:</strong> Rest, fluids, honey for cough (not for babies), saline nasal rinse</p>
              <p><strong>See Doctor If:</strong> Symptoms persist beyond 10 days, high fever, difficulty breathing</p>
            </div>

            <div class="condition-card">
              <h4>Flu (Influenza)</h4>
              <p><strong>Typical Symptoms:</strong> High fever, body aches, fatigue, dry cough, headache</p>
              <p><strong>Duration:</strong> 1-2 weeks</p>
              <p><strong>Home Care:</strong> Rest, plenty of fluids, pain relievers for fever and aches</p>
              <p><strong>See Doctor If:</strong> High-risk groups (seniors, pregnant, chronic conditions), difficulty breathing, chest pain</p>
            </div>

            <div class="condition-card">
              <h4>Migraine Headache</h4>
              <p><strong>Typical Symptoms:</strong> Severe throbbing pain (often one-sided), nausea, light sensitivity</p>
              <p><strong>Duration:</strong> 4-72 hours</p>
              <p><strong>Home Care:</strong> Dark quiet room, cold compress, prescribed medications</p>
              <p><strong>See Doctor If:</strong> First-time severe headache, sudden onset "worst headache ever," neurological symptoms</p>
            </div>

            <div class="condition-card">
              <h4>Gastroenteritis (Stomach Flu)</h4>
              <p><strong>Typical Symptoms:</strong> Diarrhea, nausea, vomiting, stomach cramps, mild fever</p>
              <p><strong>Duration:</strong> 1-3 days</p>
              <p><strong>Home Care:</strong> Clear fluids, electrolyte solutions, bland diet (BRAT: bananas, rice, applesauce, toast)</p>
              <p><strong>See Doctor If:</strong> Severe dehydration, bloody stool, symptoms lasting beyond 3 days</p>
            </div>

            <div class="condition-card">
              <h4>Urinary Tract Infection</h4>
              <p><strong>Typical Symptoms:</strong> Burning during urination, frequent urge to urinate, cloudy urine, pelvic pain</p>
              <p><strong>Duration:</strong> Requires medical treatment</p>
              <p><strong>Home Care:</strong> Increase water intake, cranberry juice may help prevent recurrence</p>
              <p><strong>See Doctor If:</strong> Any UTI symptoms require medical evaluation and antibiotics</p>
            </div>

            <div class="condition-card">
              <h4>Anxiety and Stress</h4>
              <p><strong>Typical Symptoms:</strong> Racing heart, sweating, trembling, difficulty breathing, sense of dread</p>
              <p><strong>Duration:</strong> Varies widely</p>
              <p><strong>Home Care:</strong> Deep breathing exercises, regular physical activity, adequate sleep, meditation</p>
              <p><strong>See Doctor If:</strong> Interfering with daily life, panic attacks, persistent worry</p>
            </div>
          </div>
        </article>

        <!-- Regional Health Patterns -->
        <article class="content-card">
          <h2>
            <Icon name="globe" :size="24" />
            Regional Health Considerations
          </h2>
          <p>
            Different geographic regions have unique environmental factors, disease patterns, and health considerations 
            that can influence your symptoms and health risks. Understanding these regional factors helps provide more 
            relevant health guidance.
          </p>
          
          <div class="regional-sections">
            <div class="regional-block">
              <h3>
                <Icon name="sun" :size="20" />
                Gulf Countries Health Notes
              </h3>
              <p>
                Living in hot, arid climates like the UAE, Saudi Arabia, Qatar, Kuwait, or Oman brings specific health considerations:
              </p>
              <ul class="content-list">
                <li><strong>Dehydration Risk:</strong> High temperatures mean you need more water than usual. Adults should drink 3-4 liters daily, more if exercising outdoors.</li>
                <li><strong>Heat Exhaustion:</strong> Watch for headaches, dizziness, nausea, excessive sweating, or muscle cramps—especially during summer months (May-September).</li>
                <li><strong>Vitamin D Deficiency:</strong> Despite abundant sunshine, indoor lifestyles and clothing can lead to vitamin D deficiency. Symptoms include fatigue and bone pain.</li>
                <li><strong>Dust and Allergies:</strong> Desert environments trigger respiratory symptoms. Air-conditioned environments can dry out airways.</li>
                <li><strong>Rapid Temperature Changes:</strong> Moving between hot outdoor and cold indoor air-conditioned spaces can cause respiratory infections.</li>
              </ul>
            </div>

            <div class="regional-block">
              <h3>
                <Icon name="cloud" :size="20" />
                European Climate Health Notes
              </h3>
              <p>
                Living in temperate European climates (UK, Germany, France, Netherlands, Spain, Italy) involves different health patterns:
              </p>
              <ul class="content-list">
                <li><strong>Seasonal Affective Disorder (SAD):</strong> Low sunlight during winter months can cause mood changes, fatigue, and depression—especially in northern regions.</li>
                <li><strong>Respiratory Infections:</strong> Cold, damp winters increase risk of colds, flu, and chest infections. Indoor heating dries airways.</li>
                <li><strong>Vitamin D Deficiency:</strong> Limited winter sunlight requires dietary supplementation or fortified foods.</li>
                <li><strong>Hay Fever and Allergies:</strong> Spring and summer bring pollen allergies causing sneezing, itchy eyes, and congestion.</li>
                <li><strong>Cold-Weather Risks:</strong> Hypothermia and frostbite during harsh winters; joint pain worsening in cold, damp weather.</li>
              </ul>
            </div>
          </div>
        </article>

        <!-- Use Cases -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            Common Use Cases
          </h2>
          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="clock" :size="24" />
              <h4>Before Doctor Visits</h4>
              <p>Document your symptoms systematically to better communicate with healthcare providers during appointments.</p>
            </div>
            <div class="use-case-item">
              <Icon name="heart" :size="24" />
              <h4>Understanding Symptoms</h4>
              <p>Learn about possible causes of your symptoms to make more informed decisions about seeking medical care.</p>
            </div>
            <div class="use-case-item">
              <Icon name="home" :size="24" />
              <h4>Home Management</h4>
              <p>Get guidance on appropriate self-care measures for mild symptoms that don't require immediate medical attention.</p>
            </div>
            <div class="use-case-item">
              <Icon name="alert-circle" :size="24" />
              <h4>Urgency Assessment</h4>
              <p>Determine whether your symptoms require emergency care, urgent care, or can wait for a routine appointment.</p>
            </div>
            <div class="use-case-item">
              <Icon name="users" :size="24" />
              <h4>Family Health</h4>
              <p>Help assess symptoms for family members, especially children and seniors, to decide when professional care is needed.</p>
            </div>
            <div class="use-case-item">
              <Icon name="globe" :size="24" />
              <h4>Travel Health</h4>
              <p>Understand symptoms in the context of recent travel and regional health patterns to identify travel-related concerns.</p>
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
                <h4>Be Accurate and Complete</h4>
                <p>Provide as much detail as possible about your symptoms, including when they started, how they've changed, and any triggers you've noticed. Accurate information leads to better insights.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Track Patterns Over Time</h4>
                <p>Monitor your symptoms over days or weeks. Note if they worsen, improve, or change in character. This information is valuable for both self-care and medical consultations.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Consider Lifestyle Factors</h4>
                <p>Be honest about sleep, stress, diet, exercise, and other lifestyle factors. These can significantly influence symptoms and are important for comprehensive assessment.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>When in Doubt, Seek Care</h4>
                <p>If you're uncertain about the severity of your symptoms or feel concerned, don't hesitate to contact a healthcare provider. It's better to be evaluated than to miss something serious.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Follow Up as Needed</h4>
                <p>If symptoms persist, worsen, or new symptoms develop, reassess and consider seeking medical attention. Early intervention often leads to better outcomes.</p>
              </div>
            </div>
          </div>
        </article>

      </section>

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

      <!-- Related Tools -->
      <section class="related-tools-section" data-aos="fade-up">
        <h2>
          <Icon name="zap" :size="24" />
          Related Tools You May Find Helpful
        </h2>
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
      <RelatedTools currentTool="/tools/symptom-checker" category="Health" />

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
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/symptom-checker`;

useSEO({
  title: 'Free Symptom Checker 2025 | Professional Health Analysis Tool | Privacy Protected | When to See Doctor',
  description: 'Professional symptom checker providing preliminary health guidance by analyzing reported symptoms. Understand symptoms, possible causes, when to seek professional medical care, and self-care guidance. Region-specific advice for Gulf, Europe, and worldwide. 100% private—all analysis in your browser. Important: For informational purposes only, not a substitute for professional medical diagnosis or treatment.',
  keywords: 'symptom checker, check symptoms online, health symptoms, medical symptom analysis, when to see doctor, health guide, symptom assessment, online health check, symptom analyzer, health analysis tool, medical symptoms, health self-assessment, symptom evaluation, health symptoms checker, medical advice tool',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// User Information
const userInfo = ref({
  ageGroup: '',
  gender: '',
  region: '',
  isPregnant: false,
  hasAllergies: false,
  chronicConditions: false,
  recentTravel: false
});

// Body Areas with Icon names
const bodyAreas = [
  { name: 'Head/Face', icon: 'user' },
  { name: 'Eyes', icon: 'target' },
  { name: 'Ears', icon: 'activity' },
  { name: 'Nose/Throat', icon: 'activity' },
  { name: 'Chest', icon: 'heart' },
  { name: 'Abdomen', icon: 'target' },
  { name: 'Back', icon: 'trending-up' },
  { name: 'Arms', icon: 'activity' },
  { name: 'Legs', icon: 'activity' },
  { name: 'Skin', icon: 'sun' },
  { name: 'Whole Body', icon: 'users' }
];

const selectedBodyAreas = ref([]);

// Symptom Categories with Icon names
const symptomCategories = [
  {
    name: 'General Symptoms',
    icon: 'trending-up',
    symptoms: ['Fever', 'Chills', 'Fatigue', 'Weakness', 'Night sweats', 'Weight loss', 'Loss of appetite']
  },
  {
    name: 'Respiratory',
    icon: 'activity',
    symptoms: ['Cough', 'Shortness of breath', 'Wheezing', 'Chest congestion', 'Runny nose', 'Sneezing', 'Sore throat']
  },
  {
    name: 'Digestive',
    icon: 'activity',
    symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Constipation', 'Stomach pain', 'Bloating', 'Heartburn']
  },
  {
    name: 'Pain & Aches',
    icon: 'alert-circle',
    symptoms: ['Headache', 'Migraine', 'Body aches', 'Joint pain', 'Muscle pain', 'Back pain', 'Chest pain']
  },
  {
    name: 'Neurological',
    icon: 'brain',
    symptoms: ['Dizziness', 'Confusion', 'Numbness', 'Tingling', 'Vision changes', 'Memory problems', 'Difficulty concentrating']
  },
  {
    name: 'Skin & Allergies',
    icon: 'sun',
    symptoms: ['Rash', 'Itching', 'Hives', 'Swelling', 'Redness', 'Dry skin', 'Skin lesions']
  }
];

const selectedSymptoms = ref([]);
const severity = ref('');
const duration = ref('');

const lifestyleFactors = ref({
  poorSleep: false,
  stress: false,
  poorDiet: false,
  dehydration: false,
  lackExercise: false,
  smoking: false
});

const results = ref(null);

// Featured Tools
const featuredTools = [
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate BMI, BMR, TDEE and other health metrics'
  },
  {
    name: 'Sleep Coach',
    path: '/tools/sleep-coach',
    icon: 'moon',
    description: 'Improve sleep quality with personalized recommendations'
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
  }
];

// FAQs
const faqs = ref([
  {
    question: 'Is this symptom checker a replacement for seeing a doctor?',
    answer: 'No, absolutely not. This tool provides educational information to help you understand your symptoms, but only a qualified healthcare professional can properly diagnose and treat medical conditions. Always consult your doctor for medical advice.'
  },
  {
    question: 'How accurate is this symptom checker?',
    answer: 'This tool uses evidence-based medical information and considers multiple factors to provide insights. However, every person is unique, and many medical conditions share similar symptoms. Accuracy depends on the information you provide, and results should be used as guidance only, not definitive diagnosis.'
  },
  {
    question: 'Can I use this for children\'s symptoms?',
    answer: 'Yes, you can select "Child" in the age group. However, children often present symptoms differently than adults and can deteriorate more quickly. Always consult a pediatrician for children\'s health concerns, especially for infants and toddlers. When in doubt, seek professional medical advice.'
  },
  {
    question: 'What should I do if the tool suggests emergency care?',
    answer: 'If the symptom checker indicates you need emergency care, do not delay—call your local emergency number immediately or go to the nearest emergency room. Emergency symptoms include chest pain, difficulty breathing, severe bleeding, loss of consciousness, or stroke signs.'
  },
  {
    question: 'Why do you ask about my region?',
    answer: 'Different geographic regions have different disease patterns and environmental factors. For example, heat-related illnesses are more common in Gulf countries, while vitamin D deficiency from limited winter sunlight is more prevalent in northern Europe. This helps us provide more relevant health information.'
  },
  {
    question: 'Is my health information private?',
    answer: 'Yes, completely. All symptom checking happens in your browser. We don\'t collect, store, or transmit any of your health information to servers. Your privacy is fully protected, and all data stays on your device only.'
  },
  {
    question: 'Can this tool detect COVID-19 or other infectious diseases?',
    answer: 'This tool can suggest when symptoms might indicate an infectious illness, but it cannot diagnose specific diseases like COVID-19. If you have symptoms of infectious disease (fever, cough, loss of taste/smell), get tested and follow public health guidelines for isolation and treatment.'
  },
  {
    question: 'What if my symptoms don\'t match any common conditions?',
    answer: 'Some symptoms can be vague or related to rare conditions. If you have persistent, unusual, or concerning symptoms that don\'t improve, always see a healthcare provider. They can perform examinations, order tests, and provide proper diagnosis.'
  },
  {
    question: 'Should I take the suggestions for medications?',
    answer: 'No. This tool may mention general symptom management (like staying hydrated or resting), but never start new medications without consulting a doctor or pharmacist. Medications can interact with other drugs, have side effects, or be contraindicated for certain conditions.'
  },
  {
    question: 'Can I use this if I\'m pregnant?',
    answer: 'Select the pregnancy option when filling out your information. However, pregnancy requires extra caution with any health concerns. Always consult your obstetrician or midwife before taking medications or if you have any symptoms during pregnancy.'
  }
]);

function analyzeSymptoms() {
  const analysis = {
    isEmergency: false,
    emergencyReason: '',
    riskLevel: 'low',
    riskExplanation: '',
    possibleCauses: [],
    commonExplanation: '',
    warningSignsSeek: [],
    selfCare: [],
    regionSpecific: '',
    personalizedInsights: []
  };

  // Check for emergency symptoms
  const emergencySymptoms = ['Chest pain', 'Shortness of breath', 'Difficulty concentrating', 'Confusion', 'Vision changes'];
  const hasEmergency = selectedSymptoms.value.some(s => emergencySymptoms.includes(s));
  
  if (hasEmergency || severity.value === 'emergency') {
    analysis.isEmergency = true;
    analysis.emergencyReason = 'You have reported symptoms that may indicate a serious medical condition requiring immediate attention.';
    analysis.riskLevel = 'emergency';
  }

  // Determine risk level
  if (!analysis.isEmergency) {
    if (severity.value === 'severe' || duration.value === 'chronic') {
      analysis.riskLevel = 'high';
      analysis.riskExplanation = 'Your symptoms suggest you should see a healthcare provider soon for proper evaluation.';
    } else if (severity.value === 'moderate' || duration.value === 'week+') {
      analysis.riskLevel = 'medium';
      analysis.riskExplanation = 'Monitor your symptoms closely. Consider scheduling a doctor appointment if they worsen or persist.';
    } else {
      analysis.riskLevel = 'low';
      analysis.riskExplanation = 'Your symptoms appear mild. Try self-care measures and monitor for any changes.';
    }
  } else {
    analysis.riskExplanation = analysis.emergencyReason;
  }

  // Analyze symptom patterns
  const hasRespiratory = selectedSymptoms.value.some(s => ['Cough', 'Sore throat', 'Runny nose', 'Sneezing', 'Chest congestion'].includes(s));
  const hasFever = selectedSymptoms.value.includes('Fever');
  const hasDigestive = selectedSymptoms.value.some(s => ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach pain'].includes(s));
  const hasHeadache = selectedSymptoms.value.includes('Headache') || selectedSymptoms.value.includes('Migraine');
  const hasFatigue = selectedSymptoms.value.includes('Fatigue') || selectedSymptoms.value.includes('Weakness');

  // Possible causes
  if (hasFever && hasRespiratory) {
    analysis.possibleCauses.push({
      name: 'Upper Respiratory Infection',
      explanation: 'Could be a common cold, flu, or other viral infection affecting your airways.',
      likelihood: 'High'
    });
    analysis.possibleCauses.push({
      name: 'COVID-19',
      explanation: 'Coronavirus can cause fever and respiratory symptoms. Consider getting tested.',
      likelihood: 'Moderate'
    });
  }

  if (hasDigestive) {
    analysis.possibleCauses.push({
      name: 'Gastroenteritis',
      explanation: 'Stomach flu or food poisoning can cause digestive symptoms.',
      likelihood: 'High'
    });
  }

  if (hasHeadache && hasFatigue && lifestyleFactors.value.poorSleep) {
    analysis.possibleCauses.push({
      name: 'Stress and Lifestyle Factors',
      explanation: 'Poor sleep, stress, and dehydration commonly cause headaches and tiredness.',
      likelihood: 'High'
    });
  }

  if (analysis.possibleCauses.length === 0) {
    analysis.possibleCauses.push({
      name: 'Various Conditions',
      explanation: 'Your symptoms could be related to several different conditions. Medical evaluation recommended.',
      likelihood: 'Unknown'
    });
  }

  // Common explanation
  analysis.commonExplanation = `Based on ${selectedSymptoms.value.length} symptom${selectedSymptoms.value.length > 1 ? 's' : ''} you've reported, the most likely explanation involves ${analysis.possibleCauses[0]?.name.toLowerCase() || 'common health issues'}. ${lifestyleFactors.value.stress ? 'Stress and lifestyle factors may also be contributing. ' : ''}Remember that symptom overlap is common, and proper diagnosis requires medical examination.`;

  // Warning signs
  analysis.warningSignsSeek = [
    'Symptoms suddenly worsen or become severe',
    'High fever (above 39°C/102°F) lasting more than 2 days',
    'Difficulty breathing or chest pain',
    'Severe dehydration (dry mouth, dizziness, very dark urine)',
    'Symptoms persist beyond 7-10 days without improvement',
    'New symptoms develop or existing ones change significantly'
  ];

  if (userInfo.value.ageGroup === 'senior') {
    analysis.warningSignsSeek.push('Any concerning symptoms in seniors should be evaluated promptly');
  }

  if (userInfo.value.isPregnant) {
    analysis.warningSignsSeek.push('Any fever, bleeding, or concerning symptoms during pregnancy');
  }

  // Self-care steps
  analysis.selfCare = [
    {
      title: 'Rest and Recovery',
      advice: 'Get adequate sleep (7-9 hours for adults) and avoid strenuous activities until symptoms improve.'
    },
    {
      title: 'Stay Hydrated',
      advice: 'Drink plenty of water, clear broths, or electrolyte solutions. Avoid alcohol and caffeine which can dehydrate you.'
    },
    {
      title: 'Nutrition',
      advice: 'Eat nutritious, easy-to-digest foods. The BRAT diet (bananas, rice, applesauce, toast) helps with digestive issues.'
    },
    {
      title: 'Monitor Symptoms',
      advice: 'Track changes in your symptoms. Note temperature if you have fever, and watch for warning signs.'
    },
    {
      title: 'Over-the-Counter Relief',
      advice: 'Consider appropriate OTC medications for symptom relief (acetaminophen for fever/pain, etc.). Always follow dosing instructions and consult a pharmacist if unsure.'
    }
  ];

  // Region-specific advice
  if (['UAE', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman'].includes(userInfo.value.region)) {
    analysis.regionSpecific = `Gulf Region Note: High temperatures and humidity can worsen dehydration and heat-related symptoms. Stay in air-conditioned spaces during peak heat hours, drink extra water (3-4 liters daily), and watch for heat exhaustion signs. Rapid temperature changes between hot outdoor and cold indoor AC can trigger respiratory symptoms.`;
  } else if (['United Kingdom', 'Germany', 'France', 'Netherlands'].includes(userInfo.value.region)) {
    analysis.regionSpecific = `European Region Note: Cold, damp weather can worsen respiratory and joint symptoms. Ensure adequate heating, dress warmly, and consider vitamin D supplementation during winter months when sunlight is limited. Seasonal affective disorder (SAD) may contribute to fatigue—light therapy can help.`;
  }

  // Personalized insights
  if (userInfo.value.ageGroup === 'child') {
    analysis.personalizedInsights.push('Children can deteriorate quickly. Monitor closely and don\'t hesitate to seek medical care.');
  }

  if (userInfo.value.ageGroup === 'senior') {
    analysis.personalizedInsights.push('Seniors may not show typical symptoms. Even mild symptoms warrant medical evaluation.');
  }

  if (userInfo.value.isPregnant) {
    analysis.personalizedInsights.push('Pregnancy affects immune function. Consult your obstetrician before taking any medications.');
  }

  if (lifestyleFactors.value.dehydration && ['UAE', 'Saudi Arabia', 'Qatar'].includes(userInfo.value.region)) {
    analysis.personalizedInsights.push('Dehydration is especially risky in hot climates. Increase water intake significantly.');
  }

  if (lifestyleFactors.value.poorSleep) {
    analysis.personalizedInsights.push('Poor sleep weakens immune function and worsens many symptoms. Prioritize 7-9 hours nightly.');
  }

  if (userInfo.value.recentTravel) {
    analysis.personalizedInsights.push('Recent international travel can expose you to different pathogens. Mention this to your doctor.');
  }

  results.value = analysis;
  
  // Scroll to results
  setTimeout(() => {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

function downloadResults() {
  if (!results.value) return;

  let content = `SYMPTOM CHECK RESULTS\n`;
  content += `Generated: ${new Date().toLocaleString()}\n\n`;
  content += `=`.repeat(60) + `\n\n`;
  
  content += `RISK LEVEL: ${results.value.riskLevel.toUpperCase()}\n`;
  content += `${results.value.riskExplanation}\n\n`;
  
  if (results.value.isEmergency) {
    content += `EMERGENCY WARNING:\n${results.value.emergencyReason}\n\n`;
  }

  content += `POSSIBLE CAUSES:\n`;
  results.value.possibleCauses.forEach(cause => {
    content += `- ${cause.name} (${cause.likelihood} likelihood)\n  ${cause.explanation}\n`;
  });
  
  content += `\nSELF-CARE GUIDANCE:\n`;
  results.value.selfCare.forEach((step, idx) => {
    content += `${idx + 1}. ${step.title}\n   ${step.advice}\n`;
  });

  content += `\nDISCLAIMER:\n`;
  content += `This information is for educational purposes only and not medical advice.\n`;
  content += `Always consult healthcare professionals for diagnosis and treatment.\n`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `symptom-check-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetChecker() {
  userInfo.value = {
    ageGroup: '',
    gender: '',
    region: '',
    isPregnant: false,
    hasAllergies: false,
    chronicConditions: false,
    recentTravel: false
  };
  selectedBodyAreas.value = [];
  selectedSymptoms.value = [];
  severity.value = '';
  duration.value = '';
  lifestyleFactors.value = {
    poorSleep: false,
    stress: false,
    poorDiet: false,
    dehydration: false,
    lackExercise: false,
    smoking: false
  };
  results.value = null;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  // Initialize AOS
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50
  });

  // Generate comprehensive schema
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Free Symptom Checker & Health Analysis Tool',
    description: 'Professional symptom checker providing preliminary health guidance by analyzing reported symptoms. Understand symptoms, possible causes, when to seek professional medical care, and self-care guidance.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      'Symptom selection and analysis',
      'Severity and duration tracking',
      'Preliminary health information',
      'When to see doctor guidance',
      'Self-care recommendations',
      'Region-specific advice',
      'Lifestyle factor consideration'
    ],
    usageInfo: 'Select symptoms from categories, specify severity and duration, add lifestyle factors. Receive preliminary assessments and guidance on seeking medical care.',
    helpText: 'Symptom Checker helps users understand their symptoms better and make informed decisions about seeking medical attention. For informational purposes only.'
  });
  
  const faqSchema = generateFAQSchema(faqs.value.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Symptom Checker', path: '/tools/symptom-checker' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Symptom Checker 2025 | Professional Health Analysis Tool',
    description: 'Professional symptom checker with personalized health insights. Understand your symptoms, possible causes, when to see a doctor, and self-care guidance.',
    about: [
      { '@type': 'Thing', name: 'Symptom analysis' },
      { '@type': 'Thing', name: 'Health assessment' },
      { '@type': 'Thing', name: 'Medical information' }
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

.symptom-checker-page {
  padding: clamp(40px, 6vh, 60px) 0;
  min-height: 100vh;
}

.container-lg {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: clamp(40px, 6vh, 60px);
  padding: 40px 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #ef4444;
  margin-bottom: 24px;
}

.hero-section h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 20px;
}

.hero-subtitle {
  max-width: 900px;
  margin: 0 auto 32px;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.7;
  color: var(--text-secondary);
}

.hero-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Disclaimer Banner */
.disclaimer-banner {
  padding: 24px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 16px;
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.disclaimer-header strong {
  color: #ef4444;
  font-size: 1.125rem;
  font-weight: 700;
}

.disclaimer-header svg {
  color: #ef4444;
}

.disclaimer-banner p {
  line-height: 1.7;
  margin: 0;
  color: var(--text-secondary);
}

/* Tool Interface */
.tool-interface {
  margin-bottom: 60px;
  overflow: hidden;
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
  border-radius: 8px;
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

/* Input Sections */
.input-section, .body-area-section, .symptoms-section, .severity-section, .lifestyle-section {
  margin-bottom: 40px;
}

.input-section h3, .body-area-section h3, .symptoms-section h3, .severity-section h3, .lifestyle-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.7;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.form-group.full-width {
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
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.9375rem;
  transition: all 0.3s;
}

.styled-input:hover {
  border-color: rgba(16, 185, 129, 0.3);
}

.styled-input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.special-conditions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.condition-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.condition-checkbox:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.condition-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.condition-checkbox svg {
  color: #10b981;
}

/* Body Areas Grid */
.body-areas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.body-area-card {
  padding: 20px;
  border: 2px solid var(--glass-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  background: var(--glass-bg);
}

.body-area-card:hover {
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.body-area-card.active {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-color: #10b981;
}

.body-area-card input {
  display: none;
}

.area-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.area-content svg {
  color: #10b981;
}

.area-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Symptom Categories */
.symptom-categories {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.category-block h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.symptoms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.symptom-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.symptom-checkbox:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.symptom-checkbox input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.symptom-checkbox span {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

/* Lifestyle Grid */
.lifestyle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.lifestyle-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.lifestyle-checkbox:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.lifestyle-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.lifestyle-checkbox svg {
  color: #10b981;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
}

.btn-large {
  width: 100%;
  max-width: 400px;
  margin: 32px auto 0;
  display: block;
  padding: 16px 32px;
  font-size: 1.125rem;
}

/* Results Section */
.results-section {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid var(--glass-border);
}

.results-header {
  margin-bottom: 32px;
}

.results-header h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.emergency-alert {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 2px solid #ef4444;
  border-radius: 16px;
  margin-bottom: 32px;
}

.emergency-alert svg {
  color: #ef4444;
  flex-shrink: 0;
}

.alert-content h4 {
  color: #ef4444;
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.alert-content p {
  color: var(--text-primary);
  line-height: 1.7;
  margin: 0 0 8px;
}

.severity-indicator {
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 24px;
  border-left: 4px solid;
}

.severity-indicator.low {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%);
  border-color: #10b981;
}

.severity-indicator.medium {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: #f59e0b;
}

.severity-indicator.high {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border-color: #ef4444;
}

.severity-indicator.emergency {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(220, 38, 38, 0.1) 100%);
  border-color: #dc2626;
}

.indicator-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.indicator-header svg {
  color: inherit;
  flex-shrink: 0;
}

.indicator-header h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.indicator-header p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.insight-card {
  padding: 24px;
  margin-bottom: 24px;
  border-radius: 16px;
}

.insight-card h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.insight-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.warning-card {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-left: 4px solid #f59e0b;
}

.region-card {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-left: 4px solid #3b82f6;
}

.personalized-card {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%);
  border-left: 4px solid #a855f7;
}

.causes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.causes-list li {
  padding: 16px;
  margin-bottom: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
}

.cause-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.cause-header strong {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 700;
}

.likelihood-badge {
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.2);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #10b981;
}

.warning-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.warning-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  color: var(--text-secondary);
  line-height: 1.7;
  border-bottom: 1px solid var(--glass-border);
}

.warning-list li:last-child {
  border-bottom: none;
}

.warning-list svg {
  color: #f59e0b;
  margin-top: 4px;
  flex-shrink: 0;
}

.self-care-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.care-step {
  display: flex;
  gap: 20px;
}

.step-number {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 1.125rem;
}

.step-content h5 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.step-content p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.insights-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.insights-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  color: var(--text-secondary);
  line-height: 1.7;
  border-bottom: 1px solid var(--glass-border);
}

.insights-list li:last-child {
  border-bottom: none;
}

.insights-list svg {
  color: #a855f7;
  margin-top: 4px;
  flex-shrink: 0;
}

/* Content Sections */
.content-section {
  margin: 60px 0;
}

.content-card {
  padding: clamp(32px, 5vh, 48px);
  margin-bottom: 32px;
}

.content-card h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 20px;
}

.content-card h3 {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 32px 0 16px;
}

.content-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.feature-box {
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.feature-box:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-box svg {
  color: #10b981;
  margin-bottom: 16px;
}

.feature-box h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.feature-box p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0;
}

.doctor-visit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.visit-card {
  padding: 24px;
  border-radius: 16px;
  border-left: 4px solid;
  transition: all 0.3s;
}

.visit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.visit-card.urgent {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(239, 68, 68, 0.05) 100%);
  border-color: #ef4444;
}

.visit-card.soon {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(245, 158, 11, 0.05) 100%);
  border-color: #f59e0b;
}

.visit-card.routine {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-color: #3b82f6;
}

.visit-card svg {
  color: inherit;
  margin-bottom: 16px;
}

.visit-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.visit-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.visit-card li {
  padding: 8px 0;
  color: var(--text-secondary);
  line-height: 1.7;
  border-bottom: 1px solid var(--glass-border);
}

.visit-card li:last-child {
  border-bottom: none;
}

.conditions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.condition-card {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.condition-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.condition-card h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.condition-card p {
  font-size: 0.9375rem;
  line-height: 1.7;
  margin-bottom: 12px;
  color: var(--text-secondary);
}

.condition-card strong {
  color: var(--text-primary);
}

.regional-sections {
  margin-top: 32px;
}

.regional-block {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  margin-bottom: 24px;
}

.regional-block h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 16px 0 0;
}

.content-list li {
  padding: 12px 0;
  color: var(--text-secondary);
  line-height: 1.7;
  border-bottom: 1px solid var(--glass-border);
}

.content-list li:last-child {
  border-bottom: none;
}

.content-list strong {
  color: var(--text-primary);
}

.use-cases-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.use-case-item {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.use-case-item:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.use-case-item svg {
  color: #10b981;
  margin-bottom: 16px;
}

.use-case-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.use-case-item p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
  margin: 0;
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.tip-item svg {
  color: #10b981;
  margin-top: 4px;
  flex-shrink: 0;
}

.tip-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.tip-item p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.7;
  margin: 0;
}

/* FAQs */
.faq-container {
  margin: 60px 0;
}

.faq-container h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 32px;
  text-align: center;
  justify-content: center;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  padding: 24px;
}

.faq-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
}

/* Related Tools */
.related-tools-section {
  margin: 60px 0;
}

.related-tools-section h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 32px;
  text-align: center;
  justify-content: center;
}

.featured-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.featured-tool-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.featured-tool-card:hover {
  transform: translateY(-4px);
  border-color: rgba(16, 185, 129, 0.4);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.tool-icon-wrapper {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 12px;
  margin-bottom: 16px;
}

.tool-icon-wrapper svg {
  color: #10b981;
}

.featured-tool-card h3 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.featured-tool-card p {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.6;
  margin: 0 0 16px;
  flex: 1;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #10b981;
  font-weight: 600;
  font-size: 0.9375rem;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .body-areas-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .symptoms-grid {
    grid-template-columns: 1fr;
  }

  .tool-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .emergency-alert {
    flex-direction: column;
  }

  .features-grid,
  .doctor-visit-grid,
  .conditions-grid,
  .use-cases-grid,
  .featured-tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
