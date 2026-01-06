<template>
  <nav class="breadcrumb-nav" aria-label="Breadcrumb">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb-link">
          <Icon name="home" :size="14" />
          <span>Home</span>
        </router-link>
      </li>
      <li class="breadcrumb-separator">
        <Icon name="chevron-right" :size="14" />
      </li>
      <li v-if="category" class="breadcrumb-item">
        <span class="breadcrumb-text">{{ category }}</span>
      </li>
      <li v-if="category" class="breadcrumb-separator">
        <Icon name="chevron-right" :size="14" />
      </li>
      <li class="breadcrumb-item breadcrumb-current">
        <span class="breadcrumb-text">{{ toolName }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { defineProps } from 'vue';
import Icon from '@/components/Icon.vue';

const props = defineProps({
  toolName: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'Tools'
  }
});
</script>

<style scoped>
.breadcrumb-nav {
  margin-bottom: 24px;
  padding: 12px 0;
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text-secondary, #888);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
  padding: 4px 8px;
  border-radius: 4px;
}

.breadcrumb-link:hover {
  color: var(--color-primary, #6366f1);
  background: rgba(99, 102, 241, 0.1);
}

.breadcrumb-separator {
  display: flex;
  align-items: center;
  color: var(--color-text-tertiary, #666);
  opacity: 0.5;
}

.breadcrumb-text {
  font-size: 0.9rem;
  color: var(--color-text-secondary, #888);
}

.breadcrumb-current .breadcrumb-text {
  color: var(--color-text-primary, #fff);
  font-weight: 500;
}

@media (max-width: 640px) {
  .breadcrumb-link span,
  .breadcrumb-text {
    font-size: 0.85rem;
  }
}
</style>
