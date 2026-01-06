<template>
  <section class="related-tools-section" v-if="relatedTools.length > 0">
    <div class="related-tools-header">
      <h2>
        <Icon name="grid" :size="24" />
        Related Tools
      </h2>
      <p class="related-subtitle">Explore more tools to enhance your productivity</p>
    </div>
    
    <div class="related-tools-grid">
      <router-link
        v-for="tool in relatedTools"
        :key="tool.path"
        :to="tool.path"
        class="related-tool-card glass-card"
      >
        <div class="tool-icon-wrapper">
          <Icon :name="tool.icon" :size="28" />
        </div>
        <div class="tool-content">
          <h3>{{ tool.name }}</h3>
          <p>{{ tool.description }}</p>
          <span class="tool-link-arrow">
            <span>Try it now</span>
            <Icon name="arrow-right" :size="16" />
          </span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import Icon from '@/components/Icon.vue';

const props = defineProps({
  currentTool: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: ''
  }
});

// All available tools with their metadata
const allTools = [
  { name: 'Calorie Tracker', path: '/tools/calorie-tracker', icon: 'apple', description: 'Track daily calories and macros with food database', category: 'Health' },
  { name: 'Sleep Coach', path: '/tools/sleep-coach', icon: 'moon', description: 'Optimize sleep cycles with science-backed schedules', category: 'Health' },
  { name: 'BMI Calculator', path: '/tools/bmi-calculator', icon: 'activity', description: 'Calculate BMI, BMR, TDEE and health metrics', category: 'Health' },
  { name: 'Meal Planner', path: '/tools/meal-planner', icon: 'calendar', description: 'Plan balanced weekly meals based on your goals', category: 'Health' },
  { name: 'Symptom Checker', path: '/tools/symptom-checker', icon: 'heart', description: 'Check symptoms and get health guidance', category: 'Health' },
  { name: 'Skincare Coach', path: '/tools/skincare-coach', icon: 'smile', description: 'Get personalized skincare routine recommendations', category: 'Health' },
  { name: 'Mood Coach', path: '/tools/mood-coach', icon: 'sun', description: 'Track and improve your emotional wellness', category: 'Health' },
  { name: 'Salary Calculator', path: '/tools/salary-tax-calculator', icon: 'dollar-sign', description: 'Calculate salary, tax and take-home pay', category: 'Finance' },
  { name: 'Loan Calculator', path: '/tools/loan-calculator', icon: 'trending-up', description: 'Calculate loans with amortization schedules', category: 'Finance' },
  { name: 'Trip Planner', path: '/tools/trip-planner', icon: 'map', description: 'Generate detailed day-by-day travel itineraries', category: 'Travel' },
  { name: 'Age Calculator', path: '/tools/age-calculator', icon: 'clock', description: 'Calculate exact age and important dates', category: 'Utility' },
  { name: 'Password Checker', path: '/tools/password-strength-checker', icon: 'lock', description: 'Test password strength and security', category: 'Security' },
  { name: 'Readability Tool', path: '/tools/readability-analyzer', icon: 'book-open', description: 'Analyze text readability and clarity', category: 'Content' },
  { name: 'Habit Tracker', path: '/tools/habit-tracker', icon: 'check-circle', description: 'Build and track daily habits and streaks', category: 'Productivity' }
];

// Logic to get related tools
const relatedTools = computed(() => {
  // Filter out current tool
  const otherTools = allTools.filter(t => t.path !== props.currentTool);
  
  // If category provided, prioritize tools from same category
  if (props.category) {
    const sameCategoryTools = otherTools.filter(t => t.category === props.category);
    const otherCategoryTools = otherTools.filter(t => t.category !== props.category);
    
    // Take 3 from same category if available, otherwise fill with others
    const related = sameCategoryTools.slice(0, 3);
    if (related.length < 3) {
      related.push(...otherCategoryTools.slice(0, 3 - related.length));
    }
    return related;
  }
  
  // Otherwise return first 3 tools
  return otherTools.slice(0, 3);
});
</script>

<style scoped>
.related-tools-section {
  margin-top: 80px;
  padding: 60px 0;
  border-top: 1px solid var(--color-border, rgba(255,255,255,0.1));
}

.related-tools-header {
  text-align: center;
  margin-bottom: 48px;
}

.related-tools-header h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text-primary, #fff);
}

.related-subtitle {
  font-size: 1.1rem;
  color: var(--color-text-secondary, #888);
}

.related-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.related-tool-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px;
  text-decoration: none;
  border-radius: 16px;
  background: var(--color-surface, rgba(255,255,255,0.03));
  border: 1px solid var(--color-border, rgba(255,255,255,0.1));
  transition: all 0.3s ease;
}

.related-tool-card:hover {
  border-color: var(--color-primary, #6366f1);
  background: var(--color-surface-hover, rgba(255,255,255,0.05));
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}

.tool-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--color-primary-subtle, rgba(99, 102, 241, 0.1));
  border: 1px solid var(--color-primary-border, rgba(99, 102, 241, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary, #6366f1);
  transition: all 0.3s ease;
}

.related-tool-card:hover .tool-icon-wrapper {
  background: var(--color-primary, #6366f1);
  color: white;
  transform: scale(1.1);
}

.tool-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-primary, #fff);
}

.tool-content p {
  font-size: 0.95rem;
  color: var(--color-text-secondary, #888);
  line-height: 1.6;
  margin-bottom: 16px;
}

.tool-link-arrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-primary, #6366f1);
  transition: gap 0.2s ease;
}

.related-tool-card:hover .tool-link-arrow {
  gap: 12px;
}

@media (max-width: 768px) {
  .related-tools-grid {
    grid-template-columns: 1fr;
  }
  
  .related-tools-section {
    margin-top: 60px;
    padding: 40px 0;
  }
}
</style>
