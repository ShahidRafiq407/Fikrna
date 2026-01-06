<template>
  <router-link
    ref="cardEl"
    :to="tool.path"
    class="tool-card card-premium"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  >
    <div class="card-glow"></div>
    <div class="card-content">
      <div class="tool-header">
        <div class="tool-icon-wrapper">
          <Icon :name="tool.icon" :size="32" stroke-width="2" />
        </div>
        <span class="tool-category">{{ tool.category }}</span>
      </div>
      <h3 class="tool-title">{{ tool.name }}</h3>
      <p class="tool-desc">{{ tool.description }}</p>
      <div class="tool-footer">
        <span class="use-btn">Use Tool</span>
        <Icon name="arrow-right" :size="16" class="arrow" />
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps, onBeforeUnmount, ref } from 'vue';
import Icon from '@/components/Icon.vue';

const props = defineProps({
  tool: Object
});

const cardEl = ref(null);
let rafId = 0;

function onPointerMove(e) {
  const el = cardEl.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    el.style.setProperty('--mouse-x', `${x.toFixed(2)}%`);
    el.style.setProperty('--mouse-y', `${y.toFixed(2)}%`);
  });
}

function onPointerLeave() {
  const el = cardEl.value;
  if (!el) return;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = 0;
  el.style.setProperty('--mouse-x', '50%');
  el.style.setProperty('--mouse-y', '0%');
}

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
});
</script>


<style scoped>
.tool-card {
  position: relative;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  overflow: hidden;
  height: 100%;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-radius: var(--radius-xl);
  transition: all 0.3s ease;
}

/* Hover Effect: Border Glow */
.tool-card:hover {
  border-color: rgba(99, 102, 241, 0.5);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.18);
  transform: translateY(-2px);
}

.card-glow {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(
    800px circle at var(--mouse-x, 50%) var(--mouse-y, 0),
    rgba(99, 102, 241, 0.18),
    transparent 45%
  );
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
  z-index: 0;
}

/* Show glow on hover if we want a follow-mouse effect, 
   otherwise we stick to simple static gradients */
.tool-card:hover .card-glow { opacity: 1; }

.card-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column; flex: 1;
  padding: 24px;
}

.tool-header {
  display: flex; justify-content: space-between; align-items: start;
  margin-bottom: 24px;
}

.tool-icon-wrapper {
  width: 48px; height: 48px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--glass-border);
  display: flex; align-items: center; justify-content: center;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.tool-card:hover .tool-icon-wrapper {
  background: rgba(99, 102, 241, 0.12);
  border-color: rgba(99, 102, 241, 0.35);
  color: var(--text-primary);
}

.tool-category {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-tertiary);
  background: transparent;
  padding: 0;
  border: none;
}

.tool-title {
  font-size: 1.25rem;
  font-weight: 600; /* Slightly lighter weight for modern look */
  margin-bottom: 12px;
  color: var(--text-primary);
  line-height: 1.3;
  letter-spacing: -0.01em;
}

.tool-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
  flex: 1;
  font-weight: 400;
}

.tool-footer {
  display: flex; align-items: center; gap: 8px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.9rem;
  margin-top: auto;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.tool-card:hover .tool-footer { opacity: 1; color: #a5b4fc; }

.arrow { transition: transform 0.2s; }
.tool-card:hover .arrow { transform: translateX(4px); }

/* Large Variant */
:deep(.bento-large) .tool-title { font-size: 1.8rem; letter-spacing: -0.02em; }
:deep(.bento-large) .tool-desc { font-size: 1.1rem; }
:deep(.bento-large) .card-content { padding: 32px; }
:deep(.bento-large) .tool-icon-wrapper { width: 64px; height: 64px; }
</style>

