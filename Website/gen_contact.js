const { page, fs } = require("./build_site.js");

const body = `
<main id="main-content" class="page-shell">
  <div class="win">
    <div class="win-titlebar">Contact Us</div>
    <div class="win-body">
      <h2>Get in touch</h2>
      <p>This site is part of an ongoing Master's dissertation research project. If you have questions, feedback, corrections, a tradition or perspective you feel is missing from the Learn page, or a story you'd like considered for the Real Stories page, please reach out directly by email.</p>

      <div class="contact-box">
        <p style="margin:0;">Email the project directly:</p>
        <span class="big-email">tulin.bayramoglu@lis.ac.uk</span>
        <p><a class="btn primary" href="mailto:tulin.bayramoglu@lis.ac.uk?subject=Digital%20Legacy%20Hub%20Feedback">Open in your email app</a></p>
      </div>

      <h3 style="margin-top:26px;">Or use this quick form</h3>
      <p style="font-size:13px;">This form does not submit anywhere on its own, there is no server behind this site. Clicking "Prepare Email" simply opens your own email app with everything already filled in, ready for you to review and send.</p>
      <form id="contact-form">
        <div class="field-row">
          <label for="c-name">Your name (optional)</label>
          <input type="text" id="c-name" placeholder="Your name">
        </div>
        <div class="field-row">
          <label for="c-subject">Subject</label>
          <input type="text" id="c-subject" placeholder="What is this about?">
        </div>
        <div class="field-row">
          <label for="c-message">Message</label>
          <textarea id="c-message" placeholder="Write your message here..."></textarea>
        </div>
        <button type="button" class="btn primary" id="prepare-email-btn">Prepare Email</button>
      </form>

      <div class="disclaimer" style="margin-top:20px;">This project is not able to offer legal, medical, or crisis support by email. If you are grieving and need support right now, please contact a trusted person, your GP, or a bereavement organisation such as Cruse Bereavement Support (UK).</div>
      <div id="share-widget"></div>
    </div>
  </div>
</main>
`;

const extraScript = `<script>
(function(){
  var btn = document.getElementById("prepare-email-btn");
  if(!btn) return;
  btn.addEventListener("click", function(){
    var name = document.getElementById("c-name").value.trim();
    var subject = document.getElementById("c-subject").value.trim() || "Digital Legacy Hub Feedback";
    var message = document.getElementById("c-message").value.trim();
    var body = (name ? "From: " + name + "\\n\\n" : "") + message;
    var mailto = "mailto:tulin.bayramoglu@lis.ac.uk?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = mailto;
  });
})();
</script>`;

fs.writeFileSync(__dirname + "/contact.html", page(
  "contact",
  "Contact Us",
  "Get in touch with feedback, corrections, or questions about the Digital Legacy Hub project.",
  `Questions, corrections, and feedback are always welcome &nbsp;&nbsp;•&nbsp;&nbsp;
    This site is an educational awareness tool. Nothing here is legal advice. &nbsp;&nbsp;•&nbsp;&nbsp;`,
  body,
  extraScript
));
console.log("contact.html written");
