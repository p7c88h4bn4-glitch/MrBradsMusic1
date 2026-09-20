/* ==========================================================================
   MR. BRAD — MAIN SCRIPT
   Reads everything from content.js (window.SITE) and fills in the pages.
   You normally do NOT need to edit this file — edit js/content.js instead.
   ========================================================================== */
(function () {
  "use strict";
  var S = window.SITE || {};

  /* ---- tiny helpers ----------------------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---- mobile navigation ------------------------------------------------ */
  function initNav() {
    var toggle = $(".nav__toggle");
    var menu = $(".nav__menu");
    var backdrop = $(".nav__backdrop");
    var closeBtn = $(".nav__close");
    if (!toggle || !menu) return;

    function open() {
      menu.classList.add("is-open");
      if (backdrop) backdrop.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function close() {
      menu.classList.remove("is-open");
      if (backdrop) backdrop.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    toggle.addEventListener("click", open);
    if (closeBtn) closeBtn.addEventListener("click", close);
    if (backdrop) backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    $all("a", menu).forEach(function (a) { a.addEventListener("click", close); });
  }

  /* ---- image placeholders that never break ------------------------------ */
  /* Looks for <div class="photo" data-src="..."> and loads the image if a
     path is set; reveals the dashed placeholder if it's missing or fails.   */
  function initPhotos() {
    $all(".photo").forEach(function (box) {
      var src = box.getAttribute("data-src");
      var label = box.getAttribute("data-label") || "Add photo";
      var alt = box.getAttribute("data-alt") || label;
      if (!$(".photo__label", box)) {
        box.appendChild(el("span", "photo__label", esc(label)));
      }
      if (src) {
        var img = new Image();
        img.alt = alt;
        img.onload = function () { box.classList.add("has-image"); box.insertBefore(img, box.firstChild); };
        img.onerror = function () { /* leave placeholder visible */ };
        img.src = src;
      }
    });
  }

  /* ---- Instrument Repair Fund banner ------------------------------------ */
  function initTipBar() {
    var t = S.tips || {};
    var venmo = $("[data-venmo]");
    if (venmo) {
      if (t.venmoUrl) {
        venmo.setAttribute("href", t.venmoUrl);
        venmo.removeAttribute("aria-disabled");
        // Don't overwrite innerHTML - keep the image
      } else {
        venmo.setAttribute("href", "#");
        venmo.setAttribute("aria-disabled", "true");
        venmo.addEventListener("click", function (e) { e.preventDefault(); });
      }
    }
    var note = $("[data-tip-note]");
    if (note) note.textContent = t.note || "";
  }

  /* ---- contact info sprinkled around the site --------------------------- */
  function initBusiness() {
    var b = S.business || {};
    $all("[data-phone]").forEach(function (n) {
      n.textContent = b.phone || "";
      if (n.tagName === "A") n.setAttribute("href", b.phoneHref || ("tel:" + (b.phone || "")));
    });
    $all("[data-email]").forEach(function (n) {
      n.textContent = b.email || "";
      if (n.tagName === "A") n.setAttribute("href", "mailto:" + (b.email || ""));
    });
    $all("[data-service-area]").forEach(function (n) { n.textContent = b.serviceArea || ""; });
    $all("[data-year]").forEach(function (n) { n.textContent = new Date().getFullYear(); });
    
    // Social links
    var social = b.social || {};
    var socials = [
      { attr: "data-social-facebook", url: social.facebook },
      { attr: "data-social-instagram", url: social.instagram },
      { attr: "data-social-tiktok", url: social.tiktok }
    ];
    socials.forEach(function (s) {
      $all("[" + s.attr + "]").forEach(function (n) {
        if (s.url) {
          n.setAttribute("href", s.url);
          n.setAttribute("target", "_blank");
          n.setAttribute("rel", "noopener");
        }
      });
    });
  }

  /* ---- Google Calendar embed ------------------------------------------- */
  function initCalendar() {
    var mount = $("#calendar-mount");
    if (!mount) return;
    var url = (S.googleCalendarEmbedUrl || "").trim();
    if (url) {
      var frame = el("div", "calendar-frame");
      var iframe = el("iframe");
      iframe.src = url;
      iframe.title = "Mr. Brad — upcoming events calendar";
      iframe.loading = "lazy";
      iframe.setAttribute("frameborder", "0");
      frame.appendChild(iframe);
      mount.appendChild(frame);
    } else {
      mount.appendChild(el("div", "calendar-placeholder",
        '<div class="emoji">🗓️</div><h3>Public events calendar coming soon.</h3>' +
        '<p class="muted">Check back soon — or reach out to ask about upcoming shows.</p>'));
    }
  }

  /* ---- a reusable photo box (string) ------------------------------------ */
  function photoBox(src, label, extraClass) {
    return '<div class="photo ' + (extraClass || "") + '"' +
      ' data-src="' + esc(src || "") + '"' +
      ' data-label="' + esc(label || "Add photo") + '"></div>';
  }

  /* ---- Home: program cards --------------------------------------------- */
  function initProgramCards() {
    var mount = $("#program-cards");
    if (!mount || !S.programs) return;
    S.programs.forEach(function (p) {
      var card = el("article", "card accent-" + (p.accent || "coral"));
      var badge = p.comingSoon ? '<span class="badge">Coming Soon 🚀</span>' : "";
      var href = "programs.html#" + p.id;
      card.innerHTML =
        photoBox(p.image || "", p.imageLabel, "") +
        '<div class="card__body">' +
          badge +
          "<h3>" + esc(p.name) + "</h3>" +
          "<p>" + esc(p.shortDescription) + "</p>" +
          '<a class="btn btn--sun btn--small" href="' + href + '">Learn more</a>' +
        "</div>";
      mount.appendChild(card);
    });
  }

  /* ---- Programs page: full detail blocks -------------------------------- */
  function initProgramDetails() {
    var mount = $("#program-details");
    if (!mount || !S.programs) return;
    S.programs.forEach(function (p) {
      var sec = el("article", "program accent-" + (p.accent || "coral"));
      sec.id = p.id;
      var badge = p.comingSoon ? '<span class="badge">Coming Soon 🚀</span>' : "";
      var features = (p.features || []).map(function (f) {
        return "<li>" + esc(f) + "</li>";
      }).join("");
      var bookHref = "booking.html?program=" + encodeURIComponent(p.programParam || p.name);
      sec.innerHTML =
        '<div class="program__grid">' +
          '<div class="program__media">' + photoBox(p.image || "", p.imageLabel) + "</div>" +
          '<div class="program__body">' +
            badge +
            "<h2>" + esc(p.name) + "</h2>" +
            '<p class="program__tagline">' + esc(p.tagline) + "</p>" +
            '<span class="program__audience">' + esc(p.audience) + "</span>" +
            "<p>" + esc(p.details) + "</p>" +
            '<ul class="feature-list">' + features + "</ul>" +
            '<a class="btn btn--primary" href="' + bookHref + '">' + esc(p.buttonLabel) + "</a>" +
          "</div>" +
        "</div>";
      mount.appendChild(sec);
    });
  }

  /* ---- "Good For" tags -------------------------------------------------- */
  function initGoodFor() {
    var mount = $("#good-for");
    if (!mount || !S.goodFor) return;
    S.goodFor.forEach(function (g) { mount.appendChild(el("span", "tag", esc(g))); });
  }

  /* ---- Testimonials ----------------------------------------------------- */
  function initTestimonials() {
    var mounts = $all("[data-testimonials]");
    if (!mounts.length || !S.testimonials) return;
    mounts.forEach(function (mount) {
      var limit = parseInt(mount.getAttribute("data-testimonials"), 10);
      var list = isNaN(limit) ? S.testimonials : S.testimonials.slice(0, limit);
      list.forEach(function (t) {
        var paragraphs = esc(t.quote).split("\n\n").map(function (paragraph) {
          return "<p>" + paragraph + "</p>";
        }).join("");
        mount.appendChild(el("figure", "quote",
          '<div class="mark" aria-hidden="true">&ldquo;</div>' +
          '<blockquote class="quote__body">' + paragraphs + "</blockquote>" +
          '<button class="quote__toggle" type="button" aria-expanded="false">Read more</button>' +
          (t.source ? "<figcaption><cite>— " + esc(t.source) + "</cite></figcaption>" : "")
        ));
      });
    });
    $all(".quote__toggle").forEach(function (button) {
      button.addEventListener("click", function () {
        var quote = button.closest(".quote");
        if (!quote) return;
        var expanded = quote.classList.toggle("quote--expanded");
        button.setAttribute("aria-expanded", expanded ? "true" : "false");
        button.textContent = expanded ? "Show less" : "Read more";
      });
    });
  }

  /* ---- Videos (Media page) --------------------------------------------- */
  function initVideos() {
    var mount = $("#videos");
    if (!mount || !S.videos) return;
    S.videos.forEach(function (v) {
      var wrap = el("div");
      var frame = el("div", "video-frame");
      if (v.id) {
        var iframe = el("iframe");
        iframe.src = "https://www.youtube.com/embed/" + encodeURIComponent(v.id);
        iframe.title = v.title || "Mr. Brad video";
        iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
        iframe.setAttribute("allowfullscreen", "");
        iframe.loading = "lazy";
        frame.appendChild(iframe);
      } else {
        frame.appendChild(el("div", "video-placeholder",
          '<div class="play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg></div>' +
          "<div>Add a YouTube video in content.js</div>"));
      }
      wrap.appendChild(frame);
      if (v.title) wrap.appendChild(el("div", "video-title", esc(v.title)));
      mount.appendChild(wrap);
    });
  }

  /* ---- Photo gallery (Media page) -------------------------------------- */
  function initGallery() {
    var mount = $("#gallery");
    if (!mount || !S.gallery) return;
    S.gallery.forEach(function (g) {
      mount.insertAdjacentHTML("beforeend", photoBox(g.src, g.label || "Add gallery photo", "photo--square"));
    });
  }

  /* ---- Educational apps (Lessons page) --------------------------------- */
  function initApps() {
    var mount = $("#apps");
    if (!mount || !S.apps) return;
    S.apps.forEach(function (a) {
      var card = el("article", "card accent-turquoise");
      var openBtn = a.openUrl
        ? '<a class="btn btn--primary btn--small" href="' + esc(a.openUrl) + '" target="_blank" rel="noopener">Open App</a>'
        : '<span class="btn btn--primary btn--small" aria-disabled="true">Open App</span>';
      var learnBtn = a.learnMoreUrl
        ? '<a class="btn btn--ghost btn--small" href="' + esc(a.learnMoreUrl) + '" target="_blank" rel="noopener">Learn More</a>'
        : "";
      card.innerHTML =
        photoBox(a.screenshot, "Add app screenshot", "") +
        '<div class="card__body">' +
          "<h3>" + esc(a.name) + "</h3>" +
          "<p>" + esc(a.description) + "</p>" +
          '<div class="btn-row">' + openBtn + learnBtn + "</div>" +
        "</div>";
      mount.appendChild(card);
    });
  }

  /* ---- Booking: prefill program from ?program= ------------------------- */
  function initBookingPrefill() {
    var select = $("#program-requested");
    if (!select) return;
    var params = new URLSearchParams(window.location.search);
    var requested = params.get("program");
    if (!requested) return;
    var matched = false;
    $all("option", select).forEach(function (opt) {
      if (opt.value === requested || opt.textContent.trim() === requested.trim()) {
        opt.selected = true; matched = true;
      }
    });
    // If it isn't already a listed option, add it so nothing is lost
    if (!matched) {
      var opt = el("option");
      opt.value = requested; opt.textContent = requested; opt.selected = true;
      select.appendChild(opt);
    }
  }

  /* ---- Show a success message after Netlify form submit ----------------- */
  function initFormSuccess() {
    var params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "true") {
      var box = $("[data-success]");
      if (box) {
        box.style.display = "block";
        box.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  /* ---- boot ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initTipBar();
    initBusiness();
    initCalendar();
    initProgramCards();
    initProgramDetails();
    initGoodFor();
    initTestimonials();
    initVideos();
    initGallery();
    initApps();
    initBookingPrefill();
    initFormSuccess();
    initPhotos();   // run last so JS-injected .photo boxes are included
  });
})();
