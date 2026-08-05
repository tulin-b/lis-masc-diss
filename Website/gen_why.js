const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">Why This Exists</div>
    <div class="win-body">
      <h2>Why This Exists</h2>
      <p>Every year, more people die owning accounts, photos, messages, and voice or video recordings that companies now have the technical ability to turn into an interactive AI version of them, or leave running indefinitely after death. Commercial products already let people upload a loved one's texts and talk to an AI trained to imitate them. Laws written for paper wills and physical property were not designed with any of this in mind, and most people have never been asked what they would actually want.</p>
      <p>This project treats that gap as both a legal problem and a deeply human one. Grief is not universal in how it is processed. What comforts one person, or one tradition, may feel disrespectful or even harmful to another. Recent anthropological work argues this variability should be taken seriously rather than assumed away: how strange or comforting this technology feels depends heavily on a culture's existing relationship with death and the dead, so no single reaction should be treated as the universal one. This site was built to make that variety visible, rather than assuming a single "correct" answer, and to give people a low-pressure way to start planning before a crisis forces the decision.</p>

      <div class="research-panel">
        <div class="rp-head"><span class="rp-badge">Own research</span><h4>What we actually found when we asked</h4></div>
        <p>This project ran its own anonymous, 80-person survey to test that variability directly, rather than only relying on existing literature. The result was more surprising than expected: cultural and religious background clearly does shape how people already, traditionally, remember their dead (grave visits, home shrines, speaking to a photo or a memory), but it did <strong>not</strong> meaningfully predict comfort with an AI simulation specifically. Discomfort with that particular technology was broadly shared across religious, secular, younger, older, tech-confident and tech-wary respondents alike. What people overwhelmingly did agree on, again regardless of background, was a shared set of conditions: be told plainly it's AI, get the deceased person's own consent first, and treat it as disrespectful to charge an ongoing fee to keep the conversation going.</p>
        <p class="rp-foot">This was a small, convenience sample of 80 people, not a national survey, so treat it as a genuine and revealing signal rather than a statistic about the whole population. <a href="stories.html">Read the fuller write-up →</a></p>
      </div>

      <div class="disclaimer">This tool cannot tell you what is right for your family or your faith. It can only lay out what is currently known, so your own decisions are better informed.</div>
      <p style="margin-top:16px;"><a class="btn primary" href="learn.html">Continue to Learn: World Traditions →</a></p>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/why.html", page(
  "why",
  "Why This Exists",
  "Why digital legacy planning and AI griefbot ethics matter now.",
  `New: this project's own 80-person survey found discomfort with AI simulation widely shared across backgrounds &nbsp;&nbsp;•&nbsp;&nbsp;
    EU AI Act Article 50 chatbot-disclosure duty becomes enforceable 2 August 2026 &nbsp;&nbsp;•&nbsp;&nbsp;
    UK Online Safety Act now extends Ofcom oversight to AI chatbot services (Feb 2026) &nbsp;&nbsp;•&nbsp;&nbsp;
    This site is an educational awareness tool. Nothing here is legal advice. &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("why.html written");
