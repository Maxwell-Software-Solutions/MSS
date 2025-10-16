# Accessibility Best Practices (WCAG Compliance)

This document outlines accessibility best practices following WCAG (Web Content Accessibility Guidelines) for the Maxwell Software Solutions website.

## POUR Principles

WCAG is organized around four principles, known as POUR:

### 1. Perceivable
Information and user interface components must be presentable to users in ways they can perceive.

**Implementation:**
- Provide text alternatives for non-text content (alt text for images)
- Provide captions and transcripts for audio/video content
- Ensure content can be presented in different ways without losing meaning
- Make it easier for users to see and hear content (color contrast, text sizing)

### 2. Operable
User interface components and navigation must be operable.

**Implementation:**
- Make all functionality available from keyboard
- Give users enough time to read and use content
- Do not use content that causes seizures (flashing animations)
- Help users navigate and find content
- Provide ways to help users avoid and correct mistakes

### 3. Understandable
Information and the operation of user interface must be understandable.

**Implementation:**
- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes
- Provide clear instructions and error messages

### 4. Robust
Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

**Implementation:**
- Maximize compatibility with current and future user tools
- Use valid, semantic HTML
- Provide proper ARIA attributes when needed

## Implementation Checklist

### Text Alternatives
- [ ] All images have descriptive alt text
- [ ] Decorative images use empty alt (`alt=""`) or CSS backgrounds
- [ ] Icons have accessible labels (ARIA or text)
- [ ] Charts and graphs have text descriptions
- [ ] Videos have captions
- [ ] Audio content has transcripts

### Keyboard Accessibility
- [ ] All interactive elements are keyboard accessible (Tab, Enter, Space)
- [ ] Focus order follows logical reading order
- [ ] Focus indicators are visible (outline, border, background change)
- [ ] No keyboard traps (users can navigate in and out)
- [ ] Skip links provided to bypass repetitive content
- [ ] Keyboard shortcuts documented and don't conflict

### Color and Contrast
- [ ] Color contrast meets WCAG AA standards (4.5:1 for normal text)
- [ ] Color is not the only means of conveying information
- [ ] Links are distinguishable from surrounding text
- [ ] Form inputs have sufficient contrast with background
- [ ] Focus indicators have sufficient contrast

### Semantic HTML
```html
<!-- Good: Semantic HTML -->
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Article Title</h1>
    <p>Content...</p>
  </article>
</main>
<footer>
  <p>Copyright info</p>
</footer>

<!-- Bad: Non-semantic HTML -->
<div class="header">
  <div class="nav">
    <div class="link"><a href="/">Home</a></div>
  </div>
</div>
<div class="main">
  <div class="article">
    <div class="title">Article Title</div>
    <div class="content">Content...</div>
  </div>
</div>
```

### ARIA (Accessible Rich Internet Applications)

#### When to Use ARIA
- Use semantic HTML first (native HTML is always better)
- Use ARIA only when HTML cannot achieve the desired accessibility
- Test with screen readers to ensure ARIA is working correctly

#### Common ARIA Attributes
```html
<!-- ARIA Labels -->
<button aria-label="Close dialog">×</button>
<nav aria-label="Main navigation">...</nav>

<!-- ARIA Roles -->
<div role="alert">Important message</div>
<div role="dialog" aria-modal="true">...</div>

<!-- ARIA States -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<input type="checkbox" aria-checked="true" />

<!-- ARIA Properties -->
<input aria-describedby="password-hint" />
<div id="password-hint">Password must be at least 8 characters</div>
```

### Forms

#### Accessible Form Elements
```html
<!-- Label association -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required />

<!-- Error messages -->
<label for="password">Password</label>
<input 
  type="password" 
  id="password" 
  name="password" 
  aria-describedby="password-error"
  aria-invalid="true"
/>
<div id="password-error" role="alert">
  Password must be at least 8 characters
</div>

<!-- Fieldset for grouped inputs -->
<fieldset>
  <legend>Payment Method</legend>
  <label><input type="radio" name="payment" value="card" /> Credit Card</label>
  <label><input type="radio" name="payment" value="paypal" /> PayPal</label>
</fieldset>
```

### Headings Hierarchy
```html
<!-- Good: Logical hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h3>Another Subsection</h3>
<h2>Another Section</h2>

<!-- Bad: Skipping levels -->
<h1>Page Title</h1>
<h3>Section Title</h3> <!-- Skipped h2 -->
<h2>Subsection</h2> <!-- Out of order -->
```

### Links and Buttons

#### Link Text
```html
<!-- Good: Descriptive link text -->
<a href="/services">View our services</a>

<!-- Bad: Generic link text -->
<a href="/services">Click here</a>
<a href="/services">Read more</a>
```

#### Button vs Link
- Use `<button>` for actions (submit form, open modal, trigger JavaScript)
- Use `<a>` for navigation (go to another page)

```html
<!-- Button for action -->
<button onclick="submitForm()">Submit</button>

<!-- Link for navigation -->
<a href="/contact">Contact Us</a>
```

### Images

#### Alt Text Guidelines
- **Informative images**: Describe the information or function
- **Decorative images**: Use empty alt (`alt=""`)
- **Functional images**: Describe the action, not the image
- **Complex images**: Provide detailed description nearby

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024" />

<!-- Decorative image -->
<img src="divider.png" alt="" />

<!-- Functional image (button) -->
<button>
  <img src="print.svg" alt="Print this page" />
</button>

<!-- Complex image -->
<figure>
  <img src="architecture.png" alt="System architecture diagram" />
  <figcaption>
    Detailed description of the system architecture...
  </figcaption>
</figure>
```

### Tables

#### Accessible Tables
```html
<table>
  <caption>Quarterly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Quarter</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Q1</th>
      <td>$100,000</td>
      <td>10%</td>
    </tr>
  </tbody>
</table>
```

### Skip Links

Provide skip links to bypass repetitive navigation:

```html
<a href="#main-content" class="skip-link">
  Skip to main content
</a>

<nav>...</nav>

<main id="main-content">
  <!-- Main content starts here -->
</main>

<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</style>
```

### Motion and Animation

Respect user preferences for reduced motion:

```css
/* Respect prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms;
    animation-iteration-count: 1;
    transition-duration: 0.01ms;
    scroll-behavior: auto;
  }
}
```

Avoid:
- Flashing content (more than 3 times per second)
- Auto-playing videos/audio
- Parallax effects that cause motion sickness

## Testing Tools

### Automated Testing
- [axe DevTools](https://www.deque.com/axe/devtools/) - Browser extension
- [WAVE](https://wave.webaim.org/) - Web accessibility evaluation tool
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Chrome DevTools
- [Pa11y](https://pa11y.org/) - Automated testing tool

### Screen Readers
- **macOS**: VoiceOver (built-in)
- **Windows**: NVDA (free) or JAWS (paid)
- **iOS**: VoiceOver (built-in)
- **Android**: TalkBack (built-in)

### Manual Testing Checklist
1. Can you navigate the entire site with keyboard only?
2. Are focus indicators visible?
3. Do images have appropriate alt text?
4. Is the heading structure logical?
5. Do links make sense out of context?
6. Is color contrast sufficient?
7. Can you understand form errors?
8. Does the site work with a screen reader?

## Common Accessibility Mistakes

### 1. Missing Alt Text
```html
<!-- Bad -->
<img src="logo.png" />

<!-- Good -->
<img src="logo.png" alt="Maxwell Software Solutions" />
```

### 2. Poor Color Contrast
```css
/* Bad - Low contrast */
.text {
  color: #999; /* Gray text */
  background: #fff; /* White background */
  /* Contrast ratio: 2.8:1 (fails WCAG AA) */
}

/* Good - High contrast */
.text {
  color: #333; /* Dark gray text */
  background: #fff; /* White background */
  /* Contrast ratio: 12.6:1 (passes WCAG AAA) */
}
```

### 3. Clickable Divs
```html
<!-- Bad -->
<div onclick="doSomething()">Click me</div>

<!-- Good -->
<button onclick="doSomething()">Click me</button>
```

### 4. Empty Links
```html
<!-- Bad -->
<a href="/page"></a>

<!-- Good -->
<a href="/page">Go to page</a>
```

### 5. Missing Form Labels
```html
<!-- Bad -->
<input type="text" placeholder="Email" />

<!-- Good -->
<label for="email">Email</label>
<input type="text" id="email" name="email" />
```

## Resources

### Guidelines and Standards
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Section 508 Standards](https://www.section508.gov/)

### Learning Resources
- [WebAIM](https://webaim.org/) - Web accessibility in mind
- [A11y Project](https://www.a11yproject.com/) - Community-driven accessibility guide
- [Inclusive Components](https://inclusive-components.design/) - Component patterns
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Testing Tools
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Tenon.io](https://tenon.io/) - API-based testing

### Books
- "Inclusive Design Patterns" by Heydon Pickering
- "Accessibility for Everyone" by Laura Kalbag
- "A Web for Everyone" by Sarah Horton and Whitney Quesenbery

## Legal Requirements

### United States
- **ADA**: Americans with Disabilities Act
- **Section 508**: Federal accessibility standards

### Europe
- **EN 301 549**: European accessibility standard
- **European Accessibility Act**: Mandatory from June 2025

### International
- **WCAG 2.1**: International standard (ISO/IEC 40500:2012)

## Checklist for Developers

Before deploying:
- [ ] All images have alt text
- [ ] Color contrast passes WCAG AA
- [ ] Site is fully keyboard navigable
- [ ] Focus indicators are visible
- [ ] Semantic HTML is used
- [ ] ARIA is used appropriately
- [ ] Forms have proper labels
- [ ] Error messages are clear
- [ ] Heading hierarchy is logical
- [ ] Skip links are provided
- [ ] Motion respects user preferences
- [ ] Tested with screen reader
- [ ] Tested with keyboard only
- [ ] Automated tests pass (axe, Lighthouse)
