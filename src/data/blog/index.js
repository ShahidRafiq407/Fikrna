/**
 * Blog Posts Index
 * Auto-imports all blog post files
 * 
 * HOW TO ADD A NEW POST:
 * 1. Create new file: src/data/blog/your-article-slug.js
 * 2. Copy template from _template.js
 * 3. Add import below
 * 4. Add to blogPosts array
 * 5. Deploy!
 */

// Import all blog posts
import cesAiRobots2026 from './ces-ai-robots-2026.js';
import grokAiDeepfake from './grok-ai-deepfake-scandal.js';
import calorieTrackingGuide from './calorie-tracking-guide.js';
import salaryTaxGuide from './salary-tax-guide.js';
import tripPlanningGuide from './trip-planning-guide.js';
import trumpgreenlandstandoff from './trump-greenland-standoff-tariffs-europe-global-alliances.js';

// Export all posts as array (newest first)
export const blogPosts = [
  trumpgreenlandstandoff, // ID: 6 - Jan 20, 2026
  cesAiRobots2026,     // ID: 5 - Jan 10, 2026
  grokAiDeepfake,      // ID: 4 - Jan 6, 2026
  calorieTrackingGuide, // ID: 1 - Jan 15, 2025
  salaryTaxGuide,      // ID: 2 - Jan 10, 2025
  tripPlanningGuide,    // ID: 3 - Jan 5, 2025
  
];

// Helper functions (keep same as before)
export function getAllPosts() {
  return blogPosts;
}

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug);
}

export function getLatestPosts(limit = 3) {
  return blogPosts
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    .slice(0, limit);
}

export function getPostsByCategory(category) {
  return blogPosts.filter(post => post.category === category);
}
