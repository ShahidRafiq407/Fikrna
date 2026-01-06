/**
 * Enhanced Schema.org Structured Data Generator
 * Optimized for AI/LLM search, Google AI Overview, and traditional SEO
 */

/**
 * Generate comprehensive SoftwareApplication schema for tools
 * Enhanced for AI readability and search engine understanding
 */
export function generateToolSchema(tool) {
  const baseUrl = tool.url || window.location.origin;
  const toolUrl = tool.url || window.location.href;

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${toolUrl}#software`,
    name: tool.name,
    applicationCategory: tool.category || 'UtilityApplication',
    applicationSubCategory: tool.subCategory || 'Web Application',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: toolUrl
    },
    description: tool.description,
    url: toolUrl,
    screenshot: tool.screenshot || `${baseUrl}/og-image.jpg`,
    softwareVersion: '1.0',
    releaseNotes: tool.releaseNotes || 'Free online tool for everyday use',
    featureList: tool.features || [],
    aggregateRating: tool.rating || {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FikrNa',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`
      }
    },
    creator: {
      '@type': 'Organization',
      name: 'FikrNa',
      url: baseUrl
    },
    inLanguage: 'en-US',
    isAccessibleForFree: true,
    usageInfo: tool.usageInfo || 'Free to use, no registration required',
    permissions: 'No special permissions required',
    softwareHelp: {
      '@type': 'CreativeWork',
      text: tool.helpText || tool.description
    }
  };
}

/**
 * Generate comprehensive FAQPage schema
 * Optimized for AI/LLM extraction and Google Featured Snippets
 */
export function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof faq.answer === 'string' ? faq.answer : JSON.stringify(faq.answer)
      }
    }))
  };
}

/**
 * Generate HowTo schema
 * Helps AI understand step-by-step processes
 */
export function generateHowToSchema(howTo) {
  if (!howTo || !howTo.steps || howTo.steps.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    image: howTo.image,
    totalTime: howTo.totalTime,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url
    }))
  };
}

/**
 * Generate Recipe schema
 */
export function generateRecipeSchema(recipe) {
  if (!recipe) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description,
    recipeIngredient: recipe.ingredients || [],
    recipeInstructions: (recipe.instructions || []).map((inst, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: inst
    })),
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    recipeYield: recipe.servings || recipe.yield,
    nutrition: recipe.nutrition
  };
}

/**
 * Generate comprehensive Organization schema
 */
export function generateOrganizationSchema(config = {}) {
  const baseUrl = config.baseUrl || window.location.origin || 'https://fikrna.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'FikrNa',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.svg`,
      width: '240',
      height: '60'
    },
    image: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.svg`
    },
    description: config.description || 'Free AI-powered tools and calculators for daily life problem-solving. 100% client-side, privacy-focused, and forever free.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Punjab',
      addressLocality: 'Faisalabad'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'siteosia@gmail.com',
      availableLanguage: ['English', 'Urdu']
    },
    sameAs: config.sameAs || [],
    foundingDate: '2024',
    legalName: 'FikrNa',
    slogan: 'Free Tools for Everyday Life'
  };
}

/**
 * Generate WebSite schema with SearchAction
 */
export function generateWebSiteSchema(config = {}) {
  const baseUrl = config.baseUrl || window.location.origin || 'https://fikrna.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}#website`,
    url: baseUrl,
    name: 'FikrNa',
    description: 'Free online tools and calculators for health, finance, writing, travel, and daily planning',
    publisher: {
      '@id': `${baseUrl}#organization`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${baseUrl}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    inLanguage: 'en-US'
  };
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(config = {}) {
  const baseUrl = config.baseUrl || window.location.origin || 'https://fikrna.com';
  const pageUrl = config.url || window.location.href;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: config.name || document.title,
    description: config.description,
    isPartOf: {
      '@id': `${baseUrl}#website`
    },
    about: config.about || [],
    breadcrumb: config.breadcrumb ? {
      '@id': `${pageUrl}#breadcrumb`
    } : undefined,
    mainEntity: config.mainEntity,
    datePublished: config.datePublished,
    dateModified: config.dateModified || new Date().toISOString(),
    inLanguage: 'en-US',
    audience: {
      '@type': 'Audience',
      audienceType: 'General Public'
    }
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(items, baseUrl) {
  if (!items || items.length === 0) return null;

  const base = baseUrl || window.location.origin || 'https://fikrna.com';
  const currentUrl = window.location.href;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${currentUrl}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url || (index === items.length - 1 ? currentUrl : `${base}${item.path}`)
    }))
  };
}

/**
 * Generate Article/BlogPosting schema
 */
export function generateArticleSchema(article, config = {}) {
  const baseUrl = config.baseUrl || window.location.origin || 'https://fikrna.com';
  const articleUrl = article.url || window.location.href;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${articleUrl}#blogposting`,
    headline: article.title,
    description: article.description || article.excerpt,
    image: article.image ? {
      '@type': 'ImageObject',
      url: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
      width: '1200',
      height: '640'
    } : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || 'FikrNa Editorial Team',
      url: baseUrl
    },
    publisher: {
      '@id': `${baseUrl}#organization`
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    articleSection: article.category,
    inLanguage: 'en-US',
    wordCount: article.wordCount,
    articleBody: article.body
  };
}

/**
 * Generate ItemList schema for tool listings
 */
export function generateItemListSchema(items, config = {}) {
  if (!items || items.length === 0) return null;

  const baseUrl = config.baseUrl || window.location.origin || 'https://fikrna.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: config.name || 'FikrNa Tools',
    description: config.description || 'Collection of free online tools and calculators',
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: item.name,
        url: item.url || `${baseUrl}${item.path}`,
        description: item.description
      }
    }))
  };
}

/**
 * Generate comprehensive schema graph for pages
 * Combines multiple schemas into a @graph structure
 */
export function generateSchemaGraph(schemas) {
  const validSchemas = schemas.filter(s => s !== null && s !== undefined);

  if (validSchemas.length === 0) return null;
  if (validSchemas.length === 1) return validSchemas[0];

  return {
    '@context': 'https://schema.org',
    '@graph': validSchemas
  };
}

/**
 * Inject structured data into page
 * Enhanced to handle both single schemas and @graph structures
 */
export function injectStructuredData(schema) {
  if (!schema) return;

  // Remove existing schema scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-schema]');
  existingScripts.forEach(script => script.remove());

  // Handle array of schemas
  if (Array.isArray(schema)) {
    schema.forEach((s, index) => {
      if (!s) return;
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-schema', `true`);
      script.setAttribute('data-schema-index', index.toString());
      script.textContent = JSON.stringify(s, null, 0);
      document.head.appendChild(script);
    });
  } else {
    // Single schema
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-schema', 'true');
    script.textContent = JSON.stringify(schema, null, 0);
    document.head.appendChild(script);
  }
}
