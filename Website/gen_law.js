const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">UK &amp; EU Law, Explained Plainly</div>
    <div class="win-body">
      <h2>What the law actually says today</h2>
      <p>This is a general, plain-language overview, not legal advice, and law in this area is moving quickly. It is written UK and EU first, since that is where this project's own research is based, with a short note on other countries below.</p>

      <div class="law-item">
        <h3>Property (Digital Assets etc) Act 2025</h3>
        <p>Confirms that certain digital assets can be recognised as property in English law, an important foundation, but it does not by itself create automatic inheritance rights over social media, email, or AI-companion accounts.</p>
      </div>
      <div class="law-item">
        <h3>Wills Act 1837 still governs paper wills</h3>
        <p>A valid will in England and Wales generally still requires a physical signed document witnessed by two people present at the same time. A "Statement of Wishes" produced by an online tool, including this one, does not meet that requirement on its own.</p>
      </div>
      <div class="law-item">
        <h3>UK GDPR and the Data Protection Act 2018</h3>
        <p>Data protection rights are personal and generally end when a person dies. This is part of why families often cannot simply request a deceased relative's private messages or account content by default.</p>
      </div>
      <div class="law-item">
        <h3>No UK equivalent of the US RUFADAA</h3>
        <p>Several US states have a specific law (the Revised Uniform Fiduciary Access to Digital Assets Act) giving executors a clearer legal path to access digital accounts. The UK has no direct equivalent, so each platform's own terms of service currently control what happens to your account.</p>
      </div>
      <div class="law-item">
        <h3>EU AI Act, Article 50 <span class="new-tag">Enforceable 2 Aug 2026</span></h3>
        <p>Requires AI systems, including chatbots, to clearly disclose to users that they are interacting with a machine, rather than a person. This is directly relevant to griefbots and should make disclosure the norm across the EU market from August 2026 onward.</p>
      </div>
      <div class="law-item">
        <h3>UK Online Safety Act extended to AI chatbots <span class="new-tag">Confirmed Feb 2026</span></h3>
        <p>Ofcom's remit was confirmed in February 2026 to extend to certain AI chatbot services. However, Ofcom has clarified this mainly covers user-to-user, search, and pornographic services, leaving it genuinely untested whether a private, one-to-one griefbot conversation falls within scope. This is an area to watch, not a settled protection.</p>
      </div>

      <div class="content-note">
        <strong>Beyond the UK and EU.</strong> This page will grow to cover more jurisdictions over time. What research so far suggests is a consistent pattern rather than a solved problem: a 2024 Australian study found most users want control over their digital remains while distrusting the platforms holding them, closely mirroring the UK picture. A parallel look at India's postmortem privacy framework found the same unresolved tension between competing legal theories of whose interests survive death that also characterises UK and EU debate. If you are reading this outside the UK, treat everything above as background context rather than a description of your own local law.
      </div>

      <div class="research-panel">
        <div class="rp-head"><span class="rp-badge">Own research</span><h4>The same paradox, found again in this project's own survey</h4></div>
        <p>National research from Harbinja et al. (2025) describes a "posthumous privacy paradox": people want control over their digital remains but rarely act on it. This project's own 80-person survey found exactly that pattern, in miniature, and something more hopeful alongside it.</p>
        <div class="stat-strip">
          <div class="stat"><span class="stat-num">12.5%</span><span class="stat-label">currently have a legal will</span></div>
          <div class="stat"><span class="stat-num">61%</span><span class="stat-label">would likely add a digital legacy section to one</span></div>
          <div class="stat"><span class="stat-num">31%</span><span class="stat-label">said today's survey made them more likely to write or update a will</span></div>
        </div>
        <p class="rp-foot">In other words, most people have not acted yet, but a short, honest conversation about this topic appears to move some people from "haven't thought about it" toward "actually more likely to act," exactly what the tool below is for.</p>
      </div>

      <h3>So what can you actually do today?</h3>
      <ol>
        <li>Make a list of your important accounts and decide, in general terms, what you would want to happen to each (memorialise, transfer, or delete).</li>
        <li>Check whether each platform already offers a "legacy contact" or memorialisation setting, many major platforms do, quietly.</li>
        <li>Write a proper, legally valid will with a solicitor, and consider adding a separate letter of wishes for digital assets and AI-related preferences alongside it.</li>
        <li>Tell a trusted person your preferences directly. A conversation, backed up in writing, is often more useful in the short term than any single tool.</li>
      </ol>
      <div class="disclaimer">This page is a summary for general awareness only and is not a substitute for advice from a qualified solicitor, especially for anything involving cross-border assets, business accounts, or contested estates.</div>
      <div id="share-widget"></div>
      <p style="margin-top:16px;"><a class="btn primary" href="quiz.html">Continue to the Will &amp; Legacy Tool →</a></p>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/law.html", page(
  "law",
  "UK & EU Law",
  "A plain-language guide to UK and EU law on digital assets, wills, and AI chatbot disclosure requirements.",
  `New: our own survey found 61% would add a digital legacy section to a will if offered &nbsp;&nbsp;•&nbsp;&nbsp;
    EU AI Act Article 50 chatbot-disclosure duty becomes enforceable 2 August 2026 &nbsp;&nbsp;•&nbsp;&nbsp;
    UK Online Safety Act now extends Ofcom oversight to AI chatbot services (Feb 2026) &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("law.html written");
