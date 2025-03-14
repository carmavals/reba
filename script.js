let currentIndex = 0;
const slides = document.querySelectorAll(".carousel-container img");
const dots = document.querySelectorAll(".dot");

function updateCarousel() {
    const offset = -currentIndex * 100;
    document.querySelector(".carousel-container").style.transform = `translateX(${offset}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
}

function moveSlide(step) {
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    updateCarousel();
}

function currentSlide(index) {
    currentIndex = index;
    updateCarousel();
}

setInterval(() => moveSlide(1), 3000); // Cambio automático cada 3 segundos