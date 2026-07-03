/* Nina Diseños — Interacciones */

// ============================================
// NAV: estado scroll
// ============================================
const nav = document.querySelector('.nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Smooth scroll para anchors internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        const y = t.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ============================================
// REVEAL: contenido siempre visible (sin animación bloqueante)
// ============================================
document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));

// ============================================
// PRODUCTOS — tabs Venta / Retapizado
// ============================================
const tabs = document.querySelectorAll('.prod-tab');
const tabPill = document.querySelector('.prod-tab-pill');
const venta = document.getElementById('panel-venta');
const retap = document.getElementById('panel-retap');

function activateTab(tab) {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  // posicionar pill
  const rect = tab.getBoundingClientRect();
  const parentRect = tab.parentElement.getBoundingClientRect();
  tabPill.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
  tabPill.style.width = `${rect.width}px`;

  const target = tab.dataset.panel;
  if (target === 'venta') {
    venta.style.display = 'block';
    retap.style.display = 'none';
  } else {
    venta.style.display = 'none';
    retap.style.display = 'block';
  }
}
tabs.forEach(t => t.addEventListener('click', () => activateTab(t)));
window.addEventListener('load', () => {
  // posicionar pill inicialmente
  const active = document.querySelector('.prod-tab.active') || tabs[0];
  activateTab(active);
});
window.addEventListener('resize', () => {
  const active = document.querySelector('.prod-tab.active');
  if (active) {
    const rect = active.getBoundingClientRect();
    const parentRect = active.parentElement.getBoundingClientRect();
    tabPill.style.transform = `translateX(${rect.left - parentRect.left - 4}px)`;
    tabPill.style.width = `${rect.width}px`;
  }
});

// ============================================
// FAVORITOS (visual toggle)
// ============================================
document.querySelectorAll('.prod-fav').forEach(b => {
  b.addEventListener('click', (e) => {
    e.stopPropagation();
    b.classList.toggle('active');
  });
});

// ============================================
// COMPARE SLIDERS (antes/después)
// ============================================
function setupCompare(el) {
  const after = el.querySelector('.compare-after');
  const handle = el.querySelector('.compare-handle');
  let dragging = false;

  function setPos(clientX) {
    const rect = el.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(0, Math.min(100, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = `${pct}%`;
  }

  el.addEventListener('mousedown', (e) => { dragging = true; setPos(e.clientX); });
  window.addEventListener('mousemove', (e) => { if (dragging) setPos(e.clientX); });
  window.addEventListener('mouseup', () => { dragging = false; });

  el.addEventListener('touchstart', (e) => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  el.addEventListener('touchmove', (e) => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  el.addEventListener('touchend', () => { dragging = false; });

  // Cursor follow on hover
  el.addEventListener('mousemove', (e) => {
    if (!dragging) return;
  });
}
document.querySelectorAll('.compare').forEach(setupCompare);

// ============================================
// FORM submit -> WhatsApp
// ============================================
const form = document.getElementById('contact-form');
const WA_NUMBER = '5493873407352';
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nombre = data.get('nombre') || '';
    const email = data.get('email') || '';
    const tema = data.get('tema') || '';
    const mensaje = data.get('mensaje') || '';
    const text = `Hola Nina Diseños 👋\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n*Consulta:* ${tema}\n\n${mensaje}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// ============================================
// WHATSAPP — burbuja inicial
// ============================================
const bubble = document.querySelector('.wa-bubble');
const bubbleClose = document.querySelector('.wa-bubble-close');
let bubbleShown = false;
function showBubble() {
  if (bubbleShown) return;
  bubble.classList.add('show');
  bubbleShown = true;
  setTimeout(() => bubble.classList.remove('show'), 8000);
}
setTimeout(showBubble, 3500);
if (bubbleClose) {
  bubbleClose.addEventListener('click', (e) => {
    e.stopPropagation();
    bubble.classList.remove('show');
  });
}

// Año en footer
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
