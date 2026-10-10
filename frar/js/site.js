(function () {
  'use strict';

  function showImmediately(elements) {
    elements.forEach((element) => element.classList.add('show'));
  }

  function initializeRevealEffects() {
    const revealElements = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window)) {
      showImmediately(revealElements);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      });
    }, {threshold: 0.12});

    revealElements.forEach((element) => observer.observe(element));
  }

  function isFacebookInAppBrowser() {
    const ua = String(navigator.userAgent || '');
    return /FBAN|FBAV|FB_IAB|FB4A|FBIOS|Instagram/i.test(ua);
  }

  function buildIntentUrl(targetUrl) {
    try {
      const target = new URL(targetUrl, window.location.href);
      if (!/^https?:$/.test(target.protocol)) return '';
      let intent = 'intent://' + target.host + target.pathname + target.search
        + '#Intent;scheme=' + target.protocol.slice(0, -1)
        + ';action=android.intent.action.VIEW'
        + ';category=android.intent.category.BROWSABLE;';
      return intent + 'S.browser_fallback_url=' + encodeURIComponent(target.href) + ';end';
    } catch (error) {
      return '';
    }
  }

  function enrichDownloadUrl(rawUrl) {
    const target = new URL(rawUrl, window.location.href);
    const landing = new URL(window.location.href);
    [
      'fbclid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
      'campaign_id', 'adset_id', 'ad_id'
    ].forEach(function (name) {
      if (!target.searchParams.has(name) && landing.searchParams.has(name)) {
        target.searchParams.set(name, landing.searchParams.get(name));
      }
    });
    return target.href;
  }

  function initializeFacebookExternalBrowser() {
    if (!isFacebookInAppBrowser()) return;
    document.addEventListener('click', function (event) {
      const link = event.target && event.target.closest ? event.target.closest('a[data-download="apk"]') : null;
      if (!link) return;
      let targetUrl = '';
      try { targetUrl = enrichDownloadUrl(link.href); } catch (error) { targetUrl = link.href; }
      const ua = String(navigator.userAgent || '');
      // APK 只面向 Android；通用 VIEW Intent 会交给系统当前的默认外部浏览器。
      const externalUrl = /Android/i.test(ua) ? buildIntentUrl(targetUrl) : '';
      if (!externalUrl) return;
      event.preventDefault();
      // 必须在本次用户点击内同步唤起；延迟执行会丢失浏览器的 user activation。
      try { window.top.location.href = externalUrl; } catch (error) { window.location.href = externalUrl; }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initializeRevealEffects();
    initializeFacebookExternalBrowser();
  });
})();
