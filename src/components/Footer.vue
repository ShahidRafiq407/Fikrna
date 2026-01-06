<template>
  <footer class="footer-3d">
    <div class="container footer-container">
      
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Brand Section -->
        <div class="footer-brand">
          <router-link to="/" class="footer-logo">
            <img src="/logo.svg" alt="FikrNa Logo" class="footer-logo-image" width="180" height="40" />
          </router-link>
          <p class="brand-tagline">
            Free online tools and calculators for everyday problem-solving. 
            No signup required, completely privacy-first, and forever free.
          </p>
          <div class="brand-features">
            <div class="feature-badge">
              <Icon name="shield" :size="14" />
              <span>100% Private</span>
          </div>
            <div class="feature-badge">
              <Icon name="zap" :size="14" />
              <span>Instant Results</span>
        </div>
            <div class="feature-badge">
              <Icon name="globe" :size="14" />
              <span>Global Access</span>
          </div>
        </div>
      </div>

        <!-- Footer Links -->
        <div class="footer-links-grid">
          <!-- Tools Column -->
          <div class="footer-col">
            <h4 class="col-title">Popular Tools</h4>
            <ul class="link-list">
              <li><router-link to="/tools/calorie-tracker"><Icon name="activity" :size="14" /> Calorie Tracker</router-link></li>
              <li><router-link to="/tools/bmi-calculator"><Icon name="heart" :size="14" /> BMI Calculator</router-link></li>
              <li><router-link to="/tools/salary-tax-calculator"><Icon name="dollar-sign" :size="14" /> Salary Calculator</router-link></li>
              <li><router-link to="/tools/password-strength-checker"><Icon name="lock" :size="14" /> Password Checker</router-link></li>
              <li><router-link to="/tools/trip-planner"><Icon name="map" :size="14" /> Trip Planner</router-link></li>
            </ul>
          </div>

          <!-- Company Column -->
        <div class="footer-col">
            <h4 class="col-title">Company</h4>
            <ul class="link-list">
              <li><router-link to="/about"><Icon name="info" :size="14" /> About FikrNa</router-link></li>
              <li><router-link to="/contact"><Icon name="mail" :size="14" /> Contact Us</router-link></li>
              <li><router-link to="/sitemap"><Icon name="map" :size="14" /> Sitemap</router-link></li>
          </ul>
        </div>

          <!-- Legal Column -->
        <div class="footer-col">
            <h4 class="col-title">Legal</h4>
            <ul class="link-list">
              <li><router-link to="/privacy-policy"><Icon name="shield" :size="14" /> Privacy Policy</router-link></li>
              <li><router-link to="/terms-of-service"><Icon name="file-text" :size="14" /> Terms of Service</router-link></li>
              <li><router-link to="/disclaimer"><Icon name="alert-circle" :size="14" /> Disclaimer</router-link></li>
          </ul>
        </div>

          <!-- Resources Column -->
        <div class="footer-col">
            <h4 class="col-title">Resources</h4>
            <ul class="link-list">
              <li><router-link to="/tools/calorie-tracker"><Icon name="heart" :size="14" /> Health Tools</router-link></li>
              <li><router-link to="/tools/salary-tax-calculator"><Icon name="trending-up" :size="14" /> Finance Tools</router-link></li>
              <li><router-link to="/tools/habit-tracker"><Icon name="check-circle" :size="14" /> Lifestyle Tools</router-link></li>
          </ul>
        </div>
      </div>
      </div>

      <!-- Divider -->
      <div class="footer-divider"></div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <div class="copyright">
          <Icon name="code" :size="16" />
          <span>&copy; {{ currentYear }} FikrNa — All rights reserved</span>
        </div>
        <div class="footer-meta">
          <div class="meta-item">
            <Icon name="map-pin" :size="14" />
            <span>Made with ❤️ for Global Users</span>
          </div>
          <div class="meta-item">
            <Icon name="globe" :size="14" />
            <span>Available Worldwide</span>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import Icon from '@/components/Icon.vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
/* ===================================
   3D GLASS FOOTER
   =================================== */

.footer-3d {
  position: relative;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(16, 185, 129, 0.2);
  padding: clamp(50px, 6vh, 60px) 0 clamp(24px, 3vh, 32px);
  margin-top: clamp(40px, 6vh, 60px);
  overflow: hidden;
}

body:not(.dark-mode) .footer-3d {
  background: rgba(255, 255, 255, 0.95);
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}

/* Background Orbs */
.footer-3d::before,
.footer-3d::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
}

.footer-3d::before {
  top: -100px;
  left: -100px;
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #10b981, #14b8a6);
}

.footer-3d::after {
  bottom: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #14b8a6, #06b6d4);
}

.footer-container {
  position: relative;
  z-index: 1;
}

/* ===================================
   MAIN FOOTER CONTENT
   =================================== */

.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: clamp(40px, 6vw, 80px);
  margin-bottom: clamp(40px, 6vh, 60px);
}

/* ===================================
   BRAND SECTION
   =================================== */

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 8px;
  width: fit-content;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.footer-logo:hover {
  transform: translateX(4px);
  opacity: 0.9;
}

.footer-logo-image {
  height: 36px;
  width: auto;
  display: block;
  transition: filter 0.3s ease;
}

.footer-logo:hover .footer-logo-image {
  filter: brightness(1.1);
}

.brand-tagline {
  font-size: 0.9375rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 420px;
  margin: 0;
}

.brand-features {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.feature-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  transition: all 0.2s ease;
}

.feature-badge:hover {
  background: rgba(16, 185, 129, 0.15);
  transform: translateY(-2px);
}

/* ===================================
   FOOTER LINKS GRID
   =================================== */

.footer-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(24px, 3vw, 40px);
}

.footer-col {
  display: flex;
  flex-direction: column;
}

.col-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 20px;
  position: relative;
  padding-bottom: 12px;
}

.col-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 32px;
  height: 2px;
  background: linear-gradient(90deg, #10b981, transparent);
  border-radius: 2px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.link-list li a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 4px 0;
}

.link-list li a:hover {
  color: #10b981;
  transform: translateX(4px);
}

.link-list li a svg {
  opacity: 0.6;
  transition: opacity 0.2s ease;
}

.link-list li a:hover svg {
  opacity: 1;
}

/* ===================================
   DIVIDER
   =================================== */

.footer-divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(16, 185, 129, 0.2) 50%,
    transparent 100%
  );
  margin: clamp(32px, 5vh, 48px) 0;
}

/* ===================================
   FOOTER BOTTOM
   =================================== */

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  padding-top: clamp(24px, 3vh, 32px);
}

.copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.copyright svg {
  color: #10b981;
}

.footer-meta {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: var(--text-tertiary);
  font-weight: 500;
}

.meta-item svg {
  color: #10b981;
  opacity: 0.8;
}

/* ===================================
   RESPONSIVE
   =================================== */

@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .footer-links-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .footer-3d {
    padding: 48px 0 32px;
    margin-top: 60px;
  }

  .footer-links-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-col {
    text-align: center;
  }

  .col-title::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .link-list li a {
    justify-content: center;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }

  .footer-meta {
    flex-direction: column;
    gap: 12px;
  }

  .brand-tagline {
    text-align: center;
  }

  .brand-features {
    justify-content: center;
  }

  .footer-logo {
    margin: 0 auto 8px;
  }
}

@media (max-width: 480px) {
  .footer-links-grid {
    gap: 24px;
  }

  .brand-features {
    flex-direction: column;
    align-items: center;
  }

  .feature-badge {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}
</style>
