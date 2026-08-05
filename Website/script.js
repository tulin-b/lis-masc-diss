"use strict";
/* =========================================================
   Shared script for every page of the Digital Legacy Hub (v4)
   Accessibility toolbar + status-bar clock + language notice +
   bereavement support modal + share-to-social widget.
   ========================================================= */

/* ---------- Accessibility toolbar ---------- */
(function a11yModule(){
  var KEY = "dlh_a11y_v4";
  var root = document.documentElement;
  var btnNormal = document.getElementById("btn-fs-normal");
  var btnLarge = document.getElementById("btn-fs-large");
  var btnXLarge = document.getElementById("btn-fs-xlarge");
  var btnContrast = document.getElementById("btn-contrast");
  var btnMotion = document.getElementById("btn-motion");
  var btnLegible = document.getElementById("btn-legible-font");
  var langSelect = document.getElementById("lang-select");
  var langNotice = document.getElementById("lang-notice");

  function loadA11y(){
    var saved = {};
    try{ saved = JSON.parse(localStorage.getItem(KEY) || "{}"); }catch(e){ saved = {}; }
    var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setFontSize(saved.fontSize || "normal");
    setContrast(!!saved.contrast);
    setMotion(saved.motion === undefined ? prefersReduced : !!saved.motion);
    setLegible(!!saved.legible);
    if(saved.lang && langSelect){ langSelect.value = saved.lang; showLangNotice(saved.lang); }
  }
  function saveA11y(patch){
    var saved = {};
    try{ saved = JSON.parse(localStorage.getItem(KEY) || "{}"); }catch(e){ saved = {}; }
    Object.assign(saved, patch);
    try{ localStorage.setItem(KEY, JSON.stringify(saved)); }catch(e){}
  }
  function setFontSize(size){
    root.classList.remove("fs-large","fs-xlarge");
    if(size === "large") root.classList.add("fs-large");
    if(size === "xlarge") root.classList.add("fs-xlarge");
    [btnNormal,btnLarge,btnXLarge].forEach(function(b){ if(b) b.setAttribute("aria-pressed","false"); });
    var active = size === "large" ? btnLarge : size === "xlarge" ? btnXLarge : btnNormal;
    if(active) active.setAttribute("aria-pressed","true");
    saveA11y({fontSize:size});
  }
  function setContrast(on){
    root.classList.toggle("contrast", !!on);
    if(btnContrast) btnContrast.setAttribute("aria-pressed", on ? "true" : "false");
    saveA11y({contrast:!!on});
  }
  function setMotion(on){
    root.classList.toggle("no-motion", !!on);
    if(btnMotion) btnMotion.setAttribute("aria-pressed", on ? "true" : "false");
    saveA11y({motion:!!on});
  }
  function setLegible(on){
    root.classList.toggle("font-legible", !!on);
    if(btnLegible) btnLegible.setAttribute("aria-pressed", on ? "true" : "false");
    saveA11y({legible:!!on});
  }
  if(btnNormal) btnNormal.addEventListener("click", function(){ setFontSize("normal"); });
  if(btnLarge) btnLarge.addEventListener("click", function(){ setFontSize("large"); });
  if(btnXLarge) btnXLarge.addEventListener("click", function(){ setFontSize("xlarge"); });
  if(btnContrast) btnContrast.addEventListener("click", function(){ setContrast(root.classList.contains("contrast") ? false : true); });
  if(btnMotion) btnMotion.addEventListener("click", function(){ setMotion(root.classList.contains("no-motion") ? false : true); });
  if(btnLegible) btnLegible.addEventListener("click", function(){ setLegible(root.classList.contains("font-legible") ? false : true); });

  var langNotices = {
    es: "Prototipo: traducción completa al español aún no disponible. Mostrando contenido en inglés.",
    fr: "Prototype : traduction française complète pas encore disponible. Contenu affiché en anglais.",
    ar: "نموذج أولي: الترجمة العربية الكاملة غير متوفرة بعد. يتم عرض المحتوى بالإنجليزية.",
    ur: "پروٹو ٹائپ: مکمل اردو ترجمہ ابھی دستیاب نہیں۔ انگریزی مواد دکھایا جا رہا ہے۔",
    zh: "原型：完整中文翻译尚未提供，目前显示英文内容。",
    hi: "प्रोटोटाइप: पूर्ण हिंदी अनुवाद अभी उपलब्ध नहीं है। अंग्रेज़ी सामग्री दिखाई जा रही है।"
  };
  function showLangNotice(v){
    if(!langNotice) return;
    if(v !== "en" && langNotices[v]){
      langNotice.textContent = langNotices[v];
      langNotice.classList.add("show");
    } else {
      langNotice.classList.remove("show");
      langNotice.textContent = "";
    }
  }
  if(langSelect){
    langSelect.addEventListener("change", function(){
      var v = langSelect.value;
      saveA11y({lang:v});
      showLangNotice(v);
    });
  }
  loadA11y();
})();

/* ---------- Status bar clock (decorative, no interaction) ---------- */
(function clockModule(){
  function tick(){
    var el = document.getElementById("status-clock");
    if(!el) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2,"0");
    var mm = String(now.getMinutes()).padStart(2,"0");
    el.textContent = hh + ":" + mm;
  }
  tick();
  window.setInterval(tick, 15000);
})();

/* ---------- Honest per-device visit counter (index page only) ---------- */
(function visitCounterModule(){
  var el = document.getElementById("visit-count");
  if(!el) return;
  var KEY = "dlh_visits_v1";
  var n = 0;
  try{ n = parseInt(localStorage.getItem(KEY) || "0", 10) || 0; }catch(e){ n = 0; }
  n += 1;
  try{ localStorage.setItem(KEY, String(n)); }catch(e){}
  el.textContent = String(n);
})();

/* =========================================================
   Bereavement support notice.
   A single, dismissible, accessible dialog shown once per
   browser session (not on every page, not every visit), so it
   is seen but never becomes repetitive or feels like a gate.
   Built as a real HTML/CSS dialog rather than a native
   alert()/confirm(), so it can be styled, read by a screen
   reader as a proper dialog, and dismissed with Escape or a
   click on the backdrop, consistent with the rest of this
   site's approach to accessibility.
   ========================================================= */
(function bereavementModal(){
  var SESSION_KEY = "dlh_bereavement_seen_v1";
  if(document.body.getAttribute("data-no-modal") === "true") return;
  try{ if(sessionStorage.getItem(SESSION_KEY)) return; }catch(e){}

  var backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.hidden = true;
  backdrop.innerHTML =
    '<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="bereavement-modal-title">' +
      '<button type="button" class="modal-close" id="bereavement-modal-close" aria-label="Close this notice">&times;</button>' +
      '<h2 id="bereavement-modal-title">Before you carry on</h2>' +
      '<p>This site discusses grief, death, and AI simulations of people who have died. If you are currently grieving or finding this a difficult topic, please be gentle with yourself while browsing, and consider reaching out to a real person or a bereavement service rather than relying on this site alone.</p>' +
      '<ul>' +
        '<li><strong>Cruse Bereavement Support</strong> (UK) — 0808 808 1677</li>' +
        '<li><strong>Marie Curie Support Line</strong> (UK) — 0800 090 2309</li>' +
        '<li><strong>Samaritans</strong> (UK &amp; ROI, any time, any worry) — 116 123</li>' +
        '<li>Outside the UK, search for a national bereavement or crisis line local to you.</li>' +
      '</ul>' +
      '<div class="modal-actions">' +
        '<button type="button" class="btn primary" id="bereavement-modal-ok">I understand, continue</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(backdrop);

  var lastFocused = null;
  function openModal(){
    lastFocused = document.activeElement;
    backdrop.hidden = false;
    var closeBtn = document.getElementById("bereavement-modal-close");
    if(closeBtn) closeBtn.focus();
    document.addEventListener("keydown", onKeydown, true);
  }
  function closeModal(){
    backdrop.hidden = true;
    try{ sessionStorage.setItem(SESSION_KEY, "1"); }catch(e){}
    document.removeEventListener("keydown", onKeydown, true);
    if(lastFocused && lastFocused.focus) lastFocused.focus();
  }
  function onKeydown(e){
    if(e.key === "Escape") closeModal();
    if(e.key === "Tab"){
      var focusables = backdrop.querySelectorAll("button");
      if(focusables.length === 0) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
      else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
    }
  }
  document.getElementById("bereavement-modal-close").addEventListener("click", closeModal);
  document.getElementById("bereavement-modal-ok").addEventListener("click", closeModal);
  backdrop.addEventListener("click", function(e){ if(e.target === backdrop) closeModal(); });

  window.setTimeout(openModal, 400);
})();

/* =========================================================
   Share this tool.
   Renders a small row of share controls into any element with
   id="share-widget". Uses the native Web Share API where the
   browser supports it (most mobile browsers), and falls back
   to plain share-intent links otherwise (works everywhere,
   including desktop).
   ========================================================= */
(function shareModule(){
  var mount = document.getElementById("share-widget");
  if(!mount) return;
  // Share the page the visitor is actually on, so this works on whatever
  // domain the site is hosted from. Falls back to the project homepage when
  // opened straight off a local disk, where location.href is a file:// path
  // that would be meaningless to anyone receiving it.
  var shareUrl;
  try {
    shareUrl = (window.location.protocol === "http:" || window.location.protocol === "https:")
      ? window.location.href.split("#")[0]
      : "https://digital-legacy-hub.example/";
  } catch (e) {
    shareUrl = "https://digital-legacy-hub.example/";
  }
  var shareTitle = "Digital Legacy Hub — plan for your digital afterlife";
  var shareText = "A free educational tool on AI griefbots, digital wills, and what world traditions teach about grief and technology.";

  var row = document.createElement("div");
  row.className = "share-row";
  row.innerHTML = '<span class="share-label">Share this tool:</span>';

  if(navigator.share){
    var nativeBtn = document.createElement("button");
    nativeBtn.type = "button";
    nativeBtn.className = "share-btn";
    nativeBtn.innerHTML = "&#128257; Share";
    nativeBtn.addEventListener("click", function(){
      navigator.share({ title: shareTitle, text: shareText, url: shareUrl }).catch(function(){});
    });
    row.appendChild(nativeBtn);
  } else {
    var links = [
      { label: "X / Twitter", href: "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareText) + "&url=" + encodeURIComponent(shareUrl) },
      { label: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(shareUrl) },
      { label: "WhatsApp", href: "https://wa.me/?text=" + encodeURIComponent(shareText + " " + shareUrl) },
      { label: "Email", href: "mailto:?subject=" + encodeURIComponent(shareTitle) + "&body=" + encodeURIComponent(shareText + "\n\n" + shareUrl) }
    ];
    links.forEach(function(l){
      var a = document.createElement("a");
      a.className = "share-btn";
      a.href = l.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = l.label;
      row.appendChild(a);
    });
  }

  var copyBtn = document.createElement("button");
  copyBtn.type = "button";
  copyBtn.className = "share-btn";
  copyBtn.textContent = "Copy link";
  copyBtn.addEventListener("click", function(){
    function done(ok){ copyBtn.textContent = ok ? "Link copied" : "Could not copy"; window.setTimeout(function(){ copyBtn.textContent = "Copy link"; }, 2500); }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(shareUrl).then(function(){ done(true); }).catch(function(){ done(false); });
    } else { done(false); }
  });
  row.appendChild(copyBtn);

  mount.appendChild(row);
})();
