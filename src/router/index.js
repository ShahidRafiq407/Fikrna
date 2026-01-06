import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
            title: 'FikrNa - Free AI Tools for Daily Life 2025 | Pakistan',
            description: 'Solve daily problems with free AI-powered tools. Calorie tracker, meal planner, sleep coach, and more. 100% client-side, privacy-focused.',
            keywords: 'AI tools Pakistan, free online tools, calorie tracker, meal planner 2025'
        }
    },

    // Essential Pages
    {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
        meta: {
            title: 'About Us - FikrNa | Free AI Tools',
            description: 'Learn about FikrNa - privacy-focused AI tools built with client-side technology for instant results.',
            keywords: 'about fikrna, AI tools, privacy focused'
        }
    },
    {
        path: '/contact',
        name: 'Contact',
        component: () => import('@/views/Contact.vue'),
        meta: {
            title: 'Contact Us - FikrNa | Get in Touch',
            description: 'Contact FikrNa for support, feedback, or inquiries. We\'re here to help!',
            keywords: 'contact fikrna, support, feedback'
        }
    },
    {
        path: '/privacy-policy',
        name: 'PrivacyPolicy',
        component: () => import('@/views/PrivacyPolicy.vue'),
        meta: {
            title: 'Privacy Policy - FikrNa | Your Data is Safe',
            description: 'FikrNa privacy policy - All processing is done in your browser. No data collection or storage.',
            keywords: 'privacy policy, data protection, GDPR'
        }
    },
    {
        path: '/terms-of-service',
        name: 'TermsOfService',
        component: () => import('@/views/TermsOfService.vue'),
        meta: {
            title: 'Terms of Service - FikrNa',
            description: 'Terms of service for using FikrNa AI tools.',
            keywords: 'terms of service, terms and conditions'
        }
    },
    {
        path: '/disclaimer',
        name: 'Disclaimer',
        component: () => import('@/views/Disclaimer.vue'),
        meta: {
            title: 'Disclaimer - FikrNa | Important Information',
            description: 'Read FikrNa disclaimer about health, financial, and nutrition tools. Not professional advice.',
            keywords: 'disclaimer, health disclaimer, financial disclaimer'
        }
    },
    {
        path: '/sitemap',
        name: 'Sitemap',
        component: () => import('@/views/Sitemap.vue'),
        meta: {
            title: 'Sitemap - FikrNa | Find All Tools',
            description: 'Complete sitemap of FikrNa tools and pages.',
            keywords: 'sitemap, all tools'
        }
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/Blog.vue'),
        meta: {
            title: 'Blog | Expert Guides & Insights | FikrNa',
            description: 'Discover expert-written guides, tips, and insights on health, finance, travel, and productivity. Learn how to make the most of our free tools.',
            keywords: 'blog, travel guides, health tips, finance guides, productivity tips, expert advice'
        }
    },
    {
        path: '/blog/:slug',
        name: 'BlogPost',
        component: () => import('@/views/Blog.vue'),
        meta: {
            title: 'Blog Post | FikrNa',
            description: 'Read expert-written guides and insights on FikrNa blog.'
        }
    },

    // Health Tools
    {
        path: '/tools/calorie-tracker',
        name: 'CalorieTracker',
        component: () => import('@/views/tools/CalorieTracker.vue'),
        meta: {
            title: 'Best Free AI Calorie Tracker Online 2025 | No Signup Needed in Pakistan',
            description: 'Track calories instantly with our free AI calorie tracker. Input food items and get accurate calorie counts. Works offline, privacy-focused.',
            keywords: 'calorie tracker, AI calorie counter, free calorie tracker Pakistan, food calories'
        }
    },
    {
        path: '/tools/sleep-coach',
        name: 'SleepCoach',
        component: () => import('@/views/tools/SleepCoach.vue'),
        meta: {
            title: 'Free AI Sleep Coach 2025 | Improve Sleep Quality | Pakistan',
            description: 'Get personalized sleep recommendations from AI. Improve your sleep quality with science-backed tips.',
            keywords: 'sleep coach, AI sleep tracker, improve sleep, sleep tips Pakistan'
        }
    },
    {
        path: '/tools/meal-planner',
        name: 'MealPlanner',
        component: () => import('@/views/tools/MealPlanner.vue'),
        meta: {
            title: 'Free AI Meal Planner 2025 | Recipe Generator | Pakistani Recipes',
            description: 'Generate meal plans from your ingredients. Pakistani and international recipes. Free AI meal planning tool.',
            keywords: 'meal planner, recipe generator, AI recipes, Pakistani recipes, meal planning'
        }
    },
    {
        path: '/tools/symptom-checker',
        name: 'SymptomChecker',
        component: () => import('@/views/tools/SymptomChecker.vue'),
        meta: {
            title: 'Free AI Symptom Checker 2025 | Health Analysis | Pakistan',
            description: 'Check symptoms with AI assistance. Get basic health guidance. Not a substitute for professional medical advice.',
            keywords: 'symptom checker, AI health, medical symptoms, health check Pakistan'
        }
    },
    {
        path: '/tools/skincare-coach',
        name: 'SkincareCoach',
        component: () => import('@/views/tools/SkincareCoach.vue'),
        meta: {
            title: 'Free AI Skincare Coach 2025 | Personalized Skincare Routine',
            description: 'Get personalized skincare routine recommendations based on your skin type. Free AI-powered skincare advice.',
            keywords: 'skincare coach, AI skincare, skin routine, skincare tips Pakistan'
        }
    },
    {
        path: '/tools/mood-coach',
        name: 'MoodCoach',
        component: () => import('@/views/tools/MoodCoach.vue'),
        meta: {
            title: 'Free AI Mood Coach 2025 | Mental Wellness Tracker',
            description: 'Track your mood and get personalized wellness tips. Free AI mood journal and mental health support.',
            keywords: 'mood tracker, AI mood coach, mental health, wellness journal Pakistan'
        }
    },

    // Utility Tools
    {
        path: '/tools/age-calculator',
        name: 'AgeCalculator',
        component: () => import('@/views/tools/AgeCalculator.vue'),
        meta: {
            title: 'Exact Age Calculator 2025 | Birthday Countdown & Zodiac | Pakistan',
            description: 'Calculate your exact age, retirement date, and next birthday. Free feature-rich age calculator with zodiac finder.',
            keywords: 'age calculator, birthday countdown, zodiac finder, retirement calculator, date difference'
        }
    },
    {
        path: '/tools/salary-tax-calculator',
        name: 'SalaryCalculator',
        component: () => import('@/views/tools/SalaryCalculator.vue'),
        meta: {
            title: 'Salary Tax Calculator Pakistan 2025 | Monthly Income Tax | FBR Slabs',
            description: 'Calculate monthly income tax deduction for 2024-2025 in Pakistan. Free online salary calculator.',
            keywords: 'salary calculator, income tax pakistan, tax slabs 2025, fbr tax calculator'
        }
    },
    {
        path: '/tools/bmi-calculator',
        name: 'BmiCalculator',
        component: () => import('@/views/tools/BmiCalculator.vue'),
        meta: {
            title: 'BMI Calculator & Health Metrics | BMR, TDEE & Ideal Weight',
            description: 'Calculate BMI, BMR, TDEE and ideal weight range with our free health metrics tool. Visual health category indicators.',
            keywords: 'bmi calculator, bmr calculator, tdee calculator, health metrics, ideal weight'
        }
    },
    {
        path: '/tools/loan-calculator',
        name: 'LoanCalculator',
        component: () => import('@/views/tools/LoanCalculator.vue'),
        meta: {
            title: 'Loan & EMI Calculator 2025 | Amortization Schedule | Pakistan',
            description: 'Calculate monthly EMI and total interest for home, car, and personal loans. Free amortization schedule generator.',
            keywords: 'emi calculator, loan calculator, amortization schedule, home loan calculator'
        }
    },
    {
        path: '/tools/password-strength-checker',
        name: 'PasswordChecker',
        component: () => import('@/views/tools/PasswordChecker.vue'),
        meta: {
            title: 'Password Strength Checker Online 2025 | Secure & Private',
            description: 'Test your password security instantly. Calculate crack time and entropy. 100% client-side privacy-first password checker tool.',
            keywords: 'password strength checker, password tester, secure password check, hack time estimate, entropy calculator'
        }
    },
    {
        path: '/tools/readability-tool',
        name: 'ReadabilityTool',
        component: () => import('@/views/tools/ReadabilityTool.vue'),
        meta: {
            title: 'Free Text Readability Checker 2025 | Flesch-Kincaid Score Calculator | Writing Analysis Tool',
            description: 'Analyze text readability with Flesch-Kincaid scores, reading grade levels, and improvement suggestions. Free readability checker for writers, students, and content creators. Improve your writing clarity instantly.',
            keywords: 'readability checker, flesch kincaid calculator, text readability analyzer, reading level calculator, writing clarity tool, grade level calculator, text analysis, readability score, writing improvement tool, content readability'
        }
    },

    // Productivity & Travel Tools
    {
        path: '/tools/habit-tracker',
        name: 'HabitTracker',
        component: () => import('@/views/tools/HabitTracker.vue'),
        meta: {
            title: 'Free AI Habit Tracker 2025 | Build Good Habits | Pakistan',
            description: 'Track habits and build streaks with AI-powered habit tracker. Free tool to improve your daily routine.',
            keywords: 'habit tracker, AI habits, habit builder, streak tracker Pakistan'
        }
    },
    {
        path: '/tools/trip-planner',
        name: 'TripPlanner',
        component: () => import('@/views/tools/TripPlanner.vue'),
        meta: {
            title: 'Free AI Trip Planner 2025 | Travel Itinerary Generator | Pakistan',
            description: 'Plan your trips with AI-generated itineraries. Get day-by-day travel plans for popular destinations worldwide.',
            keywords: 'trip planner, AI travel planner, itinerary generator, travel planning Pakistan'
        }
    },
    // Content Tools
    // Content Tools
    // Removed VideoGenerator and PhotoEditor as per user request

    // 404 Page
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: '404 - Page Not Found | FikrNa',
            description: 'Page not found. Return to FikrNa homepage to explore our AI tools.',
            keywords: '404, page not found'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    }
});

// Update page title on route change
router.afterEach((to) => {
    const title = to.meta.title || 'FikrNa - Free AI Tools';
    document.title = title;
});

export default router;
