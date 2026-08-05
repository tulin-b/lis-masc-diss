"use strict";
/* =========================================================
   Will & Legacy Quiz engine — quiz.html only. (v4)
   No native alert()/confirm() anywhere: all confirmations are
   inline or via the shared accessible modal pattern.
   ========================================================= */
(function wizardModule(){
  var form = document.getElementById("wizard-form");
  if(!form) return;
  var STORAGE_KEY = "dlh_wizard_v4";
  var steps = Array.prototype.slice.call(form.querySelectorAll("fieldset.step"));
  var progressEls = Array.prototype.slice.call(document.querySelectorAll("#wizard-progress span"));
  var backBtn = document.getElementById("wizard-back-btn");
  var nextBtn = document.getElementById("wizard-next-btn");
  var statusEl = document.getElementById("wizard-status");
  var warningEl = document.getElementById("wizard-warning");
  var consentCheck = document.getElementById("consent-check");
  var accountsList = document.getElementById("accounts-list");
  var addAccountBtn = document.getElementById("add-account-btn");
  var traditionSelect = document.getElementById("w-tradition");
  var traditionBox = document.getElementById("tradition-teach-box");
  var current = 1;

  var traditionTeachings = {
    secular: "Secular and humanist perspectives increasingly draw on continuing bonds theory, the idea that an ongoing, evolving relationship with someone who died, rather than a clean break, is itself a normal and often healthy part of grieving (Klass, Silverman and Nickman, 1996; Krueger and Osler, 2022). Recent research is more cautious than it once was, though: the same continuing bond can bring comfort in one context and distress in another, so the question is less \"is this technology good or bad\" and more \"does this specific use support or crowd out my other relationships and coping\" (Hewson et al., 2023).",
    christian: "Christian tradition generally distinguishes prayerful remembrance of the dead from attempting to speak as the dead. Pope Leo XIV's 2026 encyclical Magnifica Humanitas argued technology should serve, not substitute for, authentic human relationship. A recent Eastern Orthodox assessment goes further, arguing a generative, conversational griefbot risks creating a \"false presence\" that sits uneasily alongside the hope of resurrection, even where quieter memorial uses of a person's data may be acceptable under clear consent and time limits (Popov and Popova, 2026).",
    islamic: "Islamic teaching emphasises accepting qadr (God's decree) and tawakkul (trust in that decree) as part of healthy mourning. Recent Islamic bioethics scholarship argues a griefbot's illusion of continuity can conflict with this, and that ethically designed technology in this space should avoid anything resembling impersonation of a soul, weighing benefit against harm under established Islamic ethical reasoning.",
    jewish: "Jewish mourning is structured around communal presence with the living (shiva, kaddish) rather than ongoing conversation with the dead. Folklore traditions such as the golem and the dybbuk offer long-standing cultural caution about artificially animated likenesses, an image some contemporary commentary has drawn on directly when discussing AI simulations of the deceased.",
    hindu: "Hindu tradition generally frames death as a transition within an ongoing cycle (samsara), with rites such as shraddha intended to support the soul's onward journey. Research on bereavement during pandemic-era restrictions found that disrupted communal Shraddh rites pushed grief toward a more solitary, individual form (Ghosh and Athira, 2024), which is worth reflecting on given that an AI conversation is also a solitary, one-to-one experience rather than a communal ritual one.",
    buddhist: "Buddhist teaching centres on impermanence (anicca) and the risks of attachment, raising a direct question about whether an ongoing simulated presence works against letting go. The evidence here is thinner than for other traditions, and some Buddhist ethicists have suggested a conscious, temporary, reflective use might sit differently to an open-ended, permanent one, though this remains a developing rather than settled area.",
    confucian: "Confucian tradition often expects an ongoing relationship with ancestors through ritual, memory, and filial piety, so an AI presence is a less unfamiliar idea here than in some other traditions. Recent scholarship raises a specific caution, though: filial piety has traditionally included the effortful labour of remembrance itself, and a chatbot that automates that labour may hollow out exactly what made the practice meaningful (Sparrow and Zhang, 2025). A parallel line of thought argues that filial piety properly includes gently correcting or resisting a loved one's wishes where needed, not simply accommodating whatever a grieving person wants in the moment (Elder, 2023).",
    daoist: "Daoist thought raises a related but distinct concern from Confucian ancestor veneration, rooted in a broader scepticism of ritual formalism itself: rather than asking whether a griefbot properly honours ancestral duty, a Daoist lens asks whether performing any fixed ritual script, including a scripted AI conversation, can ever really substitute for a more spontaneous, natural relationship with loss (Sparrow and Zhang, 2025).",
    african_ubuntu: "From an Ubuntu ethical standpoint, personhood is understood as fundamentally relational: you are a person through other people. Recent scholarship applying this directly to griefbots argues they can be morally permissible when used to gently support grief, but only if they strengthen, rather than replace, the web of relationships and communal obligations around the person grieving, not simply because the technology exists and feels comforting in the moment (Wright, 2024).",
    other: "There is no single teaching to reflect back to you here. This is your own space to describe what matters to you, and that is just as valid as any named tradition."
  };

  function updateProgress(){
    progressEls.forEach(function(el){
      var s = parseInt(el.getAttribute("data-step"),10);
      el.classList.toggle("active", s === current);
      el.classList.toggle("done", s < current);
    });
  }
  function showStep(n){
    current = n;
    steps.forEach(function(fs){
      var s = parseInt(fs.getAttribute("data-step"),10);
      fs.hidden = (s !== n);
    });
    updateProgress();
    backBtn.style.visibility = (n === 1) ? "hidden" : "visible";
    nextBtn.textContent = (n === steps.length) ? "Finish" : "Next ▶";
    if(warningEl) warningEl.classList.remove("show");
    if(n === steps.length){ renderLetter(); }
    if(statusEl) statusEl.textContent = "Step " + n + " of " + steps.length;
    saveWizardData();
  }

  function accountRowTpl(vals){
    vals = vals || {name:"", action:""};
    var row = document.createElement("div");
    row.className = "repeat-row";
    var safeName = String(vals.name || "").replace(/"/g,"&quot;");
    row.innerHTML =
      '<input type="text" class="acc-name" placeholder="Account or asset name (e.g. Gmail, Instagram, family photos)" value="' + safeName + '">' +
      '<select class="acc-action">' +
        '<option value="">What should happen to it?</option>' +
        '<option value="memorialise"' + (vals.action==="memorialise"?" selected":"") + '>Memorialise / keep as a tribute</option>' +
        '<option value="transfer"' + (vals.action==="transfer"?" selected":"") + '>Transfer to someone</option>' +
        '<option value="delete"' + (vals.action==="delete"?" selected":"") + '>Delete</option>' +
        '<option value="unsure"' + (vals.action==="unsure"?" selected":"") + '>Not sure yet</option>' +
      '</select>' +
      '<button type="button" class="btn danger remove-account">Remove</button>';
    row.querySelector(".remove-account").addEventListener("click", function(){ row.remove(); saveWizardData(); });
    row.querySelector(".acc-name").addEventListener("input", saveWizardData);
    row.querySelector(".acc-action").addEventListener("change", saveWizardData);
    return row;
  }
  function addAccountRow(vals){ accountsList.appendChild(accountRowTpl(vals)); }
  if(addAccountBtn) addAccountBtn.addEventListener("click", function(){ addAccountRow(); });

  if(traditionSelect){
    traditionSelect.addEventListener("change", function(){
      var v = traditionSelect.value;
      if(v && traditionTeachings[v]){
        traditionBox.hidden = false;
        traditionBox.innerHTML = "<h4>What this tradition often teaches</h4><p>" + traditionTeachings[v] + "</p>";
      } else {
        traditionBox.hidden = true;
      }
      saveWizardData();
    });
  }

  function collectData(){
    var data = {};
    var fd = new FormData(form);
    fd.forEach(function(v,k){ data[k] = v; });
    data.accounts = Array.prototype.map.call(accountsList.querySelectorAll(".repeat-row"), function(row){
      return { name: row.querySelector(".acc-name").value, action: row.querySelector(".acc-action").value };
    });
    data.consent = !!(consentCheck && consentCheck.checked);
    return data;
  }
  function saveWizardData(){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(collectData())); }catch(e){}
  }
  function loadWizardData(){
    var data = {};
    try{ data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); }catch(e){ data = {}; }
    Object.keys(data).forEach(function(k){
      var f = form.elements[k];
      if(f && k !== "accounts"){ f.value = data[k]; }
    });
    if(consentCheck) consentCheck.checked = !!data.consent;
    if(data.accounts && data.accounts.length){ data.accounts.forEach(function(a){ addAccountRow(a); }); }
    if(data.tradition && traditionTeachings[data.tradition]){
      traditionBox.hidden = false;
      traditionBox.innerHTML = "<h4>What this tradition often teaches</h4><p>" + traditionTeachings[data.tradition] + "</p>";
    }
  }

  function escapeHtml(s){
    return String(s || "").replace(/[&<>"']/g, function(c){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];
    });
  }
  var aiConsentLabels = {
    yes_full: "Yes, without significant restriction",
    yes_conditions: "Yes, but only under specific conditions",
    no: "No, this was not wanted",
    unsure: "Undecided at the time this statement was written"
  };
  var aiTypeLabels = {
    memory_only: "retrieving existing messages, photos, and recordings only, with no invented personality",
    personality_sim: "a chatbot that simulates an ongoing personality and generates new responses",
    both: "either a memory-retrieval tool or a personality-simulating chatbot",
    neither: "neither form of AI simulation",
    unsure: "not yet decided which form, if any"
  };
  var traditionLabels = {
    secular: "Secular / Humanist", christian: "Christian", islamic: "Islamic", jewish: "Jewish",
    hindu: "Hindu", buddhist: "Buddhist", confucian: "Confucian", daoist: "Daoist",
    african_ubuntu: "African / Ubuntu", other: "Other / blended / not listed"
  };

  function renderLetter(){
    var d = collectData();
    var today = new Date().toLocaleDateString(undefined, {year:"numeric", month:"long", day:"numeric"});
    var name = escapeHtml(d.name) || "[Name not provided]";
    var html = "";
    html += "<h2>STATEMENT OF WISHES</h2>";
    html += '<p class="doc-sub">Digital Legacy &amp; AI Simulation Preferences — Not a legally binding will</p>';
    html += "<dl>";
    html += "<dt><span class='clause-num'>1.</span>Declarant</dt><dd>" + name + "</dd>";
    html += "<dt><span class='clause-num'>2.</span>Date prepared</dt><dd>" + today + "</dd>";
    html += "<dt><span class='clause-num'>3.</span>Purpose of this statement</dt><dd>This document records the declarant's personal wishes regarding digital accounts, digital property, and any AI-based simulation of the declarant, for the guidance of family, friends, and any executor. It is intended to be read alongside, and does not replace, a legally executed will.</dd>";

    html += "<dt><span class='clause-num'>4.</span>Digital accounts and property</dt><dd>";
    if(d.accounts && d.accounts.length && d.accounts.some(function(a){return a.name;})){
      html += "<ol>";
      d.accounts.forEach(function(a){
        if(!a.name) return;
        var actionText = {memorialise:"be memorialised / kept as a tribute", transfer:"be transferred to a nominated person", delete:"be deleted", unsure:"be decided later, no preference recorded yet"}[a.action] || "no preference recorded";
        html += "<li>" + escapeHtml(a.name) + ": the declarant wishes this to " + actionText + ".</li>";
      });
      html += "</ol>";
    } else {
      html += "[No accounts were listed]";
    }
    html += "</dd>";

    html += "<dt><span class='clause-num'>5.</span>AI simulation preference</dt><dd>The declarant's preference regarding any AI-generated chatbot, voice, or video simulation of themselves after death is: <strong>" + (aiConsentLabels[d.ai_consent] || "not recorded") + "</strong>.";
    if(d.ai_type && aiTypeLabels[d.ai_type]){ html += " If any form were acceptable, the declarant's stated preference is for " + aiTypeLabels[d.ai_type] + "."; }
    if(d.ai_conditions){ html += " Specific conditions stated: " + escapeHtml(d.ai_conditions) + "."; }
    html += "</dd>";

    html += "<dt><span class='clause-num'>6.</span>Cultural and spiritual context</dt><dd>Tradition or worldview identified: " + (traditionLabels[d.tradition] || "not recorded") + ".";
    if(d.rituals){ html += " Specific rituals, practices, or beliefs noted: " + escapeHtml(d.rituals) + "."; }
    html += "</dd>";

    html += "<dt><span class='clause-num'>7.</span>Trusted person</dt><dd>";
    if(d.trusted_name){
      html += escapeHtml(d.trusted_name) + (d.trusted_rel ? " (" + escapeHtml(d.trusted_rel) + ")" : "") + " is named as the person the declarant trusts to help carry out these wishes.";
      if(d.trusted_notes){ html += " Additional notes: " + escapeHtml(d.trusted_notes) + "."; }
    } else {
      html += "[No trusted person named]";
    }
    html += "</dd>";
    html += "</dl>";

    html += '<div class="sig-block">';
    html += "<p><strong>Important:</strong> this Statement of Wishes is an educational document generated by an online tool. It does not meet the legal requirements for a valid will under the Wills Act 1837 (which generally requires a signed, witnessed paper document) and creates no binding legal obligation on any person or platform. Please attach it to, and discuss it alongside, a will prepared with a qualified solicitor.</p>";
    html += "<p>Declarant signature: <span class='sig-line'>&nbsp;</span> Date: <span class='sig-line' style='min-width:100px;'>&nbsp;</span></p>";
    html += "<p>Witnessed by (optional, for discussion purposes only, does not confer legal validity): <span class='sig-line'>&nbsp;</span></p>";
    html += "</div>";

    document.getElementById("letter-preview").innerHTML = html;
  }

  backBtn.addEventListener("click", function(){ if(current > 1) showStep(current - 1); });
  nextBtn.addEventListener("click", function(){
    if(current === 1 && consentCheck && !consentCheck.checked){
      if(warningEl){
        warningEl.textContent = "Please confirm you understand this tool does not provide legal advice or a valid will before continuing.";
        warningEl.classList.add("show");
      }
      return;
    }
    if(current < steps.length) showStep(current + 1);
    else { renderLetter(); }
  });

  form.addEventListener("input", saveWizardData);
  form.addEventListener("change", saveWizardData);

  var printBtn = document.getElementById("print-letter-btn");
  var downloadBtn = document.getElementById("download-letter-btn");
  var emailBtn = document.getElementById("email-letter-btn");
  var copyBtn = document.getElementById("copy-letter-btn");
  var restartBtn = document.getElementById("restart-wizard-btn");
  var clipboardStatus = document.getElementById("clipboard-status");

  if(printBtn) printBtn.addEventListener("click", function(){ window.print(); });

  if(downloadBtn) downloadBtn.addEventListener("click", function(){
    var text = document.getElementById("letter-preview").innerText;
    var blob = new Blob([text], {type:"text/plain"});
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "statement-of-wishes.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  /* Email the draft. This is a static site with no server or
     email-sending backend, so the honest and genuinely useful
     version of "email me this draft" is a pre-filled mailto:
     link that opens the person's own email client with the
     full text already in the body, ready to send to themselves
     or anyone else, with nothing passing through a third party. */
  if(emailBtn) emailBtn.addEventListener("click", function(){
    var text = document.getElementById("letter-preview").innerText;
    var subject = "My Statement of Wishes (digital legacy & AI simulation preferences)";
    var mailto = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
    window.location.href = mailto;
  });

  /* Copy to clipboard, with a visible and screen-reader-announced
     confirmation rather than a native alert(). */
  if(copyBtn) copyBtn.addEventListener("click", function(){
    var text = document.getElementById("letter-preview").innerText;
    function announce(msg){ if(clipboardStatus) clipboardStatus.textContent = msg; }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        announce("Copied to clipboard.");
      }).catch(function(){
        announce("Could not copy automatically, please select and copy the text above.");
      });
    } else {
      announce("Copy is not supported in this browser, please select and copy the text above.");
    }
    window.setTimeout(function(){ announce(""); }, 5000);
  });

  /* Restart uses an inline two-step confirm instead of a popup:
     first click arms it and relabels the button, second click within
     8 seconds actually clears the data. */
  if(restartBtn){
    var armed = false, armTimer = null;
    restartBtn.addEventListener("click", function(){
      if(!armed){
        armed = true;
        restartBtn.textContent = "Click again to confirm ⚠";
        armTimer = window.setTimeout(function(){
          armed = false;
          restartBtn.textContent = "↺ Start over";
        }, 8000);
        return;
      }
      window.clearTimeout(armTimer);
      armed = false;
      restartBtn.textContent = "↺ Start over";
      try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
      form.reset();
      accountsList.innerHTML = "";
      addAccountRow();
      if(traditionBox) traditionBox.hidden = true;
      showStep(1);
    });
  }

  loadWizardData();
  if(accountsList.children.length === 0) addAccountRow();
  showStep(1);
})();
