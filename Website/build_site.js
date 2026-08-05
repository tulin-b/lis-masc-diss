const fs = require("fs");

const pages = [
  { id: "index", href: "index.html", label: "Home" },
  { id: "why", href: "why.html", label: "Why This Exists" },
  { id: "learn", href: "learn.html", label: "Learn" },
  { id: "stories", href: "stories.html", label: "Real Stories" },
  { id: "platforms", href: "platforms.html", label: "Platform Ethics" },
  { id: "law", href: "law.html", label: "UK & EU Law" },
  { id: "quiz", href: "quiz.html", label: "Will & Legacy Tool" },
  { id: "contact", href: "contact.html", label: "Contact Us" },
  { id: "access", href: "access.html", label: "Accessibility" },
  { id: "about", href: "about.html", label: "About" },
];

function a11yBar(){
  return `
<div class="a11y-bar" role="region" aria-label="Accessibility settings">
  <div class="a11y-group">
    <strong>Text size:</strong>
    <button id="btn-fs-normal" aria-pressed="true">A</button>
    <button id="btn-fs-large" aria-pressed="false">A+</button>
    <button id="btn-fs-xlarge" aria-pressed="false">A++</button>
  </div>
  <div class="a11y-group">
    <button id="btn-contrast" aria-pressed="false">High contrast</button>
    <button id="btn-motion" aria-pressed="false">Reduce motion</button>
    <button id="btn-legible-font" aria-pressed="false">Dyslexia-friendly font</button>
  </div>
  <div class="a11y-group" style="border-right:none;">
    <label for="lang-select" style="font-weight:bold;">Language:</label>
    <select id="lang-select">
      <option value="en" selected>English</option>
      <option value="es">Español (prototype)</option>
      <option value="fr">Français (prototype)</option>
      <option value="ar">العربية (prototype)</option>
      <option value="ur">اردو (prototype)</option>
      <option value="zh">中文 (prototype)</option>
      <option value="hi">हिन्दी (prototype)</option>
    </select>
    <span id="lang-notice" role="status"></span>
  </div>
</div>`;
}

function tabnav(activeId){
  const items = pages.map(p => {
    const current = p.id === activeId ? ' aria-current="page"' : '';
    return `    <li><a href="${p.href}"${current}>${p.label}</a></li>`;
  }).join("\n");
  return `
<div class="tabnav-wrap">
  <ul class="tabnav">
${items}
  </ul>
</div>`;
}

function ticker(text){
  return `
<div class="ticker-wrap" role="marquee" aria-label="Latest developments ticker">
  <div class="ticker-track">
    ${text}
  </div>
</div>`;
}

function head(title, description){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Digital Legacy Hub — ${title}</title>
${description ? `<meta name="description" content="${description}">` : ""}
<link rel="stylesheet" href="styles.css">
</head>
<body>
<a href="#main-content" class="skip-link">Skip to main content</a>`;
}

function footer(extraScripts){
  return `
<footer class="about-footer">
  <div class="footer-inner">
    <h2>Digital Legacy Hub</h2>
    <p>A free, standalone educational tool about digital accounts, digital property, and AI simulation of people after death, and what world traditions and the law currently say about it. Not a law firm, therapy service, or product endorsement.</p>
    <div class="capstone-note">
      <strong>About this tool.</strong> This site is an accompanying artefact for a Master's capstone project submitted at the London Interdisciplinary School, researching cross-cultural ethics of AI-powered digital resurrection tools and digital legacy planning. It is an educational awareness tool first and foremost, built to help you think and talk with people you trust. <strong>It is not a substitute for legal advice.</strong> For a legally valid will, speak with a qualified solicitor. See the <a href="about.html">About page</a> for the full project description.
    </div>
  </div>
</footer>
<div class="status-bar">
  <span>Digital Legacy Hub</span>
  <span id="status-clock">--:--</span>
</div>

<script src="script.js"></script>${extraScripts ? "\n" + extraScripts : ""}
</body>
</html>
`;
}

function page(activeId, title, description, tickerText, bodyHtml, extraScripts){
  return head(title, description) + "\n" + a11yBar() + "\n" + tabnav(activeId) + "\n" + ticker(tickerText) + "\n" + bodyHtml + "\n" + footer(extraScripts);
}

module.exports = { pages, a11yBar, tabnav, ticker, head, footer, page, fs };
