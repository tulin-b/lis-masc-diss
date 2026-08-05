const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">About This Project</div>
    <div class="win-body">
      <h2>About This Project</h2>

      <div class="content-note" style="border-left-color:var(--clay-deep);">
        <strong>In short:</strong> this site is an accompanying artefact for a Master's capstone project submitted at the London Interdisciplinary School. It is an educational awareness tool first and foremost, not a substitute for legal advice.
      </div>

      <p>Digital Legacy Hub is a standalone educational tool, free to use, and not a law firm, therapy service, or product endorsement. It began as part of a Master's dissertation at the London Interdisciplinary School examining cross-cultural ethical frameworks for commercially available AI-powered digital resurrection tools and digital legacy planning, combining a cross-cultural literature review, an original survey, a discourse analysis of five griefbot-adjacent platforms' terms of service and marketing, and a netnographic study of public online discussion about AI, grief, and human-AI relationships more broadly.</p>
      <p>All three strands of that research are now complete: a discourse analysis and ethics audit of five commercial platforms, a netnography of public online discussion across several communities, and an anonymous 80-person survey testing how comfort with this technology relates to cultural background, religiosity, technology confidence, and age. Findings from all three, including the platform comparisons, legal developments, cultural and religious perspectives, and survey statistics and quotes presented throughout this site, are drawn directly from that completed project. This site exists to make that research genuinely useful to the public, not only to an academic audience, and is offered in that spirit, as a starting point for reflection and family conversation, never as a replacement for qualified legal, religious, or emotional support.</p>
      <p style="font-size:13px;color:var(--ink-soft);">A note on methods: the survey was a small, convenience (non-probability) sample recruited over 72 hours through the researcher's own networks, treated throughout as exploratory rather than nationally representative. Full statistics, cross-tabulations, and the complete thematic coding are available on request via the <a href="contact.html">Contact page</a>.</p>
      <p>Questions or feedback about the project are always welcome via the <a href="contact.html">Contact Us</a> page.</p>
      <div id="share-widget"></div>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/about.html", page(
  "about",
  "About",
  "About the Master's capstone research project behind the Digital Legacy Hub.",
  `This project began as Master's dissertation research at the London Interdisciplinary School &nbsp;&nbsp;•&nbsp;&nbsp;
    All three research strands, platform audit, survey, and netnography, are now complete &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("about.html written");
