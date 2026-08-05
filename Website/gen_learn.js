const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">Learn: Grief, AI &amp; World Traditions</div>
    <div class="win-body">
      <h2>What different traditions teach about grief, memory, and AI</h2>
      <p>These summaries are necessarily brief and general. Individuals within any tradition disagree with one another, and this is not a substitute for speaking with a faith leader, elder, or community you trust. Recent anthropological research is a useful reminder before reading on: how strange, comforting, or troubling this technology feels is not universal, it depends heavily on a culture's existing relationship with death and the dead, so reactions documented in one setting should not be assumed to generalise everywhere else.</p>
      <div class="grid">

        <div class="card secular">
          <h3>Secular &amp; Continuing Bonds</h3>
          <p>Many secular ethicists focus on consent, autonomy, and psychological harm rather than religious doctrine. A growing body of psychological research, known as continuing bonds theory, argues that keeping an ongoing, evolving relationship with someone who died, rather than achieving a clean break, is itself a healthy and normal part of grieving.</p>
          <details><summary>Why this matters here</summary>Krueger and Osler (2022) argue a chatbot can support continuing bonds through small, low-stakes exchanges, "habits of intimacy," without needing to be mistaken for the person. But a 2023 systematic review (Hewson et al.) found continuing bonds bring comfort in some situations and distress in others depending on context, so the honest position is that the technology's effect depends on how it is used, not on the technology alone.</details>
        </div>

        <div class="card christian">
          <h3>Christian</h3>
          <p>Christian thought generally distinguishes remembrance and prayer for the dead from attempting to speak <em>as</em> the dead. Many pastoral voices caution that a simulation risks confusing comfort with a kind of counterfeit presence.</p>
          <details><summary>Why this matters here</summary>In 2026, Pope Leo XIV's encyclical <em>Magnifica Humanitas</em> addressed artificial intelligence and human dignity directly, arguing technology should serve rather than substitute for authentic human relationship. A recent Eastern Orthodox assessment (Popov and Popova, 2026) goes further, arguing a generative, conversational griefbot creates a "false presence" that sits uneasily against the hope of resurrection, even while quieter memorial uses under clear consent and time limits may be more defensible.</details>
        </div>

        <div class="card islamic">
          <h3>Islamic</h3>
          <p>Islamic teaching emphasises <em>qadr</em> (God's decree) and accepting death as part of a divine plan, alongside prescribed mourning practices (such as a set mourning period, or <em>iddah</em> for widows). Recent bioethics scholarship argues an AI that mimics a deceased person's voice or personality risks disrupting the spiritual acceptance mourning rituals are meant to cultivate.</p>
          <details><summary>Why this matters here</summary>This scholarship frames a griefbot's illusion of continuity as working against both <em>qadr</em> and <em>tawakkul</em> (trust in God's decree), weighing the benefit of comfort against this spiritual harm under established Islamic ethical reasoning, an area with still very little settled religious guidance.</details>
        </div>

        <div class="card jewish">
          <h3>Jewish</h3>
          <p>Jewish mourning practice (<em>shiva</em>, <em>kaddish</em>) is structured and communal, built around presence with the living rather than continued conversation with the dead. Folklore figures like the golem and dybbuk offer long-standing cultural caution about artificially animated likenesses.</p>
          <details><summary>Why this matters here</summary>Some contemporary commentary treats griefbots as a modern version of an old question, whether it is appropriate to create something that mimics a soul it does not possess, and has argued that a model trained on a partial archive of someone's messages risks flattening them into a caricature rather than preserving who they actually were.</details>
        </div>

        <div class="card hindu">
          <h3>Hindu</h3>
          <p>Hindu traditions generally view death as a transition within an ongoing cycle (<em>samsara</em>), with rites such as <em>shraddha</em> intended to support the soul's onward journey rather than its return.</p>
          <details><summary>Why this matters here</summary>Research into bereavement during pandemic-era restrictions (Ghosh and Athira, 2024) found that disrupted communal Shraddh rites pushed grief toward a more solitary, individual form, exactly the kind of one-to-one substitute an AI conversation risks extending rather than reversing.</details>
        </div>

        <div class="card buddhist">
          <h3>Buddhist</h3>
          <p>Buddhist teaching centres on impermanence (<em>anicca</em>) and the risks of attachment. Clinging to a persistent simulated presence can be read as working directly against a core teaching about letting go.</p>
          <details><summary>Why this matters here</summary>Some Buddhist ethicists have noted griefbots could still have a role if used consciously and temporarily as a tool for reflection, rather than as a permanent substitute for the person who died, though this remains a much less developed area of scholarship than most other traditions on this page, and deserves more caution in how confidently it is cited.</details>
        </div>

        <div class="card confucian">
          <h3>Confucian</h3>
          <p>Ancestor veneration and filial piety mean an ongoing relationship with the dead is often expected, not avoided. Ancient Confucian mourning ritual even included a living relative acting as a temporary "impersonator of the dead" during ceremonies, a striking historical precedent for the idea of a stand-in presence.</p>
          <details><summary>Why this matters here</summary>Recent scholarship (Sparrow and Zhang, 2025) asks whether digital ancestor emulation automates the effortful labour of remembrance central to filial piety, substituting convenience for something that was meant to take real effort. A related argument (Elder, 2019; 2023) suggests filial piety properly includes gently correcting or resisting a loved one's wishes, not simply accommodating whatever a grieving person wants. China has also developed comparatively detailed law in this area under its Civil Code (Chen, 2025; Cheng, 2025).</details>
        </div>

        <div class="card daoist">
          <h3>Daoist</h3>
          <p>Daoist thought is a distinct tradition from Confucianism, not a synonym for it, and raises a different kind of caution here: a broader scepticism of ritual formalism itself, rather than a concern about ancestor duty specifically.</p>
          <details><summary>Why this matters here</summary>Sparrow and Zhang (2025) separate this Daoist concern clearly from the Confucian one: the question is not whether a griefbot properly honours ancestral obligation, but whether performing any fixed, scripted ritual, an AI conversation included, can ever really substitute for a more spontaneous, natural relationship with loss and change.</details>
        </div>

        <div class="card african">
          <h3>African &amp; Ubuntu</h3>
          <p>Ubuntu philosophy understands personhood as fundamentally relational, "I am because we are." Individual wellbeing, including grief, is understood through the web of relationships and communal obligations a person is part of, not in isolation.</p>
          <details><summary>Why this matters here</summary>Wright (2024) applies this directly to griefbots, arguing they can be morally permissible when used to gently support grief, but only if they strengthen, rather than replace, the relationships and communal obligations around the grieving person. This is a substantially more qualified position than either blanket acceptance or blanket rejection, and offers a direct counterpart to the named-religion perspectives above. Broader African AI ethics scholarship (Van Norren, 2022; Yilma, 2025) also cautions that AI systems built on individualist, Western assumptions about personhood may misrepresent people from communal cultural contexts by default, not by design.</details>
        </div>

      </div>
      <div class="content-note">A note on categories: Confucian and Daoist thought are shown as two distinct philosophies rather than one "East Asian" category, since the literature treats their concerns differently. Ubuntu is kept separate from both "secular" and the named religions above, since the scholarship treats it as its own communal philosophical framework rather than either a religion or a Western-style secular position.</div>

      <div class="content-note" style="border-left-color:var(--clay-deep);">
        <strong>What these nine traditions have in common.</strong> Read side by side, they do not share a doctrine. They share a <em>structure</em>. Islamic <em>barzakh</em>, the Hindu <em>atman</em>, Buddhist <em>anattā</em>, the Jewish <em>neshama</em>, and the Christian hope of bodily resurrection each locate whatever matters most about a person somewhere a digital copy cannot reach. And each treats the boundary between the living and the dead as set by something other than human preference. Five incompatible starting points, arriving at a strikingly similar caution about simulating the dead. That convergence is the single most interesting thing this project found in the literature.
      </div>

      <div class="research-panel">
        <div class="rp-head"><span class="rp-badge">Own research</span><h4>Does this variety actually show up in attitudes toward AI?</h4></div>
        <p>This project tested that question directly with its own 80-person survey. The traditional, non-AI side of this variety is real and measurable: people grouped by cultural background differed significantly in how often they visit graves, keep a home shrine, or speak to a deceased relative as though present, broadly consistent with the summaries above. But that same cultural variety did not carry over into comfort with an AI simulation specifically, respondents across every background clustered at a similarly low comfort level. Neither did religiosity: how much religion shapes someone's everyday decisions predicted almost nothing about how they felt about this technology.</p>
        <p class="rp-foot">Put together with the convergence noted above, this suggests something worth saying plainly. The discomfort may work less like a set of separate religious rules and more like a shared floor that people arrive at from very different directions, then explain afterwards in the vocabulary of their own tradition. This is a tentative reading from one small UK sample, not an established finding, and testing it properly would need a much larger and more international study.</p>
      </div>
      <div class="disclaimer">Have a tradition, denomination, or personal practice you would like reflected here that is missing or described incorrectly? Please let us know via the <a href="contact.html">Contact Us</a> page.</div>
      <div id="share-widget"></div>
      <p style="margin-top:16px;"><a class="btn primary" href="stories.html">Continue to Real Stories →</a></p>
    </div>
  </div>
</main>
`;

fs.writeFileSync(__dirname + "/learn.html", page(
  "learn",
  "Learn",
  "What Islamic, Hindu, Buddhist, Confucian, Daoist, Christian, Jewish, Ubuntu, and secular perspectives teach about grief, memory, and AI.",
  `Pope Leo XIV's 2026 encyclical Magnifica Humanitas addressed AI and human dignity directly &nbsp;&nbsp;•&nbsp;&nbsp;
    This site is an educational awareness tool. Nothing here is legal advice. &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body
));
console.log("learn.html written");
