// ===== MOBILE MENU =====
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.textContent = menu.classList.contains('open') ? '\u2715' : '\u2630';
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.textContent = '\u2630';
      });
    });
  }

  // ===== SLIDER =====
  const slides = document.querySelectorAll('.slider .slide');
  const prevBtn = document.querySelector('.slider-nav.prev');
  const nextBtn = document.querySelector('.slider-nav.next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  if (slides.length > 0) {
    showSlide(0);
    slideInterval = setInterval(nextSlide, 7000);

    if (prevBtn) prevBtn.addEventListener('click', () => { clearInterval(slideInterval); prevSlide(); slideInterval = setInterval(nextSlide, 7000); });
    if (nextBtn) nextBtn.addEventListener('click', () => { clearInterval(slideInterval); nextSlide(); slideInterval = setInterval(nextSlide, 7000); });
  }

  // ===== PROPERTY FILTERS =====
  const filterOperacion = document.getElementById('filter-operacion');
  const filterPropiedad = document.getElementById('filter-propiedad');
  const filterComuna = document.getElementById('filter-comuna');
  const searchInput = document.getElementById('search-input');
  const cards = document.querySelectorAll('.property-card');
  const noResults = document.querySelector('.no-results');

  function applyFilters() {
    const op = filterOperacion ? filterOperacion.value : '*';
    const prop = filterPropiedad ? filterPropiedad.value : '*';
    const com = filterComuna ? filterComuna.value : '*';
    const search = searchInput ? searchInput.value.toLowerCase() : '';
    let visible = 0;

    cards.forEach(card => {
      const cats = card.dataset.cats || '';
      const title = (card.dataset.title || '').toLowerCase();
      const matchOp = op === '*' || cats.includes(op);
      const matchProp = prop === '*' || cats.includes(prop);
      const matchCom = com === '*' || cats.includes(com);
      const matchSearch = !search || title.includes(search);

      if (matchOp && matchProp && matchCom && matchSearch) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });

    if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  if (filterOperacion) filterOperacion.addEventListener('change', applyFilters);
  if (filterPropiedad) filterPropiedad.addEventListener('change', applyFilters);
  if (filterComuna) filterComuna.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  // ===== LIGHTBOX =====
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('img') : null;

  document.querySelectorAll('.overlay-btn.gallery-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.dataset.src;
      if (lightboxImg && src) {
        lightboxImg.src = src;
        lightbox.classList.add('active');
      }
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
      }
    });
  }

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
