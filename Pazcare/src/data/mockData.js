export const mockAuditResults = {
  overall: {
    score: 72,
    label: "Good"
  },
  performance: {
    score: 65,
    label: "Needs Work"
  },
  crawlability: {
    score: 86,
    label: "Good"
  },
  mobile: {
    score: 91,
    label: "Excellent"
  },
  issues: {
    critical: [
      {
        title: "Render-blocking resources are delaying page load",
        description: "Several JavaScript and CSS files are blocking the first paint of your page, significantly increasing your load times.",
        affectedUrls: [
          "https://example.com/",
          "https://example.com/about"
        ],
        recommendation: "Consider inlining critical CSS and deferring non-critical JavaScript.",
        codeExample: `<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>

<script defer src="non-critical.js"></script>`
      },
      {
        title: "Images not optimized",
        description: "Multiple images on your site are not properly sized or compressed, resulting in excessive page weight.",
        affectedUrls: [
          "https://example.com/products",
          "https://example.com/gallery"
        ],
        recommendation: "Compress images and serve appropriately sized images based on device viewport.",
        codeExample: `<!-- Use modern image formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" width="800" height="600" loading="lazy">
</picture>`
      },
      {
        title: "Missing meta description tags",
        description: "Several key pages lack meta description tags, which are crucial for improving click-through rates from search results.",
        affectedUrls: [
          "https://example.com/products/category-1",
          "https://example.com/products/category-2",
          "https://example.com/blog/post-1"
        ],
        recommendation: "Add unique, descriptive meta descriptions to each page.",
        codeExample: `<meta name="description" content="Your compelling description here that's about 150-160 characters and includes keywords naturally while encouraging clicks.">`
      }
    ],
    warnings: [
      {
        title: "Excessive HTTP requests",
        description: "Your page makes 45 HTTP requests, which can slow down load times, especially on mobile devices.",
        recommendation: "Consolidate files, use CSS sprites, and limit third-party scripts.",
        codeExample: `// Combine multiple JavaScript files into one
// Before:
<script src="analytics.js"></script>
<script src="tracking.js"></script>
<script src="widgets.js"></script>

// After:
<script src="combined.js"></script>`
      },
      {
        title: "No implemented XML sitemap",
        description: "Your website is missing an XML sitemap, which helps search engines discover and index your content.",
        recommendation: "Create and submit an XML sitemap to Google Search Console.",
        codeExample: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2023-05-25</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add more URLs here -->
</urlset>`
      },
      {
        title: "Multiple redirect chains detected",
        description: "Several URLs have redirect chains that slow down page loading and waste crawl budget.",
        affectedUrls: [
          "https://example.com/old-page → https://example.com/interim → https://example.com/final-page",
          "https://example.com/products/old → https://example.com/products/new"
        ],
        recommendation: "Update redirects to point directly to the final destination URL."
      },
      {
        title: "Low text-to-HTML ratio",
        description: "Your pages have a low text-to-HTML ratio, which may indicate content quality issues to search engines.",
        recommendation: "Increase meaningful content and reduce unnecessary HTML, inline JavaScript, and CSS."
      }
    ],
    passed: [
      {
        title: "HTTPS implemented correctly",
        description: "Your website properly implements HTTPS with valid certificates and correct redirects from HTTP to HTTPS."
      },
      {
        title: "Mobile viewport configured properly",
        description: "All pages include the proper viewport meta tag for responsive design.",
        codeExample: `<meta name="viewport" content="width=device-width, initial-scale=1">`
      },
      {
        title: "robots.txt is properly configured",
        description: "Your robots.txt file exists and is correctly formatted."
      },
      {
        title: "No broken internal links found",
        description: "All internal links on your website point to valid pages."
      }
    ]
  },
  executiveSummary: {
    topIssues: [
      {
        title: "Render-blocking Resources",
        description: "Currently delaying first paint by 2.3 seconds. Defer non-critical JavaScript and CSS."
      },
      {
        title: "Unoptimized Images",
        description: "Images account for 75% of page weight. Implement proper compression and sizing."
      },
      {
        title: "Missing Meta Descriptions",
        description: "40% of important pages lack meta descriptions, impacting CTR from search results."
      },
      {
        title: "Excessive HTTP Requests",
        description: "Making 45 separate HTTP requests, significantly impacting page load speed."
      },
      {
        title: "Multiple Redirect Chains",
        description: "Several key pages have redirect chains that slow down crawling and user experience."
      }
    ],
    recommendedFixes: [
      {
        title: "Optimize CSS and JavaScript Loading",
        description: "Inline critical CSS and defer non-critical JavaScript files."
      },
      {
        title: "Implement WebP Images with Fallbacks",
        description: "Convert images to WebP format with proper fallbacks for older browsers."
      },
      {
        title: "Add Descriptive Meta Tags",
        description: "Create unique, keyword-rich meta descriptions for all key pages."
      },
      {
        title: "Reduce HTTP Requests",
        description: "Combine files, use CSS sprites, and implement asset bundling."
      },
      {
        title: "Update Redirect Configuration",
        description: "Implement direct redirects from original URLs to final destinations."
      }
    ]
  }
};