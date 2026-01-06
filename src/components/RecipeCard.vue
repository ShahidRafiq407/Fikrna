<template>
  <div class="recipe-card">
    <div class="recipe-header">
      <h4>{{ recipe.name }}</h4>
      <div class="recipe-badges">
        <span v-if="recipe.halal" class="badge">☪️ Halal</span>
        <span v-if="recipe.vegetarian" class="badge">🥗 Veg</span>
        <span v-if="recipe.vegan" class="badge">🌱 Vegan</span>
        <span v-if="recipe.glutenFree" class="badge">🌾 GF</span>
        <span v-if="recipe.keto" class="badge">🥑 Keto</span>
      </div>
    </div>

    <div class="recipe-meta">
      <span class="meta-item">
        <strong>⏱️ {{ recipe.prepTime }}</strong> prep
      </span>
      <span class="meta-item">
        <strong>🍳 {{ recipe.cookTime }}</strong> cook
      </span>
      <span class="meta-item">
        <strong>🔥 {{ adjustedCalories }}</strong> cal
      </span>
      <span v-if="familySize > 1" class="meta-item">
        <strong>👥 {{ adjustedServings }}</strong> servings
      </span>
    </div>

    <div class="recipe-nutrition">
      <h5>Nutrition per serving:</h5>
      <div class="nutrition-grid">
        <span>Protein: <strong>{{ recipe.protein }}</strong></span>
        <span>Carbs: <strong>{{ recipe.carbs }}</strong></span>
        <span>Fat: <strong>{{ recipe.fat }}</strong></span>
        <span>Fiber: <strong>{{ recipe.fiber }}</strong></span>
      </div>
    </div>

    <div v-if="showFull" class="recipe-full-details">
      <div class="recipe-ingredients">
        <h5>Ingredients:</h5>
        <ul>
          <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">
            {{ ingredient }}
            <span v-if="familySize > 1" class="multiplier">(×{{ familySize }})</span>
          </li>
        </ul>
      </div>

      <details class="recipe-instructions">
        <summary>👨‍🍳 View Cooking Instructions</summary>
        <ol>
          <li v-for="(step, idx) in recipe.instructions" :key="idx">{{ step }}</li>
        </ol>
        <div v-if="recipe.difficulty" class="difficulty">
          <strong>Difficulty:</strong> {{ recipe.difficulty }}
        </div>
      </details>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  },
  familySize: {
    type: Number,
    default: 1
  },
  showFull: {
    type: Boolean,
    default: false
  }
});

const adjustedServings = computed(() => {
  return (props.recipe.servings || 1) * props.familySize;
});

const adjustedCalories = computed(() => {
  return Math.round((props.recipe.calories || 0) * props.familySize);
});
</script>

<style scoped>
.recipe-card {
  background: rgba(255, 255, 255, 0.02);
  padding: var(--spacing-md);
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.recipe-header h4 {
  color: var(--color-accent-gold);
  margin: 0;
  font-size: var(--font-size-base);
}

.recipe-badges {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.badge {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-xs);
  background: rgba(255, 215, 0, 0.15);
  border-radius: var(--radius-sm);
  white-space: nowrap;
}

.recipe-meta {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
  flex-wrap: wrap;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.meta-item strong {
  color: var(--color-accent-gold);
}

.recipe-nutrition {
  margin-bottom: var(--spacing-sm);
  padding: var(--spacing-xs);
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-sm);
}

.recipe-nutrition h5 {
  font-size: var(--font-size-xs);
  margin-bottom: var(--spacing-xs);
  color: var(--color-text-secondary);
}

.nutrition-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xs);
  font-size: var(--font-size-sm);
}

.recipe-full-details {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--glass-border);
}

.recipe-ingredients h5 {
  color: var(--color-accent-gold);
  margin-bottom: var(--spacing-xs);
}

.recipe-ingredients ul {
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-md);
}

.recipe-ingredients li {
  padding: var(--spacing-xs) 0;
  padding-left: var(--spacing-md);
  position: relative;
  font-size: var(--font-size-sm);
}

.recipe-ingredients li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-accent-gold);
}

.multiplier {
  color: var(--color-accent-purple);
  font-size: var(--font-size-xs);
  margin-left: var(--spacing-xs);
}

.recipe-instructions {
  margin-top: var(--spacing-md);
}

.recipe-instructions summary {
  cursor: pointer;
  padding: var(--spacing-sm);
  background: rgba(255, 215, 0, 0.1);
  border-radius: var(--radius-sm);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.recipe-instructions ol {
  padding-left: var(--spacing-xl);
  margin: var(--spacing-sm) 0;
}

.recipe-instructions li {
  margin-bottom: var(--spacing-xs);
  line-height: 1.6;
  font-size: var(--font-size-sm);
}

.difficulty {
  margin-top: var(--spacing-sm);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--glass-border);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}
</style>
