<template>
  <div class="tool-page meal-planner-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Meal Planner" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="calendar" :size="16" />
          Weekly Meal Planning & Recipe Generation
        </p>
        <h1>International Meal Planner & Recipe Generator</h1>
        <p class="hero-subtitle">
          Plan your weekly meals with recipes from around the world. Get personalized meal plans based on your dietary needs, health goals, and available ingredients—completely free and privacy-focused.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="calendar" :size="14" />
            7-Day Plans
          </span>
          <span class="badge">
            <Icon name="globe" :size="14" />
            International Recipes
          </span>
          <span class="badge">
            <Icon name="shield" :size="14" />
            Halal Options
          </span>
          <span class="badge">
            <Icon name="zap" :size="14" />
            Quick Meals
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
          <strong>Meal Planner</strong> generates weekly meal plans with recipes from international cuisines including Middle Eastern, Mediterranean, Italian, Turkish, Pakistani, and more. The tool creates personalized 7-day meal plans based on dietary preferences (halal, vegetarian, vegan, keto, gluten-free), regional availability of ingredients, and health goals. 
          Users select their region, dietary restrictions, meal preferences, and the tool provides breakfast, lunch, and dinner suggestions with recipes, ingredients lists, preparation times, and nutritional information. The meal planner helps users save time on meal planning, discover new recipes, and maintain balanced nutrition. All planning happens instantly in the browser for privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="calendar" :size="20" />
            Meal Planner & Recipe Generator
          </h2>
          <div class="tool-actions" v-if="mealPlan">
            <button @click="copyMealPlan" class="icon-btn" title="Copy Plan">
              <Icon name="copy" :size="18" />
            </button>
            <button @click="downloadMealPlan" class="icon-btn" title="Download Plan">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetAll" class="icon-btn" title="Reset All">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
        
        <!-- Preferences Section -->
        <section class="preferences-section">
          <h3>
            <Icon name="settings" :size="18" />
            Your Meal Planning Preferences
          </h3>
          
          <div class="preferences-grid">
            <!-- Region Selection -->
            <div class="preference-group">
              <label>
                <Icon name="globe" :size="14" />
                Your Region
              </label>
              <select v-model="preferences.region" class="styled-input">
                <option value="">Select Region</option>
                <optgroup label="North America">
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Mexico">Mexico</option>
                </optgroup>
                <optgroup label="🌍 Europe">
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
                <optgroup label="🌍 Middle East & GCC">
                  <option value="UAE">UAE</option>
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
                <optgroup label="🌍 Asia Pacific">
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
                <optgroup label="🌍 Africa">
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Morocco">Morocco</option>
                </optgroup>
                <optgroup label="🌍 South America">
                  <option value="Brazil">Brazil</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Chile">Chile</option>
                  <option value="Colombia">Colombia</option>
                </optgroup>
              </select>
            </div>

            <!-- Family Size -->
            <div class="preference-group">
              <label>
                <Icon name="users" :size="14" />
                Family Size
              </label>
              <select v-model="preferences.familySize" class="styled-input">
                <option :value="1">Single Person</option>
                <option :value="2">Couple (2 people)</option>
                <option :value="4">Family (4 people)</option>
                <option :value="6">Large Family (6 people)</option>
              </select>
            </div>

            <!-- Health Goal -->
            <div class="preference-group">
              <label>
                <Icon name="target" :size="14" />
                Health Goal
              </label>
              <select v-model="preferences.healthGoal" class="styled-input">
                <option value="">No Specific Goal</option>
                <option value="weightLoss">Weight Loss</option>
                <option value="weightGain">Weight Gain</option>
                <option value="muscleBuilding">Muscle Building</option>
                <option value="healthyEating">Healthy Eating</option>
                <option value="diabeticControl">Diabetic Control</option>
                <option value="heartHealthy">Heart-Healthy Diet</option>
              </select>
            </div>

            <!-- Time Preference -->
            <div class="preference-group">
              <label>⏱️ Cooking Time</label>
              <select v-model="preferences.timeCategory">
                <option value="">Any Time</option>
                <option value="under-10">10-Minute Meals</option>
                <option value="under-20">20-Minute Meals</option>
                <option value="under-30">Under 30 Minutes</option>
                <option value="meal-prep">Meal Prep Ideas</option>
              </select>
            </div>
          </div>

          <!-- Diet Filters -->
          <div class="diet-filters">
            <h3>Dietary Preferences</h3>
            <div class="filters-grid">
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.halal">
                <span>☪️ Halal</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.vegetarian">
                <span>🥗 Vegetarian</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.vegan">
                <span>🌱 Vegan</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.keto">
                <span>🥑 Keto</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.lowCarb">
                <span>🍞 Low-Carb</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.highProtein">
                <span>💪 High-Protein</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.glutenFree">
                <span>🌾 Gluten-Free</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.dairyFree">
                <span>🥛 Dairy-Free</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.diabeticFriendly">
                <span>🩺 Diabetic-Friendly</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" v-model="dietFilters.heartHealthy">
                <span>❤️ Heart-Healthy</span>
              </label>
            </div>
          </div>

          <!-- Allergy Filters -->
          <div class="allergy-filters">
            <h3>
              <Icon name="alert-circle" :size="18" />
              Avoid Allergens
            </h3>
            <div class="filters-grid">
              <label class="filter-checkbox">
                <input type="checkbox" value="dairy" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Dairy</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="gluten" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Gluten</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="nuts" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Nuts</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="eggs" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Eggs</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="shellfish" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Shellfish</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="soy" v-model="allergyFilters">
                <Icon name="x-circle" :size="16" />
                <span>Soy</span>
              </label>
            </div>
          </div>

          <!-- Cuisine Selection -->
          <div class="cuisine-filters">
            <h3>Preferred Cuisines</h3>
            <div class="filters-grid">
              <label class="filter-checkbox">
                <input type="checkbox" value="Middle Eastern" v-model="cuisineFilters">
                <span>🕌 Middle Eastern</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="Mediterranean" v-model="cuisineFilters">
                <span>🌊 Mediterranean</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="Italian" v-model="cuisineFilters">
                <span>🇮🇹 Italian</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="Turkish" v-model="cuisineFilters">
                <span>🇹🇷 Turkish</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="South Asian" v-model="cuisineFilters">
                <span>🍛 South Asian</span>
              </label>
              <label class="filter-checkbox">
                <input type="checkbox" value="Continental" v-model="cuisineFilters">
                <span>🍴 Continental</span>
              </label>
            </div>
          </div>

          <button @click="generateMealPlan" class="btn btn-primary btn-large">
            📅 Generate 7-Day Meal Plan
          </button>
        </section>

        <!-- 7-Day Meal Plan Display -->
        <section v-if="mealPlan" class="meal-plan-section">
          <div class="plan-header">
            <h3>
              <Icon name="calendar" :size="20" />
              Your Personalized 7-Day Meal Plan
            </h3>
            <div class="plan-actions">
              <button @click="downloadMealPlan" class="btn btn-outline">
                <Icon name="download" :size="18" />
                <span>Download Plan</span>
              </button>
              <button @click="generateShoppingList" class="btn btn-outline">
                <Icon name="shopping-cart" :size="18" />
                <span>Shopping List</span>
              </button>
              <button @click="shareMealPlan" class="btn btn-outline">
                <Icon name="share-2" :size="18" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <div class="weekly-summary">
            <div class="summary-card">
              <h4>Total Weekly Calories</h4>
              <p class="stat-value">{{ totalWeeklyCalories }}</p>
            </div>
            <div class="summary-card">
              <h4>Avg Daily Calories</h4>
              <p class="stat-value">{{ avgDailyCalories }}</p>
            </div>
            <div class="summary-card">
              <h4>Meals Planned</h4>
              <p class="stat-value">28</p>
            </div>
          </div>

          <div class="days-container">
            <div v-for="(day, dayName) in mealPlan" :key="dayName" class="day-card glass">
              <h3>{{ dayName }}</h3>
              
              <div class="meal-slot">
                <h4>🌅 Breakfast</h4>
                <RecipeCard :recipe="day.breakfast" :familySize="preferences.familySize" />
              </div>

              <div class="meal-slot">
                <h4>☀️ Lunch</h4>
                <RecipeCard :recipe="day.lunch" :familySize="preferences.familySize" />
              </div>

              <div class="meal-slot">
                <h4>🌙 Dinner</h4>
                <RecipeCard :recipe="day.dinner" :familySize="preferences.familySize" />
              </div>

              <div class="meal-slot">
                <h4>🍿 Snack</h4>
                <RecipeCard :recipe="day.snack" :familySize="preferences.familySize" />
              </div>

              <div class="day-total">
                <strong>Daily Total: {{ calculateDayCalories(day) }} calories</strong>
              </div>
            </div>
          </div>
        </section>

        <!-- Custom Recipe Builder -->
        <section class="ingredient-search-section">
          <h3>
            <Icon name="search" :size="18" />
            Find Recipes from Your Ingredients
          </h3>
          <p class="section-intro">Enter what you have in your kitchen, and we'll suggest matching recipes.</p>
          
          <div class="ingredient-input-group">
            <input 
              v-model="ingredientInput" 
              @keyup.enter="addIngredient" 
              placeholder="Add ingredient (e.g., chicken, tomatoes, rice)"
              class="styled-input ingredient-input"
            >
            <button @click="addIngredient" class="btn btn-primary">
              <Icon name="plus" :size="18" />
              <span>Add</span>
            </button>
          </div>

          <div v-if="ingredients.length > 0" class="ingredients-display">
            <div class="ingredients-header">
              <h4>
                <Icon name="list" :size="18" />
                Your Ingredients ({{ ingredients.length }})
              </h4>
              <button @click="clearIngredients" class="btn-text">
                <Icon name="x" :size="16" />
                Clear All
              </button>
            </div>
            <div class="ingredients-list">
              <span v-for="(ing, idx) in ingredients" :key="idx" class="ingredient-tag">
                {{ ing }}
                <button @click="removeIngredient(idx)" class="remove-btn">
                  <Icon name="x" :size="14" />
                </button>
              </span>
            </div>
            <button @click="findMatchingRecipes" class="btn btn-primary">
              <Icon name="search" :size="18" />
              <span>Find Recipes</span>
            </button>
          </div>

          <!-- Matching Recipes -->
          <div v-if="matchedRecipes.length > 0" class="matched-recipes">
            <h3>{{ matchedRecipes.length }} Recipe{{ matchedRecipes.length > 1 ? 's' : '' }} Found</h3>
            <div class="recipes-grid">
              <div v-for="recipe in matchedRecipes" :key="recipe.id" class="recipe-card-full glass">
                <RecipeCard :recipe="recipe" :showFull="true" />
              </div>
            </div>
          </div>
        </section>

        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section" data-aos="fade-up">
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Why Meal Planning Changes Everything
          </h2>
          <p>
            Meal planning isn't just about knowing what's for dinner—it's about taking control of your health, budget, and time. When you plan your meals for the week, you eliminate daily decision fatigue, reduce food waste, and ensure your family eats nutritious, home-cooked meals consistently.
          </p>
          <p>
            Our international meal planner brings together recipes from Middle Eastern, Mediterranean, Italian, Turkish, South Asian, and Continental cuisines. Whether you're in Dubai craving authentic hummus, in London looking for quick tikka masala, or in Amsterdam wanting healthy meal prep ideas, we have recipes that use ingredients available in your region.
          </p>
          <p>
            The best part? Every recipe adapts to your family size automatically. Cooking for one? We'll adjust the portions. Feeding a family of six? The quantities scale perfectly. No more complicated math or wasted ingredients.
          </p>
        </article>

        <article class="content-card">
          <h2>
            <Icon name="users" :size="24" />
            Who Benefits from This Meal Planner?
          </h2>
          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="globe" :size="24" />
              <h4>Expats & International Families</h4>
              <p>Living abroad? Get recipes that use ingredients actually available in your local supermarkets. Our region-based system ensures you're not searching for items you can't find.</p>
            </div>
            <div class="use-case-item">
              <Icon name="shield" :size="24" />
              <h4>Halal Diet Followers</h4>
              <p>Enable Halal mode and all recipes automatically exclude pork, alcohol, and non-halal ingredients. Essential for Muslim families in the Gulf and worldwide.</p>
            </div>
            <div class="use-case-item">
              <Icon name="activity" :size="24" />
              <h4>Fitness Enthusiasts</h4>
              <p>Building muscle? Losing weight? Select your health goal and get meal plans optimized for your objectives with proper macro breakdowns.</p>
            </div>
            <div class="use-case-item">
              <Icon name="clock" :size="24" />
              <h4>Busy Professionals</h4>
              <p>Filter by cooking time—get 10-minute meals for hectic weekdays and save elaborate recipes for relaxed weekends. Plus, meal prep ideas for Sunday batch cooking.</p>
            </div>
            <div class="use-case-item">
              <Icon name="heart" :size="24" />
              <h4>Health-Conscious Individuals</h4>
              <p>Managing diabetes? Heart health concerns? Gluten intolerance? Our filters ensure every recipe matches your dietary restrictions and health needs.</p>
            </div>
            <div class="use-case-item">
              <Icon name="dollar-sign" :size="24" />
              <h4>Budget-Conscious Families</h4>
              <p>Stop buying ingredients for one recipe that sit unused. Use what you have with our ingredient-based recipe finder and reduce grocery bills significantly.</p>
            </div>
          </div>
        </article>

        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Understanding Different Diet Types
          </h2>
          <div class="diet-explanations">
            <div class="diet-card">
              <h3>Keto Diet</h3>
              <p>A high-fat, low-carbohydrate diet that puts your body into ketosis. Typically under 50g carbs per day. Great for weight loss and blood sugar control. Our keto recipes focus on healthy fats from olive oil, nuts, and fatty fish.</p>
            </div>
            <div class="diet-card">
              <h3>Mediterranean Diet</h3>
              <p>Based on traditional eating patterns from countries around the Mediterranean Sea. Emphasizes vegetables, fruits, whole grains, fish, and olive oil. One of the healthiest diets for heart health and longevity.</p>
            </div>
            <div class="diet-card">
              <h3>High-Protein Diet</h3>
              <p>Essential for muscle building and recovery. Aims for 25-30% of calories from protein. Great for athletes, bodybuilders, and anyone trying to maintain muscle while losing fat.</p>
            </div>
            <div class="diet-card">
              <h3>Diabetic-Friendly</h3>
              <p>Low glycemic index foods that don't spike blood sugar. Balanced carbs, high fiber, lean proteins. Helps manage type 2 diabetes and maintain stable energy levels throughout the day.</p>
            </div>
            <div class="diet-card">
              <h3>Halal Diet</h3>
              <p>Islamic dietary laws prohibiting pork, alcohol, and requiring specific meat preparation. Our Halal filter removes all prohibited ingredients and suggests permissible alternatives.</p>
            </div>
            <div class="diet-card">
              <h3>Vegan vs Vegetarian</h3>
              <p>Vegetarian excludes meat and fish but includes dairy and eggs. Vegan excludes all animal products. Both can be nutritionally complete with proper planning and diverse food choices.</p>
            </div>
          </div>
        </article>

        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Expert Meal Planning Tips
          </h2>
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="calendar" :size="20" />
              <div>
                <h4>Plan Before Shopping</h4>
                <p>Always generate your weekly meal plan before grocery shopping. This prevents impulse purchases and ensures you buy exactly what you need. You'll save money and reduce food waste dramatically.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="zap" :size="20" />
              <div>
                <h4>Batch Cook Wisely</h4>
                <p>Double recipes for curries, soups, and stews. Freeze half for busy weeks. This is especially effective for working parents who need quick, healthy dinners ready to go.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="palette" :size="20" />
              <div>
                <h4>Eat Colorful Vegetables</h4>
                <p>Different colored vegetables provide different nutrients. Aim for at least three colors per meal. Red tomatoes, green spinach, orange carrots—variety ensures complete nutrition.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="refresh-cw" :size="20" />
              <div>
                <h4>Rotate Protein Sources</h4>
                <p>Don't eat chicken every day. Rotate between fish, eggs, lentils, chickpeas, beef, and lamb. This prevents nutrient deficiencies and keeps meals interesting for your family.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="file-text" :size="20" />
              <div>
                <h4>Keep a Recipe Journal</h4>
                <p>Note which recipes your family loves. Build a collection of 20-30 favorite meals you can rotate. This makes future meal planning faster and eliminates the "what should we eat?" stress.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="clock" :size="20" />
              <div>
                <h4>Prep on Weekends</h4>
                <p>Spend 2-3 hours on Sunday washing vegetables, marinating proteins, and cooking grains. Weekday cooking becomes 10-minute assembly instead of hour-long projects.</p>
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
            <div class="faq-item glass-card">
              <h4>How does the 7-day meal planner work?</h4>
              <p>Select your region, family size, dietary preferences, and health goals. Our system filters recipes that match your criteria and creates a balanced weekly plan with breakfast, lunch, dinner, and snacks for each day. All portions adjust automatically based on your family size.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Can I use recipes if some ingredients aren't available in my region?</h4>
              <p>Our region filter shows recipes using ingredients commonly available in your area. However, you can view all recipes and substitute ingredients. Each recipe includes suggestions for common substitutions.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>What makes a recipe Halal-certified?</h4>
              <p>Halal recipes exclude pork, alcohol, and any non-halal animal products. When you enable Halal mode, these recipes are automatically removed from your meal plan. All remaining recipes use permissible ingredients according to Islamic dietary laws.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How accurate are the nutritional values?</h4>
              <p>Nutritional information is calculated based on standard USDA food databases. Values are estimates and can vary based on specific brands, preparation methods, and exact portion sizes. Use them as general guidelines for meal planning.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Can I filter by multiple diet types at once?</h4>
              <p>Yes! You can combine filters. For example, select both "Halal" and "High-Protein" to get recipes that meet both requirements. The more filters you add, the fewer recipes will match, so prioritize your must-have requirements.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How do allergy filters work?</h4>
              <p>When you select allergens to avoid (dairy, gluten, nuts, eggs, shellfish, or soy), the system automatically removes any recipes containing those ingredients. This ensures safe meal planning for family members with food allergies.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>What's the difference between family sizes?</h4>
              <p>Family size automatically adjusts ingredient quantities. A recipe for "single person" uses 1× ingredients, "couple" uses 2×, "family of 4" uses 4×, and so on. This saves you from manual calculations when scaling recipes.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Can I download my meal plan?</h4>
              <p>Yes! Click "Download Plan" to get a text file with your complete weekly meal plan, including all recipes, ingredients, and instructions. You can also generate a shopping list with all needed ingredients organized by category.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>Is my data stored or shared?</h4>
              <p>No. All meal planning happens in your browser. Your preferences, meal plans, and ingredient searches never leave your device. We don't collect, store, or share any personal information. Complete privacy guaranteed.</p>
            </div>

            <div class="faq-item glass-card">
              <h4>How often do you add new recipes?</h4>
              <p>We regularly expand our recipe database with new dishes, seasonal specials, and regional specialties. Updates happen automatically—you'll see new recipes on your next visit without needing to update anything.</p>
            </div>
          </div>
        </div>

        <!-- Trust & Privacy -->
        <div class="trust-section">
          <div class="trust-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All meal planning happens directly in your web browser. We never store, transmit, or have access to your personal data. Your preferences, meal plans, and ingredient searches never leave your device.
            </p>
          </div>
          <div class="trust-card">
            <Icon name="alert-circle" :size="32" />
            <h3>Nutritional Disclaimer</h3>
            <p>
              Nutritional information is calculated based on standard food databases and is provided for informational purposes only. Values are estimates and can vary based on brands, preparation methods, and portion sizes.
            </p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-section">
          <h2>Ready to Start Planning Healthier Meals?</h2>
          <p>Generate your personalized 7-day meal plan now—completely free, no signup required</p>
          <div class="cta-buttons">
            <button @click="scrollToTop" class="btn btn-primary">
              <Icon name="zap" :size="18" />
              Plan My Weekly Meals
            </button>
            <router-link to="/tools/calorie-tracker" class="btn btn-outline">
              <Icon name="activity" :size="18" />
              Track Calories
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
      <RelatedTools currentTool="/tools/meal-planner" category="Health" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { recipes, generate7DayMealPlan, searchRecipesByIngredients } from '@/data/recipes';
import { 
  generateToolSchema, 
  generateFAQSchema,
  injectStructuredData 
} from '@/utils/structuredData';
import RecipeCard from '@/components/RecipeCard.vue';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/meal-planner`;

useSEO({
  title: 'International Meal Planner 2025 | Weekly Meal Plans | Gulf & Europe | Halal & Dietary Options',
  description: 'Plan weekly meals with recipes from Middle Eastern, Mediterranean, Italian, Turkish, Pakistani cuisines. Halal, vegetarian, vegan, keto, gluten-free options. Region-based ingredients for Gulf, Europe, and worldwide. 7-day meal plans with recipes, shopping lists, and nutritional info.',
  keywords: 'meal planner, weekly meal plan, halal recipes, international recipes, diet planner, meal prep, grocery list generator, family meal planning, halal meal planner, mediterranean recipes, middle eastern recipes, meal planning app, recipe generator',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

const preferences = ref({
  region: '',
  familySize: 2,
  healthGoal: '',
  timeCategory: ''
});

const dietFilters = ref({
  halal: false,
  vegetarian: false,
  vegan: false,
  keto: false,
  lowCarb: false,
  highProtein: false,
  glutenFree: false,
  dairyFree: false,
  diabeticFriendly: false,
  heartHealthy: false
});

const allergyFilters = ref([]);
const cuisineFilters = ref([]);
const mealPlan = ref(null);
const ingredientInput = ref('');
const ingredients = ref([]);
const matchedRecipes = ref([]);

const featuredTools = [
  {
    name: 'Calorie Tracker',
    path: '/tools/calorie-tracker',
    icon: 'activity',
    description: 'Track daily calories and monitor macronutrients'
  },
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate BMI, BMR, TDEE, and ideal weight range'
  },
  {
    name: 'Sleep Coach',
    path: '/tools/sleep-coach',
    icon: 'moon',
    description: 'Improve sleep quality with personalized tips'
  },
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build healthy habits and track your progress'
  }
];

const totalWeeklyCalories = computed(() => {
  if (!mealPlan.value) return 0;
  let total = 0;
  Object.values(mealPlan.value).forEach(day => {
    total += calculateDayCalories(day);
  });
  return total.toLocaleString();
});

const avgDailyCalories = computed(() => {
  if (!mealPlan.value) return 0;
  return Math.round(parseInt(totalWeeklyCalories.value.replace(/,/g, '')) / 7).toLocaleString();
});

function generateMealPlan() {
  // Get active diet filter
  let activeDietFilter = null;
  for (const [key, value] of Object.entries(dietFilters.value)) {
    if (value) {
      activeDietFilter = key;
      break;
    }
  }

  const planPreferences = {
    ...preferences.value,
    dietType: activeDietFilter,
    allergies: allergyFilters.value,
    cuisines: cuisineFilters.value
  };

  let plan = generate7DayMealPlan(planPreferences);
  
  // Apply cuisine filter
  if (cuisineFilters.value.length > 0) {
    const filteredRecipes = recipes.filter(r => cuisineFilters.value.includes(r.cuisine));
    Object.keys(plan).forEach(day => {
      Object.keys(plan[day]).forEach(mealType => {
        const match = filteredRecipes.find(r => r.mealType.includes(mealType));
        if (match) plan[day][mealType] = match;
      });
    });
  }

  mealPlan.value = plan;
  window.scrollTo({ top: document.querySelector('.meal-plan-section').offsetTop - 100, behavior: 'smooth' });
}

function calculateDayCalories(day) {
  return (day.breakfast?.calories || 0) + 
         (day.lunch?.calories || 0) + 
         (day.dinner?.calories || 0) + 
         (day.snack?.calories || 0);
}

function addIngredient() {
  if (ingredientInput.value.trim()) {
    ingredients.value.push(ingredientInput.value.trim().toLowerCase());
    ingredientInput.value = '';
  }
}

function removeIngredient(idx) {
  ingredients.value.splice(idx, 1);
}

function clearIngredients() {
  ingredients.value = [];
  matchedRecipes.value = [];
}

function findMatchingRecipes() {
  let results = searchRecipesByIngredients(ingredients.value);
  
  // Apply filters
  if (allergyFilters.value.length > 0) {
    results = results.filter(r => 
      !allergyFilters.value.some(allergy => r.allergies.includes(allergy))
    );
  }

  for (const [key, value] of Object.entries(dietFilters.value)) {
    if (value) {
      results = results.filter(r => r[key] === true);
    }
  }

  matchedRecipes.value = results;
}

function downloadMealPlan() {
  if (!mealPlan.value) return;
  
  let content = `WEEKLY MEAL PLAN - Family Size: ${preferences.value.familySize}\n\n`;
  content += `Total Weekly Calories: ${totalWeeklyCalories.value}\n`;
  content += `Average Daily Calories: ${avgDailyCalories.value}\n\n`;
  content += '='.repeat(60) + '\n\n';

  Object.entries(mealPlan.value).forEach(([day, meals]) => {
    content += `${day.toUpperCase()}\n`;
    content += '-'.repeat(60) + '\n';
    ['breakfast', 'lunch', 'dinner', 'snack'].forEach(mealType => {
      const meal = meals[mealType];
      content += `\n${mealType.toUpperCase()}: ${meal.name}\n`;
      content += `Calories: ${meal.calories} | Protein: ${meal.protein} | Carbs: ${meal.carbs} | Fat: ${meal.fat}\n`;
      content += `Ingredients:\n${meal.ingredients.map((i, idx) => `  ${idx + 1}. ${i}`).join('\n')}\n`;
      content += `Instructions:\n${meal.instructions.map((s, idx) => `  ${idx + 1}. ${s}`).join('\n')}\n`;
    });
    content += '\n' + '='.repeat(60) + '\n\n';
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `meal-plan-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
}

function generateShoppingList() {
  if (!mealPlan.value) return;
  
  const allIngredients = new Set();
  Object.values(mealPlan.value).forEach(day => {
    Object.values(day).forEach(meal => {
      meal.ingredients.forEach(ing => allIngredients.add(ing));
    });
  });

  let content = `SHOPPING LIST - ${new Date().toLocaleDateString()}\n`;
  content += `Family Size: ${preferences.value.familySize} people\n\n`;
  content += Array.from(allIngredients).sort().map((ing, idx) => `${idx + 1}. ${ing}`).join('\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `shopping-list-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
}

function shareMealPlan() {
  const text = `Check out my personalized weekly meal plan! Generated for ${preferences.value.familySize} people with ${totalWeeklyCalories.value} total weekly calories.\n\nCreate yours at ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title: 'My Meal Plan', text });
  } else {
    navigator.clipboard.writeText(text);
    alert('Meal plan summary copied to clipboard!');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

onMounted(() => {
  const baseUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  const toolSchema = generateToolSchema({
    name: 'International Meal Planner & Recipe Generator',
    description: 'Plan weekly meals with international recipes from Middle Eastern, Mediterranean, Italian, Turkish, Pakistani cuisines. Halal, vegetarian, vegan, keto options with region-based ingredient availability.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      '7-day meal plan generation',
      'International recipe database',
      'Halal, vegetarian, vegan, keto filters',
      'Region-based ingredient availability',
      'Family size adjustment',
      'Shopping list generation',
      'Nutritional information',
      'Recipe search by ingredients'
    ],
    usageInfo: 'Select region, family size, dietary preferences, and health goals. Receive 7-day meal plan with recipes, ingredients, and nutritional info.',
    helpText: 'Meal Planner helps users save time on meal planning, discover new recipes, and maintain balanced nutrition.'
  });
  
  const faqs = [
    { question: 'How does the 7-day meal planner work?', answer: 'Select your region, family size, dietary preferences, and health goals. Our system filters recipes that match your criteria and creates a balanced weekly plan with breakfast, lunch, dinner, and snacks for each day. All portions adjust automatically based on your family size.' },
    { question: 'Can I use recipes if some ingredients aren\'t available in my region?', answer: 'Our region filter shows recipes using ingredients commonly available in your area. However, you can view all recipes and substitute ingredients. Each recipe includes suggestions for common substitutions.' },
    { question: 'What makes a recipe Halal-certified?', answer: 'Halal recipes exclude pork, alcohol, and any non-halal animal products. When you enable Halal mode, these recipes are automatically removed from your meal plan. All remaining recipes use permissible ingredients according to Islamic dietary laws.' },
    { question: 'How accurate are the nutritional values?', answer: 'Nutritional information is calculated based on standard USDA food databases. Values are estimates and can vary based on specific brands, preparation methods, and exact portion sizes. Use them as general guidelines for meal planning.' },
    { question: 'Can I filter by multiple diet types at once?', answer: 'Yes! You can combine filters. For example, select both "Halal" and "High-Protein" to get recipes that meet both requirements. The more filters you add, the fewer recipes will match, so prioritize your must-have requirements.' },
    { question: 'How do allergy filters work?', answer: 'When you select allergens to avoid (dairy, gluten, nuts, eggs, shellfish, or soy), the system automatically removes any recipes containing those ingredients. This ensures safe meal planning for family members with food allergies.' },
    { question: 'What\'s the difference between family sizes?', answer: 'Family size automatically adjusts ingredient quantities. A recipe for "single person" uses 1× ingredients, "couple" uses 2×, "family of 4" uses 4×, and so on. This saves you from manual calculations when scaling recipes.' },
    { question: 'Can I download my meal plan?', answer: 'Yes! Click "Download Plan" to get a text file with your complete weekly meal plan, including all recipes, ingredients, and instructions. You can also generate a shopping list with all needed ingredients organized by category.' },
    { question: 'Is my data stored or shared?', answer: 'No. All meal planning happens in your browser. Your preferences, meal plans, and ingredient searches never leave your device. We don\'t collect, store, or share any personal information. Complete privacy guaranteed.' },
    { question: 'How often do you add new recipes?', answer: 'We regularly expand our recipe database with new dishes, seasonal specials, and regional specialties. Updates happen automatically—you\'ll see new recipes on your next visit without needing to update anything.' }
  ];
  
  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Meal Planner', path: '/tools/meal-planner' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'International Meal Planner 2025 | Weekly Meal Plans',
    description: 'Plan weekly meals with recipes from Middle Eastern, Mediterranean, Italian, Turkish cuisines. Halal, Keto, Vegan options.',
    about: [
      { '@type': 'Thing', name: 'Meal planning' },
      { '@type': 'Thing', name: 'Recipe generation' },
      { '@type': 'Thing', name: 'Nutrition planning' }
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
.meal-planner-page {
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

.hero-section h1 {
  font-size: clamp(var(--font-size-2xl), 5vw, var(--font-size-5xl));
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-md);
  line-height: 1.2;
}

.hero-subtitle {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 900px;
  margin: 0 auto;
  line-height: 1.8;
}

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

.preferences-section {
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid var(--glass-border);
}

.preferences-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 12px;
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 700;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.preference-group label {
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

.diet-filters, .allergy-filters, .cuisine-filters {
  margin: var(--spacing-xl) 0;
}

.diet-filters h3, .allergy-filters h3, .cuisine-filters h3 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-md);
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--spacing-sm);
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  transition: all 0.2s;
}

.filter-checkbox:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.filter-checkbox input {
  cursor: pointer;
}

.filter-checkbox span {
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.btn-large {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: var(--font-size-lg);
  width: 100%;
  max-width: 500px;
  margin: var(--spacing-xl) auto;
  display: block;
}

.meal-plan-section {
  margin: 40px 0;
  padding-top: 40px;
  border-top: 1px solid var(--glass-border);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.plan-header h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.plan-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.weekly-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
}

.summary-card {
  padding: 24px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-md);
  text-align: center;
  transition: all 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
  border-color: rgba(16, 185, 129, 0.3);
}

.summary-card h4 {
  color: var(--text-secondary);
  margin-bottom: 12px;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 800;
  color: #10b981;
  margin: 0;
  line-height: 1;
}

.days-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.day-card {
  padding: var(--spacing-xl);
  border-radius: var(--radius-md);
}

.day-card h3 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-lg);
  font-size: var(--font-size-2xl);
}

.meal-slot {
  margin-bottom: var(--spacing-lg);
}

.meal-slot h4 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-sm);
}

.day-total {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
  text-align: right;
  color: var(--color-accent-gold);
}

.ingredient-search-section {
  margin: 40px 0;
  padding-top: 40px;
  border-top: 1px solid var(--glass-border);
}

.ingredient-search-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-primary);
  margin-bottom: 12px;
  font-size: 1.5rem;
  font-weight: 700;
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.7;
  font-size: 0.9375rem;
}

.ingredient-input-group {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
}

.ingredient-input {
  flex: 1;
  padding: var(--spacing-md);
  font-size: var(--font-size-lg);
  background: var(--color-bg-secondary);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  color: var(--color-text-primary);
  transition: all var(--transition-base);
}

.ingredient-input:hover {
  border-color: var(--color-accent-gold);
}

.ingredient-input:focus {
  outline: none;
  border-color: var(--color-accent-gold);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  background: var(--color-bg-primary);
}

/* Light theme overrides */
:global(body:not(.dark-mode)) .ingredient-input {
  background: #ffffff;
  border-color: #d1d5db;
  color: #1f2937;
}

:global(body:not(.dark-mode)) .ingredient-input:focus {
  border-color: #fbbf24;
  background: #f9fafb;
}

.ingredients-display {
  margin: var(--spacing-lg) 0;
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-md);
}

.ingredients-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.ingredients-header h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-primary);
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.btn-text {
  background: none;
  border: none;
  color: var(--color-accent-red);
  cursor: pointer;
  text-decoration: underline;
}

.ingredients-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.ingredient-tag {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  background: var(--glass-bg);
  border-radius: var(--radius-full);
  text-transform: capitalize;
}

.remove-btn {
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.remove-btn:hover {
  transform: scale(1.1);
}

.matched-recipes {
  margin-top: var(--spacing-xl);
}

.matched-recipes h3 {
  color: var(--text-primary);
  margin-bottom: 24px;
  font-size: 1.25rem;
  font-weight: 700;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.recipe-card-full {
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

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

.diet-explanations {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-top: var(--spacing-lg);
}

.diet-card {
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
}

.diet-card h3 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-sm);
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

.faq-section {
  margin: var(--spacing-2xl) 0;
}

.faq-section h2 {
  text-align: center;
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-2xl);
  font-size: var(--font-size-3xl);
}

.faq-item {
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-md);
}

.faq-item h3 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-md);
  font-size: var(--font-size-lg);
}

.faq-item p {
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin: 0;
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

@media (max-width: 768px) {
  .preferences-grid {
    grid-template-columns: 1fr;
  }

  .plan-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters-grid {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }
}
</style>
