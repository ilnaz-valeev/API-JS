const images = document.querySelectorAll(".slider-image");
const prevButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateSlider() {
  document.querySelector(".slider-images").style.transform = `translateX(-${
    currentIndex * 100
  }%)`;

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

prevButton.addEventListener("click", () => {
  currentIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
  updateSlider();
});

nextButton.addEventListener("click", () => {
  currentIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
  updateSlider();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    currentIndex = parseInt(e.target.getAttribute("data-index"));
    updateSlider();
  });
});

updateSlider();
