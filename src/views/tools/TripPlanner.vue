<template>
  <div class="tool-page trip-planner-page">
    <div class="container-lg">
      
      <!-- Breadcrumb Navigation -->
      <Breadcrumb toolName="Trip Planner" category="Travel" />
      
      <!-- Hero Section -->
      <section class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="map" :size="16" />
          Global Trip Planning & Itinerary Generator
        </p>
        <h1>Free AI Trip Planner & Travel Itinerary Generator</h1>
        <p class="hero-subtitle">
          Plan your perfect trip with day-by-day itineraries for destinations worldwide. Get personalized travel plans based on your budget, duration, and interests. Free, instant, and completely private—all planning happens in your browser.
        </p>
        <div class="hero-badges">
          <span class="badge">
            <Icon name="map" :size="14" />
            Worldwide Destinations
          </span>
          <span class="badge">
            <Icon name="calendar" :size="14" />
            Custom Duration
          </span>
          <span class="badge">
            <Icon name="dollar-sign" :size="14" />
            Budget Planning
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
          <strong>Trip Planner</strong> generates personalized day-by-day travel itineraries for destinations worldwide based on trip duration, budget, interests, and travel style. The tool creates detailed schedules including attractions, activities, restaurants, and travel tips for popular destinations. 
          Users select a destination, specify trip length (1-14 days), set budget range, and choose interests (culture, nature, food, adventure, etc.) to receive a comprehensive itinerary with time estimates, costs, and recommendations. The tool helps travelers organize trips efficiently, discover must-see attractions, and plan activities that match their preferences. All planning happens instantly in the browser for privacy.
        </p>
      </div>

      <!-- Main Tool Interface -->
      <div class="tool-interface glass-card" data-aos="fade-up" data-aos-delay="100">
        <div class="tool-header">
          <h2>
            <Icon name="map" :size="24" />
            Plan Your Trip
          </h2>
          <div class="tool-actions" v-if="itinerary">
            <button @click="copyItinerary" class="icon-btn" title="Copy Itinerary">
              <Icon name="copy" :size="18" />
            </button>
            <button @click="downloadItinerary" class="icon-btn" title="Download Itinerary">
              <Icon name="download" :size="18" />
            </button>
            <button @click="resetAll" class="icon-btn" title="Reset">
              <Icon name="refresh-cw" :size="18" />
            </button>
          </div>
        </div>

        <div class="tool-content-wrapper">
          
          <!-- Input Section -->
          <div class="input-section">
            <div class="form-grid">
              <div class="form-group full-width">
                <label>
                  <Icon name="map" :size="16" />
                  Destination
                </label>
                <select v-model="destination" class="styled-input select-input" required>
                  <option value="">Select a destination...</option>
                  <optgroup label="🇵🇰 Pakistan (Recommended)">
                    <option>Islamabad, Pakistan</option>
                    <option>Karachi, Pakistan</option>
                    <option>Lahore, Pakistan</option>
                    <option>Northern Pakistan (Hunza Valley)</option>
                  </optgroup>
                  <optgroup label="🌍 Africa">
                    <option>Cairo, Egypt</option>
                    <option>Cape Town, South Africa</option>
                    <option>Marrakech, Morocco</option>
                  </optgroup>
                  <optgroup label="🌏 Asia">
                    <option>Bali, Indonesia</option>
                    <option>Bangkok, Thailand</option>
                    <option>Dubai, UAE</option>
                    <option>Hong Kong</option>
                    <option>Istanbul, Turkey</option>
                    <option>Seoul, South Korea</option>
                    <option>Singapore</option>
                    <option>Tokyo, Japan</option>
                  </optgroup>
                  <optgroup label="🇮🇳 India">
                    <option>Delhi, India</option>
                    <option>Goa, India</option>
                    <option>Mumbai, India</option>
                  </optgroup>
                  <optgroup label="🌎 Americas">
                    <option>Buenos Aires, Argentina</option>
                    <option>Los Angeles, USA</option>
                    <option>Mexico City, Mexico</option>
                    <option>New York, USA</option>
                    <option>Rio de Janeiro, Brazil</option>
                    <option>Toronto, Canada</option>
                  </optgroup>
                  <optgroup label="🌊 Oceania">
                    <option>Auckland, New Zealand</option>
                    <option>Melbourne, Australia</option>
                    <option>Sydney, Australia</option>
                  </optgroup>
                  <optgroup label="🇪🇺 Europe">
                    <option>Amsterdam, Netherlands</option>
                    <option>Athens, Greece</option>
                    <option>Barcelona, Spain</option>
                    <option>Berlin, Germany</option>
                    <option>London, UK</option>
                    <option>Paris, France</option>
                    <option>Prague, Czech Republic</option>
                    <option>Rome, Italy</option>
                    <option>Vienna, Austria</option>
                  </optgroup>
                </select>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="calendar" :size="16" />
                  Trip Duration (days)
                </label>
                <input 
                  type="number" 
                  v-model.number="days" 
                  min="1" 
                  max="30"
                  class="styled-input"
                  required
                >
                <small class="hint">1-30 days recommended</small>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="users" :size="16" />
                  Travelers
                </label>
                <select v-model="travelers" class="styled-input select-input">
                  <option :value="1">Solo (1 person)</option>
                  <option :value="2">Couple (2 people)</option>
                  <option :value="3">Small Group (3-4)</option>
                  <option :value="5">Group (5-6)</option>
                  <option :value="7">Large Group (7+)</option>
                </select>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="zap" :size="16" />
                  Travel Style
                </label>
                <select v-model="travelStyle" class="styled-input select-input">
                  <option value="balanced">Balanced (Mix of everything)</option>
                  <option value="budget">Budget-Friendly</option>
                  <option value="luxury">Luxury</option>
                  <option value="adventure">Adventure & Outdoor</option>
                  <option value="cultural">Cultural & Historical</option>
                  <option value="relaxation">Relaxation & Leisure</option>
                  <option value="family">Family-Friendly</option>
                </select>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="dollar-sign" :size="16" />
                  Budget (USD) <span class="optional">Optional</span>
                </label>
                <input 
                  type="number" 
                  v-model.number="budget" 
                  min="0"
                  placeholder="Enter your budget"
                  class="styled-input"
                >
                <small class="hint">Total trip budget for all travelers</small>
              </div>

              <div class="form-group">
                <label>
                  <Icon name="briefcase" :size="16" />
                  Accommodation Type <span class="optional">Optional</span>
                </label>
                <select v-model="accommodationType" class="styled-input select-input">
                  <option value="any">Any</option>
                  <option value="budget">Budget (Hostels, Guesthouses)</option>
                  <option value="mid-range">Mid-Range (3-4 Star Hotels)</option>
                  <option value="luxury">Luxury (5 Star Hotels, Resorts)</option>
                  <option value="apartment">Vacation Rentals / Apartments</option>
                </select>
              </div>
            </div>

            <!-- Activity Preferences -->
            <div class="preferences-section">
              <h3>
                <Icon name="target" :size="18" />
                Activity Preferences <span class="optional">(Optional)</span>
              </h3>
              <div class="preferences-grid">
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.historical">
                  <Icon name="book-open" :size="16" />
                  <span>Historical Sites</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.nature">
                  <Icon name="activity" :size="16" />
                  <span>Nature & Outdoors</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.nightlife">
                  <Icon name="moon" :size="16" />
                  <span>Nightlife & Entertainment</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.shopping">
                  <Icon name="shopping-bag" :size="16" />
                  <span>Shopping</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.food">
                  <Icon name="coffee" :size="16" />
                  <span>Food & Dining</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.beaches">
                  <Icon name="sun" :size="16" />
                  <span>Beaches & Water Sports</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.art">
                  <Icon name="palette" :size="16" />
                  <span>Art & Museums</span>
                </label>
                <label class="preference-checkbox">
                  <input type="checkbox" v-model="preferences.family">
                  <Icon name="users" :size="16" />
                  <span>Family Activities</span>
                </label>
              </div>
            </div>

            <button 
              type="button"
              @click="generateItinerary" 
              class="btn btn-primary" 
              :disabled="!destination || !days || days < 1"
            >
              <Icon name="zap" :size="18" />
              Generate Itinerary
            </button>
          </div>

          <!-- Results Section -->
          <div v-if="itinerary" class="results-section">
            
            <!-- Destination Overview -->
            <div class="destination-overview glass-card">
              <div class="overview-header">
                <h3>{{ itinerary.destination }}</h3>
                <div class="destination-badge">
                  <Icon name="map" :size="14" />
                  <span>{{ days }} Day{{ days > 1 ? 's' : '' }} Trip</span>
                </div>
              </div>
              <p class="destination-description">{{ itinerary.description }}</p>
              
              <!-- Trip Details -->
              <div class="trip-details-tags" v-if="itinerary.tripDetails">
                <span class="detail-tag">
                  <Icon name="users" :size="14" />
                  {{ itinerary.tripDetails.travelers }} {{ itinerary.tripDetails.travelers === 1 ? 'Traveler' : 'Travelers' }}
                </span>
                <span class="detail-tag">
                  <Icon name="zap" :size="14" />
                  {{ formatTravelStyle(itinerary.tripDetails.travelStyle) }}
                </span>
                <span class="detail-tag" v-if="itinerary.tripDetails.accommodationType !== 'any'">
                  <Icon name="briefcase" :size="14" />
                  {{ formatAccommodation(itinerary.tripDetails.accommodationType) }}
                </span>
              </div>

              <div class="overview-stats">
                <div class="stat-item">
                  <Icon name="calendar" :size="18" />
                  <div>
                    <span class="stat-label">Duration</span>
                    <span class="stat-value">{{ days }} Day{{ days > 1 ? 's' : '' }}</span>
                  </div>
                </div>
                <div class="stat-item" v-if="budget">
                  <Icon name="dollar-sign" :size="18" />
                  <div>
                    <span class="stat-label">Total Budget</span>
                    <span class="stat-value">${{ budget.toLocaleString() }}</span>
                  </div>
                </div>
                <div class="stat-item" v-if="budget && itinerary.budgetBreakdown">
                  <Icon name="target" :size="18" />
                  <div>
                    <span class="stat-label">Per Person/Day</span>
                    <span class="stat-value">${{ Math.round(itinerary.budgetBreakdown.perPerson / days).toLocaleString() }}</span>
                  </div>
                </div>
                <div class="stat-item">
                  <Icon name="check-circle" :size="18" />
                  <div>
                    <span class="stat-label">Activities</span>
                    <span class="stat-value">{{ itinerary.days.reduce((acc, day) => acc + day.activities.length, 0) }} Total</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Day-by-Day Itinerary with Timeline -->
            <div class="itinerary-timeline" data-aos="fade-up">
              <div v-for="(day, dayIndex) in itinerary.days" :key="day.day" class="timeline-day" data-aos="fade-up" :data-aos-delay="dayIndex * 100">
                <div class="timeline-connector" v-if="dayIndex < itinerary.days.length - 1"></div>
                <div class="timeline-marker">
                  <div class="marker-inner">
                    <span class="day-number">{{ day.day }}</span>
                  </div>
                </div>
                <div class="day-card-visual glass-card">
                  <div class="day-header-visual">
                    <div class="day-title-section">
                      <h4 class="day-title">{{ day.title }}</h4>
                      <span class="day-label">Day {{ day.day }}</span>
                    </div>
                    <div class="day-icon">
                      <Icon name="map" :size="24" />
                    </div>
                  </div>
                  <div class="activities-timeline">
                    <div 
                      v-for="(activity, idx) in day.activities" 
                      :key="idx" 
                      class="activity-item-visual"
                    >
                      <div class="activity-marker">
                        <Icon name="check-circle" :size="16" />
                      </div>
                      <div class="activity-content">
                        <span class="activity-time">{{ getActivityTime(idx) }}</span>
                        <p class="activity-text">{{ activity }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Travel Tips -->
            <div v-if="itinerary.tips && itinerary.tips.length > 0" class="tips-section glass-card" data-aos="fade-up">
              <h3>
                <Icon name="info" :size="20" />
                Travel Tips & Recommendations
              </h3>
              <ul class="tips-list">
                <li v-for="(tip, idx) in itinerary.tips" :key="idx">
                  <Icon name="arrow-right" :size="14" />
                  {{ tip }}
                </li>
              </ul>
            </div>

            <!-- Budget Breakdown (if budget provided) -->
            <div v-if="budget && itinerary.budgetBreakdown" class="budget-section glass-card">
              <h3>
                <Icon name="dollar-sign" :size="20" />
                Estimated Budget Breakdown
              </h3>
              <div class="budget-grid">
                <div class="budget-item" v-for="(item, key) in itinerary.budgetBreakdown" :key="key">
                  <span class="budget-category">{{ formatCategory(key) }}</span>
                  <span class="budget-amount">${{ item.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!itinerary" class="empty-state">
            <Icon name="map" :size="64" />
            <h3>Ready to Plan Your Trip?</h3>
            <p>Select a destination, choose your trip duration, and optionally set your budget to generate a personalized itinerary.</p>
          </div>

        </div>
      </div>

      <!-- Content Sections -->
      <section class="content-section">
        
        <!-- How Trip Planning Works -->
        <article class="content-card">
          <h2>
            <Icon name="target" :size="24" />
            How This Trip Planner Works
          </h2>
          <p>
            Planning a trip can be overwhelming, especially when visiting a new destination. This free Trip Planner 
            simplifies the process by generating day-by-day itineraries tailored to your preferences, helping you make 
            the most of your travel time and budget.
          </p>
          
          <h3>Step-by-Step Process</h3>
          <div class="features-grid">
            <div class="feature-box">
              <Icon name="map" :size="32" />
              <h4>Choose Your Destination</h4>
              <p>Select from our curated list of popular worldwide destinations, from historic European cities to vibrant Asian metropolises and stunning beach destinations.</p>
            </div>
            <div class="feature-box">
              <Icon name="calendar" :size="32" />
              <h4>Set Your Duration</h4>
              <p>Specify how many days you'll be traveling. Our planner adapts the itinerary to ensure you see the best attractions without feeling rushed.</p>
            </div>
            <div class="feature-box">
              <Icon name="dollar-sign" :size="32" />
              <h4>Optional Budget Planning</h4>
              <p>Enter your total budget to get an estimated breakdown of expenses across accommodation, food, activities, and transportation.</p>
            </div>
            <div class="feature-box">
              <Icon name="zap" :size="32" />
              <h4>Get Your Itinerary</h4>
              <p>Receive a detailed day-by-day plan with recommended activities, travel tips, and practical advice to enhance your trip experience.</p>
            </div>
          </div>
        </article>

        <!-- Why Plan Your Trip -->
        <article class="content-card">
          <h2>
            <Icon name="book-open" :size="24" />
            Why Plan Your Trip in Advance?
          </h2>
          <p>
            While spontaneous travel has its appeal, planning your trip in advance offers significant advantages that 
            can enhance your travel experience, save money, and reduce stress during your journey.
          </p>

          <div class="use-cases-grid">
            <div class="use-case-item">
              <Icon name="dollar-sign" :size="24" />
              <h4>Save Money</h4>
              <p>Booking flights, accommodations, and activities in advance often results in better prices. Early planning allows you to take advantage of discounts and special offers.</p>
            </div>
            <div class="use-case-item">
              <Icon name="zap" :size="24" />
              <h4>Optimize Your Time</h4>
              <p>A well-structured itinerary ensures you don't waste time deciding what to do each day. You'll see more attractions and have more meaningful experiences.</p>
            </div>
            <div class="use-case-item">
              <Icon name="target" :size="24" />
              <h4>Secure Popular Attractions</h4>
              <p>Many popular destinations require advance bookings for museums, tours, and restaurants. Planning ahead ensures you don't miss must-see attractions.</p>
            </div>
            <div class="use-case-item">
              <Icon name="shield" :size="24" />
              <h4>Reduce Travel Stress</h4>
              <p>Having a clear plan reduces decision fatigue and anxiety. You'll feel more confident and relaxed, allowing you to fully enjoy your destination.</p>
            </div>
            <div class="use-case-item">
              <Icon name="users" :size="24" />
              <h4>Better Group Coordination</h4>
              <p>When traveling with family or friends, a shared itinerary helps coordinate activities, manages expectations, and ensures everyone's interests are considered.</p>
            </div>
            <div class="use-case-item">
              <Icon name="globe" :size="24" />
              <h4>Discover Hidden Gems</h4>
              <p>Research and planning help you discover lesser-known attractions, local restaurants, and unique experiences beyond tourist traps.</p>
            </div>
          </div>
        </article>

        <!-- Real-Life Travel Scenarios -->
        <article class="content-card">
          <h2>
            <Icon name="briefcase" :size="24" />
            Common Travel Scenarios
          </h2>
          
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="calendar" :size="20" />
              <div>
                <h4>Weekend Getaways</h4>
                <p>
                  Short 2-3 day trips require careful planning to maximize your limited time. Focus on must-see attractions 
                  clustered in one area, book skip-the-line tickets in advance, and choose accommodation near the main sights 
                  to minimize transportation time.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="globe" :size="20" />
              <div>
                <h4>Week-Long Vacations</h4>
                <p>
                  A 5-7 day trip allows for a more relaxed pace. Divide your time between different neighborhoods or regions, 
                  include a mix of cultural attractions and leisure activities, and build in buffer time for unexpected discoveries 
                  and local experiences.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="trending-up" :size="20" />
              <div>
                <h4>Extended Travel</h4>
                <p>
                  For trips lasting two weeks or more, plan a flexible itinerary that allows for spontaneous exploration. 
                  Book the first few days in detail, then leave room for recommendations from locals and fellow travelers. 
                  Consider multi-city passes for transportation savings.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="users" :size="20" />
              <div>
                <h4>Family Travel</h4>
                <p>
                  When traveling with children, plan shorter activity periods, include kid-friendly attractions, and build in 
                  rest breaks. Research family-friendly restaurants and accommodations, and always have backup indoor activities 
                  in case of bad weather.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="briefcase" :size="20" />
              <div>
                <h4>Business + Leisure</h4>
                <p>
                  Combine work commitments with leisure time by planning business activities in the morning and reserving 
                  afternoons for sightseeing. Use efficient transportation options and choose hotels with good connectivity 
                  to maximize your limited free time.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="heart" :size="20" />
              <div>
                <h4>Romantic Getaways</h4>
                <p>
                  Plan intimate dining experiences, scenic walks, and couples' activities. Book romantic accommodations in 
                  advance, research sunset spots and viewpoints, and include some flexible time for spontaneous moments together.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- Travel Planning Tips -->
        <article class="content-card">
          <h2>
            <Icon name="star" :size="24" />
            Expert Travel Planning Tips
          </h2>
          
          <div class="tips-list">
            <div class="tip-item">
              <Icon name="info" :size="20" />
              <div>
                <h4>Research Weather Patterns</h4>
                <p>
                  Check seasonal weather patterns for your destination before finalizing dates. Consider shoulder seasons 
                  (spring and fall) for better weather and fewer crowds at popular destinations.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="target" :size="20" />
              <div>
                <h4>Prioritize Must-See Attractions</h4>
                <p>
                  Identify your top 3-5 must-see attractions and schedule them first. This ensures you don't miss what 
                  matters most to you, even if unexpected changes occur during your trip.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="map" :size="20" />
              <div>
                <h4>Group Activities by Location</h4>
                <p>
                  Plan activities in the same neighborhood or area on the same day to minimize travel time and maximize 
                  your sightseeing efficiency. Use maps to visualize distances between attractions.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="dollar-sign" :size="20" />
              <div>
                <h4>Budget for Unexpected Expenses</h4>
                <p>
                  Allocate 10-15% of your budget for unexpected expenses, souvenirs, and spontaneous activities. Having 
                  this buffer reduces stress and allows for flexibility during your trip.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="book-open" :size="20" />
              <div>
                <h4>Learn Basic Local Phrases</h4>
                <p>
                  Learn essential phrases in the local language: "hello," "thank you," "please," "excuse me," and "do you 
                  speak English?" This shows respect and often leads to better interactions with locals.
                </p>
              </div>
            </div>
            
            <div class="tip-item">
              <Icon name="shield" :size="20" />
              <div>
                <h4>Have Digital and Physical Backups</h4>
                <p>
                  Save your itinerary, important documents, and reservations both digitally (phone/cloud) and physically 
                  (printed copies). This ensures access even if technology fails or batteries die.
                </p>
              </div>
            </div>
          </div>
        </article>

        <!-- FAQs -->
        <article class="content-card">
          <h2>
            <Icon name="help-circle" :size="24" />
            Frequently Asked Questions
          </h2>
          
          <div class="faq-container">
            <div class="faq-list">
              <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item">
                <button 
                  @click="faq.open = !faq.open" 
                  class="faq-question"
                  :aria-expanded="faq.open"
                >
                  <span>{{ faq.question }}</span>
                  <Icon :name="faq.open ? 'chevron-up' : 'chevron-down'" :size="20" />
                </button>
                <div v-if="faq.open" class="faq-answer">
                  <p>{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- Trust & Privacy -->
        <article class="trust-section">
          <div class="trust-card glass-card">
            <Icon name="shield" :size="32" />
            <h3>Privacy & Security</h3>
            <p>
              All trip planning happens entirely in your browser. We don't collect, store, or transmit any of your 
              travel information. Your destinations, budgets, and itineraries remain completely private on your device.
            </p>
          </div>
          <div class="trust-card glass-card">
            <Icon name="info" :size="32" />
            <h3>Travel Disclaimer</h3>
            <p>
              This tool provides general travel planning suggestions for informational purposes only. Always verify current 
              travel requirements, visa regulations, local laws, and safety conditions before traveling. Check official 
              government websites and consult with travel professionals for specific advice. Budget estimates are approximate 
              and may vary based on personal preferences, season, and local economic conditions.
            </p>
          </div>
        </article>

        <!-- CTA -->
        <section class="cta-section">
          <h2>Ready to Plan Your Next Adventure?</h2>
          <p>Start planning your perfect trip today. Select a destination above and generate your personalized itinerary instantly.</p>
          <div class="cta-buttons">
            <button @click="scrollToTop" class="btn btn-primary">
              <Icon name="map" :size="18" />
              Plan Your Trip Now
            </button>
            <router-link to="/tools/habit-tracker" class="btn btn-outline">
              <Icon name="check-circle" :size="18" />
              Track Travel Habits
            </router-link>
          </div>
        </section>

        <!-- Featured Tools -->
        <section class="featured-tools-section glass-card">
          <h2>
            <Icon name="zap" :size="24" />
            Related Travel & Productivity Tools
          </h2>
          <p class="section-subtitle">
            Explore other helpful tools that complement your travel planning and enhance your journey
          </p>
          
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
                Try it now <Icon name="arrow-right" :size="16" />
              </span>
            </router-link>
          </div>
        </section>

      </section>

      <!-- Related Tools Section -->
      <RelatedTools currentTool="/tools/trip-planner" category="Travel" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSEO } from '@/composables/useSEO';
import { generateCustomItinerary, searchItinerary } from '@/data/tripItineraries';
import Icon from '@/components/Icon.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import RelatedTools from '@/components/RelatedTools.vue';
import { 
  generateToolSchema, 
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';

import AOS from 'aos';

// SEO Configuration with enhanced AI/LLM optimization
const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
const currentUrl = typeof window !== 'undefined' ? window.location.href : `${baseUrl}/tools/trip-planner`;

useSEO({
  title: 'Free AI Trip Planner 2025 | Travel Itinerary Generator | Worldwide Destinations',
  description: 'Plan perfect trips with personalized day-by-day itineraries for destinations worldwide. Free trip planner with budget breakdown, travel tips, attractions, restaurants, and activity recommendations. Instant itinerary generation based on duration, budget, and interests. Privacy-focused, works offline.',
  keywords: 'trip planner, travel itinerary generator, vacation planner, travel planning tool, itinerary builder, trip itinerary, travel guide, vacation planning, travel route planner, travel budget calculator, travel itinerary app, trip organizer, vacation itinerary generator',
  canonical: currentUrl,
  jsonLd: null // Will be set in onMounted
});

// State
const destination = ref('');
const days = ref(3);
const travelers = ref(2);
const travelStyle = ref('balanced');
const accommodationType = ref('any');
const budget = ref(null);
const preferences = ref({
  historical: false,
  nature: false,
  nightlife: false,
  shopping: false,
  food: false,
  beaches: false,
  art: false,
  family: false
});
const itinerary = ref(null);

// Generate Itinerary
function generateItinerary() {
  // Validate inputs
  if (!destination.value || !days.value) {
    alert('Please select a destination and enter trip duration.');
    return;
  }
  
  const destStr = String(destination.value).trim();
  const daysVal = Number(days.value);
  
  if (!destStr || daysVal < 1 || daysVal > 30) {
    alert('Please select a destination and enter a valid trip duration (1-30 days).');
    return;
  }
  
  try {
    const result = generateCustomItinerary(destStr, daysVal);
    
    if (!result) {
      const suggestions = getSuggestedDestinations();
      alert(`Itinerary not available for "${destStr}".\n\nSuggested destinations:\n${suggestions.slice(0, 8).join('\n')}`);
      return;
    }

    // Create itinerary data
    const itineraryData = {
      ...result,
      tripDetails: {
        travelers: travelers.value,
        travelStyle: travelStyle.value,
        accommodationType: accommodationType.value,
        preferences: Object.keys(preferences.value).filter(key => preferences.value[key])
      }
    };

    // Add budget breakdown if provided
    if (budget.value && budget.value > 0) {
      const total = Number(budget.value);
      const perPerson = total / travelers.value;
      
      let accommodationPercent = 0.4;
      let foodPercent = 0.3;
      let activitiesPercent = 0.2;
      let transportationPercent = 0.1;

      if (travelStyle.value === 'luxury') {
        accommodationPercent = 0.5;
        foodPercent = 0.25;
        activitiesPercent = 0.15;
      } else if (travelStyle.value === 'budget') {
        accommodationPercent = 0.35;
        foodPercent = 0.35;
      }

      itineraryData.budgetBreakdown = {
        accommodation: Math.round(total * accommodationPercent),
        food: Math.round(total * foodPercent),
        activities: Math.round(total * activitiesPercent),
        transportation: Math.round(total * transportationPercent),
        perPerson: Math.round(perPerson),
        total: total
      };
    }

    itinerary.value = itineraryData;
    setTimeout(() => scrollToResults(), 100);
  } catch (error) {
    alert('Error generating itinerary. Please try again.');
  }
}

// Get suggested destinations
function getSuggestedDestinations() {
  return [
    'Karachi, Pakistan',
    'Islamabad, Pakistan',
    'Lahore, Pakistan',
    'Mumbai, India',
    'Delhi, India',
    'Goa, India',
    'Paris, France',
    'London, UK',
    'Dubai, UAE',
    'Tokyo, Japan',
    'Bangkok, Thailand'
  ];
}

// Copy Itinerary
function copyItinerary() {
  if (!itinerary.value) return;
  
  let text = `${itinerary.value.destination} - ${days.value} Day Itinerary\n\n`;
  text += `${itinerary.value.description}\n\n`;
  
  itinerary.value.days.forEach(day => {
    text += `Day ${day.day}: ${day.title}\n`;
    day.activities.forEach(activity => {
      text += `  • ${activity}\n`;
    });
    text += '\n';
  });
  
  if (itinerary.value.tips) {
    text += 'Travel Tips:\n';
    itinerary.value.tips.forEach(tip => {
      text += `  • ${tip}\n`;
    });
  }
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Itinerary copied to clipboard!');
  }).catch(() => {
    alert('Failed to copy. Please try again.');
  });
}

// Download Itinerary
function downloadItinerary() {
  if (!itinerary.value) return;
  
  let text = `${itinerary.value.destination} - ${days.value} Day Itinerary\n\n`;
  text += `Generated: ${new Date().toLocaleDateString()}\n`;
  if (budget.value) {
    text += `Budget: $${budget.value.toLocaleString()}\n`;
  }
  text += `\n${itinerary.value.description}\n\n`;
  text += '='.repeat(50) + '\n\n';
  
  itinerary.value.days.forEach(day => {
    text += `DAY ${day.day}: ${day.title}\n`;
    text += '-'.repeat(50) + '\n';
    day.activities.forEach((activity, idx) => {
      text += `${idx + 1}. ${activity}\n`;
    });
    text += '\n';
  });
  
  if (itinerary.value.tips) {
    text += 'TRAVEL TIPS & RECOMMENDATIONS\n';
    text += '-'.repeat(50) + '\n';
    itinerary.value.tips.forEach(tip => {
      text += `• ${tip}\n`;
    });
    text += '\n';
  }
  
  if (itinerary.value.budgetBreakdown) {
    text += 'ESTIMATED BUDGET BREAKDOWN\n';
    text += '-'.repeat(50) + '\n';
    Object.entries(itinerary.value.budgetBreakdown).forEach(([key, value]) => {
      text += `${formatCategory(key)}: $${value.toLocaleString()}\n`;
    });
    text += '\n';
  }
  
  text += 'Generated by FikrNa Trip Planner\n';
  text += 'https://fikrna.com/tools/trip-planner\n';
  
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${itinerary.value.destination.replace(/[^a-z0-9]/gi, '_')}_${days.value}day_itinerary.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Reset All
function resetAll() {
  if (confirm('Are you sure you want to reset? This will clear your current itinerary.')) {
    destination.value = '';
    days.value = 3;
    travelers.value = 2;
    travelStyle.value = 'balanced';
    accommodationType.value = 'any';
    budget.value = null;
    preferences.value = {
      historical: false,
      nature: false,
      nightlife: false,
      shopping: false,
      food: false,
      beaches: false,
      art: false,
      family: false
    };
    itinerary.value = null;
  }
}

// Format Category
function formatCategory(key) {
  const formats = {
    accommodation: 'Accommodation',
    food: 'Food & Dining',
    activities: 'Activities & Tours',
    transportation: 'Transportation'
  };
  return formats[key] || key.charAt(0).toUpperCase() + key.slice(1);
}

// Format Travel Style
function formatTravelStyle(style) {
  const formats = {
    balanced: 'Balanced',
    budget: 'Budget-Friendly',
    luxury: 'Luxury',
    adventure: 'Adventure',
    cultural: 'Cultural',
    relaxation: 'Relaxation',
    family: 'Family-Friendly'
  };
  return formats[style] || style;
}

// Format Accommodation
function formatAccommodation(type) {
  const formats = {
    budget: 'Budget',
    'mid-range': 'Mid-Range',
    luxury: 'Luxury',
    apartment: 'Rentals'
  };
  return formats[type] || type;
}

// Get Activity Time
function getActivityTime(index) {
  const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '6:00 PM'];
  return times[index] || times[times.length - 1];
}

// Scroll to Results
function scrollToResults() {
  setTimeout(() => {
    const results = document.querySelector('.results-section');
    if (results) {
      results.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 100);
}

// Scroll to Top
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// FAQs
const faqs = ref([
  {
    question: 'How accurate are the itineraries?',
    answer: 'Our itineraries are based on curated recommendations for popular destinations. They provide a solid starting point for your trip planning. However, we recommend cross-referencing with current travel guides, official tourism websites, and recent traveler reviews to ensure accuracy, especially regarding opening hours, ticket prices, and current conditions.',
    open: false
  },
  {
    question: 'Can I customize the generated itinerary?',
    answer: 'Yes! The itinerary is a suggested framework. Feel free to modify activities, rearrange days, add or remove attractions based on your interests, budget, and schedule. You can use the copy function to save the itinerary and edit it according to your preferences.',
    open: false
  },
  {
    question: 'How do budget estimates work?',
    answer: 'Budget estimates are approximate and based on general travel cost patterns. They assume mid-range travel preferences and are divided into accommodation (40%), food (30%), activities (20%), and transportation (10%). Actual costs vary significantly based on travel style, season, currency fluctuations, and personal preferences. Always research current prices and add a 10-15% buffer for unexpected expenses.',
    open: false
  },
  {
    question: 'Are the itineraries suitable for all travel styles?',
    answer: 'The itineraries are designed for general tourism and can be adapted for different travel styles. Budget travelers can focus on free activities and use public transportation. Luxury travelers can upgrade accommodations and dining. Adjust the suggestions based on your preferred pace, interests, and travel style.',
    open: false
  },
  {
    question: 'Do I need to book everything in advance?',
    answer: 'Not necessarily. Book in advance for: popular attractions with limited capacity, peak season travel, restaurants with long waiting lists, and flights/accommodation for better prices. For flexibility, book the first few days in detail and leave later days more open for spontaneous exploration and local recommendations.',
    open: false
  },
  {
    question: 'What if my destination is not in the list?',
    answer: 'Currently, we offer itineraries for popular worldwide destinations. If your destination isn\'t listed, you can use the itineraries for similar destinations as inspiration, or research and create your own itinerary using travel guides, tourism websites, and travel blogs.',
    open: false
  },
  {
    question: 'Is my travel information stored?',
    answer: 'No. All trip planning happens entirely in your browser. We don\'t collect, store, or transmit any of your travel information, destinations, budgets, or itineraries. Everything remains completely private on your device.',
    open: false
  },
  {
    question: 'Can I use this for group travel planning?',
    answer: 'Absolutely! The itineraries work well as a starting point for group trips. Share the itinerary with your travel companions, discuss preferences, and modify activities to include everyone\'s interests. Consider group discounts for attractions and book accommodations that accommodate your group size.',
    open: false
  },
  {
    question: 'How far in advance should I plan my trip?',
    answer: 'For international trips, start planning 3-6 months in advance to secure better prices on flights and accommodations. For domestic trips, 1-3 months is usually sufficient. However, last-minute trips can also work with flexible itineraries and good research.',
    open: false
  },
  {
    question: 'What should I do if my itinerary doesn\'t match my interests?',
    answer: 'The itineraries are general suggestions. Feel free to replace activities with attractions that align with your interests. Research museums, markets, neighborhoods, or activities specific to your hobbies (photography, food, history, nature, etc.) and swap them into your itinerary.',
    open: false
  }
]);

// Featured Tools
const featuredTools = [
  {
    name: 'Habit Tracker',
    path: '/tools/habit-tracker',
    icon: 'check-circle',
    description: 'Build travel-related habits and track your preparation progress'
  },
  {
    name: 'Age Calculator',
    path: '/tools/age-calculator',
    icon: 'calendar',
    description: 'Calculate exact dates for planning your travel timeline'
  },
  {
    name: 'Salary Calculator',
    path: '/tools/salary-tax-calculator',
    icon: 'dollar-sign',
    description: 'Calculate your finances to budget for your trip'
  },
  {
    name: 'Sleep Coach',
    path: '/tools/sleep-coach',
    icon: 'moon',
    description: 'Adjust your sleep schedule before traveling across time zones'
  }
];

// Structured Data
onMounted(() => {
  const toolSchema = generateToolSchema({
    name: 'Free AI Trip Planner & Travel Itinerary Generator',
    description: 'Plan your perfect trip with personalized day-by-day itineraries for destinations worldwide. Free trip planner with budget breakdown and travel tips.',
    url: window.location.href
  });
  
  const faqSchema = generateFAQSchema(
    faqs.value.map(faq => ({
      question: faq.question,
      answer: faq.answer
    }))
  );
  
  injectStructuredData([toolSchema, faqSchema]);
});
</script>

<style scoped>
/* ===================================
   TRIP PLANNER PAGE STYLES
   =================================== */

.trip-planner-page {
  padding: clamp(40px, 6vh, 60px) 0;
  min-height: 100vh;
  background: var(--bg-app);
}

/* Container LG - Match other tools */
.container-lg {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(16px, 4vw, 32px);
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

/* Hero Section */
.hero-section {
  text-align: center;
  padding: clamp(40px, 6vh, 80px) 0 clamp(30px, 4vh, 50px);
  margin-bottom: clamp(30px, 4vh, 50px);
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 50px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 24px;
}

.hero-section h1 {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.125rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto 32px;
  line-height: 1.8;
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  align-items: center;
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 50px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
}

/* Tool Interface */
.tool-interface {
  margin-bottom: clamp(40px, 6vh, 60px);
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
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.tool-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 8px;
  color: #10b981;
  cursor: pointer;
  transition: all 0.3s;
}

.icon-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  transform: translateY(-2px);
}

.tool-content-wrapper {
  padding: 32px;
}

/* Input Section */
.input-section {
  margin-bottom: 32px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 24px;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

/* Preferences Section */
.preferences-section {
  margin-top: 32px;
  padding: 24px;
  background: rgba(16, 185, 129, 0.03);
  border: 1px solid rgba(16, 185, 129, 0.1);
  border-radius: 12px;
}

.preferences-section h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 20px;
}

.preferences-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.preference-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.preference-checkbox:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
}

.preference-checkbox input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #10b981;
}

.preference-checkbox svg {
  color: #10b981;
  flex-shrink: 0;
}

.preference-checkbox span {
  color: var(--text-primary);
  font-size: 0.9375rem;
  font-weight: 500;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 0.9375rem;
}

.optional {
  font-size: 0.75rem;
  font-weight: 400;
  color: var(--text-secondary);
  opacity: 0.7;
}

.styled-input {
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

body.dark-mode .styled-input {
  background: rgba(30, 41, 59, 0.6);
  color: var(--text-primary);
}

body:not(.dark-mode) .styled-input {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
}

/* Dropdown/Select styling for better visibility */
.select-input {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2310b981' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 12px;
  padding-right: 40px;
}

/* Fix dropdown options visibility - remove white line issue */
.select-input option {
  background: var(--bg-card) !important;
  color: var(--text-primary) !important;
  padding: 12px 16px !important;
  border: none !important;
  margin: 0 !important;
}

body.dark-mode .select-input {
  background-color: rgba(30, 41, 59, 0.8) !important;
}

body.dark-mode .select-input option {
  background: #1e293b !important;
  color: #f8fafc !important;
}

body:not(.dark-mode) .select-input {
  background-color: rgba(255, 255, 255, 0.95) !important;
}

body:not(.dark-mode) .select-input option {
  background: #ffffff !important;
  color: #0f172a !important;
}

/* Remove default select styling that causes white lines */
.select-input::-ms-expand {
  display: none;
}

.select-input:focus {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2310b981' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
}

/* Fix optgroup styling */
.select-input optgroup {
  background: transparent !important;
  color: var(--text-primary) !important;
  font-weight: 600;
  padding: 8px 0;
  margin: 0;
  border: none !important;
}

.styled-input:focus {
  outline: none;
  border-color: #10b981;
  background: rgba(16, 185, 129, 0.05);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

body.dark-mode .styled-input:focus {
  background: rgba(16, 185, 129, 0.1);
}

body:not(.dark-mode) .styled-input:focus {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
}

.hint {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 28px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-outline {
  background: transparent;
  border: 2px solid #10b981;
  color: #10b981;
}

.btn-outline:hover {
  background: rgba(16, 185, 129, 0.1);
}

/* Results Section */
.results-section {
  margin-top: 40px;
  padding-top: 40px;
  border-top: 2px solid rgba(16, 185, 129, 0.2);
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

.destination-overview {
  padding: 40px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 184, 166, 0.08) 50%, rgba(16, 185, 129, 0.05) 100%);
  border: 2px solid rgba(16, 185, 129, 0.25);
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05);
  position: relative;
  overflow: hidden;
  animation: slideInDown 0.5s ease-out;
}

.destination-overview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #10b981, #14b8a6, #10b981);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.overview-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.destination-overview h3 {
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  flex: 1;
  line-height: 1.2;
  letter-spacing: -0.5px;
}

.destination-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%);
  border: 2px solid rgba(16, 185, 129, 0.4);
  border-radius: 50px;
  color: #10b981;
  font-size: 0.9375rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  transition: all 0.3s ease;
}

.destination-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
  border-color: #10b981;
}

.trip-details-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 16px 0;
}

.detail-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  border-radius: 6px;
  color: var(--text-secondary);
  font-size: 0.8125rem;
  font-weight: 500;
}

.detail-tag svg {
  color: #10b981;
}

.destination-description {
  color: var(--text-primary);
  line-height: 1.8;
  margin-bottom: 24px;
  font-size: 1.0625rem;
  font-weight: 500;
  opacity: 0.9;
}

.overview-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(16, 185, 129, 0.2);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  transition: all 0.3s;
}

.stat-item:hover {
  background: rgba(16, 185, 129, 0.05);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.stat-item svg {
  color: #10b981;
  flex-shrink: 0;
}

.stat-item > div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.375rem;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 800;
  letter-spacing: -0.5px;
}

/* Timeline Itinerary Styles */
.itinerary-timeline {
  position: relative;
  padding-left: 60px;
  margin: 40px 0;
}

.timeline-day {
  position: relative;
  margin-bottom: 40px;
  animation: fadeInUp 0.6s ease-out backwards;
}

.timeline-day:nth-child(1) { animation-delay: 0.1s; }
.timeline-day:nth-child(2) { animation-delay: 0.2s; }
.timeline-day:nth-child(3) { animation-delay: 0.3s; }
.timeline-day:nth-child(4) { animation-delay: 0.4s; }
.timeline-day:nth-child(5) { animation-delay: 0.5s; }

.timeline-connector {
  position: absolute;
  left: -45px;
  top: 60px;
  bottom: -40px;
  width: 3px;
  background: linear-gradient(180deg, #10b981 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%);
  z-index: 1;
}

.timeline-marker {
  position: absolute;
  left: -60px;
  top: 0;
  width: 50px;
  height: 50px;
  z-index: 2;
}

.marker-inner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(16, 185, 129, 0.4), 0 0 0 4px rgba(16, 185, 129, 0.1);
  position: relative;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.marker-inner::before {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: inherit;
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  z-index: -1;
}

@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.day-number {
  font-size: 1.25rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.day-card-visual {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  padding: 32px;
  margin-left: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.day-card-visual::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #10b981 0%, #14b8a6 100%);
  border-radius: 20px 0 0 20px;
}

.day-card-visual:hover {
  border-color: #10b981;
  transform: translateX(8px);
  box-shadow: 0 8px 32px rgba(16, 185, 129, 0.25);
}

.day-header-visual {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid rgba(16, 185, 129, 0.15);
}

.day-title-section {
  flex: 1;
}

.day-title {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 8px;
  background: linear-gradient(135deg, var(--text-primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.day-label {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(16, 185, 129, 0.15);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 20px;
  color: #10b981;
  font-size: 0.8125rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.day-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 184, 166, 0.1) 100%);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 16px;
  color: #10b981;
  transition: all 0.3s;
}

.day-card-visual:hover .day-icon {
  transform: rotate(10deg) scale(1.1);
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(20, 184, 166, 0.2) 100%);
  border-color: #10b981;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.activities-timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item-visual {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.activity-item-visual::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #10b981 0%, #14b8a6 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.activity-item-visual:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
}

.activity-item-visual:hover::before {
  transform: scaleY(1);
}

.activity-marker {
  width: 32px;
  height: 32px;
  min-width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%);
  border: 2px solid rgba(16, 185, 129, 0.4);
  border-radius: 50%;
  color: #10b981;
  transition: all 0.3s;
}

.activity-item-visual:hover .activity-marker {
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  border-color: #10b981;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
}

.activity-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.activity-time {
  font-size: 0.8125rem;
  font-weight: 700;
  color: #10b981;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
  padding: 2px 8px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 4px;
  width: fit-content;
}

.activity-text {
  font-size: 1rem;
  color: var(--text-primary);
  line-height: 1.6;
  margin: 0;
  font-weight: 500;
}

.activity-item-visual:hover .activity-text {
  color: var(--text-primary);
  font-weight: 600;
}

.tips-section {
  padding: 32px;
  margin-top: 40px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(20, 184, 166, 0.04) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.tips-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #14b8a6, #10b981);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

.tips-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 24px;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tips-list li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1.5px solid rgba(16, 185, 129, 0.2);
  border-radius: 12px;
  color: var(--text-primary);
  line-height: 1.7;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tips-list li:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.4);
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.15);
}

.tips-list li svg {
  color: #10b981;
  margin-top: 4px;
  flex-shrink: 0;
  filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3));
  transition: transform 0.3s;
}

.tips-list li:hover svg {
  transform: translateX(4px) scale(1.1);
}

.budget-section {
  padding: 32px;
  margin-top: 40px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(20, 184, 166, 0.04) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
}

.budget-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #10b981, #14b8a6, #10b981);
  background-size: 200% 100%;
  animation: gradientShift 3s ease infinite;
}

.budget-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 800;
  color: var(--text-primary);
  margin: 0 0 24px;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.budget-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-top: 20px;
}

.budget-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(16, 185, 129, 0.03) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.budget-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, #10b981 0%, #14b8a6 100%);
  border-radius: 16px 0 0 16px;
}

.budget-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
  transition: left 0.5s;
}

.budget-item:hover::after {
  left: 100%;
}

.budget-item:hover {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(20, 184, 166, 0.08) 100%);
  border-color: #10b981;
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
}

.budget-category {
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.budget-amount {
  font-weight: 800;
  font-size: 1.5rem;
  background: linear-gradient(135deg, #10b981 0%, #14b8a6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
}

.empty-state svg {
  color: #10b981;
  opacity: 0.5;
  margin-bottom: 24px;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 12px;
}

.empty-state p {
  font-size: 1rem;
  line-height: 1.6;
  max-width: 500px;
  margin: 0 auto;
}

/* Content Sections */
.content-section {
  margin-top: clamp(40px, 6vh, 60px);
}

.content-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 32px;
}

.feature-box {
  text-align: center;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
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
  border-radius: 12px;
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
  margin-top: 24px;
}

.tip-item {
  display: flex;
  gap: 16px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
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
  margin-top: 32px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s;
}

.faq-question:hover {
  background: rgba(16, 185, 129, 0.05);
}

.faq-question svg {
  color: #10b981;
  transition: transform 0.3s;
}

.faq-answer {
  padding: 0 24px 20px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Trust Section */
.trust-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 48px 0;
}

.trust-card {
  padding: 32px;
  text-align: center;
}

.trust-card svg {
  color: #10b981;
  margin-bottom: 20px;
}

.trust-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.trust-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 60px 32px;
  background: rgba(16, 185, 129, 0.05);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: var(--radius-xl);
  margin: 48px 0;
}

.cta-section h2 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 16px;
}

.cta-section p {
  font-size: 1.125rem;
  color: var(--text-secondary);
  margin: 0 0 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

/* Featured Tools */
.featured-tools-section {
  max-width: 1200px;
  margin: clamp(60px, 8vh, 80px) auto clamp(40px, 6vh, 60px);
  padding: clamp(40px, 6vh, 60px) 20px;
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

  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .form-group.full-width {
    grid-column: 1;
  }

  .preferences-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .overview-stats {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .overview-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .trip-details-tags {
    flex-direction: column;
  }

  .itinerary-timeline {
    padding-left: 0;
  }

  .timeline-marker {
    position: static;
    margin-bottom: 16px;
    left: 0;
  }

  .timeline-connector {
    display: none;
  }

  .day-card-visual {
    margin-left: 0;
    padding: 24px;
  }

  .day-card-visual::before {
    display: none;
  }

  .day-card-visual:hover {
    transform: translateX(0) translateY(-4px);
  }

  .activity-item-visual:hover {
    transform: translateX(0) translateY(-2px);
  }

  .day-header-visual {
    flex-direction: column;
    gap: 16px;
  }

  .day-icon {
    align-self: flex-start;
  }

  .budget-grid {
    grid-template-columns: 1fr;
  }

  .use-cases-grid {
    grid-template-columns: 1fr;
  }

  .features-grid {
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

  .content-card {
    padding: 24px;
  }
}
</style>