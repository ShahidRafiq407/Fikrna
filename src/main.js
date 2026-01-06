import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { themeManager } from './utils/storage';
import { injectSpeedInsights } from '@vercel/speed-insights';

// Import global styles
import './assets/styles/global.css';
import './assets/styles/animations.css';

// Initialize app
const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize theme
themeManager.init();

// Initialize Vercel Speed Insights for performance tracking
injectSpeedInsights();

// Mount app
app.mount('#app');

// Initialize AOS (Animate On Scroll) library - Wait for DOM and AOS to load
const initAOS = () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            disable: 'mobile' // Disable on mobile for better performance
        });
    } else {
        // Retry after a short delay if AOS not loaded yet
        setTimeout(initAOS, 100);
    }
};

// Initialize after page load
if (document.readyState === 'complete') {
    initAOS();
} else {
    window.addEventListener('load', initAOS);
}
