(function () {
  'use strict';

  // Google Ads conversion tracking. Paste the label from each conversion
  // action's 'send_to' value (the part after the slash) to switch it on.
  var ADS = {
    id: 'AW-18508861802',
    leadLabel: 'GbfsCK-1spodEOqi2_1E', // Submit lead form
    contactLabel: ''  // "WhatsApp/phone click" (Contact)
  };

  var KEY = 'cmh-consent';
  var GRANTED = { ad_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted', analytics_storage: 'granted' };
  var DENIED = { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' };

  function readChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function saveChoice(choice) {
    try { localStorage.setItem(KEY, choice); } catch (e) { /* storage blocked: ask again next visit */ }
  }

  function trackConversion(label) {
    if (label && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', { send_to: ADS.id + '/' + label, value: 1.0, currency: 'GBP' });
    }
  }

  // Exposed for script.js to record a successful inquiry
  window.cmhTrackLead = function () { trackConversion(ADS.leadLabel); };

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="tel:"], a[href*="wa.me/"]');
    if (link) trackConversion(ADS.contactLabel);
  });

  // Cookie banner
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  function setOffset() {
    var h = banner.hidden ? 0 : banner.offsetHeight + 12;
    document.documentElement.style.setProperty('--banner-h', h + 'px');
  }
  function show() { banner.hidden = false; setOffset(); }
  function hide() { banner.hidden = true; setOffset(); }

  banner.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-consent]');
    if (!btn) return;
    var choice = btn.getAttribute('data-consent');
    saveChoice(choice);
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', choice === 'granted' ? GRANTED : DENIED);
    hide();
  });

  document.querySelectorAll('[data-cookie-settings]').forEach(function (btn) {
    btn.addEventListener('click', show);
  });
  window.addEventListener('resize', setOffset);

  if (!readChoice()) show();
})();
