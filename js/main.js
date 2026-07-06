/* ============================================================
   Ô Cap — interactions
   ============================================================ */
(function () {
  "use strict";

  /* --- Nav : état "scrolled" --- */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 60) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* --- Menu burger mobile --- */
  var burger = document.getElementById("burger");
  var links = document.querySelector(".nav__links");
  burger.addEventListener("click", function () {
    links.classList.toggle("is-open");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") links.classList.remove("is-open");
  });

  /* --- Reveal au scroll --- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* --- Bandes collage : défilement horizontal lié au scroll --- */
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var bands = Array.prototype.slice.call(document.querySelectorAll(".band"));
  if (bands.length && !reduce) {
    var RANGE = 260; // amplitude du glissement (px)
    var ticking = false;
    function updateBands() {
      var vh = window.innerHeight;
      bands.forEach(function (band) {
        var track = band.querySelector("[data-track]");
        if (!track) return;
        var rect = band.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return; // hors écran
        // progression de la bande à travers le viewport : 0 (bas) → 1 (haut)
        var prog = (vh - rect.top) / (vh + rect.height);
        prog = Math.max(0, Math.min(1, prog));
        var dir = band.getAttribute("data-dir") === "right" ? 1 : -1;
        var shift = (prog - 0.5) * RANGE * 2 * dir;
        track.style.transform = "translateX(" + shift.toFixed(1) + "px)";
      });
      ticking = false;
    }
    function onBandScroll() {
      if (!ticking) { ticking = true; requestAnimationFrame(updateBands); }
    }
    window.addEventListener("scroll", onBandScroll, { passive: true });
    window.addEventListener("resize", onBandScroll, { passive: true });
    updateBands();
  }

  /* --- Léger parallaxe sur la vidéo héro --- */
  var heroVideo = document.querySelector(".hero__media video");
  if (heroVideo && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        heroVideo.style.transform = "scale(1.05) translateY(" + y * 0.18 + "px)";
      }
    }, { passive: true });
  }
})();
