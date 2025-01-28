const toggleButton = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

toggleButton.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});
// main

function showContent(section) {
  // Hide all content sections
  document.querySelectorAll(".content-section").forEach((content) => {
    content.classList.add("hidden");
  });

  // Remove active class from all buttons
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.classList.remove("border-b-2", "border-blue-500", "font-bold");
  });

  // Show the selected content section
  document.getElementById(section).classList.remove("hidden");

  // Activate the clicked button
  const activeButton = document.querySelector(
    `button[data-section="${section}"]`
  );
  if (activeButton) {
    activeButton.classList.add("border-b-2", "border-blue-500", "font-bold");
  }
}

// Show the Overview by default
document.addEventListener("DOMContentLoaded", () => {
  showContent("overview");
});
