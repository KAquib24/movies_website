const moviesPerPage = 15; // Maximum movies per page
let currentPage = 1; // Start on the first page
let movies = []; // To hold the movies fetched from JSON
let filteredMovies = []; // To hold the filtered movies based on search query

// Fetch movies from JSON
async function fetchMovies() {
    try {
        const response = await fetch("movies.json");
        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }
        movies = await response.json();
        reverseMoviesOrder();  // Reverse the order of the movies
        filteredMovies = [...movies];  // Initially, show all movies
        renderMovies();
        setupPagination();
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Reverse the order of movies
function reverseMoviesOrder() {
    movies.sort((a, b) => b.id - a.id); // Sort movies in descending order of IDs
}

// Render movies for the current page
function renderMovies() {
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToRender = filteredMovies.slice(startIndex, endIndex);
  
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
  
    if (moviesToRender.length > 0) {
        moviesToRender.forEach((movie, index) => {
            const movieCard = document.createElement("div");
            movieCard.className = `col-12 col-sm-6 col-md-4 col-lg-2`; 
  
            movieCard.innerHTML = `
                <div class="card">
                    <a href="moviepage.html?id=${movie.id}">
                        <img src="${movie.image}" class="card-img-top" alt="${movie.description}">
                        <div class="card-body">
                            <p class="card-text">${movie.description}</p>
                        </div>
                    </a>
                </div>
            `;
  
            movieList.appendChild(movieCard);
        });
    } else {
        movieList.innerHTML = `
            <div class="no-results">
                <p>😞 Oops! No Results Found</p>
                <p>Check Your Spelling for Accuracy.</p>
            </div>
        `;
    }
  }

  let resizeTimeout;
window.addEventListener("resize", function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        const cards = document.querySelectorAll(".col-12, .col-sm-6, .col-md-4, .col-lg-2");
        if (window.innerWidth <= 480) {
            cards.forEach(card => {
                card.classList.remove("col-12", "col-sm-6", "col-md-4", "col-lg-2");
            });
        } else {
            cards.forEach(card => {
                card.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-2");
            });
        }
    }, 100); // Adjust delay as needed
});

  

document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("open"); // Toggle the 'open' class
  });
});




// Setup pagination bar
function setupPagination() {
    const totalPages = Math.ceil(filteredMovies.length / moviesPerPage); // Total number of pages based on filtered movies
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Clear existing pagination buttons

    if (currentPage > 1) {
        paginationContainer.innerHTML += `<a href="#" onclick="changePage(${currentPage - 1})">&laquo; Previous</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
        paginationContainer.innerHTML += `
            <a href="#" class="${i === currentPage ? "active" : ""}" onclick="changePage(${i})">${i}</a>`;
    }

    if (currentPage < totalPages) {
        paginationContainer.innerHTML += `<a href="#" onclick="changePage(${currentPage + 1})">Next &raquo;</a>`;
    }
}

// Change to a different page
function changePage(page) {
    currentPage = page;
    renderMovies();
    setupPagination();
}

// Search movies based on input when search icon is clicked
function searchMovies() {
    const query = document.getElementById("movieSearch").value.toLowerCase();

    // Filter movies based on description or title
    filteredMovies = movies.filter(movie => {
        const titleMatch = movie.title ? movie.title.toLowerCase().includes(query) : false;
        const descriptionMatch = movie.description ? movie.description.toLowerCase().includes(query) : false;
        return titleMatch || descriptionMatch;
    });

    // Reset to the first page
    currentPage = 1;

    renderMovies();
    setupPagination();
}

// Add event listener to the search icon
document.getElementById("search-icon").addEventListener("click", searchMovies);

// Initialize the page
fetchMovies();
