const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
let currentIndex = 0;


function updateCarousel() {
    const offset = -currentIndex * slides[0].clientWidth;
    track.style.transform = `translateX(${offset}px)`;
}


nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});


prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});


setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 3000);