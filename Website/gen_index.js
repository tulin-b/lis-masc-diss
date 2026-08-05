const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">

  <div class="win">
    <div class="win-titlebar">Welcome to your Digital Legacy Hub</div>
    <div class="win-body">
      <h2>Plan for what happens to your accounts, data, and AI likeness</h2>
      <p>This is a free educational tool about what happens to your online accounts, your data, and increasingly, AI-generated versions of you or people you love, after death. It explores a genuinely new question: should an AI be allowed to keep "talking" as someone who has died, and what do different cultures, religions, and legal systems already say about that?</p>
      <p><strong>Nothing on this site is legal advice.</strong> It is designed to help you think, discuss with people you trust, and take real next steps such as writing a proper will with a qualified solicitor.</p>
      <div class="disclaimer">
        <strong>Please note:</strong> this tool does not contain death-related imagery and is designed to be approachable for people of all ages and backgrounds, including those currently grieving. If you are struggling emotionally right now, please reach out to a trusted person, your GP, or a bereavement support service such as Cruse Bereavement Support (UK) rather than relying on this site alone.
      </div>
      <div id="share-widget"></div>
    </div>
  </div>

  <div class="research-panel">
    <div class="rp-head"><span class="rp-badge">New</span><h4>What this project's own 80-person survey found</h4></div>
    <p>Between all three research strands, an anonymous survey of 80 people is now complete. The headline finding is not a culture war, it is something closer to quiet consensus: personal comfort with this technology is low almost everywhere, regardless of religion, culture, technology confidence, or age, while near everyone agrees on the same guardrails: be told it's AI, get the deceased person's own consent first, and don't charge an ongoing fee to keep talking to them.</p>
    <div class="stat-strip">
      <div class="stat"><span class="stat-num">80</span><span class="stat-label">people surveyed</span></div>
      <div class="stat"><span class="stat-num">81%</span><span class="stat-label">want the deceased's own consent required</span></div>
      <div class="stat"><span class="stat-num">45%</span><span class="stat-label">gave the lowest possible comfort score</span></div>
      <div class="stat"><span class="stat-num">61%</span><span class="stat-label">would add a digital legacy section to a will</span></div>
    </div>
    <p class="rp-foot">This was a small, convenience (non-representative) sample, so read these as a real, revealing signal rather than a national statistic. <a href="stories.html">Read the fuller findings →</a></p>
  </div>

  <div class="bento-grid">
    <div class="bento-cell tall">
      <span class="cell-meta">Start here</span>
      <h3>Build your Statement of Wishes</h3>
      <p>A short, honest six-step wizard covering your accounts, your AI simulation preferences, and the culture or faith that matters to you. Email it to yourself, copy it, print it, or save it as a text file.</p>
      <a class="btn primary" href="quiz.html">Start the will &amp; legacy tool</a>
    </div>
    <div class="bento-cell wide accent">
      <span class="cell-meta" style="color:#f3ead9;">Featured perspective</span>
      <h3>Ubuntu &amp; African perspectives</h3>
      <p>From an Ubuntu ethical standpoint, a griefbot can be a gentle, permissible aid to grief, but only if it strengthens the web of relationships around you rather than replacing them. Wright (2024) argues permissibility rests on relational care, not on the technology alone.</p>
      <a class="btn" style="background:#fff;color:var(--sage-deep);" href="learn.html">Explore world traditions</a>
    </div>
    <div class="bento-cell">
      <span class="cell-meta">5 platforms audited</span>
      <h3>Platform ethics</h3>
      <p>Five real AI griefbot and legacy platforms, compared against a five-part ethics framework.</p>
      <a class="btn ghost" href="platforms.html">Compare platforms →</a>
    </div>
    <div class="bento-cell">
      <span class="cell-meta">Plain English</span>
      <h3>UK &amp; EU law</h3>
      <p>What actually happens to your accounts today, and what's changing in 2026.</p>
      <a class="btn ghost" href="law.html">Read the law →</a>
    </div>
    <div class="bento-cell wide">
      <span class="cell-meta">Real voices</span>
      <h3>Real stories</h3>
      <p>Talks and interviews from people who have actually tried this technology, now joined by this project's own completed survey and community-discussion findings, including anonymous quotes.</p>
      <a class="btn ghost" href="stories.html">Watch and read →</a>
    </div>
  </div>

  <div class="desktop-widgets">
    <section class="profile-card" aria-label="Site stats">
      <div class="pc-head">This site, at a glance</div>
      <div class="pc-body">
        <div class="pc-avatar" aria-hidden="true"></div>
        <p style="margin-top:0;"><strong>Mood:</strong> reflective, unhurried<br>
        <strong>Built for:</strong> anyone starting to think about this<br>
        <strong>Since:</strong> 2026</p>
        <div style="clear:both;"></div>
        <ul class="pc-stat-list">
          <li><span>Your visits here</span><strong id="visit-count">1</strong></li>
          <li><span>Pages on this site</span><strong>10</strong></li>
          <li><span>Legal advice given</span><strong>0 (never)</strong></li>
        </ul>
      </div>
    </section>

    <section class="top8" aria-label="Quick facts">
      <div class="pc-head">Nine things worth knowing</div>
      <ol>
        <li>Most social platforms and email providers do <em>not</em> automatically hand your account to your family when you die. <a href="law.html">See the law</a></li>
        <li>An AI "griefbot" trained on a deceased person's messages is being offered commercially by several companies right now. <a href="platforms.html">Compare platforms</a></li>
        <li>Different faiths and philosophies, including Confucian, Daoist, and Ubuntu thought, reach very different conclusions about whether talking to an AI version of someone who died is comforting or harmful. <a href="learn.html">Explore traditions</a></li>
        <li>From 2 August 2026, EU law requires AI chatbots to clearly disclose that users are talking to a machine. <a href="law.html">Read more</a></li>
        <li>Continuing bonds theory suggests an ongoing relationship with someone who died can be healthy, but research is clear this depends on how it's done, not just whether. <a href="learn.html">Read more</a></li>
        <li>This project's own 80-person survey found cultural background clearly shapes traditional mourning practice, but did <em>not</em> predict comfort with AI simulation specifically, discomfort was widely shared. <a href="stories.html">See the findings</a></li>
        <li>A short online wizard can help you think through your own wishes and produce a written statement to discuss with family or a solicitor. <a href="quiz.html">Start the tool</a></li>
        <li>None of this replaces a real will. A written statement from this site is not legally binding on its own. <a href="quiz.html">Why not?</a></li>
        <li>This project began as academic dissertation research and has now completed its platform audit, survey, and community-discussion research. <a href="about.html">Learn about the project</a></li>
      </ol>
    </section>
  </div>

</main>
`;

fs.writeFileSync(__dirname + "/index.html", page(
  "index",
  "Home",
  "An educational tool for exploring digital legacy planning, AI griefbots, and what world cultures teach about grief and technology.",
  `New: this project's own 80-person survey is complete, see the headline findings below &nbsp;&nbsp;•&nbsp;&nbsp;
    EU AI Act Article 50 chatbot-disclosure duty becomes enforceable 2 August 2026 &nbsp;&nbsp;•&nbsp;&nbsp;
    UK Online Safety Act now extends Ofcom oversight to AI chatbot services (Feb 2026) &nbsp;&nbsp;•&nbsp;&nbsp;
    Meta patent filing (Dec 2025) describes automatically continuing a deceased user's account activity &nbsp;&nbsp;•&nbsp;&nbsp;
    This site is an educational awareness tool. Nothing here is legal advice. &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("index.html written");
