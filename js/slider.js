document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slider .slide");
  const dots = document.querySelectorAll(".slider-dots .dot");
  let current = 0;
  let timer;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      slide.style.display = i === index ? "block" : "none";
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    current = index;
  }

  function nextSlide() {
    let next = (current + 1) % slides.length;
    showSlide(next);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      showSlide(i);
      resetTimer();
    });
  });

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(nextSlide, 3500);
  }

  showSlide(0);
  timer = setInterval(nextSlide, 3500);
});
