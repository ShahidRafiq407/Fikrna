<template>
  <div class="blog-page">
    <div class="container-lg">
      
      <!-- Hero Section (only on blog listing page) -->
      <section v-if="!currentPost" class="hero-section" data-aos="fade-up">
        <p class="eyebrow">
          <Icon name="book-open" :size="16" />
          Expert Guides & Insights
        </p>
        <h1>FikrNa Blog</h1>
        <p class="hero-subtitle">
          Discover expert-written guides, tips, and insights to help you make the most of our free tools. 
          Learn about health, finance, travel, productivity, and more with in-depth articles backed by research and real-world experience.
        </p>
      </section>

      <!-- Blog Posts Grid -->
      <section v-if="!currentPost" class="posts-section" data-aos="fade-up" data-aos-delay="100">
        <div class="posts-grid">
          <article 
            v-for="post in blogPosts" 
            :key="post.id" 
            class="post-card glass-card"
            data-aos="fade-up"
            :data-aos-delay="getDelayIndex(post.id) * 100"
          >
            <!-- Featured Image -->
            <div class="post-image-wrapper">
              <img v-if="post.featuredImage" :src="post.featuredImage" :alt="post.imageAlt || post.title" class="post-featured-image" />
              <div v-else class="post-image-placeholder">
                <Icon name="image" :size="48" />
              </div>
              <div class="post-category">{{ post.category }}</div>
            </div>

            <!-- Post Content -->
            <div class="post-content">
              <div class="post-meta">
                <span class="post-date">
                  <Icon name="calendar" :size="14" />
                  {{ formatDate(post.publishDate) }}
                </span>
                <span class="post-read-time">
                  <Icon name="clock" :size="14" />
                  {{ post.readTime }}
                </span>
              </div>

              <h2 class="post-title">
                <router-link :to="`/blog/${post.slug}`" class="post-title-link">
                  {{ post.title }}
                </router-link>
              </h2>

              <p class="post-excerpt">{{ post.excerpt }}</p>

              <div class="post-footer">
                <div class="post-author">
                  <Icon name="user" :size="14" />
                  <span>{{ post.author }}</span>
                </div>
                <router-link :to="`/blog/${post.slug}`" class="read-more-btn">
                  Read More
                  <Icon name="arrow-right" :size="16" />
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Individual Post View -->
      <div v-if="currentPost" class="post-detail-view">
        <!-- Back Button -->
        <router-link to="/blog" class="back-link" data-aos="fade-right">
          <Icon name="arrow-left" :size="18" />
          <span>Back to Blog</span>
        </router-link>

        <!-- Post Header -->
        <article class="post-detail glass-card" data-aos="fade-up">
          <header class="post-detail-header">
            <div class="post-detail-meta">
              <span class="post-category-badge">{{ currentPost.category }}</span>
              <span class="post-date">
                <Icon name="calendar" :size="14" />
                {{ formatDate(currentPost.publishDate) }}
              </span>
              <span class="post-read-time">
                <Icon name="clock" :size="14" />
                {{ currentPost.readTime }}
              </span>
            </div>

            <h1 class="post-detail-title">{{ currentPost.title }}</h1>

            <div class="post-author-info">
              <Icon name="user" :size="18" />
              <span>{{ currentPost.author }}</span>
            </div>
          </header>

          <!-- Featured Image -->
          <div class="post-detail-image">
            <img v-if="currentPost.featuredImage" :src="currentPost.featuredImage" :alt="currentPost.imageAlt || currentPost.title" class="post-detail-featured-image" />
            <div v-else class="post-image-placeholder-large">
              <Icon name="file-text" :size="64" />
            </div>
          </div>

          <!-- Post Content -->
          <div class="post-detail-content" v-html="currentPost.content"></div>

          <!-- Related Tools Section -->
          <div v-if="currentPost.relatedTools && currentPost.relatedTools.length > 0" class="related-tools-section">
            <h3>
              <Icon name="zap" :size="20" />
              Related Tools You May Find Helpful
            </h3>
            <div class="related-tools-grid">
              <router-link 
                v-for="tool in currentPost.relatedTools" 
                :key="tool.path"
                :to="tool.path"
                class="related-tool-card"
              >
                <Icon :name="tool.icon" :size="24" />
                <span>{{ tool.name }}</span>
              </router-link>
            </div>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSEO } from '@/composables/useSEO';
import { getAllPosts, getPostBySlug } from '@/data/blog';
import { 
  generateArticleSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateItemListSchema,
  generateSchemaGraph,
  injectStructuredData 
} from '@/utils/structuredData';
import Icon from '@/components/Icon.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';

const route = useRoute();
const router = useRouter();

const blogPosts = ref(getAllPosts());
const currentPost = ref(null);

// Check if viewing a single post
const postSlug = computed(() => route.params.slug);

// Initialize post based on route
function updatePostAndSEO() {
  const baseUrl = window.location.origin;
  
  if (postSlug.value) {
    currentPost.value = getPostBySlug(postSlug.value);
    
    if (!currentPost.value) {
      router.push('/blog');
      return;
    }
    
    // Set SEO for individual post
    useSEO({
      title: `${currentPost.value.title} | FikrNa Blog`,
      description: currentPost.value.metaDescription,
      keywords: currentPost.value.keywords,
      canonical: `${baseUrl}/blog/${currentPost.value.slug}`,
      jsonLd: generatePostSchema(currentPost.value, baseUrl)
    });
  } else {
    currentPost.value = null;
    
    // Set SEO for blog listing page
    useSEO({
      title: 'Blog | Expert Guides & Insights | FikrNa | Health, Finance, Travel & Productivity Tips',
      description: 'Discover expert-written guides, tips, and insights on health, finance, travel, and productivity. Learn how to make the most of our free tools. In-depth articles backed by research and real-world experience.',
      keywords: 'blog, travel guides, health tips, finance guides, productivity tips, expert advice, FikrNa blog, tool guides, how-to articles, expert insights, health articles, finance articles, travel articles',
      canonical: `${baseUrl}/blog`,
      jsonLd: generateBlogPageSchema(baseUrl)
    });
  }
}

// Watch for route changes
watch(() => route.params.slug, () => {
  updatePostAndSEO();
}, { immediate: false });

onMounted(() => {
  updatePostAndSEO();

  // Initialize AOS
  AOS.init({
    duration: 600,
    easing: 'ease-out',
    once: true,
    offset: 50
  });
});

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

// Get delay index for animations
function getDelayIndex(postId) {
  return blogPosts.value.findIndex(p => p.id === postId);
}

// Generate comprehensive BlogPosting schema for individual post
function generatePostSchema(post, baseUrl) {
  const postUrl = `${baseUrl}/blog/${post.slug}`;
  
  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    excerpt: post.excerpt,
    image: post.featuredImage,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    author: post.author,
    category: post.category,
    body: post.content,
    wordCount: post.content ? post.content.split(/\s+/).length : 0,
    url: postUrl
  }, { baseUrl });
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: postUrl,
    name: `${post.title} | FikrNa Blog`,
    description: post.metaDescription || post.excerpt,
    about: [
      { '@type': 'Thing', name: post.category },
      { '@type': 'Thing', name: 'Blog article' }
    ],
    breadcrumb: { '@id': `${postUrl}#breadcrumb` },
    mainEntity: { '@id': `${postUrl}#blogposting` }
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: `/blog/${post.slug}` }
  ], baseUrl);
  
  return generateSchemaGraph([
    articleSchema,
    webpageSchema,
    breadcrumbSchema
  ]);
}

// Generate comprehensive Blog page schema
function generateBlogPageSchema(baseUrl) {
  const blogUrl = `${baseUrl}/blog`;
  
  const webpageSchema = generateWebPageSchema({
    baseUrl,
    url: blogUrl,
    name: 'Blog | Expert Guides & Insights | FikrNa',
    description: 'Discover expert-written guides, tips, and insights on health, finance, travel, and productivity. Learn how to make the most of our free tools.',
    about: [
      { '@type': 'Thing', name: 'Blog articles' },
      { '@type': 'Thing', name: 'Expert guides' },
      { '@type': 'Thing', name: 'How-to articles' }
    ],
    breadcrumb: { '@id': `${blogUrl}#breadcrumb` }
  });
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' }
  ], baseUrl);
  
  const itemListSchema = generateItemListSchema(
    blogPosts.value.map(post => ({
      name: post.title,
      path: `/blog/${post.slug}`,
      description: post.excerpt
    })),
    {
      baseUrl,
      name: 'FikrNa Blog Articles',
      description: 'Complete list of expert-written blog articles and guides'
    }
  );
  
  return generateSchemaGraph([
    webpageSchema,
    breadcrumbSchema,
    itemListSchema
  ]);
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  padding: clamp(40px, 6vh, 60px) 0;
  background: var(--bg-primary);
}

.container-lg {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  margin-bottom: clamp(48px, 8vh, 80px);
  padding: 40px 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.1) 100%);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 24px;
}

.hero-section h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 20px;
  background: linear-gradient(135deg, var(--text-primary) 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  max-width: 800px;
  margin: 0 auto;
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  line-height: 1.7;
  color: var(--text-secondary);
}

/* Posts Grid */
.posts-section {
  margin-bottom: 60px;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 32px;
}

.post-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--glass-border);
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: rgba(16, 185, 129, 0.3);
}

.post-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%);
}

.post-featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover .post-featured-image {
  transform: scale(1.05);
}

.post-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(16, 185, 129, 0.3);
}

.post-category {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  background: rgba(16, 185, 129, 0.9);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.post-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.post-meta span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.post-meta svg {
  color: #10b981;
}

.post-title {
  margin: 0 0 12px;
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: 700;
  line-height: 1.3;
}

.post-title-link {
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.3s;
}

.post-title-link:hover {
  color: #10b981;
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0 0 20px;
  flex: 1;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid var(--glass-border);
}

.post-author {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.post-author svg {
  color: #10b981;
}

.read-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
}

.read-more-btn:hover {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  transform: translateX(4px);
}

/* Post Detail View */
.post-detail-view {
  margin-top: 0px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 0px;
  padding: 1px 2px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.back-link:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
  transform: translateX(-4px);
}

.post-detail {
  padding: 0;
  overflow: hidden;
}

.post-detail-header {
  padding: 24px 40px;
  border-bottom: 1px solid var(--glass-border);
}

.post-detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

.post-category-badge {
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.15) 100%);
  border: 2px solid rgba(16, 185, 129, 0.3);
  border-radius: 8px;
  color: #10b981;
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.post-detail-meta .post-date,
.post-detail-meta .post-read-time {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.post-detail-meta svg {
  color: #10b981;
}

.post-detail-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  line-height: 1.2;
  color: var(--text-primary);
  margin: 0 0 20px;
}

.post-author-info {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: rgba(16, 185, 129, 0.1);
  border-radius: 8px;
  color: var(--text-primary);
  font-weight: 500;
}

.post-author-info svg {
  color: #10b981;
}

.post-detail-image {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(20, 184, 166, 0.05) 100%);
  border-radius: 12px;
}

.post-detail-featured-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  max-height: none;
}

.post-image-placeholder-large {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(16, 185, 129, 0.3);
}

.post-detail-content {
  padding: 40px;
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.0625rem;
}

.post-detail-content :deep(h2) {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 40px 0 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(16, 185, 129, 0.2);
}

.post-detail-content :deep(h3) {
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 32px 0 16px;
}

.post-detail-content :deep(p) {
  margin-bottom: 20px;
  color: var(--text-secondary);
}

.post-detail-content :deep(ul),
.post-detail-content :deep(ol) {
  margin: 20px 0;
  padding-left: 24px;
  color: var(--text-secondary);
}

.post-detail-content :deep(li) {
  margin-bottom: 12px;
  line-height: 1.7;
}

.post-detail-content :deep(strong) {
  color: var(--text-primary);
  font-weight: 700;
}

.post-detail-content :deep(a) {
  color: #10b981;
  text-decoration: underline;
  transition: color 0.3s;
}

.post-detail-content :deep(a:hover) {
  color: #14b8a6;
}

/* Related Tools Section */
.related-tools-section {
  margin-top: 60px;
  padding: 40px;
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(20, 184, 166, 0.04) 100%);
  border-top: 2px solid rgba(16, 185, 129, 0.2);
}

.related-tools-section h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: clamp(1.25rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 24px;
}

.related-tools-section h3 svg {
  color: #10b981;
}

.related-tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.related-tool-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.related-tool-card:hover {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
  transform: translateY(-2px);
}

.related-tool-card svg {
  color: #10b981;
}

/* Responsive */
@media (max-width: 768px) {
  .posts-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .post-detail-header,
  .post-detail-content,
  .related-tools-section {
    padding: 24px;
  }

  .post-detail-image {
    height: auto;
  }

  .related-tools-grid {
    grid-template-columns: 1fr;
  }
}
</style>
