/**
 * Blog Post Template
 * Copy this file and rename it to match your article slug
 * Example: my-article-title.js
 */

export default {
  id: '6', // Change to next available number
  slug: 'your-article-url-slug',
  title: 'Your Article Title Here',
  excerpt: 'A short 1-2 sentence summary of your article.',
  category: 'Tech & Innovation', // Options: 'Tech & Innovation', 'Health & Wellness', 'Finance', 'Travel & Lifestyle'
  author: 'FikrNa Editorial Team',
  publishDate: '2026-01-20', // Format: YYYY-MM-DD
  readTime: '8 min read',
  featuredImage: '/blog/your-image.jpg',
  imageAlt: 'Description of your featured image',
  metaDescription: 'SEO description 150-160 characters for Google search results.',
  keywords: 'keyword1, keyword2, keyword3, main topic keywords',

  content: `
    <p><strong>Last Updated: January 20, 2026</strong></p>

    <p>Your opening paragraph goes here. Make it engaging!</p>

    <h2>First Section Heading</h2>
    <p>Your content here.</p>

    <h3>Subsection Heading</h3>
    <p>More content.</p>

    <h2>Add Images (Optional)</h2>
    <img src="/blog/your-image-2.png" alt="Description" style="width: 80%; max-width: 700px; height: auto; border-radius: 12px; margin: 20px auto; display: block;" />

    <h2>Frequently Asked Questions</h2>
    <h3>Question 1?</h3>
    <p>Answer to question 1.</p>

    <p><em>Final conclusion paragraph.</em></p>
  `,

  relatedTools: [
    { name: 'Tool Name', path: '/tools/tool-slug', icon: 'icon-name' }
  ]
};
