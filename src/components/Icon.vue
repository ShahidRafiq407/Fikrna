<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    :stroke-width="strokeWidth" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    class="feather-icon"
  >
    <!-- Map of icon paths -->
    <path v-if="name === 'activity'" d="M22 12h-4l-3 9L9 3l-3 9H2" />
    <path v-else-if="name === 'moon'" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    <path v-else-if="name === 'sun'" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 12a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
    <path v-else-if="name === 'search'" d="M11 11a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3" />
    <path v-else-if="name === 'menu'" d="M3 12h18M3 6h18M3 18h18" />
    <path v-else-if="name === 'x'" d="M18 6L6 18M6 6l12 12" />
    <path v-else-if="name === 'chevron-down'" d="M6 9l6 6 6-6" />
    <path v-else-if="name === 'chevron-up'" d="M18 15l-6-6-6 6" />
    <path v-else-if="name === 'arrow-right'" d="M5 12h14M12 5l7 7-7 7" />
    
    <!-- Tool specific icons -->
    <template v-else-if="name === 'apple'">
       <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.912 4.912 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.902 4.902 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
       <path d="M10 2c1 .5 2 2 2 5" />
    </template>
    
    <template v-else-if="name === 'trending-up'">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </template>
    
    <template v-else-if="name === 'trending-down'">
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </template>
    
    <template v-else-if="name === 'brain'">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44L2 22V13.5A2.5 2.5 0 0 1 4.5 11c.83 0 1.57.5 1.88 1.22l.02.03A2.5 2.5 0 0 1 9.5 8c.83 0 1.57.5 1.88 1.22l.02.03c.11.17.26.31.44.41V4.5A2.5 2.5 0 0 1 14.5 2c.83 0 1.57.5 1.88 1.22l.02.03C17.5 3.5 18.17 4 19 4a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-4.96.44l-1.04-2.08a2.5 2.5 0 0 0-4.92 0l-1.04 2.08A2.5 2.5 0 0 1 9.5 22Z" />
    </template>
    
    <template v-else-if="name === 'droplet'">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </template>
    
    <template v-else-if="name === 'heart'">
       <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </template>
    
    <template v-else-if="name === 'dollar-sign'">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </template>
    
    <template v-else-if="name === 'calendar'">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </template>
    
    <template v-else-if="name === 'lock'">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </template>
    
    <template v-else-if="name === 'book-open'">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </template>
    
     <template v-else-if="name === 'smile'">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </template>
    
    <template v-else-if="name === 'map'">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </template>
    
    <template v-else-if="name === 'check-circle'">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </template>
    
     <template v-else-if="name === 'facebook'">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </template>
    
    <template v-else-if="name === 'twitter'">
      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
    </template>
    
    <template v-else-if="name === 'instagram'">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </template>
    
    <template v-else-if="name === 'mail'">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </template>
    
    <template v-else-if="name === 'clock'">
       <circle cx="12" cy="12" r="10" />
       <polyline points="12 6 12 12 16 14" />
    </template>
    
    <template v-else-if="name === 'download'">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </template>
    
    <template v-else-if="name === 'copy'">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </template>
    
    <template v-else-if="name === 'refresh-cw'">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </template>
    
    <template v-else-if="name === 'info'">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </template>
    
    <template v-else-if="name === 'alert-circle'">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </template>
    
    <template v-else-if="name === 'zap'">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </template>
    
    <template v-else-if="name === 'share-2'">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </template>
    
    <template v-else-if="name === 'edit'">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </template>
    
    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </template>
    
    <template v-else-if="name === 'globe'">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </template>
    
    <template v-else-if="name === 'arrow-left'">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </template>
    
    <template v-else-if="name === 'arrow-left-right'">
      <polyline points="9 18 3 12 9 6" />
      <polyline points="15 6 21 12 15 18" />
    </template>
    
    <template v-else-if="name === 'briefcase'">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </template>
    
    <template v-else-if="name === 'shield'">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </template>
    
    <template v-else-if="name === 'file-text'">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </template>
    
    <template v-else-if="name === 'bar-chart'">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </template>
    
    <template v-else-if="name === 'gift'">
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </template>
    
    <template v-else-if="name === 'star'">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </template>
    
    <template v-else-if="name === 'flag'">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </template>
    
    <template v-else-if="name === 'x-circle'">
      <circle cx="12" cy="12" r="10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </template>
    
    <template v-else-if="name === 'home'">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </template>
    
    <template v-else-if="name === 'user'">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </template>
    
    <template v-else-if="name === 'help-circle'">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </template>
    
    <template v-else-if="name === 'sunrise'">
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="8 6 12 2 16 6" />
    </template>
    
    <template v-else-if="name === 'coffee'">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </template>
    
    <template v-else-if="name === 'plus'">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </template>
    
    <template v-else-if="name === 'list'">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </template>
    
    <template v-else-if="name === 'palette'">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </template>
    
    <template v-else-if="name === 'shopping-cart'">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </template>
    
    <template v-else-if="name === 'settings'">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
    </template>
    
    <template v-else-if="name === 'filter'">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </template>
    
    <template v-else-if="name === 'leaf'">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </template>
    
    <template v-else-if="name === 'users'">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </template>
    
    <template v-else-if="name === 'thermometer'">
      <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z" />
    </template>
    
    <template v-else-if="name === 'smartphone'">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </template>
    
    <template v-else-if="name === 'message-square'">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </template>
    
    <template v-else-if="name === 'edit-2'">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
    </template>
    
    <template v-else-if="name === 'alert-triangle'">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </template>
    
    <template v-else-if="name === 'bar-chart-2'">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </template>
    
    <template v-else-if="name === 'shopping-bag'">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </template>
    
    <!-- Fallback -->
    <circle v-else cx="12" cy="12" r="10" />
  </svg>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  strokeWidth: {
    type: [Number, String],
    default: 2
  }
});
</script>

<style scoped>
.feather-icon {
  vertical-align: middle;
  transition: all 0.2s ease;
}
</style>
