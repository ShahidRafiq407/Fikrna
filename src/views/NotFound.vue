<template>
  <div class="not-found-page">
    <div class="container">
      <div class="content">
        <div class="error-code" data-aos="fade-up">404</div>
        <h1 data-aos="fade-up" data-aos-delay="100">Page Not Found</h1>
        <p data-aos="fade-up" data-aos-delay="200">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="cta" data-aos="fade-up" data-aos-delay="300">
          <router-link to="/" class="btn btn-primary">Go Home</router-link>
          <router-link to="/sitemap" class="btn btn-secondary">View Sitemap</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSEO } from '@/composables/useSEO';

useSEO({
  title: '404 - Page Not Found | FikrNa',
  description: 'Page not found. Return to FikrNa homepage to explore our AI tools.',
  keywords: '404, page not found'
});
</script>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  padding: var(--spacing-2xl);
}

.error-code {
  font-size: 120px;
  font-weight: 900;
  background: linear-gradient(135deg, var(--color-accent-gold), var(--color-accent-purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: var(--spacing-md);
}

h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-md);
  color: var(--color-text-primary);
}

p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-xl);
}

.cta {
  display: flex;
  gap: var(--spacing-md);
  justify-content: center;
  flex-wrap: wrap;
}
</style>
