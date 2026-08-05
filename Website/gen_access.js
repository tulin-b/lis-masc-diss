const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">Accessibility Statement</div>
    <div class="win-body">
      <h2>Accessibility</h2>
      <p>This site aims to be usable by people of all ages, technical backgrounds, and abilities. Available features include: adjustable text size (A / A+ / A++), a high-contrast mode, a reduce-motion toggle that also respects your device's own reduced-motion setting automatically, a dyslexia-friendly font toggle (Atkinson Hyperlegible), keyboard-operable navigation and forms, visible focus outlines, and a skip-to-content link on every page.</p>
      <p>Most of this site uses ordinary links and forms rather than pop-ups, so moving between pages and completing the Will &amp; Legacy tool works the same way as any standard website, with the browser's own Back button always available. One exception is used deliberately: a single, dismissible support notice appears once per browser session, reminding you that bereavement support is available if this topic is difficult right now. It is built as a proper accessible dialog rather than a browser alert, can be closed immediately with a click, a tap, or the Escape key, keeps keyboard focus trapped sensibly inside it while open, and never reappears again that session once dismissed.</p>
      <p>A language selector is included as a working prototype. Selecting a language other than English currently shows a short, honest, non-blocking notice next to the selector rather than translated content. Full translation is planned but not yet built.</p>
      <div class="disclaimer">Found something that does not work well with your screen reader, switch device, or browser? Please describe it on the <a href="contact.html">Contact Us</a> page, real reports directly improve this tool.</div>
      <div id="share-widget"></div>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/access.html", page(
  "access",
  "Accessibility",
  "The accessibility features built into the Digital Legacy Hub, including text size, contrast, motion, and font options.",
  `Built to be usable with a keyboard alone, a screen reader, or a high-contrast display &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("access.html written");
