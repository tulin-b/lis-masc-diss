const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">Platform Ethics: How Do The Major Tools Compare?</div>
    <div class="win-body">
      <h2>Comparing AI griefbot and legacy platforms</h2>
      <p>Each platform below is assessed against five plain-language dimensions used throughout this project:</p>
      <ul class="dim-list">
        <li class="dim-chip">Transparency</li>
        <li class="dim-chip">Consent</li>
        <li class="dim-chip">Dignity</li>
        <li class="dim-chip">Bias Mitigation</li>
        <li class="dim-chip">Data Protection</li>
      </ul>

      <div class="platform-block">
        <h3>Character.AI</h3>
        <ul>
          <li>Following a January 2026 settlement, a US court found that a conversational AI service can owe a legal duty of care to a minor user, a significant precedent for the whole industry.</li>
          <li>General-purpose companion platform, not designed specifically for bereavement, so there is limited built-in crisis-support scaffolding for grief-specific use.</li>
          <li>Age verification and safety features have been strengthened since 2025 but remain an active area of regulatory scrutiny.</li>
        </ul>
      </div>
      <div class="platform-block">
        <h3>Replika</h3>
        <ul>
          <li>Fined €5 million by Italy's data protection regulator (Garante) in 2025 for inadequate age-gating of adult content.</li>
          <li>Following regulatory pressure, the company removed or restricted intimacy features, changing companions' personalities for existing users without full advance consent, an example of how a platform's "relationship" with a user can be altered unilaterally.</li>
          <li>Not purpose-built for bereavement, but frequently discussed in online communities in exactly that context.</li>
        </ul>
      </div>
      <div class="platform-block">
        <h3>HereAfter AI</h3>
        <ul>
          <li>Purpose-built for legacy storytelling, interviews a living person in advance and builds a voice-and-story interactive "avatar" for descendants to speak with after death.</li>
          <li>Consent is structurally stronger here since the deceased person typically recorded the material themselves while alive, rather than a third party building a likeness afterwards.</li>
          <li>Long-term data stewardship if the company is acquired, restructured, or shut down remains an open question, as with any small company holding intimate personal recordings.</li>
        </ul>
      </div>
      <div class="platform-block">
        <h3>Project December <span class="new-tag">Still live, verified July 2026</span></h3>
        <ul>
          <li>One of the earliest and most well-known "talk to the dead" text simulators, built on general-purpose language models rather than a bespoke safety-first design.</li>
          <li>Minimal built-in crisis-support or grief-specific safeguarding compared to newer, more cautious entrants.</li>
        </ul>
      </div>
      <div class="platform-block">
        <h3>Seance AI <span class="new-tag">Still live, verified July 2026</span></h3>
        <ul>
          <li>Markets itself explicitly around communicating with deceased loved ones, leaning into the emotional promise more directly than most competitors.</li>
          <li>Transparency about the AI-generated nature of responses varies and is worth checking directly before relying on the service.</li>
        </ul>
      </div>
      <div class="platform-block">
        <h3>StoryFile</h3>
        <ul>
          <li>Known for interactive video "conversations" with a pre-recorded, AI-driven likeness, used at memorial services since before 2025.</li>
          <li>Underwent an ownership restructuring in 2025, and its consumer-facing app has moved to a waitlist model, a real example of the platform-continuity risk this project raises: what happens to a loved one's digital likeness if the company behind it changes hands or shuts down.</li>
        </ul>
      </div>
      <div class="platform-block" style="border-color:var(--sage-deep);background:#eef3ea;">
        <h3>A more cautious design example: guardianaingels.ai</h3>
        <ul>
          <li>A smaller, bereavement-specific platform that has been highlighted as a positive design comparator, using structured intake, no avatar or synthetic voice until safety is validated, consistent AI self-identification throughout conversations, a visible crisis-resource banner, and a trusted-user monitoring option.</li>
          <li>This assessment is based on public materials and one interview rather than the same five-dimension audit applied to the platforms above, so it should be read as illustrative rather than fully verified.</li>
        </ul>
      </div>

      <div class="research-panel">
        <div class="rp-head"><span class="rp-badge">Own research</span><h4>What people actually worry about most</h4></div>
        <p>Asked which concerns would matter most to them (choosing up to three), this project's own 80-person survey found a clear ranking, and it lines up closely with the five-dimension framework used throughout this page:</p>
        <ol style="font-size:13.5px;line-height:1.7;padding-left:20px;margin:6px 0 4px;">
          <li><strong>Risk of becoming emotionally dependent on it</strong> — the single most-selected concern.</li>
          <li><strong>Whether the deceased person consented</strong> to being simulated.</li>
          <li><strong>Data privacy and who owns the data.</strong></li>
          <li>Accuracy or authenticity of the simulation.</li>
          <li>Cost or subscription model.</li>
        </ol>
        <p class="rp-foot">This maps closely onto Consent and Data Protection above, and suggests Bias Mitigation (the dimension every platform below scores weakest on) is simply less visible to an ordinary user than it is to an auditor, not less important.</p>
      </div>

      <div class="content-note"><strong>A word on trusting what these platforms show you.</strong> Research on automation bias, people's tendency to over-trust an AI-generated output simply because a machine produced it, is a general and well-documented finding, not specific to grief technology (Romeo and Conti, 2025; Zerilli, Bhatt and Weller, 2022; Qian and Wexler, 2024). It applies directly here: a platform can generate a fluent, plausible "memory" of someone that never actually happened. This is one more reason platform disclosure and your own healthy scepticism both matter, regardless of how convincing a simulation feels.</div>

      <div class="research-panel">
        <div class="rp-head"><span class="rp-badge">Own research</span><h4>What the picture on the screen is quietly telling you</h4></div>
        <p>This project also read these platforms' <em>visual</em> design, not just their written terms, and found something the small print does not tell you. The companions cluster into two very different registers. Replika and Character.AI use a stylised, cartoon-like, customisable avatar. That choice quietly lowers the claim being made, since nobody mistakes an illustration for a photograph, while warm colour and direct eye contact raise the sense of intimacy. StoryFile sits at the opposite end, using genuine recorded video of a real person, which raises the truth claim considerably and makes its consent process matter far more.</p>
        <div class="stat-strip">
          <div class="stat"><span class="stat-num">0 of 5</span><span class="stat-label">audited platforms make AI status as visually obvious as it soon must be in writing</span></div>
          <div class="stat"><span class="stat-num">Aug 2026</span><span class="stat-label">EU AI Act begins requiring chatbots to disclose they are AI</span></div>
        </div>
        <p class="rp-foot"><strong>What this means for you.</strong> A friendly cartoon avatar is a design decision, not a safety rating. It tells you nothing about who owns the data, whether the person consented, or what happens if the company closes. Judge a platform on its written terms and its track record, never on how approachable the picture looks.</p>
      </div>

      <div class="disclaimer"><strong>Also worth knowing:</strong> a patent filed by Meta in December 2025 describes technology for automatically continuing a deceased or inactive user's account activity. No major platform currently does this by default, but the existence of the patent signals where this technology could be heading without users being asked first.</div>
      <div id="share-widget"></div>
      <p style="margin-top:16px;"><a class="btn primary" href="law.html">Continue to UK &amp; EU Law →</a></p>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/platforms.html", page(
  "platforms",
  "Platform Ethics",
  "Comparing Character.AI, Replika, HereAfter AI, Project December, Seance AI, and StoryFile against a five-dimension ethics framework.",
  `New: our own survey found emotional dependency, consent, and data privacy are the top public concerns &nbsp;&nbsp;•&nbsp;&nbsp;
    Meta patent filing (Dec 2025) describes automatically continuing a deceased user's account activity &nbsp;&nbsp;•&nbsp;&nbsp;
    Character.AI / Google settled wrongful-death lawsuits (Jan 2026), a court found a chatbot can owe a duty of care &nbsp;&nbsp;•&nbsp;&nbsp;
    Italy's Garante fined Replika €5m in 2025 for inadequate age checks &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("platforms.html written");
