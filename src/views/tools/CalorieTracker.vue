<template>
  <div class="tool-page calorie-tracker-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Calorie Tracker" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="activity" :size="16" />
          Nutrition Tracking & Calorie Management
        </p>
        <h1>Free Calorie Tracker & Daily Calorie Calculator</h1>
        <p class="hero-subtitle">
          Track your daily calories, monitor macronutrients (protein, carbs, fats), and achieve your health goals. 
          Calculate your personalized BMR and TDEE, then log foods from our extensive database including Pakistani 
          cuisine. All calculations happen instantly in your browser—your privacy is guaranteed.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="activity" :size="14" />
            Calorie Tracking
          </span>
          <span class="badge">
            <Icon name="bar-chart" :size="14" />
            Macro Monitoring
          </span>
          <span class="badge">
            <Icon name="zap" :size="14" />
            BMR & TDEE Calculator
          </span>
          <span class="badge">
            <Icon name="target" :size="14" />
            Goal-Based Planning
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
          <strong>Calorie Tracker</strong> helps users track daily calorie intake and monitor macronutrients (protein, carbohydrates, fats). The tool calculates personalized Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor equation, then allows users to log foods from an extensive database including Pakistani cuisine (biryani, nihari, haleem, chapati) and international foods. 
          Users can set weight goals (lose, maintain, or gain weight) and track progress throughout the day. The tool provides real-time calorie and macro calculations, helping users make informed dietary decisions. All calculations happen instantly in the user's browser for complete privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="activity" :size="20" />
            Calorie Tracker & Calculator
          </h2>
          <div class="tool-actions" v-if="dailyCalories || foods.length > 0">
            <button @click="copyResults" class="icon-btn" title="Copy Results">
              <Icon name="copy" :size="18" />
            </button>
            <button @click="downloadLog" class="icon-btn" title="Download Report">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetAll" class="icon-btn" title="Reset All">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
          
          <!-- Daily Calorie Calculator Section -->
        <section class="calculator-section">
            <h3>
              <Icon name="target" :size="18" />
              Calculate Your Daily Calorie Needs
            </h3>
            <p class="section-intro">
              Your daily calorie requirement depends on your age, weight, height, gender, and activity level. 
              Use this calculator to find your personalized calorie target based on the scientifically-validated 
              Mifflin-St Jeor equation.
            </p>
          
          <div class="calculator-grid">
            <div class="form-group">
                <label>
                  <Icon name="calendar" :size="14" />
                  Age (years)
                </label>
                <input 
                  type="number" 
                  v-model.number="profile.age" 
                  min="10" 
                  max="100" 
                  placeholder="25"
                  class="styled-input"
                  aria-label="Age in years"
                >
            </div>
            <div class="form-group">
                <label>
                  <Icon name="user" :size="14" />
                  Gender
                </label>
                <select v-model="profile.gender" class="styled-input" aria-label="Gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div class="form-group">
                <label>
                  <Icon name="activity" :size="14" />
                  Weight (kg)
                </label>
                <input 
                  type="number" 
                  v-model.number="profile.weight" 
                  min="30" 
                  max="300" 
                  placeholder="70"
                  class="styled-input"
                  step="0.1"
                  aria-label="Weight in kilograms"
                >
            </div>
            <div class="form-group">
                <label>
                  <Icon name="trending-up" :size="14" />
                  Height (cm)
                </label>
                <input 
                  type="number" 
                  v-model.number="profile.height" 
                  min="100" 
                  max="250" 
                  placeholder="170"
                  class="styled-input"
                  aria-label="Height in centimeters"
                >
            </div>
            <div class="form-group full-width">
                <label>
                  <Icon name="zap" :size="14" />
                  Activity Level
                </label>
                <select v-model="profile.activityLevel" class="styled-input" aria-label="Activity level">
                <option value="1.2">Sedentary (little or no exercise)</option>
                <option value="1.375">Lightly Active (exercise 1-3 days/week)</option>
                <option value="1.55">Moderately Active (exercise 3-5 days/week)</option>
                <option value="1.725">Very Active (exercise 6-7 days/week)</option>
                <option value="1.9">Extremely Active (physical job + exercise)</option>
              </select>
                <small class="hint">Used to calculate your Total Daily Energy Expenditure (TDEE)</small>
            </div>
            <div class="form-group full-width">
                <label>
                  <Icon name="flag" :size="14" />
                  Goal
                </label>
                <select v-model="profile.goal" class="styled-input" aria-label="Health goal">
                <option value="lose">Lose Weight (500 cal deficit)</option>
                <option value="maintain">Maintain Weight</option>
                <option value="gain">Gain Weight (500 cal surplus)</option>
              </select>
                <small class="hint">We'll adjust your calorie target based on your goal</small>
            </div>
          </div>
          
            <button 
              @click="calculateDailyCalories" 
              class="btn btn-primary btn-large"
              :disabled="!canCalculate"
              aria-label="Calculate daily calories"
            >
              <Icon name="zap" :size="20" />
              <span>Calculate My Daily Calories</span>
          </button>
          
            <div v-if="dailyCalories" class="results-display">
              <h4>Your Personalized Calorie Plan</h4>
            <div class="calorie-breakdown">
              <div class="calorie-stat">
                  <div class="stat-header">
                    <Icon name="zap" :size="20" />
                <div class="stat-label">BMR (Basal Metabolic Rate)</div>
                  </div>
                  <div class="stat-value">{{ formatNumber(bmr) }} <small>cal/day</small></div>
                  <p class="stat-note">Calories burned at complete rest</p>
              </div>
              <div class="calorie-stat primary">
                  <div class="stat-header">
                    <Icon name="target" :size="20" />
                <div class="stat-label">Daily Calorie Target</div>
                  </div>
                  <div class="stat-value">{{ formatNumber(dailyCalories) }} <small>cal/day</small></div>
                <p class="stat-note">{{ getGoalText() }}</p>
              </div>
              <div class="calorie-stat">
                  <div class="stat-header">
                    <Icon name="bar-chart" :size="20" />
                <div class="stat-label">Recommended Macros</div>
                </div>
                  <div class="stat-value macro-breakdown">
                    <div class="macro-item">
                      <strong>P:</strong> {{ Math.round(dailyCalories * 0.3 / 4) }}g
              </div>
                    <div class="macro-item">
                      <strong>C:</strong> {{ Math.round(dailyCalories * 0.4 / 4) }}g
                    </div>
                    <div class="macro-item">
                      <strong>F:</strong> {{ Math.round(dailyCalories * 0.3 / 9) }}g
                    </div>
                  </div>
                  <p class="stat-note">Protein / Carbs / Fats (30/40/30 split)</p>
                </div>
            </div>
          </div>
        </section>

        <!-- Food Tracker Section -->
        <section class="tracker-section">
            <h3>
              <Icon name="apple" :size="18" />
              Track Your Daily Food Intake
            </h3>
            <p class="section-intro">
              Search and add foods to track your calories throughout the day. Our database includes common foods, 
              Pakistani cuisine (biryani, nihari, haleem, chapati), and international dishes. All calculations are 
              instant and accurate.
            </p>
          
          <div class="food-input-wrapper">
            <div class="food-search">
                <Icon name="search" :size="18" class="search-icon-input" />
              <input 
                v-model="searchQuery"
                @input="filterFoods"
                type="text" 
                placeholder="Search foods (e.g., chicken breast, biryani, apple)"
                  class="styled-input search-input"
                  aria-label="Search for foods"
              >
            </div>
              
            <div class="food-input-group">
              <input 
                v-model="foodName" 
                type="text" 
                placeholder="Food name"
                  class="styled-input"
                @keyup.enter="addFood"
                  aria-label="Food name"
              >
              <input 
                v-model.number="foodGrams" 
                type="number" 
                placeholder="Grams"
                min="1"
                  class="styled-input"
                @keyup.enter="addFood"
                  aria-label="Amount in grams"
              >
                <button @click="addFood" class="btn btn-primary" aria-label="Add food">
                  <Icon name="check-circle" :size="18" />
                  <span>Add</span>
                </button>
            </div>
            
            <div v-if="filteredFoods.length > 0 && searchQuery" class="food-suggestions-list">
                <div class="suggestion-header">
                  <Icon name="star" :size="16" />
                  Quick Add Suggestions:
                </div>
              <div class="suggestions-grid">
                <button 
                    v-for="food in filteredFoods.slice(0, 8)" 
                  :key="food"
                  @click="quickAdd(food)"
                  class="suggestion-btn"
                    :aria-label="`Quick add ${food}`"
                >
                  {{ food }}
                </button>
              </div>
            </div>
          </div>

          <div v-if="foods.length > 0" class="logged-foods">
              <div class="section-header">
                <h4>
                  <Icon name="calendar" :size="18" />
                  Today's Food Log
                </h4>
                <button @click="clearAll" class="btn-text" aria-label="Clear all foods">
                  <Icon name="x" :size="16" />
                  Clear All
                </button>
              </div>
            <div class="foods-list">
                <div v-for="(food, index) in foods" :key="index" class="food-item">
                <div class="food-details">
                    <h5>{{ food.name }}</h5>
                  <p class="food-amount">{{ food.grams }}g | {{ food.category }}</p>
                </div>
                <div class="food-nutrients">
                  <span class="nutrient primary">
                    <strong>{{ food.calories }}</strong> cal
                  </span>
                  <span class="nutrient">P: {{ food.protein }}g</span>
                  <span class="nutrient">C: {{ food.carbs }}g</span>
                  <span class="nutrient">F: {{ food.fat }}g</span>
                </div>
                  <button 
                    @click="removeFood(index)" 
                    class="btn-remove" 
                    aria-label="Remove food"
                  >
                   <Icon name="x" :size="16" />
                </button>
              </div>
            </div>

              <div class="totals-summary">
                <h4>
                  <Icon name="bar-chart" :size="18" />
                  Daily Totals
                </h4>
              <div class="totals-grid">
                  <div class="total-item highlight">
                    <div class="total-value">{{ formatNumber(totalCalories) }}</div>
                  <div class="total-label">Total Calories</div>
                  <div v-if="dailyCalories" class="total-progress">
                    <div class="progress-bar">
                        <div 
                          class="progress-fill" 
                          :class="getProgressClass()"
                          :style="{ width: Math.min((totalCalories / dailyCalories) * 100, 100) + '%' }"
                        ></div>
                    </div>
                      <p class="progress-text">
                        {{ Math.round((totalCalories / dailyCalories) * 100) }}% of daily goal
                        <span v-if="totalCalories > dailyCalories" class="over-budget">
                          ({{ formatNumber(totalCalories - dailyCalories) }} over)
                        </span>
                        <span v-else-if="totalCalories < dailyCalories" class="under-budget">
                          ({{ formatNumber(dailyCalories - totalCalories) }} remaining)
                        </span>
                      </p>
                  </div>
                </div>
                <div class="total-item">
                  <div class="total-value">{{ totalProtein }}g</div>
                  <div class="total-label">Protein</div>
                    <div v-if="dailyCalories" class="macro-target">
                      Target: {{ Math.round(dailyCalories * 0.3 / 4) }}g
                    </div>
                </div>
                <div class="total-item">
                  <div class="total-value">{{ totalCarbs }}g</div>
                  <div class="total-label">Carbs</div>
                    <div v-if="dailyCalories" class="macro-target">
                      Target: {{ Math.round(dailyCalories * 0.4 / 4) }}g
                    </div>
                </div>
                <div class="total-item">
                  <div class="total-value">{{ totalFat }}g</div>
                  <div class="total-label">Fat</div>
                    <div v-if="dailyCalories" class="macro-target">
                      Target: {{ Math.round(dailyCalories * 0.3 / 9) }}g
                    </div>
                </div>
              </div>
              
              <div class="action-buttons">
                  <button @click="shareResults" class="btn btn-outline">
                    <Icon name="share-2" :size="18" />
                    <span>Share Results</span>
                </button>
                  <button @click="downloadLog" class="btn btn-outline">
                    <Icon name="download" :size="18" />
                    <span>Download Log</span>
                </button>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
              <Icon name="apple" :size="64" />
              <h4>No foods logged yet</h4>
              <p>Start tracking by searching and adding foods above. Every meal counts toward your daily goal!</p>
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
            How Calorie Tracking Works
          </h2>
          <p>
            Calorie tracking is the practice of monitoring the energy content of the foods you consume. 
            Understanding calories—units of energy your body uses for fuel—is fundamental to managing your weight, 
            building muscle, or maintaining optimal health.
          </p>

          <h3>What Are Calories and Why Do They Matter?</h3>
          <p>
            A calorie is a unit of energy. When you eat food, your body breaks it down to extract calories, 
            which power everything from breathing and thinking to walking and exercising. The balance between 
            calories consumed and calories burned determines whether you gain, lose, or maintain weight.
          </p>
          <p>
            <strong>Calorie Balance:</strong>
          </p>
          <ul class="feature-list">
            <li><strong>Calorie Surplus:</strong> Eating more calories than you burn leads to weight gain</li>
            <li><strong>Calorie Deficit:</strong> Eating fewer calories than you burn leads to weight loss</li>
            <li><strong>Calorie Maintenance:</strong> Eating the same calories you burn maintains your current weight</li>
          </ul>

          <h3>Understanding BMR and TDEE</h3>
          <p>
            Your <strong>Basal Metabolic Rate (BMR)</strong> is the number of calories your body burns at complete rest—just 
            to maintain basic functions like breathing, circulation, and cell production. We calculate this using the 
            Mifflin-St Jeor equation, which is considered the most accurate formula available.
          </p>
          <p>
            Your <strong>Total Daily Energy Expenditure (TDEE)</strong> is your BMR multiplied by an activity factor. 
            This represents your actual daily calorie burn, including all physical activity. TDEE is the number you need 
            to know for effective weight management.
          </p>

          <h3>Macronutrients: Protein, Carbs, and Fats</h3>
          <p>
            While calories determine weight change, macronutrients determine body composition and health:
          </p>
          <ul>
            <li>
              <strong>Protein (4 calories per gram):</strong> Essential for muscle repair, immune function, and satiety. 
              Aim for 1.6-2.2g per kg of body weight for muscle building, or 1.2-1.6g for general health.
            </li>
            <li>
              <strong>Carbohydrates (4 calories per gram):</strong> Your body's primary energy source. Important for 
              brain function, exercise performance, and recovery. Complex carbs (whole grains, vegetables) are preferred 
              over simple carbs (sugar, white bread).
            </li>
            <li>
              <strong>Fats (9 calories per gram):</strong> Essential for hormone production, vitamin absorption, and 
              cell function. Healthy fats (olive oil, nuts, avocados) support overall health. Aim for 20-35% of total calories.
            </li>
          </ul>

          <h3>Why Track Calories?</h3>
          <p>
            Research consistently shows that people underestimate their calorie intake by 20-50%. Without tracking, 
            you're essentially guessing—and guesses are often wrong. Calorie tracking provides:
          </p>
          <ul>
            <li><strong>Awareness:</strong> See exactly what and how much you're eating</li>
            <li><strong>Accountability:</strong> Numbers don't lie—they show your actual intake</li>
            <li><strong>Control:</strong> Make informed decisions about food choices and portion sizes</li>
            <li><strong>Progress:</strong> Understand why you're gaining, losing, or maintaining weight</li>
            <li><strong>Education:</strong> Learn the calorie content of foods and develop better eating habits</li>
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
              <Icon name="trending-up" :size="24" />
              <h4>Weight Loss</h4>
              <p>Create a sustainable calorie deficit of 300-500 calories per day. Track your intake to ensure you're eating the right amount for safe, steady weight loss of 0.5-1 pound per week.</p>
            </div>
            <div class="use-case-item">
              <Icon name="activity" :size="24" />
              <h4>Muscle Building</h4>
              <p>Ensure adequate calories and protein for muscle growth. Track macros to optimize recovery and performance, typically requiring a 300-500 calorie surplus with high protein intake.</p>
            </div>
            <div class="use-case-item">
              <Icon name="heart" :size="24" />
              <h4>Weight Maintenance</h4>
              <p>Maintain your current weight by eating at your TDEE. Track calories to prevent gradual weight gain from portion creep and ensure balanced nutrition.</p>
            </div>
            <div class="use-case-item">
              <Icon name="check-circle" :size="24" />
              <h4>Nutritional Awareness</h4>
              <p>Learn about food nutrition and develop better eating habits. Understand which foods are calorie-dense and which provide better nutritional value for your goals.</p>
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
                <h4>Measure Portions Accurately</h4>
                <p>Use a kitchen scale for solid foods and measuring cups for liquids. "Eye-balling" portions often leads to significant underestimation—sometimes by 30-50%. Weighing food is the gold standard for accuracy.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Log Cooking Oils and Condiments</h4>
                <p>That tablespoon of oil adds 120 calories. Sauces, dressings, butter, and cooking oils can add hundreds of hidden calories to your meals. Don't forget to track these "invisible" calories.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Track in Real-Time</h4>
                <p>Log foods immediately after eating rather than trying to remember everything at the end of the day. Your memory isn't as reliable as you think—studies show people forget 20-30% of what they eat.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Don't Forget Beverages</h4>
                <p>Juices, sodas, coffee with cream and sugar, smoothies, and alcoholic drinks can add hundreds of calories. Water is always the best zero-calorie choice. Track all liquid calories.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Account for Restaurant Meals</h4>
                <p>Restaurant meals often contain 50-100% more calories than homemade versions due to added oils, butter, larger portions, and hidden ingredients. When eating out, search for similar dishes in our database or estimate conservatively.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Focus on Consistency Over Perfection</h4>
                <p>Tracking 80-90% accurately every day beats perfect tracking on some days and not tracking on others. Make it a sustainable habit rather than an all-or-nothing approach.</p>
          </div>
        </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Prioritize Protein</h4>
                <p>Aim for 1.6-2.2g of protein per kg of body weight if building muscle, or 1.2-1.6g for general health. Protein keeps you full, preserves muscle during weight loss, and supports recovery.</p>
            </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Recalculate Regularly</h4>
                <p>As you lose or gain weight, your calorie needs change. Your BMR decreases as you lose weight. Recalculate your TDEE every 10-15 pounds of weight change, or if your activity level changes significantly.</p>
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
              All calculations and food tracking happen directly in your web browser. We never store, transmit, 
              or have access to your personal health data. Your information stays completely private on your device.
            </p>
        </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Medical Disclaimer</h3>
            <p>
              This calorie tracker provides estimates for informational purposes only. It is not a substitute for 
              professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare providers 
              or registered dietitians for personalized nutrition guidance.
            </p>
        </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Take Control of Your Nutrition?</h2>
          <p>Start tracking your calories today and see the difference data makes</p>
          <div class="cta-buttons">
            <button @click="scrollToCalculator" class="btn btn-primary">
              <Icon name="zap" :size="18" />
              Start Tracking Now
            </button>
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
          Related Health & Nutrition Tools
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
      <RelatedTools currentTool="/tools/calorie-tracker" category="Health" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { calorieDatabase, calculateCalories } from '@/data/calorieDatabase';
import AOS from 'aos';
import { generateToolSchema, generateFAQSchema, injectStructuredData } from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/calorie-tracker`;

useSEO({
  title: 'Free Calorie Tracker Online 2025 | BMR Calculator & Macro Tracker | Pakistani Foods',
  description: 'Track daily calories, calculate BMR and TDEE, monitor macronutrients (protein, carbs, fats) with free calorie tracker. Includes Pakistani foods database (biryani, nihari, haleem, chapati) and international foods. Set weight goals and track progress. Instant results, privacy-first, no signup required.',
  keywords: 'calorie tracker, calorie calculator, BMR calculator, TDEE calculator, track calories, food nutrition tracker, macro calculator, weight loss calculator, Pakistani food calories, free calorie counter, daily calorie calculator, macro tracker, protein tracker, carbohydrate tracker, fat tracker, food diary, nutrition log, calorie counting app',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const profile = reactive({
  age: '',
  gender: 'male',
  weight: '',
  height: '',
  activityLevel: '1.55',
  goal: 'maintain'
});

const searchQuery = ref('');
const foodName = ref('');
const foodGrams = ref(100);
const foods = ref([]);
const filteredFoods = ref([]);

const bmr = ref(0);
const dailyCalories = ref(0);

// Computed
const canCalculate = computed(() => {
  return profile.age > 0 && profile.weight > 0 && profile.height > 0;
});

const totalCalories = computed(() => foods.value.reduce((sum, food) => sum + food.calories, 0));
const totalProtein = computed(() => foods.value.reduce((sum, food) => sum + food.protein, 0).toFixed(1));
const totalCarbs = computed(() => foods.value.reduce((sum, food) => sum + food.carbs, 0).toFixed(1));
const totalFat = computed(() => foods.value.reduce((sum, food) => sum + food.fat, 0).toFixed(1));

const featuredTools = [
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate your BMI, BMR, TDEE, and ideal weight range'
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

function calculateDailyCalories() {
  if (!canCalculate.value) {
    alert('Please fill in all required fields (age, weight, height)');
    return;
  }

  if (profile.gender === 'male') {
    bmr.value = Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5);
  } else {
    bmr.value = Math.round(10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161);
  }
  
  const tdee = Math.round(bmr.value * parseFloat(profile.activityLevel));
  
  if (profile.goal === 'lose') {
    dailyCalories.value = Math.max(1200, tdee - 500); // Minimum 1200 for safety
  } else if (profile.goal === 'gain') {
    dailyCalories.value = tdee + 500;
  } else {
    dailyCalories.value = tdee;
  }

  // Scroll to results
  setTimeout(() => {
    document.querySelector('.results-display')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function getGoalText() {
  if (profile.goal === 'lose') return 'For healthy weight loss (~0.5kg/week)';
  if (profile.goal === 'gain') return 'For muscle gain (~0.5kg/week)';
  return 'To maintain current weight';
}

function filterFoods() {
  if (!searchQuery.value) {
    filteredFoods.value = [];
    return;
  }
  const query = searchQuery.value.toLowerCase();
  filteredFoods.value = Object.keys(calorieDatabase)
    .filter(food => food.toLowerCase().includes(query))
    .slice(0, 10);
}

function quickAdd(food) {
  foodName.value = food;
  foodGrams.value = 100;
  searchQuery.value = '';
  filteredFoods.value = [];
  // Auto-add after quick select
  setTimeout(() => {
    addFood();
  }, 100);
}

function addFood() {
  if (!foodName.value || !foodGrams.value || foodGrams.value <= 0) {
    alert('Please enter a food name and valid amount in grams');
    return;
  }
  
  const result = calculateCalories(foodName.value, foodGrams.value);
  if (result) {
    foods.value.push(result);
    foodName.value = '';
    foodGrams.value = 100;
    searchQuery.value = '';
    filteredFoods.value = [];
  } else {
    alert(`Sorry, "${foodName.value}" is not in our database yet. Try searching for a similar food or check the spelling!`);
  }
}

function removeFood(index) {
  foods.value.splice(index, 1);
}

function clearAll() {
  if (confirm('Are you sure you want to clear all logged foods?')) {
    foods.value = [];
  }
}

function resetAll() {
  if (confirm('Reset all data including calorie calculation and food log?')) {
    profile.age = '';
    profile.weight = '';
    profile.height = '';
    profile.activityLevel = '1.55';
    profile.goal = 'maintain';
    bmr.value = 0;
    dailyCalories.value = 0;
    foods.value = [];
    foodName.value = '';
    foodGrams.value = 100;
    searchQuery.value = '';
    filteredFoods.value = [];
  }
}

function getProgressClass() {
  if (!dailyCalories.value) return '';
  const percentage = (totalCalories.value / dailyCalories.value) * 100;
  if (percentage > 100) return 'over-budget';
  if (percentage > 90) return 'near-limit';
  return 'normal';
}

function copyResults() {
  let text = 'Calorie Tracker Results\n\n';
  
  if (dailyCalories.value) {
    text += `Daily Calorie Target: ${formatNumber(dailyCalories.value)} cal/day\n`;
    text += `BMR: ${formatNumber(bmr.value)} cal/day\n\n`;
  }
  
  if (foods.value.length > 0) {
    text += `Food Log:\n`;
    foods.value.forEach(food => {
      text += `- ${food.name} (${food.grams}g): ${food.calories} cal\n`;
    });
    text += `\nTotal: ${formatNumber(totalCalories.value)} cal\n`;
    text += `Protein: ${totalProtein.value}g | Carbs: ${totalCarbs.value}g | Fat: ${totalFat.value}g\n`;
  }
  
  text += `\nGenerated by FikrNa - ${window.location.href}`;

  navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard!');
  });
}

function shareResults() {
  const text = `I tracked ${formatNumber(totalCalories.value)} calories today using FikrNa Calorie Tracker! \nProtein: ${totalProtein.value}g | Carbs: ${totalCarbs.value}g | Fat: ${totalFat.value}g\n\nTrack yours free at ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title: 'My Calorie Tracker Results', text });
  } else {
    navigator.clipboard.writeText(text).then(() => {
    alert('Results copied to clipboard! Share with friends.');
    });
  }
}

function downloadLog() {
  const content = `Calorie Tracker Report\n` +
    `Generated: ${new Date().toLocaleString()}\n\n` +
    (dailyCalories.value ? `CALORIE GOALS\n` +
    `Daily Target: ${formatNumber(dailyCalories.value)} cal/day\n` +
    `BMR: ${formatNumber(bmr.value)} cal/day\n` +
    `Goal: ${profile.goal === 'lose' ? 'Weight Loss' : profile.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}\n\n` : '') +
    `FOOD LOG\n` +
    `Food,Grams,Calories,Protein (g),Carbs (g),Fat (g),Category\n` +
    foods.value.map(f => `${f.name},${f.grams},${f.calories},${f.protein},${f.carbs},${f.fat},${f.category}`).join('\n') +
    `\n\nTOTALS\n` +
    `Total Calories: ${formatNumber(totalCalories.value)}\n` +
    `Total Protein: ${totalProtein.value}g\n` +
    `Total Carbs: ${totalCarbs.value}g\n` +
    `Total Fat: ${totalFat.value}g\n\n` +
    (dailyCalories.value ? `Progress: ${Math.round((totalCalories.value / dailyCalories.value) * 100)}% of daily goal\n` : '') +
    `\nDISCLAIMER\n` +
    `These calculations are estimates for informational purposes only. Consult a healthcare professional for personalized advice.\n\n` +
    `Generated by FikrNa - ${window.location.href}`;

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `calorie-log-${new Date().toISOString().split('T')[0]}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function scrollToCalculator() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQs
const faqs = [
    {
      question: 'How many calories should I eat per day to lose weight?',
    answer: 'For safe and sustainable weight loss, create a deficit of 500 calories per day from your Total Daily Energy Expenditure (TDEE). This results in approximately 1 pound (0.45 kg) of weight loss per week. Use our calculator above to find your personalized number. Never go below 1200 calories for women or 1500 calories for men without medical supervision.' 
    },
    {
      question: 'Is this calorie tracker accurate?',
    answer: 'Our calorie database uses verified nutritional information from USDA and international food databases. The BMR calculator uses the scientifically-validated Mifflin-St Jeor equation. However, all calorie calculations are estimates—individual metabolic rates vary by 10-15%. Monitor your actual weight changes over 2-4 weeks and adjust your intake accordingly.' 
  },
  { 
    question: 'Do I have to track calories forever?', 
    answer: 'Not necessarily. Many people track calories initially to learn proper portion sizes and understand food nutrition. After 2-3 months, you\'ll develop a good intuition for calories and portion sizes. Some people continue tracking long-term, while others use it periodically when cutting or bulking. It\'s a tool—use it as needed.' 
  },
  { 
    question: 'What about cheat meals or days off?', 
    answer: 'It\'s your overall weekly average that matters most. If you eat 200 calories over your goal one day but 200 under the next day, it balances out. That said, one massive cheat day can undo a week\'s deficit. A better approach: build in flexibility by eating 100-150 calories less on weekdays, giving you more room on weekends.' 
  },
  { 
    question: 'How accurate do I need to be with tracking?', 
    answer: 'Aim for 90% accuracy. You don\'t need to stress over 5 grams of vegetables, but you should weigh calorie-dense foods like oils, nuts, cheese, and grains. The 80/20 rule applies: be precise with the foods that make up 80% of your calories, and you can estimate the rest.' 
  },
  { 
    question: 'Should I track macros (protein, carbs, fats) or just calories?', 
    answer: 'Both matter. Calories determine weight change, but macros determine what type of weight (fat vs. muscle). For best results, hit your calorie target AND get adequate protein (1.6-2.2g per kg body weight). Fill the rest with carbs and fats based on your preferences and energy needs.' 
    },
    {
      question: 'Can I use this tracker for Pakistani foods?',
    answer: 'Absolutely! Our database includes popular Pakistani dishes like biryani, nihari, haleem, chapati, roti, samosas, pakoras, tikka, and traditional desserts. We\'ve researched and included accurate calorie counts for these foods based on standard recipes.' 
  },
  { 
    question: 'What if I can\'t find a food in your database?', 
    answer: 'For unlisted foods, find a similar item in the database and use that as an estimate. For example, if you can\'t find a specific curry, use "chicken curry" as a baseline. You can also search online for the nutritional information and manually calculate the calories based on ingredients.' 
  },
  { 
    question: 'How do I handle eating out at restaurants?', 
    answer: 'Restaurant meals are tricky because recipes vary widely. Your best approach: look up the restaurant\'s nutrition information online (many chains publish this), search for similar dishes in our database, or estimate by breaking down the meal into components (protein source, carb source, oils/sauces, vegetables).' 
  },
  { 
    question: 'Is my data private and secure?', 
    answer: 'Yes! This tool runs entirely in your browser with no server connections. Your food logs never leave your device and aren\'t stored anywhere online. Your privacy is 100% guaranteed—we literally cannot access your data even if we wanted to.' 
  }
];

// Lifecycle
onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'Calorie Tracker - BMR Calculator & Macro Tracker',
    description: 'Track daily calories, calculate BMR and TDEE, monitor macronutrients (protein, carbs, fats) with Pakistani and international foods. Free, private, and accurate calorie tracking tool.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      'Daily calorie tracking',
      'BMR and TDEE calculation',
      'Macronutrient monitoring (protein, carbs, fats)',
      'Pakistani food database',
      'International food database',
      'Weight goal setting',
      'Real-time calorie calculations',
      'Food logging and diary'
    ],
    usageInfo: 'Enter age, gender, weight, height, and activity level to calculate BMR/TDEE. Search and log foods to track daily intake and monitor macros.',
    helpText: 'Calorie Tracker helps you monitor daily nutrition intake and achieve weight goals through accurate calorie and macro tracking.'
  });
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Calorie Tracker', path: '/tools/calorie-tracker' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Calorie Tracker Online 2025 | BMR Calculator & Macro Tracker',
    description: 'Track calories, calculate BMR and TDEE, monitor macronutrients with free calorie tracker. Includes Pakistani foods database.',
    about: [
      { '@type': 'Thing', name: 'Calorie tracking' },
      { '@type': 'Thing', name: 'Nutrition tracking' },
      { '@type': 'Thing', name: 'BMR calculator' },
      { '@type': 'Thing', name: 'Macronutrient tracking' }
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
.calorie-tracker-page {
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
.tracker-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--glass-border);
}

.tracker-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.calculator-section h3,
.tracker-section h3 {
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

.calculator-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
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
  max-width: 400px;
  padding: 16px;
  font-size: 1.0625rem;
  justify-content: center;
  margin: 0 auto;
  display: block;
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

.btn-text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-text:hover {
  color: #ef4444;
}

/* Results Display */
.results-display {
  margin-top: 32px;
  padding: 32px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-lg);
}

.results-display h4 {
  text-align: center;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 700;
}

.calorie-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.calorie-stat {
  padding: 24px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  text-align: center;
  transition: all 0.2s;
}

.calorie-stat:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.calorie-stat.primary {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.05));
  border: 2px solid #10b981;
}

.stat-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;
}

.stat-header svg {
  color: #10b981;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.stat-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1;
}

.stat-value small {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.macro-breakdown {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 1.125rem;
}

.macro-item {
  color: var(--text-primary);
  font-weight: 600;
}

.macro-item strong {
  color: #10b981;
}

.stat-note {
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  margin: 0;
  margin-top: 8px;
}

/* Food Tracker */
.food-input-wrapper {
  margin-bottom: 32px;
}

.food-search {
  position: relative;
  margin-bottom: 16px;
}

.search-icon-input {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  pointer-events: none;
}

.search-input {
  padding-left: 48px;
}

.food-input-group {
  display: grid;
  grid-template-columns: 2fr 1fr auto;
  gap: 12px;
}

.food-suggestions-list {
  margin-top: 16px;
  padding: 20px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: var(--radius-md);
}

.suggestion-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-weight: 600;
}

.suggestion-header svg {
  color: #10b981;
}

.suggestions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 8px;
}

.suggestion-btn {
  padding: 10px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  text-transform: capitalize;
  font-size: 0.875rem;
  font-weight: 500;
}

.suggestion-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  transform: translateY(-2px);
}

.logged-foods {
  margin-top: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-header h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-primary);
  font-weight: 700;
}

.foods-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.food-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  gap: 16px;
  transition: all 0.2s;
}

.food-item:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.food-details {
  flex: 1;
}

.food-details h5 {
  margin: 0 0 4px;
  font-size: 1.125rem;
  text-transform: capitalize;
  color: var(--text-primary);
  font-weight: 600;
}

.food-amount {
  margin: 0;
  color: var(--text-tertiary);
  font-size: 0.875rem;
}

.food-nutrients {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.nutrient {
  font-size: 0.875rem;
  color: var(--text-secondary);
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.nutrient.primary {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-size: 1rem;
  font-weight: 700;
}

.btn-remove {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.btn-remove:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

/* Totals Summary */
.totals-summary {
  padding: 32px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  margin-top: 24px;
}

.totals-summary h4 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  justify-content: center;
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 700;
}

.totals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.total-item {
  text-align: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  transition: all 0.2s;
}

.total-item:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.total-item.highlight {
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid #10b981;
}

.total-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #10b981;
  line-height: 1;
  margin-bottom: 8px;
}

.total-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  margin-bottom: 8px;
}

.macro-target {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.total-progress {
  margin-top: 12px;
}

.progress-bar {
  height: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #14b8a6);
  border-radius: 12px;
  transition: width 0.3s ease;
}

.progress-fill.over-budget {
  background: linear-gradient(90deg, #ef4444, #f87171);
}

.progress-fill.near-limit {
  background: linear-gradient(90deg, #fbbf24, #f59e0b);
}

.progress-text {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin: 0;
}

.over-budget {
  color: #ef4444;
  font-weight: 600;
}

.under-budget {
  color: #10b981;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 24px;
}

.empty-state {
  text-align: center;
  padding: 60px 32px;
  opacity: 0.7;
}

.empty-state svg {
  color: var(--text-tertiary);
  margin-bottom: 16px;
}

.empty-state h4 {
  color: var(--text-primary);
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.empty-state p {
  color: var(--text-secondary);
  margin: 0;
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
  text-align: center;
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

  .calculator-grid {
    grid-template-columns: 1fr;
  }

  .food-input-group {
    grid-template-columns: 1fr;
  }
  
  .food-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .food-nutrients {
    width: 100%;
    justify-content: flex-start;
  }
  
  .totals-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
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

  .calorie-breakdown {
    grid-template-columns: 1fr;
  }
}
</style>
