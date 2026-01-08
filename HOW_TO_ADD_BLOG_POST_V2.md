# 📝 How to Add a New Blog Post (Method 2 - Separate Files)

## 🎯 Quick Overview

Each blog post is now its own file! This makes managing articles much easier.

**Time Required:** 5-10 minutes

---

## 📁 New File Structure

```
src/data/blog/
├── index.js                        ← Auto-imports all posts
├── _template.js                    ← Copy this for new posts
├── ces-ai-robots-2026.js          ← Individual post files
├── grok-ai-deepfake-scandal.js
├── calorie-tracking-guide.js
├── salary-tax-guide.js
└── trip-planning-guide.js
```

---

## 🚀 How to Add a New Post (3 Easy Steps!)

### Step 1: Copy the Template

1. Go to: `src/data/blog/_template.js`
2. Copy the entire file
3. Create new file: `src/data/blog/your-article-slug.js`
4. Paste the template

**File naming:**
- Use lowercase
- Use dashes instead of spaces
- Match your article slug
- Example: `best-ai-tools-2026.js`

---

### Step 2: Edit Your Post

Open your new file and edit:

```javascript
export default {
  id: '6',  // Next available number
  slug: 'best-ai-tools-2026',  // Match filename
  title: 'Best AI Tools 2026',
  excerpt: 'Your 1-2 sentence summary.',
  category: 'Tech & Innovation',
  author: 'FikrNa Editorial Team',
  publishDate: '2026-01-20',
  readTime: '8 min read',
  featuredImage: '/blog/your-image.jpg',
  imageAlt: 'Description',
  metaDescription: 'SEO description 150-160 characters.',
  keywords: 'keyword1, keyword2, keyword3',

  content: `
    <p><strong>Last Updated: January 20, 2026</strong></p>
    
    <p>Your article content here...</p>
    
    <h2>Section Heading</h2>
    <p>More content...</p>
  `,

  relatedTools: [
    { name: 'Tool Name', path: '/tools/tool-slug', icon: 'icon-name' }
  ]
};
```

---

### Step 3: Add to Index

1. Open: `src/data/blog/index.js`

2. Add import at top:
```javascript
import yourNewPost from './your-article-slug.js';
```

3. Add to blogPosts array (at the TOP for newest first):
```javascript
export const blogPosts = [
  yourNewPost,        // ← Your new post here
  cesAiRobots2026,    // ← Existing posts below
  grokAiDeepfake,
  // ... rest
];
```

**That's it!** Your post is now live when you deploy!

---

## 📐 Content Formatting (Same as Before)

### Headings:
```html
<h2>Main Heading</h2>
<h3>Subheading</h3>
```

### Paragraphs:
```html
<p>Your text here.</p>
```

### Bold & Italic:
```html
<strong>Bold</strong>
<em>Italic</em>
```

### Lists:
```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Links:
```html
<!-- External -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>

<!-- Internal to tools -->
<a href="/tools/bmi-calculator">BMI Calculator</a>

<!-- Internal to blog posts -->
<a href="/blog/other-article-slug">Other Article</a>
```

### Images:
```html
<img src="/blog/image.jpg" alt="Description" style="width: 80%; max-width: 700px; height: auto; border-radius: 12px; margin: 20px auto; display: block;" />
```

---

## 🎨 Icon Names (For Related Tools)

Common icons you can use:

| Icon Name | Use For |
|-----------|---------|
| `activity` | BMI, health metrics |
| `apple` | Food, nutrition, calories |
| `calendar` | Dates, planning, scheduling |
| `check-circle` | Habits, tasks, completion |
| `clock` | Time, age, duration |
| `dollar-sign` | Money, finance, salary |
| `heart` | Health, wellness, care |
| `lock` | Security, passwords |
| `map` | Travel, location, trip |
| `moon` | Sleep, night, rest |
| `shield` | Security, protection |
| `sun` | Mood, energy, daytime |
| `trending-up` | Growth, finance, loans |
| `book-open` | Reading, content, text |

---

## 🚀 Deploy to Live Site

### Terminal Method:

```powershell
# 1. Build (check for errors)
npm run build

# 2. Add changes
git add .

# 3. Commit
git commit -m "Add new blog post: Your Article Title"

# 4. Push
git push origin main
```

### GitHub Desktop Method:

1. Open GitHub Desktop
2. See your changed files (your new .js file + index.js)
3. Write commit message
4. Click "Commit to main"
5. Click "Push origin"

---

## ✅ Benefits of This Method

### Before (Single File):
```
❌ blogPosts.js - 775 lines
❌ Hard to find specific post
❌ Merge conflicts with team
❌ Slow to load in editor
```

### After (Separate Files):
```
✅ Each post is independent
✅ Easy to find and edit
✅ No merge conflicts
✅ Fast editor performance
✅ Professional structure
```

---

## 🐛 Common Mistakes

### ❌ Mistake 1: Wrong Export Format
```javascript
// ❌ Wrong
export const myPost = { ... }

// ✅ Correct
export default { ... }
```

### ❌ Mistake 2: Forgot to Update Index
```javascript
// Don't forget to:
// 1. Import your file
// 2. Add to blogPosts array
```

### ❌ Mistake 3: File Name Mismatch
```javascript
// File: best-ai-tools-2026.js
// Slug must match: 'best-ai-tools-2026'
```

---

## 📋 Quick Checklist

Before deploying:

- [ ] Created new file in `src/data/blog/`
- [ ] File name matches slug
- [ ] Used `export default` (not `export const`)
- [ ] Added import to `index.js`
- [ ] Added to `blogPosts` array in `index.js`
- [ ] ID is unique (next number)
- [ ] All HTML tags properly closed
- [ ] Featured image added to `public/blog/`
- [ ] No syntax errors (commas, quotes)
- [ ] Tested with `npm run dev`

---

## 🎯 Example: Full Workflow

**Goal:** Add article about "Best Productivity Apps 2026"

**Step 1:** Create file
```
src/data/blog/best-productivity-apps-2026.js
```

**Step 2:** Copy template from `_template.js` and edit

**Step 3:** Update `index.js`:
```javascript
import bestProductivityApps from './best-productivity-apps-2026.js';

export const blogPosts = [
  bestProductivityApps,  // ← Add here
  cesAiRobots2026,
  // ... rest
];
```

**Step 4:** Deploy!
```bash
git add .
git commit -m "Add Best Productivity Apps 2026 article"
git push origin main
```

**Done!** ✅

---

## 🎉 You're Ready!

This new method is:
- ✅ Easier to manage
- ✅ More organized
- ✅ Scales to 100+ posts
- ✅ Professional structure

**Happy blogging!** 🚀

---

## 🆘 Need Help?

If you get stuck:

1. Check `_template.js` for correct format
2. Look at existing post files as examples
3. Run `npm run build` to check for errors
4. Test locally with `npm run dev`

Remember: Each post is just a JavaScript object with `export default`!
