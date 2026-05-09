// ===== Hamburger menu toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  // close menu on link click (mobile)
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });
}

// ===== Index page: company select & redirect =====
const companySelect = document.getElementById('companySelect');
const enterBtn      = document.getElementById('enterBtn');

if (companySelect && enterBtn) {
  companySelect.addEventListener('change', () => {
    enterBtn.disabled = !companySelect.value;
  });

  enterBtn.addEventListener('click', () => {
    const company = companySelect.value;
    if (!company) return;
    window.location.href = `dashboard.html?company=${encodeURIComponent(company)}`;
  });
}

// ===== Dashboard page: read company from URL =====
const params      = new URLSearchParams(window.location.search);
const companyName = params.get('company');
const companyTitle = document.getElementById('companyTitle');
const companyBadge = document.getElementById('companyBadge');

if (companyTitle && companyName) {
  companyTitle.textContent = decodeURIComponent(companyName);
}
if (companyBadge && companyName) {
  companyBadge.textContent = decodeURIComponent(companyName);
}

// If no company param on dashboard, redirect home
if (document.getElementById('companyTitle') && !companyName) {
  window.location.href = 'index.html';
}
