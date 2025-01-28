// Toggle mobile menu
const toggleButton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// hotel carousel
const moveCarousel = (id, direction) => {
  const carousel = document.getElementById(`carousel-${id}`);
  const cardCount = carousel.children.length;
  const cardWidth = carousel.children[0].offsetWidth;
  const currentTransform =
    parseInt(getComputedStyle(carousel).transform.split(",")[4]) || 0;

  const newTransform = currentTransform + direction * cardWidth;

  // Ensure the carousel does not scroll past the bounds
  if (newTransform > 0) {
    carousel.style.transform = `translateX(0px)`;
  } else if (Math.abs(newTransform) > (cardCount - 1) * cardWidth) {
    carousel.style.transform = `translateX(-${(cardCount - 1) * cardWidth}px)`;
  } else {
    carousel.style.transform = `translateX(${newTransform}px)`;
  }
};

// cars
