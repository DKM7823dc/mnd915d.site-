/* Carousel, call-to-action routing and small UI behaviours. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------ call to action */
  /* Every CTA on the site runs through k2(). Point K2_URL somewhere else once and
     the whole page follows; the "k2:go" event is the hook for analytics, or for
     swapping the destination per campaign later on. */
  var K2_URL = "https://qq.com/";

  window.k2 = function k2(source) {
   MeetU.download(event);
  };

  document.addEventListener("click", function (e) {
    var cta = e.target.closest("[data-k2]");
    if (!cta) return;
    e.preventDefault();
    window.k2(cta.getAttribute("data-k2"));
  });

  /* ------------------------------------------------------------ carousel */
  /* Centred slide with both neighbours peeking: first/last slides are cloned
     so the strip loops in either direction. */
  function initCarousel(root) {
    var track = root.querySelector(".hero-track");
    var viewport = root.querySelector(".hero-viewport");
    var originals = Array.prototype.slice.call(root.querySelectorAll(".hero-slide"));
    if (!track || !viewport || originals.length < 2) return;

    var COUNT = originals.length;
    var firstClone = originals[0].cloneNode(true);
    var lastClone = originals[COUNT - 1].cloneNode(true);

    [firstClone, lastClone].forEach(function (clone) {
      clone.classList.remove("is-active");
      clone.setAttribute("aria-hidden", "true");
      clone.setAttribute("inert", "");
    });
    track.appendChild(firstClone);
    track.insertBefore(lastClone, track.firstElementChild);

    var slides = Array.prototype.slice.call(track.querySelectorAll(".hero-slide"));
    var dots = Array.prototype.slice.call(root.querySelectorAll(".carousel-dot"));
    var prev = root.querySelector('.carousel-arrow[data-dir="prev"]');
    var next = root.querySelector('.carousel-arrow[data-dir="next"]');
    var toggle = root.querySelector(".carousel-toggle");
    var counter = root.querySelector(".carousel-counter");

    var pos = 1;               /* 0 = clone of last slide, COUNT + 1 = clone of first */
    var timer = null;
    var settle = null;
    var paused = reduceMotion;
    var DELAY = 6000;

    function offsetFor(i) {
      var slide = slides[i];
      return (viewport.clientWidth - slide.offsetWidth) / 2 - slide.offsetLeft;
    }

    function realIndex() {
      return ((pos - 1) + COUNT) % COUNT;
    }

    function paint() {
      var activeIndex = realIndex();
      track.style.transform = "translate3d(" + offsetFor(pos) + "px,0,0)";

      slides.forEach(function (slide, i) {
        var active = i === pos;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", String(!active));
        if (active) slide.removeAttribute("inert");
        else slide.setAttribute("inert", "");
      });

      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === activeIndex);
        dot.setAttribute("aria-current", i === activeIndex ? "true" : "false");
      });

      if (counter) counter.textContent = (activeIndex + 1) + " / " + COUNT;
    }

    /* Snap the clone position back onto its real counterpart without animating. */
    function normalise() {
      if (pos === 0) pos = COUNT;
      else if (pos === COUNT + 1) pos = 1;
      else return;

      track.style.transition = "none";
      paint();
      void track.offsetWidth;
      track.style.transition = "";
    }

    function move(delta) {
      pos += delta;
      track.style.transition = "";
      paint();

      clearTimeout(settle);
      settle = setTimeout(normalise, reduceMotion ? 0 : 700);
    }

    function goTo(slideIndex) {
      var target = slideIndex + 1;
      if (target === pos) return;
      /* step through neighbours so the strip slides in a sensible direction */
      pos = target;
      track.style.transition = "";
      paint();
      clearTimeout(settle);
      settle = setTimeout(normalise, reduceMotion ? 0 : 700);
    }

    function start() {
      stop();
      if (paused) return;
      timer = setInterval(function () { move(1); }, DELAY);
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    if (prev) prev.addEventListener("click", function () { move(-1); start(); });
    if (next) next.addEventListener("click", function () { move(1); start(); });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () { goTo(i); start(); });
    });

    if (toggle) {
      toggle.classList.toggle("is-paused", paused);
      toggle.addEventListener("click", function () {
        paused = !paused;
        toggle.classList.toggle("is-paused", paused);
        toggle.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
        if (paused) stop(); else start();
      });
    }

    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { move(-1); start(); }
      if (e.key === "ArrowRight") { move(1); start(); }
    });

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);

    var startX = null, startY = null;
    root.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      stop();
    }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
      startX = startY = null;
      start();
    });

    var resize;
    window.addEventListener("resize", function () {
      clearTimeout(resize);
      resize = setTimeout(paint, 120);
    });

    /* images finishing load can change slide widths on narrow screens */
    window.addEventListener("load", paint);

    paint();
    start();
  }

  document.querySelectorAll("[data-carousel]").forEach(initCarousel);

  /* ------------------------------------------------------------ smooth in-page links */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
})();
