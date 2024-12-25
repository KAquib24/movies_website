// Function to update movie details dynamically
function updateMoviePage(movieId, movies) {
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
      document.getElementById("movie-title").textContent = movie.title;
      document.getElementById("movie-name").textContent = movie.name;
      document.getElementById("movie-year").textContent = `(${movie.year})`;
      document.getElementById("movie-episodes").textContent = movie.episodes;
      document.getElementById("movie-release-date").textContent = movie.releaseDate;
      document.getElementById("movie-imdb-rating").textContent = movie.imdbRating;
      document.getElementById("movie-cast").textContent = movie.cast;
      document.getElementById("movie-language").textContent = "Hindi Dubbed | Korean | English"; // Example
      document.getElementById("movie-quality").textContent = "480p | 720p | 1080p (HD)"; // Example
      document.getElementById("movie-genre").textContent = "Comedy | Crime | Romance | KDrama"; // Example
      document.getElementById("movie-storyline").textContent = movie.storyline;

      // Set the movie image
      document.getElementById("movie-image").src = movie.image;

      // Set screenshots dynamically
      const screenshotsContainer = document.getElementById("movie-screenshots");
      movie.screenshots.forEach((screenshot) => {
          const img = document.createElement("img");
          img.src = screenshot;
          screenshotsContainer.appendChild(img);
      });

      // Set download links dynamically
      const downloadLinksContainer = document.getElementById("movie-download-links");
      movie.downloadLinks.forEach((link) => {
          const downloadButton = document.createElement("a");
          downloadButton.href = link.url;
          downloadButton.target = "_blank";
          downloadButton.textContent = `${link.quality} Download`;
          downloadButton.classList.add("download-link");
          downloadLinksContainer.appendChild(downloadButton);
      });
  } else {
      console.log("Movie not found");
  }
}

// Fetch movie data from JSON file and update the page
fetch("movieData.json")
  .then((response) => response.json())
  .then((data) => {
      // Get movie ID from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const movieId = parseInt(urlParams.get("id"), 10);

      // Update the page with the corresponding movie
      updateMoviePage(movieId, data);
  })
  .catch((error) => console.error("Error loading the movie data:", error));