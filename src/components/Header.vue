<template>
  <header class="header-3d" :class="{ 'scrolled': isScrolled }">
    <div class="container header-container">
      
      <!-- Logo Area with 3D Effect -->
      <router-link to="/" class="logo-link">
        <img src="/logo.svg" alt="FikrNa Logo" class="logo-image" width="180" height="40" />
      </router-link>

      <!-- Desktop Nav -->
      <nav class="nav-desktop">
        
        <!-- Tools Dropdown -->
        <div class="nav-item has-dropdown" @mouseenter="showDropdown = true" @mouseleave="showDropdown = false">
          <button class="nav-link" :class="{ 'active': showDropdown }">
            Explore Tools
            <Icon name="chevron-down" :size="16" class="chevron" />
          </button>
          
          <transition name="fade-slide">
            <div v-if="showDropdown" class="mega-menu glass-3d">
              <div class="mega-grid">
                
                <!-- Category 1: Health -->
                <div class="mega-category">
                  <div class="cat-header">
                    <div class="cat-icon-wrap health">
                      <Icon name="heart" :size="18" class="cat-icon" />
                    </div>
                    <h4>Health & Wellness</h4>
                  </div>
                  <ul>
                    <li><router-link to="/tools/bmi-calculator" class="mega-item"><Icon name="heart" :size="14" /> BMI Calculator</router-link></li>
                    <li><router-link to="/tools/calorie-tracker" class="mega-item"><Icon name="activity" :size="14" /> Calorie Tracker</router-link></li>
                    <li><router-link to="/tools/sleep-coach" class="mega-item"><Icon name="moon" :size="14" /> Sleep Coach</router-link></li>
                    <li><router-link to="/tools/meal-planner" class="mega-item"><Icon name="calendar" :size="14" /> Meal Planner</router-link></li>
                    <li><router-link to="/tools/symptom-checker" class="mega-item"><Icon name="alert-circle" :size="14" /> Symptom Checker</router-link></li>
                    <li><router-link to="/tools/mood-coach" class="mega-item"><Icon name="smile" :size="14" /> Mood Coach</router-link></li>
                    <li><router-link to="/tools/skincare-coach" class="mega-item"><Icon name="sun" :size="14" /> Skincare Coach</router-link></li>
                  </ul>
                </div>

                <!-- Category 2: Finance -->
                <div class="mega-category">
                  <div class="cat-header">
                    <div class="cat-icon-wrap finance">
                      <Icon name="dollar-sign" :size="18" class="cat-icon" />
                    </div>
                    <h4>Finance & Utility</h4>
                  </div>
                  <ul>
                    <li><router-link to="/tools/salary-tax-calculator" class="mega-item"><Icon name="dollar-sign" :size="14" /> Salary Calculator</router-link></li>
                    <li><router-link to="/tools/loan-calculator" class="mega-item"><Icon name="trending-up" :size="14" /> Loan Calculator</router-link></li>
                    <li><router-link to="/tools/age-calculator" class="mega-item"><Icon name="calendar" :size="14" /> Age Calculator</router-link></li>
                    <li><router-link to="/tools/password-strength-checker" class="mega-item"><Icon name="lock" :size="14" /> Password Checker</router-link></li>
                  </ul>
                </div>

                 <!-- Category 3: Lifestyle -->
                <div class="mega-category">
                  <div class="cat-header">
                    <div class="cat-icon-wrap lifestyle">
                      <Icon name="zap" :size="18" class="cat-icon" />
                    </div>
                    <h4>Lifestyle & More</h4>
                  </div>
                  <ul>
                    <li><router-link to="/tools/trip-planner" class="mega-item"><Icon name="map" :size="14" /> Trip Planner</router-link></li>
                    <li><router-link to="/tools/habit-tracker" class="mega-item"><Icon name="check-circle" :size="14" /> Habit Tracker</router-link></li>
                    <li><router-link to="/tools/readability-tool" class="mega-item"><Icon name="edit" :size="14" /> Readability Tool</router-link></li>
                  </ul>
                </div>

              </div>
            </div>
          </transition>
        </div>

        <router-link to="/blog" class="nav-link">Blog</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </nav>

      <!-- Actions Area -->
      <div class="header-actions">
        <!-- Enhanced Search with AJAX -->
        <div class="search-box-3d" :class="{ 'active': isSearchOpen || searchQuery }">
          <div class="search-input-wrap">
            <div class="search-icon">
              <svg width="20" height="20" viewBox="0 0 30 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"></path>
              </svg>
            </div>
          <input 
            ref="searchInput"
            type="text" 
              placeholder="Search tools..." 
            v-model="searchQuery" 
              @focus="isSearchOpen = true"
            @blur="handleSearchBlur"
              class="search-input"
            >
            <button 
              v-if="searchQuery" 
              @click="clearSearch" 
              class="clear-btn"
              aria-label="Clear search"
            >
              <Icon name="x" :size="16" />
          </button>
          </div>

          <!-- Enhanced Search Results -->
          <transition name="search-fade">
            <div class="search-dropdown glass-3d" v-if="searchQuery && (filteredTools.length > 0 || searchQuery.length > 0)">
              <div class="search-header">
                <span>Search Results</span>
                <span class="result-count">{{ filteredTools.length }} found</span>
              </div>
              
              <div class="search-results-list" v-if="filteredTools.length > 0">
             <router-link 
                v-for="tool in filteredTools" 
                :key="tool.path"
                :to="tool.path"
                  class="result-item"
                  @click="clearSearch"
                >
                  <div class="result-icon" :class="tool.category.toLowerCase()">
                    <Icon :name="tool.icon" :size="20" />
                  </div>
                  <div class="result-info">
                    <div class="result-name">{{ tool.name }}</div>
                    <div class="result-category">{{ tool.category }}</div>
                  </div>
                  <Icon name="arrow-right" :size="16" class="result-arrow" />
              </router-link>
          </div>

              <div class="no-results" v-else>
                <Icon name="search" :size="32" />
                <p>No tools found</p>
              </div>
            </div>
          </transition>
        </div>

        <!-- Theme Toggle with 3D Effect -->
        <button class="icon-btn-3d" @click="toggleTheme" aria-label="Toggle Theme">
          <Icon v-if="isDark" name="sun" :size="20" />
          <Icon v-else name="moon" :size="20" />
        </button>

        <!-- Mobile Menu Btn -->
        <button class="icon-btn-3d mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
          <Icon name="menu" :size="22" />
        </button>
      </div>

    </div>

    <!-- Mobile Menu Overlay -->
    <transition name="mobile-slide">
      <div v-if="mobileMenuOpen" class="mobile-menu glass-3d-mobile">
        <div class="mobile-header">
          <span class="logo-text">Menu</span>
          <button class="icon-btn-3d" @click="mobileMenuOpen = false">
            <Icon name="x" :size="24" />
          </button>
        </div>
        
        <div class="mobile-content">
          <div class="mobile-section">
            <h5>Explore Tools</h5>
            <div class="mobile-grid">
               <router-link v-for="tool in allTools" :key="tool.path" :to="tool.path" class="mobile-tool-card" @click="mobileMenuOpen = false">
                 <Icon :name="tool.icon" :size="18" />
                 <span>{{ tool.name }}</span>
               </router-link>
            </div>
          </div>
          <div class="mobile-links">
            <router-link to="/" class="mobile-main-link" @click="mobileMenuOpen = false">
              <Icon name="home" :size="20" /> Home
            </router-link>
            <router-link to="/blog" class="mobile-main-link" @click="mobileMenuOpen = false">
              <Icon name="book-open" :size="20" /> Blog
            </router-link>
            <router-link to="/about" class="mobile-main-link" @click="mobileMenuOpen = false">
              <Icon name="info" :size="20" /> About Us
            </router-link>
            <router-link to="/contact" class="mobile-main-link" @click="mobileMenuOpen = false">
              <Icon name="mail" :size="20" /> Contact
            </router-link>
          </div>
        </div>
      </div>
    </transition>

  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { themeManager } from '@/utils/storage';
import Icon from '@/components/Icon.vue';

// --- State ---
const isScrolled = ref(false);
const showDropdown = ref(false);
const mobileMenuOpen = ref(false);
const searchQuery = ref('');
const isSearchOpen = ref(false);
const searchInput = ref(null);
const isDark = ref(true);

const allTools = [
  { name: 'Calorie Tracker', path: '/tools/calorie-tracker', icon: 'activity', category: 'Health' },
  { name: 'Sleep Coach', path: '/tools/sleep-coach', icon: 'moon', category: 'Health' },
  { name: 'Meal Planner', path: '/tools/meal-planner', icon: 'calendar', category: 'Health' },
  { name: 'Symptom Checker', path: '/tools/symptom-checker', icon: 'alert-circle', category: 'Health' },
  { name: 'Mood Coach', path: '/tools/mood-coach', icon: 'smile', category: 'Health' },
  { name: 'Skincare Coach', path: '/tools/skincare-coach', icon: 'sun', category: 'Health' },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: 'calendar', category: 'Utility' },
  { name: 'Salary Calculator', path: '/tools/salary-tax-calculator', icon: 'dollar-sign', category: 'Finance' },
  { name: 'BMI Calculator', path: '/tools/bmi-calculator', icon: 'heart', category: 'Health' },
  { name: 'Loan Calculator', path: '/tools/loan-calculator', icon: 'trending-up', category: 'Finance' },
  { name: 'Password Checker', path: '/tools/password-strength-checker', icon: 'lock', category: 'Security' },
  { name: 'Readability Tool', path: '/tools/readability-tool', icon: 'edit', category: 'Writing' },
  { name: 'Habit Tracker', path: '/tools/habit-tracker', icon: 'check-circle', category: 'Lifestyle' },
  { name: 'Trip Planner', path: '/tools/trip-planner', icon: 'map', category: 'Travel' },
];

// --- Computed ---
const filteredTools = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return [];
  const q = searchQuery.value.toLowerCase();
  return allTools.filter(t => 
    t.name.toLowerCase().includes(q) || 
    t.category.toLowerCase().includes(q)
  ).slice(0, 6);
});

// --- Methods ---
function toggleTheme() {
  themeManager.toggle();
  isDark.value = themeManager.getTheme() === 'dark';
}

function clearSearch() {
  searchQuery.value = '';
  isSearchOpen.value = false;
}

function handleSearchBlur() {
  setTimeout(() => { 
    isSearchOpen.value = false; 
  }, 200);
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

// --- Lifecycle ---
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  isDark.value = themeManager.getTheme() === 'dark';
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
/* ===================================
   3D GLASS HEADER
   =================================== */

.header-3d {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 85px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.header-3d.scrolled {
  height: 70px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

body:not(.dark-mode) .header-3d {
  background: rgba(255, 255, 255, 0.7);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

body:not(.dark-mode) .header-3d.scrolled {
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid rgba(16, 185, 129, 0.2);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  position: relative;
}

/* ===================================
   LOGO WITH 3D ORB
   =================================== */

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
  height: 40px;
}

.logo-link:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.logo-image {
  height: 40px;
  width: auto;
  display: block;
  transition: filter 0.3s ease;
}

.logo-link:hover .logo-image {
  filter: brightness(1.1);
}

/* ===================================
   NAVIGATION
   =================================== */

.nav-desktop {
  display: flex;
  align-items: center;
  gap: 32px;
  height: 100%;
}

.nav-link {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 10px;
  position: relative;
}

.nav-link::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: 60%;
  height: 2px;
  background: linear-gradient(90deg, #10b981, #14b8a6);
  border-radius: 2px;
  transition: transform 0.3s ease;
}

.nav-link:hover,
.nav-link.active,
.router-link-active {
  color: #10b981;
}

.nav-link:hover::before {
  transform: translateX(-50%) scaleX(1);
}

.chevron {
  opacity: 0.7;
  transition: transform 0.3s ease;
}

.nav-link.active .chevron {
  transform: rotate(180deg);
}

/* ===================================
   3D GLASS MEGA MENU
   =================================== */

.has-dropdown {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
}

.mega-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: 750px;
  padding: 32px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(16, 185, 129, 0.2);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
}

body:not(.dark-mode) .mega-menu {
  background: rgba(255, 255, 255, 0.95);
}

.mega-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}

.cat-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
}

.cat-icon-wrap {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cat-icon-wrap.health {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
  color: #ef4444;
}

.cat-icon-wrap.finance {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2));
  color: #10b981;
}

.cat-icon-wrap.lifestyle {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.2));
  color: #a855f7;
}

.mega-category h4 {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.mega-category ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mega-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.mega-item:hover {
  color: #10b981;
  background: rgba(16, 185, 129, 0.08);
  transform: translateX(4px);
}

/* ===================================
   3D SEARCH BOX WITH AJAX
   =================================== */

.search-box-3d {
  position: relative;
  width: 240px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-box-3d.active {
  width: 320px;
}

.search-input-wrap {
  position: relative; 
  display: flex; 
  align-items: center; 
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0 12px;
  height: 44px;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-box-3d.active .search-input-wrap {
  border-color: #10b981;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 0 0 3px rgba(16, 185, 129, 0.1),
    0 4px 12px rgba(16, 185, 129, 0.2);
}

body:not(.dark-mode) .search-input-wrap {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

.search-icon {
  color: var(--text-tertiary);
  flex-shrink: 0;
  margin-right: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.search-icon svg {
  width: 18px;
  height: 18px;
  display: block;
}

.search-box-3d.active .search-icon {
  color: #10b981;
}

.search-input {
  flex: 1;
  background: transparent; 
  border: none; 
  color: var(--text-primary); 
  font-size: 0.9375rem;
  font-family: var(--font-body);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.clear-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* ===================================
   ENHANCED SEARCH DROPDOWN
   =================================== */

.search-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 1100;
  max-height: 400px;
  overflow-y: auto;
}

body:not(.dark-mode) .search-dropdown {
  background: rgba(255, 255, 255, 0.98);
  border-color: rgba(16, 185, 129, 0.2);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-tertiary);
}

.result-count {
  color: #10b981;
}

.search-results-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
}

.result-item:hover {
  background: rgba(16, 185, 129, 0.08);
  border-color: rgba(16, 185, 129, 0.2);
  transform: translateX(4px);
}

.result-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-icon.health {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
  color: #ef4444;
}

.result-icon.finance {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.2));
  color: #10b981;
}

.result-icon.utility,
.result-icon.security,
.result-icon.writing,
.result-icon.lifestyle,
.result-icon.travel {
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.2));
  color: #a855f7;
}

.result-info {
  flex: 1;
}

.result-name {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.result-category {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.result-arrow {
  color: #10b981;
  opacity: 0;
  transition: all 0.2s ease;
}

.result-item:hover .result-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.no-results {
  text-align: center;
  padding: 32px;
  color: var(--text-tertiary);
}

.no-results svg {
  opacity: 0.3;
  margin-bottom: 12px;
}

.no-results p {
  margin: 0;
  font-size: 0.875rem;
}

/* ===================================
   3D ACTION BUTTONS
   =================================== */

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn-3d {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-btn-3d:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  transform: translateY(-2px);
  box-shadow: 
    inset 0 2px 4px rgba(0, 0, 0, 0.1),
    0 6px 16px rgba(16, 185, 129, 0.3);
}

body:not(.dark-mode) .icon-btn-3d {
  background: rgba(0, 0, 0, 0.03);
  border-color: rgba(0, 0, 0, 0.08);
}

/* ===================================
   MOBILE MENU
   =================================== */

.mobile-menu-btn {
  display: none;
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  background: rgba(15, 23, 42, 0.98);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-left: 1px solid rgba(16, 185, 129, 0.2);
  z-index: 2000;
  padding: 24px;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(0, 0, 0, 0.4);
  overflow-y: auto;
}

body:not(.dark-mode) .mobile-menu {
  background: rgba(255, 255, 255, 0.98);
}

.mobile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(16, 185, 129, 0.1);
}

.mobile-section h5 {
  color: var(--text-tertiary);
  margin-bottom: 16px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 1px;
}

.mobile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 32px;
}

.mobile-tool-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 12px;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
  transition: all 0.2s ease;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mobile-tool-card:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  transform: translateY(-2px);
}

.mobile-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-main-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.2s ease;
}

.mobile-main-link:hover {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  transform: translateX(4px);
}

/* ===================================
   TRANSITIONS
   =================================== */

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

.search-fade-enter-active,
.search-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-fade-enter-from,
.search-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-slide-enter-active,
.mobile-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-slide-enter-from,
.mobile-slide-leave-to {
  transform: translateX(100%);
}

/* ===================================
   RESPONSIVE
   =================================== */

@media (max-width: 1024px) {
  .search-box-3d {
    width: 200px;
  }
  
  .search-box-3d.active {
    width: 260px;
  }
}

@media (max-width: 900px) {
  .nav-desktop {
    display: none;
  }
  
  .mobile-menu-btn {
    display: flex;
  }
  
  .search-box-3d {
    display: none;
  }
  
  .header-3d {
    height: 70px;
  }
}

@media (max-width: 640px) {
  .mobile-grid {
    grid-template-columns: 1fr;
  }
  
  .mobile-menu {
    max-width: 100%;
  }
}
</style>
