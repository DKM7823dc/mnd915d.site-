/* ============================================================
   DramaBox — minimal behaviour
   The page is fully server-rendered; this only shows the
   floating download CTA after scrolling past the hero.
   ============================================================ */

(function () {
  "use strict";

  function setupFloatCta() {
    var cta = document.querySelector(".dark-float-cta");
    if (!cta) return;

    function update() {
      cta.classList.toggle("is-visible", window.scrollY > 520);
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupFloatCta);
  } else {
    setupFloatCta();
  }
})();
