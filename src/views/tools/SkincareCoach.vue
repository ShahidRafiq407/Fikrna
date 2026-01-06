<template>
  <div class="tool-page skincare-coach-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Skincare Coach" category="Health" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="sun" :size="16" />
          Personalized Skincare & Beauty
        </p>
        <h1>Free Professional Skincare Coach & Routine Builder</h1>
        <p class="hero-subtitle">
          Get your personalized morning and evening skincare routine based on your unique skin type, concerns, climate, and lifestyle. 
          Expert recommendations with climate-specific product suggestions for beautiful, healthy skin. All analysis happens privately in your browser—your information never leaves your device.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="sun" :size="14" />
            Personalized Routines
          </span>
          <span class="badge">
            <Icon name="globe" :size="14" />
            Climate-Specific
          </span>
          <span class="badge">
            <Icon name="shield" :size="14" />
            Privacy Protected
          </span>
          <span class="badge">
            <Icon name="star" :size="14" />
            Expert Recommendations
          </span>
        </div>
      </section>

      <!-- Disclaimer Banner -->
      <div class="disclaimer-banner glass-card" data-aos="fade-up" data-aos-delay="50">
        <div class="disclaimer-header">
          <Icon name="info" :size="20" />
          <strong>Skincare Information Disclaimer</strong>
        </div>
        <p>
          This skincare coach provides general skincare guidance and routine recommendations only. Individual results may vary. 
          Always patch test new products and consult with a dermatologist for persistent skin concerns, allergic reactions, or before starting new treatments. 
          This tool is not a substitute for professional dermatological advice.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="sun" :size="20" />
            Build Your Personalized Routine
          </h2>
          <div class="tool-actions" v-if="routine">
            <button @click="downloadRoutine" class="icon-btn" title="Download Routine">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetRoutine" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
          
          <!-- Step 1: Skin Type & Concerns -->
        <section class="input-section">
            <h3>
              <Icon name="target" :size="18" />
              Step 1: Skin Type & Concerns
            </h3>
            <p class="section-intro">Understanding your skin type is the foundation of an effective skincare routine.</p>
          
          <div class="skin-type-cards">
              <label 
                v-for="type in skinTypes" 
                :key="type.value" 
                class="skin-type-card" 
                :class="{ active: skinProfile.type === type.value }"
              >
                <input type="radio" v-model="skinProfile.type" :value="type.value" class="radio-input">
              <div class="card-content">
                  <div class="type-icon-wrapper">
                    <Icon :name="type.icon" :size="32" />
                  </div>
                  <h4>{{ type.name }}</h4>
                <p>{{ type.description }}</p>
              </div>
            </label>
          </div>

          <div class="concerns-section">
              <h4>
                <Icon name="alert-circle" :size="16" />
                Primary Skin Concerns
              </h4>
            <div class="concerns-grid">
                <label 
                  v-for="concern in skinConcerns" 
                  :key="concern.value" 
                  class="concern-checkbox"
                >
                <input type="checkbox" v-model="selectedConcerns" :value="concern.value">
                  <Icon :name="concern.icon" :size="16" />
                  <span>{{ concern.name }}</span>
              </label>
            </div>
          </div>
        </section>

          <!-- Step 2: Personal Information -->
        <section class="personal-section">
            <h3>
              <Icon name="user" :size="18" />
              Step 2: Personal Information
            </h3>
            <p class="section-intro">Help us personalize your routine based on your age, location, and lifestyle.</p>
            
            <div class="form-grid">
              <div class="form-group">
                <label>
                  <Icon name="calendar" :size="14" />
                  Age Group
                </label>
                <select v-model="skinProfile.ageGroup" class="styled-input">
                <option value="teens">Teens (13-19)</option>
                <option value="20s">20s</option>
                <option value="30s">30s</option>
                <option value="40s">40s</option>
                <option value="50plus">50+</option>
              </select>
            </div>

              <div class="form-group">
                <label>
                  <Icon name="user" :size="14" />
                  Gender
                </label>
                <select v-model="skinProfile.gender" class="styled-input">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </div>

              <div class="form-group full-width">
                <label>
                  <Icon name="map" :size="14" />
                  Your Country
                </label>
                <select v-model="skinProfile.country" class="styled-input">
                <option value="">Select country</option>
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
                  <option value="Sweden">Sweden</option>
                  <option value="Norway">Norway</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Poland">Poland</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Portugal">Portugal</option>
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
                </optgroup>
                  <optgroup label="Africa">
                  <option value="South Africa">South Africa</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Nigeria">Nigeria</option>
                </optgroup>
                  <optgroup label="South America">
                  <option value="Brazil">Brazil</option>
                  <option value="Argentina">Argentina</option>
                </optgroup>
              </select>
            </div>

              <div class="form-group">
                <label>
                  <Icon name="globe" :size="14" />
                  Climate
                </label>
                <select v-model="skinProfile.climate" class="styled-input">
                <option value="hot-humid">Hot & Humid</option>
                <option value="hot-dry">Hot & Dry (Desert)</option>
                <option value="temperate">Temperate (Mild)</option>
                <option value="cold-dry">Cold & Dry</option>
                <option value="cold-humid">Cold & Humid</option>
              </select>
            </div>
          </div>
        </section>

          <!-- Step 3: Lifestyle Factors -->
        <section class="lifestyle-section">
            <h3>
              <Icon name="briefcase" :size="18" />
              Step 3: Lifestyle Factors
            </h3>
            <p class="section-intro">Your daily activities and environment affect your skin's needs.</p>
          
          <div class="lifestyle-grid">
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.office">
                <Icon name="briefcase" :size="16" />
                <span>Work in office (AC environment)</span>
            </label>
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.outdoor">
                <Icon name="sun" :size="16" />
                <span>Work outdoors</span>
            </label>
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.gym">
                <Icon name="activity" :size="16" />
                <span>Regular gym/exercise</span>
            </label>
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.pollution">
                <Icon name="alert-circle" :size="16" />
                <span>High pollution area</span>
            </label>
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.makeup">
                <Icon name="star" :size="16" />
                <span>Wear makeup daily</span>
            </label>
            <label class="lifestyle-checkbox">
              <input type="checkbox" v-model="lifestyleFactors.stress">
                <Icon name="alert-triangle" :size="16" />
                <span>High stress levels</span>
            </label>
          </div>
        </section>

        <button @click="generateRoutine" class="btn btn-primary btn-large">
            <Icon name="zap" :size="18" />
            Generate My Skincare Routine
        </button>

          <!-- Results Section -->
          <section v-if="routine" class="results-section" data-aos="fade-up">
          <div class="results-header">
            <h2>Your Personalized Skincare Routine</h2>
          </div>

          <!-- Morning Routine -->
            <div class="routine-card glass-card">
              <div class="routine-header">
                <Icon name="sunrise" :size="24" />
                <h3>Morning Routine</h3>
              </div>
            <div class="routine-steps">
                <div 
                  v-for="(step, idx) in routine.morning" 
                  :key="idx" 
                  class="step-item"
                  data-aos="fade-up"
                  :data-aos-delay="idx * 50"
                >
                <div class="step-number">{{ idx + 1 }}</div>
                <div class="step-content">
                  <h4>{{ step.name }}</h4>
                  <p>{{ step.instruction }}</p>
                    <span v-if="step.product" class="product-rec">
                      <Icon name="star" :size="14" />
                      Recommended: {{ step.product }}
                    </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Evening Routine -->
            <div class="routine-card glass-card">
              <div class="routine-header">
                <Icon name="moon" :size="24" />
                <h3>Evening Routine</h3>
              </div>
            <div class="routine-steps">
                <div 
                  v-for="(step, idx) in routine.evening" 
                  :key="idx" 
                  class="step-item"
                  data-aos="fade-up"
                  :data-aos-delay="idx * 50"
                >
                <div class="step-number">{{ idx + 1 }}</div>
                <div class="step-content">
                  <h4>{{ step.name }}</h4>
                  <p>{{ step.instruction }}</p>
                    <span v-if="step.product" class="product-rec">
                      <Icon name="star" :size="14" />
                      Recommended: {{ step.product }}
                    </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Key Ingredients -->
            <div class="ingredients-card glass-card">
              <h3>
                <Icon name="droplet" :size="24" />
                Key Ingredients for Your Skin
              </h3>
            <div class="ingredients-list">
                <div 
                  v-for="ing in routine.keyIngredients" 
                  :key="ing.name" 
                  class="ingredient-item"
                  data-aos="fade-up"
                >
                <h4>{{ ing.name }}</h4>
                <p>{{ ing.benefit }}</p>
                  <span class="safety" :class="ing.safety">
                    {{ ing.safety.toUpperCase() }}
                  </span>
              </div>
            </div>
          </div>

          <!-- Climate Tips -->
            <div v-if="routine.climateTips" class="tips-card glass-card">
              <h3>
                <Icon name="globe" :size="24" />
                Climate-Specific Tips
              </h3>
            <p>{{ routine.climateTips }}</p>
          </div>

          <!-- Diet & Hydration -->
            <div class="diet-card glass-card">
              <h3>
                <Icon name="apple" :size="24" />
                Diet & Hydration for Healthy Skin
              </h3>
              <ul class="diet-list">
                <li v-for="(tip, idx) in routine.dietTips" :key="idx">
                  <Icon name="check-circle" :size="16" />
                  {{ tip }}
                </li>
            </ul>
          </div>
        </section>
      </div>
        </div>

      <!-- Comprehensive Content Sections -->
      <section class="content-sections">
        
        <!-- How This Skincare Coach Works -->
        <article class="content-card">
          <h2>
            <Icon name="zap" :size="24" />
            How This Skincare Coach Works
          </h2>
          <p>
            This skincare coach uses your personal information—skin type, concerns, age, climate, and lifestyle—to generate a 
            customized morning and evening routine tailored specifically for you. Unlike generic skincare advice, your routine 
            accounts for regional climate factors, environmental stressors, and personal habits that directly impact your skin's health.
          </p>
          <p>
            The tool analyzes multiple factors simultaneously to provide comprehensive guidance:
          </p>
          <ul class="content-list">
            <li><strong>Skin Type Analysis:</strong> Your skin type (oily, dry, combination, sensitive, or normal) determines product textures and formulations.</li>
            <li><strong>Concern Targeting:</strong> Specific concerns like acne, aging, pigmentation, or sensitivity guide active ingredient selection.</li>
            <li><strong>Age Considerations:</strong> Your age group influences anti-aging ingredient recommendations and product intensity.</li>
            <li><strong>Climate Adaptation:</strong> Hot/humid vs. cold/dry climates require completely different hydration and protection strategies.</li>
            <li><strong>Lifestyle Integration:</strong> Office work, outdoor exposure, exercise, and makeup use affect product choices and application frequency.</li>
          </ul>
          <p>
            All processing happens in your browser. Your information is never sent to any server, ensuring complete privacy 
            while you receive expert-level skincare guidance.
          </p>
        </article>

        <!-- Understanding Skin Types -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            Understanding Your Skin Type
          </h2>
          <p>
            Identifying your skin type is the first step toward effective skincare. Each skin type has unique characteristics 
            and requires specific care approaches. Here's how to recognize and care for different skin types:
          </p>
          
          <div class="skin-type-info-grid">
            <div class="skin-type-info">
              <Icon name="droplet" :size="24" />
              <h4>Oily Skin</h4>
              <p>Characterized by excess sebum production, large visible pores, and a shiny appearance especially in the T-zone. 
              Prone to blackheads, whiteheads, and acne. Requires lightweight, oil-free products and regular cleansing to prevent clogged pores.</p>
        </div>
            <div class="skin-type-info">
              <Icon name="moon" :size="24" />
              <h4>Dry Skin</h4>
              <p>Feels tight, may appear flaky or rough, and lacks natural moisture. Can show fine lines more prominently. 
              Needs rich, emollient products with ceramides, hyaluronic acid, and occlusive ingredients to lock in hydration.</p>
            </div>
            <div class="skin-type-info">
              <Icon name="target" :size="24" />
              <h4>Combination Skin</h4>
              <p>Oily T-zone (forehead, nose, chin) with normal or dry cheeks. Requires a balanced approach—lighter products 
              for oily areas, richer products for dry areas, or multi-zoning your routine.</p>
            </div>
            <div class="skin-type-info">
              <Icon name="heart" :size="24" />
              <h4>Sensitive Skin</h4>
              <p>Easily irritated, prone to redness, itching, or reactions to products or environmental factors. Needs gentle, 
              fragrance-free formulations with minimal ingredients and patch testing before use.</p>
            </div>
            <div class="skin-type-info">
              <Icon name="check-circle" :size="24" />
              <h4>Normal Skin</h4>
              <p>Balanced, few imperfections, not too oily or dry, with small pores and even texture. Can tolerate most 
              products but still benefits from a consistent routine with appropriate products for prevention and maintenance.</p>
            </div>
          </div>
        </article>

        <!-- Regional Skincare Considerations -->
        <article class="content-card">
          <h2>
            <Icon name="globe" :size="24" />
            Regional Skincare Considerations
          </h2>
          <p>
            Climate and environmental factors significantly impact your skin's needs. Understanding regional differences helps 
            you adapt your skincare routine for optimal results.
          </p>
          
          <div class="regional-sections">
            <div class="regional-block">
              <h3>
                <Icon name="sun" :size="20" />
                Hot & Arid Climates (Gulf, Desert Regions)
              </h3>
              <p>
                Living in hot, dry climates like the UAE, Saudi Arabia, Qatar, or desert regions requires specific skincare strategies:
              </p>
              <ul class="content-list">
                <li><strong>Intense Sun Protection:</strong> SPF 50+ is mandatory. Reapply every 2 hours when outdoors. Look for broad-spectrum protection with UVA/UVB coverage.</li>
                <li><strong>Hydration Focus:</strong> Hot, dry air accelerates moisture loss. Use humectant-rich serums (hyaluronic acid) followed by occlusive moisturizers to lock in hydration.</li>
                <li><strong>Antioxidant Defense:</strong> High UV exposure increases free radical damage. Vitamin C serums in the morning protect against environmental damage.</li>
                <li><strong>Cooling Products:</strong> Gel-based moisturizers and mists provide cooling relief while maintaining hydration.</li>
                <li><strong>Indoor Climate Control:</strong> AC environments can dry skin. Use a humidifier and layer hydrating products.</li>
                <li><strong>Night Recovery:</strong> Rich night creams with ceramides and peptides help repair daily sun and heat damage.</li>
              </ul>
        </div>

            <div class="regional-block">
              <h3>
                <Icon name="cloud" :size="20" />
                Temperate & Cold Climates (Europe, North America)
              </h3>
              <p>
                Living in temperate or cold climates (UK, Germany, Canada, Northern US) involves different skincare priorities:
              </p>
              <ul class="content-list">
                <li><strong>Seasonal Adjustments:</strong> Lighter products in summer, richer products in winter. Adapt your routine every 3-4 months.</li>
                <li><strong>Winter Protection:</strong> Cold, dry air requires barrier-repairing products. Add facial oils and heavier creams during winter months.</li>
                <li><strong>Year-Round SPF:</strong> UV rays penetrate clouds and windows. Daily SPF 30+ is essential even in winter, especially during skiing or outdoor activities.</li>
                <li><strong>Humidifier Use:</strong> Indoor heating during winter dries skin. Bedroom humidifiers help maintain skin moisture overnight.</li>
                <li><strong>Gentle Cleansing:</strong> Avoid over-cleansing in cold weather which can strip natural oils. Use creamy, non-foaming cleansers.</li>
                <li><strong>Exfoliation Balance:</strong> Reduce exfoliation frequency in winter when skin is more sensitive. Focus on gentle chemical exfoliants.</li>
              </ul>
        </div>

            <div class="regional-block">
              <h3>
                <Icon name="droplet" :size="20" />
                Hot & Humid Climates (Southeast Asia, Tropical Regions)
              </h3>
              <p>
                Hot, humid climates (Thailand, Malaysia, Philippines, Singapore) require lightweight, breathable skincare:
              </p>
              <ul class="content-list">
                <li><strong>Oil-Free Formulations:</strong> Lightweight gel or water-based products prevent pore-clogging in high humidity.</li>
                <li><strong>Frequent Cleansing:</strong> Sweat and humidity increase oil production. Cleanse morning and evening, possibly midday if very active.</li>
                <li><strong>Blotting Papers:</strong> Keep blotting papers handy to control shine without adding product layers.</li>
                <li><strong>Non-Comedogenic Products:</strong> All products should be non-comedogenic to prevent breakouts in humid conditions.</li>
                <li><strong>Mattifying Primers:</strong> Use mattifying primers under makeup to extend wear time in high humidity.</li>
                <li><strong>Antimicrobial Ingredients:</strong> Consider products with tea tree oil or salicylic acid to prevent bacterial growth in humid conditions.</li>
              </ul>
        </div>
          </div>
        </article>

        <!-- Common Skincare Concerns -->
        <article class="content-card">
          <h2>
            <Icon name="alert-circle" :size="24" />
            Understanding Common Skincare Concerns
          </h2>
          <p>
            Different skin concerns require targeted ingredients and approaches. Here's how to address common issues:
          </p>
          
          <div class="concerns-info-grid">
            <div class="concern-info-item">
              <Icon name="alert-triangle" :size="24" />
              <h4>Acne & Breakouts</h4>
              <p><strong>Active Ingredients:</strong> Salicylic acid, benzoyl peroxide, niacinamide, retinoids</p>
              <p><strong>Approach:</strong> Gentle cleansing, non-comedogenic products, consistent treatment, avoid over-drying which can increase oil production.</p>
        </div>
            <div class="concern-info-item">
              <Icon name="target" :size="24" />
              <h4>Fine Lines & Wrinkles</h4>
              <p><strong>Active Ingredients:</strong> Retinoids, peptides, vitamin C, AHAs, sunscreen</p>
              <p><strong>Approach:</strong> Prevention through daily SPF, collagen-stimulating ingredients, consistent use for 3+ months to see results.</p>
            </div>
            <div class="concern-info-item">
              <Icon name="droplet" :size="24" />
              <h4>Dark Spots & Pigmentation</h4>
              <p><strong>Active Ingredients:</strong> Vitamin C, alpha arbutin, niacinamide, kojic acid, retinoids</p>
              <p><strong>Approach:</strong> Consistent use of brightening ingredients, strict sun protection to prevent new spots, patience (4-12 weeks for visible results).</p>
            </div>
            <div class="concern-info-item">
              <Icon name="heart" :size="24" />
              <h4>Redness & Inflammation</h4>
              <p><strong>Active Ingredients:</strong> Niacinamide, centella asiatica, azelaic acid, ceramides</p>
              <p><strong>Approach:</strong> Gentle products, avoid harsh ingredients, focus on barrier repair, identify and avoid triggers.</p>
            </div>
            <div class="concern-info-item">
              <Icon name="target" :size="24" />
              <h4>Large Pores</h4>
              <p><strong>Active Ingredients:</strong> Niacinamide, retinol, salicylic acid, clay masks</p>
              <p><strong>Approach:</strong> Regular exfoliation, pore-minimizing products, proper cleansing to prevent clogging, note that pore size is largely genetic.</p>
            </div>
            <div class="concern-info-item">
              <Icon name="sun" :size="24" />
              <h4>Dull Skin</h4>
              <p><strong>Active Ingredients:</strong> AHAs (glycolic acid), vitamin C, exfoliants, brightening ingredients</p>
              <p><strong>Approach:</strong> Regular exfoliation to remove dead skin cells, brightening serums, adequate hydration, healthy lifestyle habits.</p>
            </div>
          </div>
        </article>

        <!-- Tips & Best Practices -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Skincare Tips & Best Practices
          </h2>
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Start Simple, Build Gradually</h4>
                <p>Introduce new products one at a time with 2-4 weeks between additions. This helps you identify what works and prevents overwhelming your skin.</p>
        </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Patch Test New Products</h4>
                <p>Always patch test new products on your inner arm or behind your ear for 24-48 hours before applying to your face to check for allergic reactions.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Apply Products in Correct Order</h4>
                <p>Follow the thinnest-to-thickest rule: Cleanser → Toner → Serum → Eye Cream → Moisturizer → Sunscreen (AM only). This ensures proper absorption.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Be Patient for Results</h4>
                <p>Skincare takes time. Most products need 4-6 weeks to show visible results. Cell turnover happens every 28 days, so consistency is key.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Don't Over-Exfoliate</h4>
                <p>Exfoliate 2-3 times per week maximum. Over-exfoliation damages the skin barrier, leading to sensitivity, dryness, and breakouts.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Sunscreen is Non-Negotiable</h4>
                <p>Wear SPF 30+ every single day, rain or shine, indoors or outdoors. UV rays penetrate clouds and windows. This is the #1 anti-aging product.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Remove Makeup Before Bed</h4>
                <p>Never sleep in makeup. Always double cleanse—first with an oil-based cleanser to remove makeup, then with a water-based cleanser to clean skin.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Hydrate from Inside Out</h4>
                <p>Drink 2-3 liters of water daily. Eat omega-3 rich foods, antioxidants, and vitamins. Healthy diet supports healthy skin from within.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Adjust Routine Seasonally</h4>
                <p>Your skin's needs change with seasons. Use lighter products in summer, richer products in winter. Adapt every 3-4 months based on climate.</p>
              </div>
            </div>
            <div class="tip-item">
              <Icon name="check-circle" :size="20" />
              <div>
                <h4>Don't Skip Night Routine</h4>
                <p>Nighttime is when skin repairs itself. Use treatment serums and richer creams at night when skin is most receptive to active ingredients.</p>
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
          <div 
            class="faq-item glass-card" 
            v-for="(faq, i) in faqs" 
            :key="i"
            data-aos="fade-up"
            :data-aos-delay="i * 50"
          >
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
      <RelatedTools currentTool="/tools/skincare-coach" category="Health" />

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
import 'aos/dist/aos.css';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/skincare-coach`;

useSEO({
  title: 'Free Skincare Coach 2025 | Personalized Skincare Routine Builder | Climate-Specific Advice',
  description: 'Get personalized morning and evening skincare routines based on skin type, concerns, age, climate, and lifestyle. Expert recommendations with climate-specific product suggestions for Gulf, Europe, and worldwide regions. Includes ingredient explanations and regional skincare considerations. 100% private—all analysis in your browser. Note: General guidance only, not a substitute for professional dermatological advice.',
  keywords: 'skincare routine, personalized skincare, skincare coach, skin type, morning skincare routine, evening skincare routine, climate skincare, skincare tips, anti-aging skincare, acne skincare, skincare products, skincare advice, regional skincare, gulf skincare, europe skincare, skincare ingredients, skincare guide, skincare routine builder, personalized skincare plan',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// Skin Types with Icon names
const skinTypes = [
  { value: 'oily', icon: 'droplet', name: 'Oily', description: 'Shiny skin, large pores, prone to breakouts' },
  { value: 'dry', icon: 'moon', name: 'Dry', description: 'Tight feeling, flaky patches, dullness' },
  { value: 'combination', icon: 'target', name: 'Combination', description: 'Oily T-zone, dry cheeks' },
  { value: 'sensitive', icon: 'heart', name: 'Sensitive', description: 'Easily irritated, redness, reactions' },
  { value: 'normal', icon: 'check-circle', name: 'Normal', description: 'Balanced, few concerns' }
];

// Skin Concerns with Icon names
const skinConcerns = [
  { value: 'acne', icon: 'alert-triangle', name: 'Acne & Breakouts' },
  { value: 'wrinkles', icon: 'target', name: 'Fine Lines & Wrinkles' },
  { value: 'dark-spots', icon: 'droplet', name: 'Dark Spots & Pigmentation' },
  { value: 'redness', icon: 'heart', name: 'Redness & Inflammation' },
  { value: 'pores', icon: 'target', name: 'Large Pores' },
  { value: 'dullness', icon: 'sun', name: 'Dull Skin' }
];

const skinProfile = ref({
  type: '',
  ageGroup: '20s',
  gender: 'female',
  country: '',
  climate: 'temperate'
});

const selectedConcerns = ref([]);
const lifestyleFactors = ref({
  office: false,
  outdoor: false,
  gym: false,
  pollution: false,
  makeup: false,
  stress: false
});

const routine = ref(null);

function generateRoutine() {
  const morningSteps = [
    { name: 'Gentle Cleanser', instruction: getCleanserRec(), product: 'CeraVe Hydrating Cleanser' },
    { name: 'Toner', instruction: 'Balance skin pH and prep for serums. Apply with hands or cotton pad.', product: 'Thayers Rose Petal Witch Hazel' },
    { name: 'Vitamin C Serum', instruction: 'Brightens skin and protects against environmental damage. Apply 2-3 drops to face and neck.', product: 'The Ordinary Vitamin C 23%' },
    { name: 'Eye Cream', instruction: 'Gently pat around eye area using ring finger to reduce puffiness and fine lines.', product: 'Neutrogena Hydro Boost Eye Gel' },
    { name: 'Moisturizer', instruction: getMoisturizerRec(), product: getMoisturizerProduct() },
    { name: 'Sunscreen SPF 50+', instruction: 'Apply generously 15 minutes before sun exposure. Reapply every 2 hours if outdoors.', product: 'La Roche-Posay Anthelios SPF 50' }
  ];

  const eveningSteps = [
    { name: 'Makeup Remover', instruction: lifestyleFactors.value.makeup ? 'Remove makeup with gentle oil cleanser using circular motions' : 'Skip if no makeup worn', product: 'Bioderma Sensibio H2O' },
    { name: 'Deep Cleanser', instruction: 'Remove dirt, oil, and pollution accumulated during the day. Massage for 60 seconds before rinsing.', product: 'Cetaphil Gentle Skin Cleanser' },
    { name: 'Exfoliant (2-3x/week)', instruction: 'Use chemical exfoliant 2-3 times per week to remove dead skin cells and unclog pores. Alternate nights with treatment serums.', product: 'Paula\'s Choice 2% BHA' },
    { name: 'Treatment Serum', instruction: getTreatmentSerum(), product: 'The Ordinary Niacinamide 10%' },
    { name: 'Eye Cream', instruction: 'Target dark circles and fine lines with nourishing eye treatment. Pat gently with ring finger.', product: 'Olay Eyes Deep Hydrating Eye Gel' },
    { name: 'Night Moisturizer', instruction: 'Rich formula to repair skin overnight. Apply generously, allowing time to absorb before bed.', product: 'Nivea Soft Moisturizing Cream' }
  ];

  const keyIngredients = [
    { name: 'Niacinamide', benefit: 'Reduces pores, controls oil production, brightens skin, strengthens barrier', safety: 'safe' },
    { name: 'Hyaluronic Acid', benefit: 'Intense hydration, plumps skin, retains moisture, suitable for all skin types', safety: 'safe' },
    { name: skinProfile.value.ageGroup >= '30s' ? 'Retinol' : 'Bakuchiol', benefit: skinProfile.value.ageGroup >= '30s' ? 'Anti-aging powerhouse, smooths texture, boosts collagen, reduces fine lines' : 'Gentle retinol alternative, anti-aging benefits without irritation', safety: 'caution' },
    { name: 'Vitamin C', benefit: 'Brightens skin, protects against environmental damage, boosts collagen production', safety: 'safe' }
  ];

  const climateTips = getClimateTips();
  const dietTips = [
    'Drink 8-10 glasses of water daily for hydrated, glowing skin',
    'Eat omega-3 rich foods (salmon, walnuts, chia seeds) to reduce inflammation',
    'Include vitamin C sources (oranges, berries, bell peppers) for collagen production',
    'Avoid excess sugar and processed foods—linked to acne and premature aging',
    'Green tea provides antioxidants that protect against environmental damage',
    'Dark leafy greens contain vitamins A, C, and E essential for skin health'
  ];

  routine.value = {
    morning: morningSteps,
    evening: eveningSteps,
    keyIngredients,
    climateTips,
    dietTips
  };

  setTimeout(() => {
    const resultsSection = document.querySelector('.results-section');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    AOS.refresh();
  }, 100);
}

function getCleanserRec() {
  if (skinProfile.value.type === 'oily') return 'Use foaming cleanser to remove excess oil without stripping skin. Cleanse morning and evening.';
  if (skinProfile.value.type === 'dry') return 'Use creamy, hydrating cleanser that doesn\'t leave skin feeling tight. Avoid over-cleansing.';
  if (skinProfile.value.type === 'sensitive') return 'Use gentle, fragrance-free cleanser. Look for calming ingredients like ceramides and niacinamide.';
  return 'Use gentle gel or cream cleanser suitable for daily use. Avoid harsh sulfates.';
}

function getMoisturizerRec() {
  if (skinProfile.value.type === 'oily') return 'Lightweight gel moisturizer that won\'t clog pores. Oil-free formulations are ideal.';
  if (skinProfile.value.type === 'dry') return 'Rich cream formula with ceramides, hyaluronic acid, and occlusive ingredients for intense hydration.';
  if (skinProfile.value.climate === 'hot-humid') return 'Lightweight, non-comedogenic gel moisturizer that won\'t feel heavy in humidity.';
  if (skinProfile.value.climate === 'cold-dry') return 'Rich, emollient cream with ceramides and oils to protect against harsh weather.';
  return 'Balanced lotion texture suitable for daily use. Adjust based on season.';
}

function getMoisturizerProduct() {
  if (skinProfile.value.type === 'oily') return 'Neutrogena Hydro Boost Water Gel';
  if (skinProfile.value.type === 'dry') return 'CeraVe Moisturizing Cream';
  if (skinProfile.value.climate === 'hot-humid') return 'Sebamed Clear Face Care Gel';
  return 'Cetaphil Daily Facial Moisturizer';
}

function getTreatmentSerum() {
  if (selectedConcerns.value.includes('acne')) return 'Salicylic acid serum to unclog pores, reduce inflammation, and prevent breakouts. Use on alternate nights.';
  if (selectedConcerns.value.includes('wrinkles')) return 'Retinol serum to boost collagen production and smooth fine lines. Start with low concentration 2-3x per week.';
  if (selectedConcerns.value.includes('dark-spots')) return 'Alpha arbutin or kojic acid serum to fade pigmentation and even skin tone. Use consistently for best results.';
  if (selectedConcerns.value.includes('redness')) return 'Niacinamide or centella asiatica serum to reduce redness and calm inflammation. Suitable for daily use.';
  return 'Niacinamide serum for overall skin health, brightness, and barrier strengthening. Suitable for daily use.';
}

function getClimateTips() {
  const climate = skinProfile.value.climate;
  if (climate === 'hot-humid') return 'Hot, humid weather: Use oil-free, lightweight products that won\'t clog pores. Blotting papers help control shine throughout the day. SPF 50+ is essential. Consider mattifying primers if wearing makeup.';
  if (climate === 'hot-dry') return 'Desert/hot dry climate: Hydration is critical. Use humectant-rich serums (hyaluronic acid) followed by occlusive moisturizers to lock in moisture. SPF 50+ mandatory. Consider using a humidifier indoors.';
  if (climate === 'cold-dry') return 'Cold, dry weather: Layer hydrating products and add facial oil at night. Use a humidifier in your bedroom. Switch to richer creams and reduce exfoliation frequency to avoid barrier damage.';
  if (climate === 'cold-humid') return 'Cold, humid climate: Balance moisture without heaviness. Focus on barrier repair with ceramides. Lightweight hydration works well, but protect against wind and cold.';
  return 'Temperate climate: Adjust routine with seasons. Use lighter products in summer, richer products in winter. Regular SPF is essential year-round.';
}

function downloadRoutine() {
  if (!routine.value) return;
  
  let content = `PERSONALIZED SKINCARE ROUTINE\n`;
  content += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  content += `Skin Type: ${skinProfile.value.type}\n`;
  content += `Age Group: ${skinProfile.value.ageGroup}\n`;
  content += `Climate: ${skinProfile.value.climate}\n`;
  content += `Concerns: ${selectedConcerns.value.join(', ') || 'None specified'}\n\n`;
  content += `MORNING ROUTINE:\n`;
  content += `${'='.repeat(50)}\n`;
  routine.value.morning.forEach((step, i) => {
    content += `${i + 1}. ${step.name}\n`;
    content += `   ${step.instruction}\n`;
    if (step.product) content += `   Product: ${step.product}\n`;
    content += `\n`;
  });
  content += `\nEVENING ROUTINE:\n`;
  content += `${'='.repeat(50)}\n`;
  routine.value.evening.forEach((step, i) => {
    content += `${i + 1}. ${step.name}\n`;
    content += `   ${step.instruction}\n`;
    if (step.product) content += `   Product: ${step.product}\n`;
    content += `\n`;
  });
  content += `\nKEY INGREDIENTS:\n`;
  content += `${'='.repeat(50)}\n`;
  routine.value.keyIngredients.forEach(ing => {
    content += `${ing.name}: ${ing.benefit} (${ing.safety})\n`;
  });
  if (routine.value.climateTips) {
    content += `\nCLIMATE-SPECIFIC TIPS:\n`;
    content += `${routine.value.climateTips}\n`;
  }
  content += `\nDIET & HYDRATION TIPS:\n`;
  content += `${'='.repeat(50)}\n`;
  routine.value.dietTips.forEach(tip => {
    content += `• ${tip}\n`;
  });

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `skincare-routine-${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  URL.revokeObjectURL(url);
}

function resetRoutine() {
  routine.value = null;
  skinProfile.value = {
    type: '',
    ageGroup: '20s',
    gender: 'female',
    country: '',
    climate: 'temperate'
  };
  selectedConcerns.value = [];
  lifestyleFactors.value = {
    office: false,
    outdoor: false,
    gym: false,
    pollution: false,
    makeup: false,
    stress: false
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQs
const faqs = ref([
  {
    question: 'How do I know my skin type?',
    answer: 'Wash your face with a gentle cleanser, wait 30 minutes without applying any products, then observe: Oily skin looks shiny all over, especially in the T-zone. Dry skin feels tight and may appear flaky. Combination skin has an oily T-zone (forehead, nose, chin) but normal or dry cheeks. Sensitive skin reacts easily to products with redness or irritation. Normal skin appears balanced with few concerns.'
  },
  {
    question: 'Can I use the same skincare routine year-round?',
    answer: 'No—your skin\'s needs change with seasons. Summer typically requires lighter, oil-free products and higher SPF. Winter demands richer moisturizers and barrier-repairing ingredients to combat dryness and harsh weather. Adjust your routine every 3-4 months based on climate changes. Pay attention to how your skin feels and adapt accordingly.'
  },
  {
    question: 'How long until I see results from my skincare routine?',
    answer: 'Most skincare products take 4-6 weeks to show visible results because cell turnover happens every 28 days. Active ingredients like retinol may take 3 months for anti-aging benefits. Acne treatments can show improvement in 2-6 weeks. Dark spot treatments require 8-12 weeks. Consistency matters more than expensive products—stick with your routine daily for best results.'
  },
  {
    question: 'Should I apply skincare products in a specific order?',
    answer: 'Yes—always apply products from thinnest to thickest consistency. Order: Cleanser → Toner → Serum → Eye Cream → Moisturizer → Sunscreen (morning only). This ensures each product absorbs properly and works effectively. Wait 30-60 seconds between layers for better absorption, especially before applying thicker products.'
  },
  {
    question: 'Do I really need sunscreen every day, even indoors?',
    answer: 'Absolutely—UV rays penetrate windows and clouds. Daily SPF 30+ prevents premature aging, dark spots, and skin cancer. In Gulf countries with intense sun, SPF 50+ is recommended. Reapply every 2 hours if outdoors or after sweating/swimming. Make sunscreen the final step of your morning routine, no exceptions.'
  },
  {
    question: 'Can diet affect my skin?',
    answer: 'Yes, dramatically. High-sugar and processed foods cause breakouts and accelerate aging through inflammation and glycation. Drink 2-3 liters of water daily for hydration. Foods rich in omega-3 (salmon, nuts), antioxidants (berries, dark chocolate), and vitamins A, C, E (leafy greens, citrus) promote glowing, healthy skin. Limit dairy and high-glycemic foods if prone to acne.'
  },
  {
    question: 'Are expensive skincare products always better?',
    answer: 'Not necessarily. What matters is the right ingredients at effective concentrations, not brand names or price. Many affordable brands offer excellent formulations with active ingredients. Focus on ingredients like niacinamide, hyaluronic acid, retinol, vitamin C, and salicylic acid rather than marketing claims. Drugstore brands often perform as well as luxury products when formulations are similar.'
  },
  {
    question: 'What ingredients should I avoid in skincare products?',
    answer: 'Sensitive skin should avoid alcohol, fragrances, harsh sulfates, and essential oils. Never mix retinol with vitamin C or AHAs/BHAs in the same routine—use them on alternate nights or at different times of day. Always patch test new products on your inner arm for 24-48 hours before facial application. Avoid physical scrubs if you have active acne or sensitive skin.'
  },
  {
    question: 'How often should I exfoliate my skin?',
    answer: 'Most skin types benefit from exfoliation 2-3 times per week. Oily skin can handle more frequent exfoliation (3-4x per week), while sensitive skin should exfoliate less (1-2x per week). Over-exfoliation damages the skin barrier, leading to sensitivity, dryness, and breakouts. Use gentle chemical exfoliants (AHAs, BHAs) rather than harsh physical scrubs. Reduce frequency in winter when skin is more sensitive.'
  },
  {
    question: 'Can I use retinol if I have sensitive skin?',
    answer: 'Yes, but start slowly. Use low concentrations (0.25-0.5%) and begin with 1-2x per week, gradually increasing frequency. Apply over moisturizer initially to buffer. Consider bakuchiol as a gentler retinol alternative. Always use SPF during the day when using retinol at night. Stop if you experience excessive irritation, redness, or peeling, and consult a dermatologist.'
  },
  {
    question: 'What\'s the difference between morning and evening routines?',
    answer: 'Morning routines focus on protection (antioxidants, SPF) and lightweight hydration. Evening routines focus on repair and treatment (retinol, exfoliants, richer creams). Nighttime is when skin repairs itself, so it\'s the best time for active ingredients. Always cleanse thoroughly in the evening to remove makeup, SPF, and environmental pollutants accumulated during the day.'
  },
  {
    question: 'How do I choose products for my climate?',
    answer: 'Hot, humid climates need lightweight, oil-free, non-comedogenic products. Hot, dry climates require intense hydration with humectants and occlusives. Cold, dry climates need rich creams, facial oils, and barrier-repair ingredients. Temperate climates require seasonal adjustments. Always prioritize SPF regardless of climate, adjusting strength (SPF 30-50+) based on UV index in your region.'
  }
]);

// Related Tools
const featuredTools = [
  {
    name: 'BMI Calculator',
    path: '/tools/bmi-calculator',
    icon: 'heart',
    description: 'Calculate your BMI and understand your body composition'
  },
  {
    name: 'Calorie Tracker',
    path: '/tools/calorie-tracker',
    icon: 'activity',
    description: 'Track nutrition for healthy skin from within'
  },
  {
    name: 'Meal Planner',
    path: '/tools/meal-planner',
    icon: 'calendar',
    description: 'Plan meals rich in skin-friendly nutrients'
  },
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build consistent skincare habits'
  }
];

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
    name: 'Free Professional Skincare Coach & Routine Builder',
    description: 'Personalized morning and evening skincare routines based on skin type, concerns, climate, age, and lifestyle. Expert recommendations with climate-specific product suggestions and ingredient explanations.',
    url: currentUrl,
    category: 'HealthApplication',
    features: [
      'Personalized skincare routines',
      'Morning and evening routines',
      'Skin type analysis',
      'Climate-specific recommendations',
      'Ingredient explanations',
      'Product recommendations',
      'Regional skincare considerations'
    ],
    usageInfo: 'Input skin type, concerns, age, lifestyle factors, and climate region. Receive customized morning and evening skincare routines with product recommendations.',
    helpText: 'Skincare Coach helps users build effective skincare routines tailored to their skin type, concerns, and environmental factors.'
  });
  
  const faqSchema = generateFAQSchema(faqs.value.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Skincare Coach', path: '/tools/skincare-coach' }
  ], baseUrl);
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: currentUrl,
    name: 'Free Skincare Coach 2025 | Personalized Skincare Routine Builder',
    description: 'Get personalized morning and evening skincare routines based on your skin type, concerns, age, climate, and lifestyle.',
    about: [
      { '@type': 'Thing', name: 'Skincare routine' },
      { '@type': 'Thing', name: 'Skin care' },
      { '@type': 'Thing', name: 'Beauty routine' }
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

.skincare-coach-page {
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
  padding: clamp(40px, 8vh, 80px) 0;
  margin-bottom: 40px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fbbf24;
  margin-bottom: 24px;
}

.eyebrow svg {
  color: #fbbf24;
}

.hero-section h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 24px;
  background: linear-gradient(135deg, var(--text-primary) 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  max-width: 900px;
  margin: 0 auto 32px;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.8;
  color: var(--text-secondary);
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 500;
}

.badge svg {
  color: #fbbf24;
}

/* Disclaimer Banner */
.disclaimer-banner {
  padding: 24px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
  border: 2px solid rgba(59, 130, 246, 0.3);
  border-radius: 16px;
}

.disclaimer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.disclaimer-header strong {
  color: #3b82f6;
  font-size: 1.125rem;
  font-weight: 700;
}

.disclaimer-header svg {
  color: #3b82f6;
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

.tool-header h2 svg {
  color: #fbbf24;
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
  background: rgba(251, 191, 36, 0.1);
  border-color: #fbbf24;
  color: #fbbf24;
}

.tool-content-wrapper {
  padding: 32px;
}

/* Input Sections */
.input-section, .personal-section, .lifestyle-section {
  margin-bottom: 40px;
}

.input-section h3, .personal-section h3, .lifestyle-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.input-section h3 svg, .personal-section h3 svg, .lifestyle-section h3 svg {
  color: #fbbf24;
}

.section-intro {
  color: var(--text-secondary);
  margin-bottom: 24px;
  line-height: 1.7;
}

/* Skin Type Cards */
.skin-type-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.skin-type-card {
  position: relative;
  padding: 24px;
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  background: var(--glass-bg);
}

.skin-type-card:hover {
  border-color: #fbbf24;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.15);
}

.skin-type-card.active {
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-color: #fbbf24;
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.2);
}

.radio-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.card-content {
  text-align: center;
}

.type-icon-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-radius: 50%;
}

.type-icon-wrapper svg {
  color: #fbbf24;
}

.card-content h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.card-content p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Concerns Section */
.concerns-section {
  margin-top: 32px;
}

.concerns-section h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 20px;
}

.concerns-section h4 svg {
  color: #fbbf24;
}

.concerns-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.concern-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.concern-checkbox:hover {
  border-color: #fbbf24;
  background: rgba(251, 191, 36, 0.05);
}

.concern-checkbox input[type="checkbox"]:checked + svg + span,
.concern-checkbox:has(input[type="checkbox"]:checked) {
  border-color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
}

.concern-checkbox svg {
  color: #fbbf24;
  flex-shrink: 0;
}

.concern-checkbox span {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Form Grid */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
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

.form-group label svg {
  color: #fbbf24;
}

.styled-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-family: inherit;
  transition: all 0.2s;
}

.styled-input:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.1);
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
  padding: 14px 18px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.lifestyle-checkbox:hover {
  border-color: #fbbf24;
  background: rgba(251, 191, 36, 0.05);
}

.lifestyle-checkbox:has(input[type="checkbox"]:checked) {
  border-color: #fbbf24;
  background: rgba(251, 191, 36, 0.1);
}

.lifestyle-checkbox svg {
  color: #fbbf24;
  flex-shrink: 0;
}

.lifestyle-checkbox span {
  font-size: 0.9375rem;
  color: var(--text-primary);
  font-weight: 500;
}

/* Button */
.btn-large {
  width: 100%;
  max-width: 500px;
  margin: 40px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  font-size: 1.125rem;
  font-weight: 600;
}

/* Results Section */
.results-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 2px solid rgba(251, 191, 36, 0.2);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.results-header {
  margin-bottom: 32px;
}

.results-header h2 {
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--text-primary) 0%, #fbbf24 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Routine Cards */
.routine-card {
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid var(--glass-border);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
}

.routine-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(251, 191, 36, 0.2);
}

.routine-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.routine-header svg {
  color: #fbbf24;
}

.routine-steps {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.step-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.step-item:hover {
  border-color: #fbbf24;
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.1);
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--bg-primary);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
}

.step-content {
  flex: 1;
}

.step-content h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.step-content p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 12px;
}

.product-rec {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 8px;
  font-size: 0.875rem;
  color: #f59e0b;
  font-weight: 600;
  font-style: italic;
}

.product-rec svg {
  color: #fbbf24;
}

/* Ingredients Card */
.ingredients-card {
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid var(--glass-border);
  border-radius: 20px;
}

.ingredients-card h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.ingredients-card h3 svg {
  color: #fbbf24;
}

.ingredients-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.ingredient-item {
  padding: 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  transition: all 0.3s;
}

.ingredient-item:hover {
  border-color: #fbbf24;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(251, 191, 36, 0.1);
}

.ingredient-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.ingredient-item p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 12px;
  font-size: 0.9375rem;
}

.safety {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.safety.safe {
  background: rgba(16, 185, 129, 0.2);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.safety.caution {
  background: rgba(245, 158, 11, 0.2);
  color: #f59e0b;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

/* Tips Card */
.tips-card {
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid var(--glass-border);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%);
}

.tips-card h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.tips-card h3 svg {
  color: #3b82f6;
}

.tips-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: 1rem;
}

/* Diet Card */
.diet-card {
  padding: 32px;
  margin-bottom: 32px;
  border: 2px solid var(--glass-border);
  border-radius: 20px;
}

.diet-card h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.diet-card h3 svg {
  color: #fbbf24;
}

.diet-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.diet-list li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-secondary);
  line-height: 1.7;
  transition: all 0.2s;
}

.diet-list li:hover {
  border-color: #fbbf24;
  background: rgba(251, 191, 36, 0.05);
}

.diet-list li svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

/* Content Sections */
.content-sections {
  margin: 60px 0;
}

.content-card {
  padding: 48px;
  margin-bottom: 48px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
}

.content-card h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.content-card h2 svg {
  color: #fbbf24;
}

.content-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 32px 0 16px;
}

.content-card p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.0625rem;
}

.content-list {
  list-style: none;
  padding: 0;
  margin: 24px 0;
}

.content-list li {
  padding: 12px 0 12px 32px;
  position: relative;
  color: var(--text-secondary);
  line-height: 1.7;
}

.content-list li::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 18px;
  width: 8px;
  height: 8px;
  background: #fbbf24;
  border-radius: 50%;
}

.content-list li strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* Skin Type Info Grid */
.skin-type-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.skin-type-info {
  padding: 24px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.skin-type-info:hover {
  border-color: #fbbf24;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.1);
}

.skin-type-info svg {
  color: #fbbf24;
  margin-bottom: 16px;
}

.skin-type-info h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.skin-type-info p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

/* Regional Sections */
.regional-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 32px;
}

.regional-block {
  padding: 32px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 16px;
}

.regional-block h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.regional-block h3 svg {
  color: #fbbf24;
}

.regional-block p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 20px;
}

/* Concerns Info Grid */
.concerns-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.concern-info-item {
  padding: 24px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.concern-info-item:hover {
  border-color: #fbbf24;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(251, 191, 36, 0.1);
}

.concern-info-item svg {
  color: #fbbf24;
  margin-bottom: 16px;
}

.concern-info-item h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.concern-info-item p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 12px;
  font-size: 0.9375rem;
}

.concern-info-item p:last-child {
  margin-bottom: 0;
}

.concern-info-item p strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* Tips List */
.tips-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 32px;
}

.tip-item {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.tip-item:hover {
  border-color: #fbbf24;
  transform: translateX(4px);
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.1);
}

.tip-item svg {
  color: #10b981;
  flex-shrink: 0;
  margin-top: 2px;
}

.tip-item h4 {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 8px;
}

.tip-item p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
  font-size: 0.9375rem;
}

/* FAQ Container */
.faq-container {
  margin: 60px 0;
}

.faq-container h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 40px;
  justify-content: center;
}

.faq-container h2 svg {
  color: #fbbf24;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  padding: 32px;
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  transition: all 0.3s;
}

.faq-item:hover {
  border-color: #fbbf24;
  box-shadow: 0 4px 16px rgba(251, 191, 36, 0.1);
}

.faq-item h4 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.faq-item p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin: 0;
  font-size: 1rem;
}

/* Related Tools Section */
.related-tools-section {
  margin: 60px 0;
  padding: 48px;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(245, 158, 11, 0.02) 100%);
  border: 2px solid var(--glass-border);
  border-radius: 20px;
}

.related-tools-section h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: center;
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 40px;
  justify-content: center;
}

.related-tools-section h2 svg {
  color: #fbbf24;
}

.featured-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.featured-tool-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 32px 24px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.featured-tool-card:hover {
  border-color: #fbbf24;
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(251, 191, 36, 0.2);
}

.tool-icon-wrapper {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
  border-radius: 50%;
  margin-bottom: 20px;
}

.tool-icon-wrapper svg {
  color: #fbbf24;
}

.featured-tool-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.featured-tool-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 20px;
  font-size: 0.9375rem;
  flex: 1;
}

.tool-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #fbbf24;
  font-weight: 600;
  font-size: 0.9375rem;
  transition: gap 0.2s;
}

.featured-tool-card:hover .tool-link {
  gap: 12px;
}

.tool-link svg {
  transition: transform 0.2s;
}

.featured-tool-card:hover .tool-link svg {
  transform: translateX(4px);
}

/* Responsive */
@media (max-width: 768px) {
  .container-lg {
    padding: 0 16px;
  }

  .tool-content-wrapper {
    padding: 24px;
  }

  .skin-type-cards {
    grid-template-columns: 1fr;
  }

  .form-grid, .lifestyle-grid, .concerns-grid {
    grid-template-columns: 1fr;
  }

  .content-card {
    padding: 32px 24px;
  }

  .skin-type-info-grid, .concerns-info-grid {
    grid-template-columns: 1fr;
  }

  .routine-card, .ingredients-card, .tips-card, .diet-card {
    padding: 24px;
  }

  .step-item {
    flex-direction: column;
    text-align: center;
  }

  .step-number {
    margin: 0 auto;
  }

  .related-tools-section {
    padding: 32px 24px;
  }

  .featured-tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
