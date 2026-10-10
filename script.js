(function () {
  'use strict';

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header border on scroll
  var header = document.querySelector('.site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    links.classList.toggle('open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  // "Choose plan" buttons pre-select the plan in the inquiry form
  var planSelect = document.getElementById('plan');
  document.querySelectorAll('[data-plan]').forEach(function (btn) {
    btn.addEventListener('click', function () { planSelect.value = btn.dataset.plan; });
  });

  // Reveal-on-scroll animation
  var revealEls = document.querySelectorAll('.card, .steps li, .plan, .faq details, .section-head');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // Inquiry form
  var form = document.getElementById('inquiry-form');
  var status = form.querySelector('.form-status');
  var submitBtn = form.querySelector('button[type="submit"]');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var rules = {
    name: function (v) { return v.trim().length >= 2 || 'Please enter your name.'; },
    email: function (v) { return emailPattern.test(v.trim()) || 'Please enter a valid email address.'; },
    message: function (v) { return v.trim().length >= 10 || 'Please tell us a little more (at least 10 characters).'; },
    consent: function (_, el) { return el.checked || 'Please confirm we can contact you.'; }
  };

  function validateField(id) {
    var el = document.getElementById(id);
    var field = el.closest('.field');
    var result = rules[id](el.value, el);
    var error = field.querySelector('.error');
    var ok = result === true;
    field.classList.toggle('invalid', !ok);
    el.setAttribute('aria-invalid', String(!ok));
    error.textContent = ok ? '' : result;
    return ok;
  }

  Object.keys(rules).forEach(function (id) {
    var el = document.getElementById(id);
    var evt = el.type === 'checkbox' ? 'change' : 'blur';
    el.addEventListener(evt, function () { validateField(id); });
    el.addEventListener('input', function () {
      if (el.closest('.field').classList.contains('invalid')) validateField(id);
    });
  });

  function showStatus(text, kind) {
    status.textContent = text;
    status.className = 'form-status ' + kind;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var firstInvalid = null;
    Object.keys(rules).forEach(function (id) {
      if (!validateField(id) && !firstInvalid) firstInvalid = document.getElementById(id);
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Silently drop submissions from bots that fill the hidden field
    if (form.querySelector('.hp').value) return;

    var data = new FormData(form);
    var services = data.getAll('services');
    data.delete('services');
    data.append('services', services.join(', ') || 'Not specified');

    // Until a form endpoint is configured, fall back to the visitor's email client
    if (form.action.indexOf('YOUR_FORM_ID') !== -1) {
      var body = [];
      data.forEach(function (value, key) {
        if (key !== '_gotcha' && key !== 'consent' && value) body.push(key.replace('_', ' ') + ': ' + value);
      });
      var to = document.querySelector('.contact-list a[href^="mailto:"]').getAttribute('href').slice(7);
      window.location.href = 'mailto:' + to +
        '?subject=' + encodeURIComponent('Website inquiry from ' + data.get('name')) +
        '&body=' + encodeURIComponent(body.join('\n'));
      showStatus('Opening your email app to send the inquiry…', 'success');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    showStatus('', '');

    fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function (res) {
        if (!res.ok) throw new Error('Request failed');
        form.reset();
        showStatus('Thank you! Your inquiry has been sent. We\'ll be in touch within one working day.', 'success');
      })
      .catch(function () {
        showStatus('Sorry, something went wrong. Please try again or email us directly.', 'fail');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send inquiry';
      });
  });
})();
