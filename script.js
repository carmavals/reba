let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-container img");
const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    const offset = -currentIndex * 100;
    const container = document.querySelector(".carousel-container");
    if (container) container.style.transform = `translateX(${offset}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function moveSlide(step) {
    if (slides.length === 0) return;
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    updateCarousel();
}

function currentSlide(index) {
    if (slides.length === 0) return;
    currentIndex = index;
    updateCarousel();
}

if (slides.length > 0) {
    setInterval(() => moveSlide(1), 3000); // Cambio automático cada 3 segundos
}

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const header = document.querySelector('header');

    if (!menuToggle || !mainNav) return;

    // Inicializar estado según atributos (por si vienen del HTML)
    if (!menuToggle.hasAttribute('aria-expanded')) menuToggle.setAttribute('aria-expanded', 'false');
    if (!mainNav.hasAttribute('aria-hidden')) mainNav.setAttribute('aria-hidden', 'true');

    menuToggle.addEventListener('click', (e) => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        mainNav.setAttribute('aria-hidden', String(expanded));
        menuToggle.setAttribute('aria-label', expanded ? 'Abrir menú' : 'Cerrar menú');
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });

    // Cerrar al clicar fuera del header
    document.addEventListener('click', (e) => {
        const menuOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (menuOpen && header && !header.contains(e.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.setAttribute('aria-hidden', 'true');
            menuToggle.setAttribute('aria-label', 'Abrir menú');
        }
    });

    // --- Lógica para carruseles por proyecto: avanzar una imagen a la vez mientras se hace hover/focus ---
    const projectElements = document.querySelectorAll('.project');
    projectElements.forEach((proj) => {
        const carousel = proj.querySelector('.project-carousel .carousel-images');
        if (!carousel) return;
        const images = carousel.querySelectorAll('img');
        if (images.length <= 1) return; // nada que mover

        let idx = 0;
        let intervalId = null;

        function showIndex(i) {
            const total = images.length || 1;
            const percent = (i * 100) / total; // mover por fracción del ancho total del carrusel
            carousel.style.transform = `translateX(-${percent}%)`;
        }

        function startAuto() {
            if (intervalId) return;
            intervalId = setInterval(() => {
                idx = (idx + 1) % images.length;
                showIndex(idx);
            }, 2200);
        }

        function stopAuto(reset = true) {
            if (intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
            if (reset) {
                idx = 0;
                showIndex(idx);
            }
        }

        // Eventos de ratón
        proj.addEventListener('mouseenter', () => startAuto());
        proj.addEventListener('mouseleave', () => stopAuto(true));

        // Eventos de teclado (accesibilidad)
        proj.addEventListener('focusin', () => startAuto());
        proj.addEventListener('focusout', () => stopAuto(true));

        // Soporte táctil: tocar inicia, al soltar se detiene
        proj.addEventListener('touchstart', () => startAuto(), { passive: true });
        proj.addEventListener('touchend', () => stopAuto(false));
    });

});

document.addEventListener('DOMContentLoaded', () => {
  // modal donación en header (si existe)
  const open = document.getElementById('open');
  const modalContainer = document.getElementById('modal-container');
  const close = document.getElementById('close');
  if (open && modalContainer && close) {
    open.addEventListener('click', () => modalContainer.classList.add('show'));
    close.addEventListener('click', () => modalContainer.classList.remove('show'));
  }

  // modal donación en footer (si existe)
  const openFooter = document.getElementById('open-footer');
  const modalContainerFooter = document.getElementById('modal-container2');
  const closeFooter = document.getElementById('close-footer');
  if (openFooter && modalContainerFooter && closeFooter) {
    openFooter.addEventListener('click', (e) => {
      e.preventDefault();
      modalContainerFooter.classList.add('show');
    });
    closeFooter.addEventListener('click', () => {
      modalContainerFooter.classList.remove('show');
    });
  }
});
