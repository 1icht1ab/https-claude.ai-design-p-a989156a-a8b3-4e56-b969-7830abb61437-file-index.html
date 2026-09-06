/* ============================================================
   Lululau Pets — app.js
   Shared UI behaviour: sticky nav, mobile menu, year, scroll
   reveal, FAQ accordion. Loaded on every page (after i18n.js).
   ============================================================ */
(function () {
  "use strict";

  function init() {
    var nav = document.getElementById("nav");

    // Sticky nav shadow
    if (nav) {
      var onScroll = function () { nav.classList.toggle("scrolled", window.scrollY > 8); };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      // Mobile menu
      var burger = document.getElementById("hamburger");
      if (burger) {
        burger.addEventListener("click", function () {
          var open = nav.classList.toggle("open");
          burger.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.querySelectorAll("#mobileMenu a").forEach(function (a) {
          a.addEventListener("click", function () {
            nav.classList.remove("open");
            burger.setAttribute("aria-expanded", "false");
          });
        });
      }
    }

    // Year
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();

    // Scroll reveal
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = document.querySelectorAll(".reveal");
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      items.forEach(function (el) { io.observe(el); });
    }

    // FAQ accordion (independent toggle, animated max-height)
    var qs = document.querySelectorAll(".faq-q");
    qs.forEach(function (btn) {
      var panel = btn.nextElementSibling;
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.style.maxHeight = open ? null : panel.scrollHeight + "px";
      });
    });
    // Recalculate open panels after language change (text length changes)
    window.addEventListener("resize", function () {
      document.querySelectorAll('.faq-q[aria-expanded="true"]').forEach(function (b) {
        var p = b.nextElementSibling;
        if (p) p.style.maxHeight = p.scrollHeight + "px";
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
