/* ============================================
   MODA ECCI — JAVASCRIPT PRINCIPAL
   ============================================ */

/* ── LANGUAGE SYSTEM ── */
let currentLang = localStorage.getItem('modaLang') || 'es';

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem('modaLang', lang);

  // Toggle body class for CSS show/hide of .txt-es / .txt-en
  document.body.classList.toggle('lang-en', lang === 'en');

  // Swap data-es / data-en text on short elements
  document.querySelectorAll('[data-es]').forEach(el => {
    el.textContent = el.dataset[lang] || el.dataset.es;
  });

  // Update lang button label
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'es' ? 'EN' : 'ES';

  // Update html lang attribute
  document.documentElement.lang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  applyLang(currentLang);
});

function toggleLang() {
  applyLang(currentLang === 'es' ? 'en' : 'es');
}

/* ── MENU OVERLAY ── */
const overlay   = document.getElementById('menuOverlay');
const hamburger = document.getElementById('hamburger');

function openMenu() {
  if (!overlay) return;
  overlay.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  if (!overlay) return;
  overlay.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

function toggleMenu() {
  if (!overlay) return;
  overlay.classList.contains('open') ? closeMenu() : openMenu();
}

// Close on ESC
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

// Close on overlay link click
document.querySelectorAll('.menu-overlay a').forEach(a => {
  a.addEventListener('click', closeMenu);
});

/* ── TOPBAR SCROLL EFFECT ── */
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (!topbar) return;
  topbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

/* ── ACTIVE PAGE HIGHLIGHT ── */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.menu-overlay a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    a.classList.add('cur-page');
  }
});

/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── GLOSSARY SEARCH ── */
const gSearch = document.getElementById('glossarySearch');
if (gSearch) {
  gSearch.addEventListener('input', () => {
    const q = gSearch.value.toLowerCase();
    document.querySelectorAll('.glossary-table tbody tr').forEach(row => {
      row.classList.toggle('hidden-row', !row.textContent.toLowerCase().includes(q));
    });
  });
}

/* ── MODAL (glossary term details) ── */
function showTermModal(en, es, def) {
  document.getElementById('modalTermEn').textContent  = en;
  document.getElementById('modalTermEs').textContent  = es;
  document.getElementById('modalTermDef').textContent = def;
  const modal = new bootstrap.Modal(document.getElementById('termModal'));
  modal.show();
}

/* ── DISMISSIBLE ALERT ── */
document.querySelectorAll('.alert-dismiss').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.alert-moda').style.display = 'none';
  });
});
