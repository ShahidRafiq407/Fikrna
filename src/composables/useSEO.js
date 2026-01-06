/**
 * Enhanced SEO Composable for Dynamic Meta Tags
 * Optimized for AI/LLM search, Google AI Overview, and traditional SEO
 */

import { onMounted, onBeforeUnmount } from 'vue';

export function useSEO(config) {
    const defaultConfig = {
        title: 'FikrNa - Free AI Tools for Daily Life 2025',
        description: 'Free AI-powered tools for daily life problem-solving. Privacy-focused, client-side processing.',
        keywords: 'AI tools, free tools, calorie tracker, meal planner',
        ogImage: '/og-image.jpg',
        canonical: null,
        jsonLd: null,
        ogType: 'website',
        articleAuthor: null,
        articlePublishedTime: null,
        articleModifiedTime: null,
        articleSection: null,
        articleTags: []
    };

    const seoConfig = { ...defaultConfig, ...config };
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://fikrna.com';
    const currentUrl = typeof window !== 'undefined' ? window.location.href : baseUrl;

    let originalTitle = '';
    const metaTags = [];
    const jsonLdScripts = [];

    onMounted(() => {
        // Save original title
        originalTitle = document.title;

        // Set title
        document.title = seoConfig.title;

        // Set meta description (critical for AI/LLM extraction)
        setOrUpdateMeta('name', 'description', seoConfig.description);

        // Set meta keywords
        if (seoConfig.keywords) {
            setOrUpdateMeta('name', 'keywords', seoConfig.keywords);
        }

        // Set OG tags (essential for social sharing, AI understanding, and Google Discover)
        setOrUpdateMeta('property', 'og:type', seoConfig.ogType);
        setOrUpdateMeta('property', 'og:title', seoConfig.title);
        setOrUpdateMeta('property', 'og:description', seoConfig.description);
        const ogImageUrl = seoConfig.ogImage.startsWith('http') ? seoConfig.ogImage : `${baseUrl}${seoConfig.ogImage}`;
        setOrUpdateMeta('property', 'og:image', ogImageUrl);
        setOrUpdateMeta('property', 'og:image:secure_url', ogImageUrl);
        setOrUpdateMeta('property', 'og:image:width', '1200');
        setOrUpdateMeta('property', 'og:image:height', '675');
        setOrUpdateMeta('property', 'og:image:type', 'image/jpeg');
        setOrUpdateMeta('property', 'og:url', currentUrl);
        setOrUpdateMeta('property', 'og:site_name', 'FikrNa');
        setOrUpdateMeta('property', 'og:locale', 'en_US');

        // Google Discover optimization tags
        if (seoConfig.articlePublishedTime) {
            setOrUpdateMeta('property', 'article:published_time', seoConfig.articlePublishedTime);
        }
        if (seoConfig.articleModifiedTime) {
            setOrUpdateMeta('property', 'article:modified_time', seoConfig.articleModifiedTime);
        }

        // Article-specific OG tags (for Google Discover)
        if (seoConfig.ogType === 'article' || seoConfig.articlePublishedTime) {
            if (seoConfig.articleAuthor) {
                setOrUpdateMeta('property', 'article:author', seoConfig.articleAuthor);
            }
            if (seoConfig.articlePublishedTime) {
                setOrUpdateMeta('property', 'article:published_time', seoConfig.articlePublishedTime);
            }
            if (seoConfig.articleModifiedTime) {
                setOrUpdateMeta('property', 'article:modified_time', seoConfig.articleModifiedTime);
            }
            if (seoConfig.articleSection) {
                setOrUpdateMeta('property', 'article:section', seoConfig.articleSection);
            }
            if (seoConfig.articleTags && seoConfig.articleTags.length > 0) {
                seoConfig.articleTags.forEach(tag => {
                    setOrUpdateMeta('property', 'article:tag', tag);
                });
            }
        }

        // Set Twitter Card tags
        setOrUpdateMeta('name', 'twitter:card', 'summary_large_image');
        setOrUpdateMeta('name', 'twitter:title', seoConfig.title);
        setOrUpdateMeta('name', 'twitter:description', seoConfig.description);
        setOrUpdateMeta('name', 'twitter:image', seoConfig.ogImage); // Simplified as per instruction

        // Google Discover optimization
        setOrUpdateMeta('name', 'robots', 'max-image-preview:large'); // Modified as per instruction

        // Author and date (for Google Discover)
        if (seoConfig.author) {
            setOrUpdateMeta('name', 'author', seoConfig.author);
        }
        if (seoConfig.datePublished) {
            setOrUpdateMeta('name', 'article:published_time', seoConfig.datePublished);
        }
        if (seoConfig.dateModified) {
            setOrUpdateMeta('name', 'article:modified_time', seoConfig.dateModified);
        }

        // Set canonical URL (prevents duplicate content issues)
        const canonicalUrl = seoConfig.canonical || currentUrl;
        setCanonical(canonicalUrl);

        // Set JSON-LD structured data (critical for AI/LLM understanding)
        if (seoConfig.jsonLd) {
            injectJsonLd(seoConfig.jsonLd);
        }

        // Add AI-friendly meta tags
        setOrUpdateMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
        setOrUpdateMeta('name', 'googlebot', 'index, follow');

        // Language and region
        setOrUpdateMeta('name', 'language', 'English');
        setOrUpdateMeta('http-equiv', 'content-language', 'en');
    });

    onBeforeUnmount(() => {
        // Restore original title
        if (originalTitle) {
            document.title = originalTitle;
        }

        // Remove created meta tags
        metaTags.forEach(tag => {
            if (tag.parentNode) {
                tag.parentNode.removeChild(tag);
            }
        });

        // Remove JSON-LD scripts
        jsonLdScripts.forEach(script => {
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        });
    });

    function setOrUpdateMeta(attrName, attrValue, content) {
        if (!content) return;

        let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);

        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attrName, attrValue);
            document.head.appendChild(element);
            metaTags.push(element);
        }

        element.setAttribute('content', content);
    }

    function setCanonical(url) {
        if (!url) return;

        let link = document.querySelector('link[rel="canonical"]');

        if (!link) {
            link = document.createElement('link');
            link.setAttribute('rel', 'canonical');
            document.head.appendChild(link);
            metaTags.push(link);
        }

        link.setAttribute('href', url);
    }

    function injectJsonLd(json) {
        if (!json) return;

        // Remove existing JSON-LD scripts created by this composable
        const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-seo-composable]');
        existingScripts.forEach(script => script.remove());

        // Handle array of schemas or single schema
        const schemas = Array.isArray(json) ? json : [json];

        schemas.forEach((schema, index) => {
            if (!schema) return;

            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.setAttribute('data-seo-composable', 'true');
            script.setAttribute('data-schema-index', index.toString());
            script.textContent = JSON.stringify(schema, null, 0);
            document.head.appendChild(script);
            jsonLdScripts.push(script);
        });
    }
}
