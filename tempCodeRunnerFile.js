  fetch('movieData.json')
  .then(response => response.json())
  .then(data => {
    // Flatten the nested structure if necessary
    const movies = Array.isArray(data[0]) ? data.flat() : data;

    // Get movie ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('id'), 10);

    // Update the page with the corresponding movie
    updateMoviePage(movieId, movies);
  })
  .catch(error => console.error('Error loading the movie data:', error));
