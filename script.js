document.addEventListener("DOMContentLoaded", () => {
  const circles = [
    document.getElementById("circle1"),
    document.getElementById("circle2"),
    document.getElementById("circle3"),
  ];
  const dots = document.querySelectorAll(".slider-dot");

  let currentSlide = 0;

  // Function to update the slider based on the active dot
  const updateSlider = (index) => {
    // Reset all circles
    circles.forEach((circle) => circle.classList.remove("large"));

    // Set the active circle to the selected one
    circles[index].classList.add("large");

    // Update dot opacity and set the active class
    dots.forEach((dot, i) => {
      dot.classList.remove("active"); // Remove active class from all dots
      if (i === index) {
        dot.classList.add("active"); // Add active class to the clicked dot
      }
    });

    currentSlide = index;
  };

  // Add click event to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => updateSlider(index));
  });

  // Initialize the slider
  updateSlider(currentSlide);
});

// menu bar
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuLinks = document.getElementById("menuLinks");
  const menuIcon = document.getElementById("menuIcon");

  menuToggle.addEventListener("click", () => {
    // Toggle the visibility of menu links
    menuLinks.classList.toggle("hidden");
    menuLinks.classList.toggle("flex");

    // Toggle the icon between bars and cross
    if (menuIcon.classList.contains("fa-bars")) {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-times"); // Change to cross icon
    } else {
      menuIcon.classList.remove("fa-times");
      menuIcon.classList.add("fa-bars"); // Change back to bars icon
    }
  });
});

// hotel
document.addEventListener("DOMContentLoaded", () => {
  // Select all cards
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    const images = card.querySelectorAll(".slider-image");
    const dots = card.querySelectorAll(".dot");

    let currentIndex = 0;

    const updateSlider = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle("opacity-100", i === index);
        img.classList.toggle("opacity-0", i !== index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("bg-white", i === index);
        dot.classList.toggle("bg-gray-300", i !== index);
      });
    };

    // Add click event listeners to dots within each card
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        currentIndex = parseInt(dot.dataset.slide, 10);
        updateSlider(currentIndex);
      });
    });

    // Auto slide functionality
    setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlider(currentIndex);
    }, 3000); // 3 seconds interval
  });
});

// api
async function searchHotels() {
  // Get user input values
  const location = document.getElementById("location-input").value;
  const checkInDate = document.getElementById("check-in-date").value;
  const checkOutDate = document.getElementById("check-out-date").value;
  const rooms = document.getElementById("rooms-select").value;
  const guests = document.getElementById("guests-select").value;

  // Validate input fields
  if (!location || !checkInDate || !checkOutDate) {
    alert("Please fill out all fields.");
    return;
  }

  // Call a hotel API (replace with an actual API endpoint)
  const apiUrl = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${location}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`;

  try {
    // Display a loading message
    const resultsDiv = document.getElementById("hotel-results");
    resultsDiv.innerHTML = "<p>Loading hotels...</p>";

    // Fetch data from the API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching hotel data");
    }
    const data = await response.json();

    // Render hotel results
    renderHotelResults(data.hotels);
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to fetch hotel data. Please try again.");
  }
}

function renderHotelResults(hotels) {
  const resultsDiv = document.getElementById("hotel-results");
  if (hotels.length === 0) {
    resultsDiv.innerHTML = "<p>No hotels found for your search.</p>";
    return;
  }

  // Create a list of hotels
  resultsDiv.innerHTML = hotels
    .map(
      (hotel) => `
      <div class="p-4 border rounded mb-4">
        <h3 class="text-lg font-semibold">${hotel.name}</h3>
        <p>${hotel.location}</p>
        <p>Price: $${hotel.price}</p>
        <p>Rating: ${hotel.rating} / 5</p>
      </div>
    `
    )
    .join("");
}
